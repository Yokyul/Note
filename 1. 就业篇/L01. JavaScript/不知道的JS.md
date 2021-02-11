## 1 浏览器常驻线程（5个）

- js引擎线程：解释执行js代码、用户输入、网络请求。
- GUI线程：绘制用户界面、与js主线程是互斥的，一个在运行，另一个就再等待。如：点击按钮，在浏览器会有被点击的效果。
- http网络请求线程：处理用户的 `get`、`post` 等请求，等服务器返回结果后将回调函数推入任务队列。
- 定时触发器线程：`setTimeout`、`setInterval` 等待时间结束后把执行函数推入任务队列中。
- 浏览器事件处理线程：如：`click`、`mouse` 等交互事件发生后，浏览器会将这些事件放入事件队列中。

1. **JS引擎线程 和 GUI线程的关系**

JS可以操作DOM元素，进而会影响到GUI的渲染结果。因此JS引擎线程与GUI渲染线程是互斥的。**例如**：当点击按钮时，如果触发一个死循环函数，那么此时js线程就会一直执行，GUI线程就会被阻断，在浏览器就看不到被点击的效果。

2. **Js为什么是单线程的？ 多线程不好吗？**

`JS` 设计出来就是为了与用户交互，处理 `DOM` 。假如js是多线程，同一时间一个线程想要修改DOM，另一个线程想要删除DOM，浏览器就会不知道听谁的。
如果引入“锁”的机制，这不就又回到了其他语言尴尬的困境了吗？

3. **需要操作大量数据怎么办？**

单线程计算能力有限，大量数据需要计算渲染的话，我们可以配合后端进行操作。如：`VUE` 与 `nodejs` 配合，也就是传说中的 `SSR` 技术。


## 2 Js的执行机制

`JS` 是基于单线程运行的，同时又是可以异步执行的。一般来说这种既是单线程又是异步的语言都是基于<font color="red">事件</font>来驱动的。

具体执行流程：
- 同步和异步任务分别进入不同的执行"场所"。同步的进入主线程，异步的进入 `Event Table` 并注册函数。如：`div.onclick = function(){}`，这就是注册函数。
- 当指定的事情完成时，`Event Table` 会将这个函数移入 `Event Queue`(事件队列)。
- 主线程内的任务执行完毕为空之后，就会去 `Event Queue` 读取对应的函数，进入主线程执行。

上述过程会不断重复，也就是常说的 `Event Loop`(<font color="red">事件循环</font>)。


1. **同步任务的执行流程**

```js
 function outer(ot) {
    function inner(it) {
        console.log(it);
    }
    inner(20);
    console.log(ot);
}
outer(10);
```

> 以上述代码为例解析执行流程：
> 0.代码没有执行的时候，执行栈为空栈 (执行栈其实相当于js主线程)
> 1.outer 函数执行时，创建了一帧。这帧中包含了形参、局部变量（预编译过程），然后把这一帧压入栈中。
> 2.然后执行 outer 函数内代码，执行 inner 函数。
> 3.创建新帧，同样有形参、局部变量，压入栈中。
> 4.inner 函数执行完毕，弹出栈。
> 5.outer 函数执行完毕，弹出栈。
> 6.执行栈为空。


2. **异步任务的执行流程**

```js
$.ajax({
    url: 'localhost: /js/demo.json',
    data: {},
    success: function (data) {
        console.log(data);
    }
});
console.log('run');
```

> 以上述代码为例解析执行流程：
> 1.Ajax 进入 Event Table，注册回调函数 success 。
> 2.执行 console.log('run') 。
> 3.ajax 事件完成后，http 网络请求线程会把任务放入 Event Queue 中。
> 4.主线程（调用栈）读取任务，执行success函数


## 3 重新理解 定时器

- `setTimeout` 

该函数并不是等待时间结束后就直接执行的，而是先推入浏览器的一个任务队列，在同步队列结束后在依次调用任务队列中的任务。

即使Js主线程中的执行栈为空，0毫秒实际上也是达不到的。根据HTML标准，最低 **4 毫秒**。

```js
setTimeout(function () {
    console.log("爱你")
}, 0);
```

- `setInterval`

该函数是每隔一段时间把任务放到 Event Queue 之中。


## 4 debugger 的作用

函数里写 `debugger;`，在浏览器可以查看该函数的执行栈。



## 5 bind

1. **bind()的基本语法**

- `show.bind(c1)`：根据show()建立一个新的函数。参数1改变show()中的this指向。不传参数保持默认。
```js
var x = 10;
function show() {
    console.log(this.x);
}
show(); //undefined

var obj1 = {
    x: 20
};
var newShow = show.bind(obj1); //bind()将show()中的this指向obj1
newShow(); //20
```

- `show.bind(c1, c2)`: 参数1改变show()的this指向; 参数2会作为newShow()的第一个参数。
```js
var x = 10;
function show(a, b) {
    console.log(this.x, a, b)
}
show("yu", "gu"); //undefined "yu" "gu"

var DuyiO = {
    x: 20
}
var newShow = show.bind(DuyiO, "yuyu");
newShow("gugu"); //20 yuyu gugu
```

- 执行 `new newShow()` 时，此时的构造函数依旧是 `show()`，且 `newShow()` 中的 `bind()` 也影响不到它。
```js
var x = 10;
function show(a, b) {
    console.log(this.x, a, b)
}
show("yu", "gu"); //undefined "yu" "gu"

var DuyiO = {
    x: 20
}
var newShow = show.bind(DuyiO, "yuyu");
var result = new newShow().constructor;
console.log(result); //[Function: show]
```

2. **bind()的使用**

例：事件处理函数showMessage()执行的时候，this是指向dom元素本身的。我们希望它指向list对象。
```html
<div>
    <button id="btn">按钮</button>
</div>

<script>
    var list = {
        init: function () {
            //this -> list对象
            this.ms = 'duyi';
            this.dom = document.getElementById('btn');
            this.bindEvent();
        },
        bindEvent: function () {
            // this --> list对象
            // this.dom.onclick = this.showMessage;
            this.dom.onclick = this.showMessage.bind(this);
        },
        showMessage: function () {
            // this --> dom
            console.log(this);
        }
    }

    list.init();
</script>
```


3. **`bind()`与 `apply()`，`call()`的区别？**

bind() 用在被等待执行的函数中。apply()，call()用在直接执行的函数。


4. **bind的系统内部原理实现**

```js
Function.prototype.newBind = function (target) {
    // 选取bind中第一个之后的参数
    var args = [].slice.call(arguments, 1);
    //谁调用newBlind方法，this就是谁
    var self = this;
    var tempFunc = function () { };

    var f = function () {
        // 选取bind中参数要传入的函数中的参数
        var _arg = [].slice.call(arguments, 0)
        return self.apply(this instanceof tempFunc ? this : target || window, args.concat(_arg))
    }
    tempFunc.prototype = this.prototype;
    f.prototype = new tempFunc();
    return f;
}
```


## 6 纯函数

1. **纯函数是什么？**

纯函数是指不依赖，也不修改其作用域之外变量的函数。

```html
<div>
    <input id="ip" type="text">
</div>

<script>
    var personArr = [
        { 
            name: '王港', 
            src: ' ./src/img/3.png', 
            des: '颈椎不好', 
            sex: 'm'
        }
    ]
    var oInp = document.getElementById('ip');
    oInp.oninput = function () {
        console.log(filterByText(this.value, personArr));
    }

    //纯函数
    function filterByText(text, arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            arr[i].name.indexOf(text) != -1 ? newArr.push(arr[i]) : '';
        }
        return newArr;
    }
</script>
```


2. **纯函数的作用**

- (1)预防 `bug`

一旦你网站或应用的代码量达到一定程度，它将不可避免的包含某种bug。

这不是 `JS` 特有的问题，而是一个几乎所有语言都有的通病一一虽然不是不可能，但是想要彻底清除程序中的所有bug还是非常难办到的。但是，这并不意味着我们不可以通过某些编码方式来预防bug的引入。

在 `JS` 中你可以很容易的创建全局变量，这些变量可以在所有函数中访问到。这也是一个导致bug的常见原因。因为程序中的任何部分都可能修改全局变量从而导致函数的行为出现异常。所以我们一般想要的是**修改形参的值不会影响到实参**。

- (2)适合单元测试

纯函数非常容易进行单元测试，因为不需要考虑上下文环境，只需要考虑输入和输出。

- (3)可以组件化开发，状态共享

3. **纯函数的用处**

更好的管理状态，使得可预测性增强，降低代码管理的难度。但是前端基本上都是在和副作用打交道，所有函数都是纯函数不可强求。



## 7 函数柯里化

> 在数学和计算机科学中，柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

1. **柯里化前奏-需要固定数量参数**

```js
// fixed params（参数） 4个
function add(a, b, c, d) {
    return a + b + c + d;
}
function FixedParamsCurry(fn) {
    // [add, 1, 2];
    var _arg = [].slice.call(arguments, 1);
    return function () {
        // arguments [2, 3];
        // [1, 2，2, 3];
        var newArg = _arg.concat([].slice.call(arguments, 0))
        return fn.apply(this, newArg);
    }
}
var newAdd = FixedParamsCurry(add, 1);
console.log(newAdd(2, 3, 4));
```


2. **实现柯里化-期待固定数量参数**
```js
function Curry(fn, length) {
    // length 4
    var length = length || fn.length;
    return function () {
        if (arguments.length < length) {
            // [fn].concat([1]) [fn, 1];
            var combined = [fn].concat([].slice.call(arguments, 0));
            return Curry(FixedParamsCurry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    }
}
var newAdd = Curry(add);
console.log(newAdd(1)(2)(3)(5));
// newAdd(1)(2)(3)(4);
// newAdd(1)(2, 3)(4);
// newAdd(1, 2)(3)(4);
// newAdd(1, 2)(3, 4);
// newAdd(1, 2, 3)(4);
```


3. **函数柯里化的用处**

降低代码的重复，提高代码的适应性。

- 例1：
```js
var newAdd = Curry(add);    //调用柯里化函数Curry
var nA1 = newAdd(1);        // 现在nA1中有参数1

var nA11 = nA1(2);          // 现在nA11中有参数1,2
console.log(nA11(3, 6));    // 和3，6组成4个参数输出

var nA12 = nA1(3);          // 现在nA12中有参数1,3
console.log(nA12(2, 7));    // 和2，7组成4个参数输出
```

- 例2：ajax这个函数重复调用的时候参数冗余
```js
function ajax(type, url, data) {
    console.log(type, url, data);
}
//不用 curry，重复冗余
ajax('POST', 'www.test1.Com', 'name=111')
ajax('POST', 'www.test2.Com', 'name=222')

//利用 curry
var ajaxCurry = Curry(ajax);                    //调用柯里化函数Curry

var Post = ajaxCurry('POST');                   // 现在Post中有参数POST
Post('www.test1.com', 'name=111');              // 和'www.test1.com', 'name=111'组成3个参数输出

var postFromTest = Post('www.test2.com');      // 现在postFromTest中有参数‘POST’，'www.test2.com'
postFromTest('name=222');                       // 和’name=222'组成3个参数输出

```





## 8 防抖&节流

1. **防抖**

函数防抖：在函数需要频繁触发的情况下，只有在有足够空闲的时间时，才会执行一次。例如：搜索一个词条时，当一个字母输入完1000ms后，也没有其他字母输入，才执行事件函数。

用处: 实时搜索(keyup)、拖拽(mousemove)
```html
<div>
    <input type="text" id='inp'></input>
</div>

<script>
    var oInp = document.getElementById('inp');
    var timer = null;
    oInp.oninput = debounce(ajax, 1000);

    function debounce(handler, delay) {
        var timer = null;
        return function () {
            var _self = this,
                _arg = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                handler.apply(_self, _arg);
            }, delay);
        }
    }

    function ajax(e) {
        console.log(e, this.value);
    }

</script>
```


2. **节流**

函数节流: 规定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。例如：1000ms内无论点击多少次按钮，都只会触发一次事件。

```html
<div id="show">0</div>
<button id='btn'>click</button>

<script>
    var oDiv = document.getElementById('show');
    var oBtn = document.getElementById('btn');
    oBtn.onclick = throttle(buy, 1000);

    function throttle(handler, wait) {
        var lastTime = 0;
        return function (e) {
            // arguments
            var nowTime = new Date().getTime();
            if (nowTime - lastTime > wait) {
                handler.apply(this,arguments)
                lastTime = nowTime;
            }
        }
    }
    function buy(e) {
        console.log(this, e)
        oDiv.innerText = parseInt(oDiv.innerText) + 1;
    }
</script>
```
