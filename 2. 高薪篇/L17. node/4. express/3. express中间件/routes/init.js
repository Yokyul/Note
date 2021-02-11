const express = require("express");
const app = express();
const port = 5009;

app.listen(port, () => {
    console.log(`server listen on ${port}`);
});

app.use(require("./staticMiddleware"));
app.get("/news/abc", (req, res, next) => {
    console.log("handler1");
    throw new Error("abc");     // 相当于 next(new Error("abc"))
});
app.use("/news", require("./errorMiddleware"));
