const QRCode = require("qrcode");

// QRCode.toDataURL("https://duyi.ke.qq.com/?tuin=a5d48d54", (err, url) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(url);   //服务器生成一个二维码的base64编码。将它赋给客户端<img>的src即可。
//     }
// });

QRCode.toFile("./yu.png", 
`小顾小朋友，想你，爱你。 
mua 洗澡去喽`, (err) => {
    if (err) {
        console.log(err);
    }
});
