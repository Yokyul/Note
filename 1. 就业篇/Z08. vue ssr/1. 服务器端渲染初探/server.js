const express = require('express');
const serverRender = require('vue-server-renderer');
const Vue = require('vue');
const fs = require('fs');
const server = express();

const app = new Vue({
    template: '<div>{{ msg }} <input v-model="msg"></div>',
    data() {
        return {
            msg: 'hello SSR'
        }
    }
});

// Vue 实例 转换 HTML字符串
// 渲染器
const render = serverRender.createRenderer({
    template: fs.readFileSync('./index.ssr.html', 'utf-8'),
});
// render.renderToString(app, (err, str) => {
//     if(err) {
//         throw err
//     }
//     console.log(str);
// });
// vue-server-renderer
// 1. 书写方式有问题。
// 2. 页面失活，需要激活(CSR)

server.get('/home', async (req, res) => {
    try {
        const htmlStr = await render.renderToString(app, {
            title: '服务器端渲染',
            shell: '<script> alert("山本，你仙人")</script>'
            });
        res.send(htmlStr);
    } catch (error) {
        res.send(error);
    }
});

server.listen(8091, _ => console.log('server is running at 8091'));
