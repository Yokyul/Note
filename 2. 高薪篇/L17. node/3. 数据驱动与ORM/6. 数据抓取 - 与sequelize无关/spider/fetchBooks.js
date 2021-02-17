// 抓取豆瓣读书中的数据信息
const axios = require("axios").default;
const cheerio = require("cheerio");
const Book = require("../models/Book");
saveToDB();


/**
 * 得到书籍信息，然后保存到数据库
 */
async function saveToDB() {
    const books = await fetchAll();
    await Book.bulkCreate(books);
    console.log("抓取数据并保存到了数据库");
}

/**
 * 获取所有的书籍信息
 */
async function fetchAll() {
    const links = await getBookLinks(); //得到书籍的详情页地址
    const proms = links.map((link) => {
        return getBookDetail(link); //根据书籍详情页的地址，得到该书籍的详细信息
    });
    return Promise.all(proms);
}

/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组
 */
async function getBookLinks() {
    const html = await getBooksHTML();
    const $ = cheerio.load(html);         //cheerio 加载html字符串
    const achorElements = $("#content .grid-12-12 li a.cover");   //类似jQuery，通过选择器找到书籍详情的链接标签。
    const links = achorElements.map((i, ele) => {   //类似数组的map方法，不过第一个参数为下标，第二个为元素。
        const href = ele.attribs["href"];           //类似jQuery 的 attr属性，获取元素属性的值。
        return href;
    }).get();           // cheerio 得到的是一个类数组。类似jQuery，我们可以通过.get() 方法将其转为数组。
    return links;
}

/**
 * 获取豆瓣读书网页的源代码
 */
async function getBooksHTML() {
    const resp = await axios.get("https://book.douban.com/latest");
    return resp.data;
}

/**
 * 根据书籍详情页的地址，得到该书籍的详细信息
 * @param {*} detailUrl
 */
async function getBookDetail(detailUrl) {
    const resp = await axios.get(detailUrl);
    const $ = cheerio.load(resp.data);
    const name = $("h1").text().trim();     //类似jQuery， .text()得到元素里的文本
    const imgurl = $("#mainpic .nbg img").attr("src");
    const spans = $("#info span.pl");
    const authorSpan = spans.filter((i, ele) => {   //类似数组的 filter 方法，筛选出 代表作者 的span元素。
        return $(ele).text().includes("作者");
    });
    const author = authorSpan.next("a").text();     //根据页面结构，作者名就是该span下面一个a元素
    const publishSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("出版年");
    });
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim();    //通过 .nodeValue 获得当前节点的值。
    return {
        name,
        imgurl,
        publishDate,
        author,
    };
}