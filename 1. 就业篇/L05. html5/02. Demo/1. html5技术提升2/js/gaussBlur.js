
/*
    高斯模糊的原理：
        1.通过drawImage() 方法将图片画到画布上。
        2.通过getImageData() 获取该图片的像素信息对象obj1。
        3.通过该对象的data属性， 将所有像素信息一顿修改，改成高斯模糊状态。
            具体如何修改呢？
                使用函数gaussBlur即可，传递的参数是：像素信息对象obj1。返回一个新的像素信息对象obj2。
                该函数是别人写的，涉及的知识比较复杂，知道就行。
        4.通过putImageData() 将修改后的图片重新画到画布上
        5.通过canvas.toDataURL() 获取图片的dataURL
        6.将图片的dataURL 赋给一个dom元素的背景。此时图片就是经过高斯模糊处理之后的图片了。

    如何调模糊值，要研究函数才行。但也有一个办法：
        画布越小，越模糊。通过canvas.width = 700; canvas.height = 700; 控制画布大小。
*/
(function (root) {
    function blurImg(img, ele) {

        var canvas = document.createElement('canvas');
        canvas.width = 700;
        canvas.height = 700;
        var context = canvas.getContext('2d');

        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var gaussData = gaussBlur(imgData);
        context.putImageData(gaussData, 0, 0);
        var imgSrc = canvas.toDataURL();

        ele.style.backgroundImage = 'url(' + imgSrc + ')';
    }

    function gaussBlur(imgData) {
        var pixes = imgData.data;
        var width = imgData.width;
        var height = imgData.height;
        var gaussMatrix = [],
            gaussSum = 0,
            x, y,
            r, g, b, a,
            i, j, k, len;

        var radius = 10;
        var sigma = 5;

        a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        b = -1 / (2 * sigma * sigma);
        //生成高斯矩阵
        for (i = 0, x = -radius; x <= radius; x++, i++) {
            g = a * Math.exp(b * x * x);
            gaussMatrix[i] = g;
            gaussSum += g;

        }
        //归一化, 保证高斯矩阵的值在[0,1]之间
        for (i = 0, len = gaussMatrix.length; i < len; i++) {
            gaussMatrix[i] /= gaussSum;
        }
        //x 方向一维高斯运算
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                r = g = b = a = 0;
                gaussSum = 0;
                for (j = -radius; j <= radius; j++) {
                    k = x + j;
                    if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
                        //r,g,b,a 四个一组
                        i = (y * width + k) * 4;
                        r += pixes[i] * gaussMatrix[j + radius];
                        g += pixes[i + 1] * gaussMatrix[j + radius];
                        b += pixes[i + 2] * gaussMatrix[j + radius];
                        // a += pixes[i + 3] * gaussMatrix[j];
                        gaussSum += gaussMatrix[j + radius];
                    }
                }
                i = (y * width + x) * 4;
                // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
                // console.log(gaussSum)
                pixes[i] = r / gaussSum;
                pixes[i + 1] = g / gaussSum;
                pixes[i + 2] = b / gaussSum;
                // pixes[i + 3] = a ;
            }
        }
        //y 方向一维高斯运算
        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                r = g = b = a = 0;
                gaussSum = 0;
                for (j = -radius; j <= radius; j++) {
                    k = y + j;
                    if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
                        i = (k * width + x) * 4;
                        r += pixes[i] * gaussMatrix[j + radius];
                        g += pixes[i + 1] * gaussMatrix[j + radius];
                        b += pixes[i + 2] * gaussMatrix[j + radius];
                        // a += pixes[i + 3] * gaussMatrix[j];
                        gaussSum += gaussMatrix[j + radius];
                    }
                }
                i = (y * width + x) * 4;
                pixes[i] = r / gaussSum;
                pixes[i + 1] = g / gaussSum;
                pixes[i + 2] = b / gaussSum;
            }
        }
        //end
        return imgData;
    }

    root.blurImg = blurImg;

})(window.player || (window.player = {}));



