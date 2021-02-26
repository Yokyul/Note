const express = require('express');
const app = new express();
app.use(express.static('./page'));
app.listen(9527); //端口号尽量 >8000，或者 =80

// web服务默认80端口。如果写了其他端口，访问时url就要带上具体端口。
// express 框架默认访问 index.html。