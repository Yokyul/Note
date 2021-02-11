const article = {
    title: "文章标题",
    content: "文章内容",
    comments: [{
        content: "评论1",
        user: {
            id: 1,
            name: "用户名1"
        }
    }, {
        content: "评论2",
        user: {
            id: 2,
            name: "用户名2"
        }
    }]
}

// 要求：解构出第二条评论的用户名和评论内容。即：name:"用户名2"  content:"评论2"

// 写法1
// const { content, user: { name } } = article.comments[1]

// 写法2
// const { comments: [, { content, user: { name } }] } = article

// 写法3
const [, { content, user: { name } }] = article.comments
console.log(content, name)




