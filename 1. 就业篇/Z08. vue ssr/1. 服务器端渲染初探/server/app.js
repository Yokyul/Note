const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './page')))

app.get('/page', (req, res) => {
    res.send(`
     <html>
        <head></head>
        <body>
            <h1>大家好，我是一个页面</h1>
        </body>
     </html>
    `)
})

app.listen('8090', _ => console.log('server is running at 8090'));