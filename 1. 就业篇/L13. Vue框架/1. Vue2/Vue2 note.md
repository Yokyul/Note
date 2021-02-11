# 10. 组件

## 10.1 组件基础

1. **组件是什么？**

组件是可复用的 `Vue` 实例，且带有一个名字。例如名字为 `shanshan-cmp` ，那么我们则可以在一个通过 `new Vue()` 创建的根实例中，把这个组件作为自定义元素来使用：

```html
<div id="app">
    <shanshan-cmp></shanshan-cmp>
</div>
```
```js
const vm = new Vue({
    el: '#app'
});
```

因为组件是可复用的 `Vue` 实例，所以它们与 `new Vue()` 接收相同的选项，例如 `data、computed、watch、methods` 以及 `生命周期钩子` 等。仅有的例外是像 `el` 这样根实例特有的选项。

2. **组件注册**

> 全局注册的组件可以用在任何新创建的 `Vue` 根实例的模板中。

- 注册全局组件: `Vue.component()`。两个参数：
    - {string}：组件名
    - {Function | Object} [definition]: 当参数为对象时，可以配置组件的选项。参数为函数以后再说。

```html
<div id="app">
    <button-counter></button-counter>
</div>
```

```js
Vue.component('button-counter', {
    data () {
        return {
            count: 0,
        }
    },
    // 配置组件渲染出来的样子
    template: `
        <button @click="count ++">你按了我{{ count }}次</button>
        `
});

const vm = new Vue({
    el: '#app',
});
```

- 注册局部组件: 在选项 `components` 中定义要使用的组件。

对于 components 对象中的每一个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

```html
<div id="#app">
    <button-counter></button-counter>
</div>
```
```js
const buttonCounter = {
    data () {
        return {
            count: 0
        }
    },
    template: `
        <button @click="count ++">你按了我{{ count }}次</button>
        `,
};

const vm = new Vue({
    el: '#app',
    components: {
        'button-counter': buttonCounter
    }
});
```

3. **定义组件名**

在注册一个组件的时候，我们始终需要给它一个名字，且命名要语义化。定义组件名的方式有两种：

- 使用 `kebab-case` (横短线分隔命名)

```html
<div id="#app">
    <my-component></my-component>   <!-- 使用该方式定义一个组件时，必须在引用这个自定义元素时使用 `kebab-case` 形式。 -->
</div>
```

```js
Vue.component('my-component', {});

const vm = new Vue({
    el: '#app',
});
```

- 使用 `PascalCase` (大驼峰命名)

```html
<div id="#app">
    <!-- 使用该方式定义一个组件时，引用这个自定义元素时两种命名法都可以 -->
    <my-component></my-component>   
    <MyComponent></MyComponent>
</div>
```
```js
Vue.component('MyComponent', {});

const vm = new Vue({
    el: '#app',
});
```

<font color=#ff4500>注意：</font>尽管如此，直接在 `DOM` (即字符串模板或单文件组件) 中使用时只有 `kebab-case` 是有效的。

<font color=#ff4500>另外：</font>我们强烈推荐遵循 `W3C` 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 `HTML` 元素相冲突。


4. **组件复用**

可以将组件进行任意次数的复用：

```html
<div id="#app">
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
</div>
```

5. **自闭合组件**

自闭合组件在 DOM 模板里不能被复用。

```html
<div id="#app">
    <!-- 以下组件只会渲染出一个 -->
    <button-counter />
    <button-counter />
    <button-counter />
</div>
```

但是在vue实例配置里可以复用：
```js
const vm = new Vue({
    el: '#app',
    components: {
        'shanshan-cmp-1': {
            template: `
                <div>嘿嘿，我是组件shanshan-cmp-1</div>
            `
        }
    },
    // 此时自闭合组件可以复用
    template: `
        <div id="app">
            <shanshan-cmp />          
            <shanshan-cmp />
            <shanshan-cmp />
        </div>
    `
});
```

- 在**单文件组件**、**字符串模板**和 **`JSX`中没有内容的组件**应该是自闭合的。但在 DOM 模板里永远不要这样做。

- 自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。

- 不幸的是，`HTML` 并不支持自闭合的自定义元素。只支持官方的"空"元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 `HTML`。

6. **组件的data选项**

当我们定义一个组件时，它的 `data` 选项并不是像这样直接提供一个对象：

```js
data: {
    count: 0
}
```

取而代之的是，一个组件的 `data` 选项必须是一个函数，返回对象的拷贝。只有这样，每个实例才可以有一个独立的 `data`，不会导致改一个数据，其他也跟着变。

```js
data () {
    return {
        count: 0
    }
}
```
如果 Vue 没有这条规则，点击一个按钮就可能会像下面一样影响到其它所有实例:
![](https://developer.duyiedu.com/myVue/data.gif)

除此之外，其他选项和 `vue` 实例一样。

7. **单个根元素**

每个组件必须只有一个根元素，当模板的元素大于1时，可以将模板的内容包裹在一个父元素内。


## 10.2 组件_Prop

> 数据从 vue 实例的 `data` 中拿，传递给组件实例的 `props` 选项。

1. **注册自定义特性**

组件默认只是写好结构、样式和行为，使用的数据应由外界传递给组件。

- 外界如何传递？
注册需要接收的 `prop` 选项，将数据作为一个自定义特性传递给组件。如：

```html
<div id="app">
    <video-item 
        title="羊村摇" 
        poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
        play="638000" 
        rank="1207" 
    >
    </video-item>
</div>
```
```js
Vue.component('video-item', {
    props: ['title', 'poster', 'play', 'rank'],
});
```

在上述模板中，你会发现我们能够在组件实例中访问 `prop` 选项的数据，就像访问 `data` 中的值一样：

```html
<div id="app">
    <video-item 
        title="羊村摇" 
        poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
        play="638000" 
        rank="1207"
    >
    </video-item>
</div>
```
```js
Vue.component('video-item', {
    props: ['title', 'poster', 'play', 'rank'],
    template: `<div>{{ title }}</div>`  //访问 `prop` 选项的数据
})
```

2. **Prop的大小写**

`HTML` 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。故当传递的 `prop` 为**短横线分隔命名**时，组件内的 `props` 应为**驼峰命名** 。

```html
<div id="app">
    <!-- 在 HTML 中是 kebab-case 的 -->
    <video-item sub-title="hello!"></video-item>
</div>
```
```js
Vue.component('video-item', {
    // 在 JavaScript 中是 camelCase 的
    props: ['subTitle'],
    template: '<h3>{{ subTitle }}</h3>'
});
```
<font color=#ff4500>注意：</font>如果使用的是字符串模板，那么这个限制就不存在了。

3. **传递静态或动态 Prop**

- 给 `prop` 传递一个静态的值：

```html
<video-item title="羊村摇"></video-item>
```
```js
Vue.component('video-item', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
});
```

- 给 `prop` 传递一个动态的值：配合 `v-bind` 指令进行传递。

```html
<video-item :title="title"></video-item>
```
```js
Vue.component('video-item', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
});

const vm = new Vue({
    el: '#app',
    date: {
        title: "标题"
    }
});
```


4. **传递一个对象的所有属性**

如果你想要将一个对象的所有属性都作为 `prop` 传入，你可以使用不带参数的 `v-bind` 。

```html
<div id="#app"></div>
```
```js
const vm = new Vue({
    el: '#app',
    date: {
        person: {
            name: 'shanshan',
            age: 18
        }
    }
});

```

向组件传递 `person` 对象的全部属性：
```html
<div id="#app">
    <my-component v-bind="person"></my-component>
</div>
```

上述代码等价于：
```html
<div id="#app">
    <my-component :name="person.name" :age="person.age"></my-component>
</div>
```

## 10.3 组件_Prop验证

> 可以为组件的 `prop` 指定验证要求。如：你可以指定一个 `prop` 的类型。如果需求没有被满足的话，那么 `Vue` 会在浏览器控制台中进行警告，这对开发一个**给别人使用的组件**非常有帮助。

1. **配置基础类型检查**

将 props 中的值写成一个**带有验证需求的对象**，而不是一个字符串数组。

```js
Vue.component('my-component', {
    props: {
        title: String,
        likes: Number,
        isPublished: Boolean,
        commentIds: Array,
        author: Object,
        callback: Function,
        contactsPromise: Promise
    }
});
```

上述代码中，对 `prop` 进行了基础的类型检查。类型值可以为下列原生构造函数中的一种：
- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- 任何自定义构造函数
- 上述内容组成的数组

<font color=#ff4500>注意：</font>`null` 和 `undefined` 会通过任何类型验证。

2. **配置高级类型检查**

配置高级选项，对 `prop` 进行其他验证。如：类型检测、自定义验证函数和设置默认值。

```js
Vue.component('my-component', {
    props: {
        title: {
            type: String,        // 检查 prop 是否为给定的类型
            default: '杉杉最美',  // 为该 prop 指定一个默认值，对象或数组的默认值必须从一个工厂函数返回，如：default () { return {a: 1, b: 10} },
            required: true,      // 定义该 prop 是否是必填项
            validator (prop) {   // 自定义验证函数，该 prop 的值会作为唯一的参数代入。若函数返回一个 false 的值，那么就代表验证失败。
                return prop.length < 140;
            }
        }
    }
})
```

为了更好的团队合作，在提交的代码中，`prop` 的定义应该尽量详细，至少需要指定其类型。

## 10.4 组件_单向数据流

1. **什么是单向数据流？**

所有的 `prop` 都使得其父子 `prop` 之间形成了一个**单向下行绑定**：父级 `prop` 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

我们最好也不要更改子组件中的 `prop`。有以下两个原因：

- 当父组件更改之后，会刷新子组件的数据使其与父组件保持一致，改了也白改。
- 当父级的 `prop` 是数组或者对象时，改子组件的数据会将父组件数据同时更改。因为子组件改的是引用值，所以或牵扯到父组件。我们一般不希望这样。

2. **子组件需要改变 `prop` 值的第 1 种情形**

> 这个 `prop` 仅用来传递一个初始值，后续需要对该值进行操作。

- 传递的是原始值 (浅层克隆):

将其作为子组件的一个本地 `prop` 数据来使用，在后续操作中，只会将本地 `prop` 数据改变。具体做法：定义一个本地的 `data` 属性并将这个 `prop` 用作其初始值。

```js
Vue.component('my-component', {
    props: ['initialCounter'],
    data: function () {
        return {
            counter: this.initialCounter
        }
    }
});
```

- 传递的是引用值 (深度克隆):

<font color=#ff4500>注意：</font>当传递的是数组和对象时，就算将其作为一个本地的 `prop` 数据，改子组件的数据也依旧会将父组件数据同时更改。需要使用深度克隆：

```js
深度克隆的步骤:
1、先把所有的值都遍历一遍（看是引用值和原始值）
    用 for ( var prop in obj )，对象和数组都可以使用
2、判断是原始值，还是引用值？ 用 typeof 判断是不是 object
    1）如果是原始值就直接拷贝
    2）如果是引用值，判断是数组还是对象 
3、判断是数组还是对象？（方法 instanceof、toString、constructor）
    建议toString,另外两个有个小 bug——跨父子域不行
    1）如果是数组，就新建一个空数组；
    2）如果是对象，就新建一个空对象。
4、建立了数组以后，如果是挨个看原始对象里面是什么，都是原始值就可以直接考过来了；或者，建立了对象以后，挨个判断对象里面的每一个值，看是原始值还是引用值
5.递归
```

3. **子组件需要改变 `prop` 值的第 2 种情形**

这个 `prop` 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 `prop` 的值来定义一个计算属性：

```js
Vue.component('my-component', {
    props: ['size'],
    computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    }
});
```

## 10.5 组件_非Prop特性

> 非 `Prop` 特性：指一个未被组件注册的特性。


1. **替换/合并已有的特性**

- 当组件接收了一个非 `Prop` 特性时，该特性会被添加到这个**组件的根元素**上。
- 若该特性为 class、style，则会被合并到这个**组件的根元素**上。

```html
<div id="app">
    <my-cmp a="1" b="2" class="haha"></my-cmp>
</div>
```
```js
Vue.component('my-cmp', {
      props: ['b'],
      template: `
        <div a="5" class="b"></div>
      `
});
```

对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以传入 a="1"会替换掉 a="5"。
但是，class 和 style 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：class="haha b"。

2. **禁用特性继承**

如果不希望组件的根元素继承特性，那么可以在组件选项中设置 `inheritAttrs: false`。
<font color=#ff4500>注意：</font>`inheritAttrs: false` 选项不会影响 style 和 class 的绑定。

```js
Vue.component('my-cmp', {
    inheritAttrs: false
})
```

在这种情况下，非常适合去配合实例的 `$attrs` 属性使用。这个属性是一个对象，键名为传递的特性名，键值为传递特性值。

```js
{
    required: true,
    placeholder: 'Enter your username'
}
```

3. **手动决定哪些特性会被赋予哪个元素**

使用 `inheritAttrs: false` 和 `$attrs` 相互配合，我们就可以手动决定这些特性会被赋予哪个元素。

```js
Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    template: `
        <label>
            {{ label }}
            <input
                v-bind="$attrs"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
            >
        </label>
    `,
})
```


## 10.6 组件_监听组件事件

> 在子组件内触发事件，在父组件内监听子组件的事件。通过 `$emit(事件名)` 触发事件

0. **例子导入**

在每一个博文组件中，都有一个按钮可以去放大页面中字体的字号。当点击这个按钮时，我们要通过操作父组件的 `postFontSize` 数据去放大所有博文的文本。

```html
<div id="app">
    <div :style="{fontSize: postFontSize + 'em'}">
        <blog-post
            v-for="post in posts"
            :key="post.id"
            :post="post"
        >
        </blog-post>
    </div>
</div>
```
```js
Vue.component('blog-post', {
    props: {
        post: {
            type: Object,
        }
    },
    template: `
        <div class="blog-post">
            <h3>{{ post.title }}</h3>
            <button>放大字号</button>
            <div>{{ post.content }}</div>
        </div>
    `,
});

const vm = new Vue({
    el: '#app',
    data: {
        posts: [
            { title: '标题1', content: '正文内容1', id: 0, },
            { title: '标题2', content: '正文内容2', id: 1, },
            { title: '标题3', content: '正文内容3', id: 2, },
        ],
        postFontSize: 1
    }
});
```

- 碰见这样的情况，该如何做呢？

`Vue` 实例提供了一个自定义事件来解决这个问题。父组件可以像处理原生 `DOM` 元素一样，通过 `v-on` 指令监听子组件实例的任意事件，如：

```html
<div id="app">
    <div :style="{fontSize: postFontSize + 'em'}">
        <blog-post
            ...
            @enlarge-text="postFontSize += 0.1"
        >
        </blog-post>
    </div>
</div>
```

那么，怎么样能够去监听到一个 `enlarge-text` 这么奇怪的事件呢？这就需要在组件内，去主动触发一个**自定义事件**了。通过调用 `$emit("事件名称")` 来触发一个事件：

```js
Vue.component('blog-post', {
    props: {
        ...
    },
    template: `
        <div class="blog-post">
            ...
            <button @click="$emit('enlarge-text')">放大字号</button>
            ...
        </div>
    `,
});
```


1. **`$emit()` 与 `$event` 的用法**

在有些情况下，我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这是可以使用 `$emit()` 的第二个参数来提供这个值：

```js
Vue.component('blog-post', {
    props: {
        ...
    },
    template: `
        <div class="blog-post">
            ...
            <button @click="$emit('enlarge-text', 0.2)">放大字号</button>
            ...
        </div>
    `,
});
```

在父组件监听这个事件时，可以通过 `$event` 访问到被抛出的这个值：

```html
<div id="app">
    <div :style="{fontSize: postFontSize + 'em'}">
        <blog-post
            ...
            @enlarge-text="postFontSize += $event"
        >
        </blog-post>
    </div>
</div>
```

或者将这个事件处理函数写成一个方法，这个值将会作为第一个参数传入这个方法：(监听 dom 元素时，第一个参数为事件对象 e，但在组件中没有事件对象 e)

```html
<div id="app">
    <div :style="{fontSize: postFontSize + 'em'}">
        <blog-post
            ...
            @enlarge-text="onEnlargeText"
        >
        </blog-post>
    </div>
</div>
```
```js
Vue.component('blog-post', {
    props: {
        ...
    },
    template: `
        <div class="blog-post">
            ...
            <button @click="$emit('enlarge-text', 0.2)">放大字号</button>
            ...
        </div>
    `,
});

const vm = new Vue({
    el: '#app',
    data: {
        postFontSize: 1
    },
    methods: {
        onEnlargeText: function (enlargeAmount) {   //事件处理函数
            this.postFontSize += enlargeAmount;
        }
    }
});
```

2. **事件名的写法**

> 不同于组件和 `prop`，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所有的名称。

如果触发一个 `camelCase` 名字的事件，那么监听这个名字的 `kabab-case` 是不会有任何效果的。

```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```
```js
this.$emit('myEvent')
```

与组件和prop不同的是，事件名不会被当作一个JS变量名或者属性名，所以就没有理由使用 `camelCase` 或 `PascalCase` 了。

并且 `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写，所以 `@myEvent` 将会变成 `@myevent`，导致 `myEvent` 不可能被监听到。

因此，推荐始终使用 `kebab-case` 的事件名。

3. **将原生事件绑定到组件**

- 在组件上去监听事件时，我们监听的是组件触发的**自定义事件**。
- 在一个组件的根元素上直接监听一个原生事件，可以使用 `v-on` 指令的 `.native` 修饰符：

```html

<base-input @focus.native="onFocus" @blur.native="onBlur"></base-input>
```
```js
Vue.component('base-input', {
    template: `
        <input type="text" />
    `
});
```

4. **使用 `.native` 将原生事件绑定到组件的弊端**

- 问题：

假如 `<base-input>` 组件做了重构，此时组件的根元素变为一个 `<label>` 元素，那么父级的 `.native` 监听器将静默失败。它不会产生任何报错，但 `onFocus` 也不会如预期被调用。

```html
<div id="app">
    <base-input 
        @focus.native="onFocus"
        @blur.native="onBlur"
    >
    </base-input>
</div>
```
```js
Vue.component('base-input', {
    //重构 `<base-input>` 组件
    template: ` 
        <label>
            姓名：
            <input type="text">
        </label>
    `
});
```


- 解决方法：

`Vue` 提供了一个 `$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。
```js
//$listeners 对象
{
  focus: function (event) { /* ... */ }
  blur: function (event) { /* ... */ },
}
```

有了这个 `$listeners` 属性，我们可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素：

```js
Vue.component('base-input', {
    template: `
        <label>
            名字：
            <input v-on="$listeners" type="text"/>
        </label>
    `
});
```

## 10.7 组件_实现双向数据绑定

1. **在组件上使用 v-model**

> 由于自定义事件的出现，在组件上也可以使用 `v-model` 指令。

- 用在根实例的 input 元素上

相当于绑定了 `value` 特性以及监听了 `input` 事件。

```html
<input v-model="searchText" />
<!-- 等价于： -->
<input
  :value="searchText"
  @input="searchText = $event.target.value"
>
```

- 用在组件的 input 元素上

也是相当于绑定了 `value` 特性以及监听了 `input` 事件。

同时该组件内的 `<input>` 元素必须：将其 `value` 特性绑定到一个叫 value 的 `prop` 上，然后在其 input 事件被触发时，通过 `$emit()` 将新的数据抛出。

```html
<base-input v-model="father-value" /> 
<!-- 等价于： -->
<base-input
  :value="father-value"
  @input="father-value = $event"
/>
```
```js
Vue.component('base-input', {
    props: ['value'],
    template: `
        <input 
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
    `
});
```

## 补充：组件的 model 选项

>通过上面的学习，我们知道了，一个组件上的 `v-model` 默认会利用名为 value 的 `prop` 和名为 input 的事件。但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的，不能用来传数据。

- `model` 选项用来配置 `v-model` 底层原理利用的属性和事件。

`lovingVue` 的值将会传入这个名为 `checked` 的 `prop`。
当组件 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的属性将会被更新。

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```
```js
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `
        <input
            type="checkbox"
            :checked="checked"
            @change="$emit('change', $event.target.checked)"
        >
    `
});
```

2. **使用 `v-bind` 的 `.sync` 修饰符**

>除了使用 `v-model` 指令实现组件与外部数据的双向绑定外，我们还可以用 `v-bind` 指令的修饰符 `.sync` 修饰符来实现。

- 不利用 v-model 指令来实现**父子组件**的双向数据绑定

```html
<base-input :value="searchText" @input="searchText = $event"></base-input>
```
```js
Vue.component('base-input', {
    props: ['value'],
    template: `
        <input
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
    `
});
```

- 利用 `.sync` 修饰符来实现**父子组件**的双向数据绑定：

`.sync` 修饰符本质上也是一个语法糖，在组件上使用。
```html
<base-input :value.sync="searchText"></base-input>
<!-- 等价于： -->
<base-input
    :value="searchText"
    @update:value="searchText = $event"
></base-input>
```

原理：
```html
<base-input 
    :value="searchText" 
    @update:value="searchText = $event"
></base-input>
```
```js
Vue.component('base-input', {
    props: ['value'],
    template: `
        <input
            :value="value"
            @input="$emit('update:value', $event.target.value)"
        />
    `
});
```

当我们用一个对象同时设置多个 `prop` 时，也可以将 `.sync` 修饰符和 `v-bind` 配合使用：
```html
<base-input v-bind.sync="obj"></base-input>
```

<font color=#ff4500>注意：</font>

- 带有 `.sync` 修饰符的 `v-bind` 指令只能提供想要绑定的属性名，**不能**和表达式一起使用。如：`:title.sync="1+1"`，这样操作是无效的。

- 将 ``v-bind.sync`` 用在一个字面量对象上，如 `v-bind.sync="{ title: 'haha' }"`，是无法工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。


3. **`v-model` VS `.sync`**

- .sync 的演变

在 vue 1.x： `.sync` 可以完全在子组件中修改父组件的状态，造成整个状态的变换很难追溯，所以官方在 vue 2.0 时移除了这个特性。

在 vue 2.3：`.sync` 又回归了，此时的 `.sync` 完完全全就是一个语法糖的作用，跟 `v-model` 的实现原理是一样的，也不容易破环院有的数据模型，所以使用上更安全也更方便。

- 两者的异同

都是用于实现**双向数据传递**的。实现方式都是语法糖，最终通过 `prop` + `事件` 来达成目的。

vue 1.x 的 `.sync` 和 `v-model` 是完全两个东西，vue 2.3 之后可以理解为一类特性，只是使用场景略微有区别。

- 两者的使用场景

当一个组件对外只暴露一个受控的状态且都符合统一标准的时候，使用 `v-model` 来处理。

`.sync` 则更为灵活，凡是需要双向数据传递时，都可以去使用。


## 10.8 组件_插槽

> 将组件首尾元素之间的内容作为一个插槽，替换掉组件模块中的 `<slot>` 元素。

1. **插槽内容**

- 当组件渲染时，`<slot></slot>` 将会被替换为 "写在组件标签结构中的内容"。
- 插槽内可以包含任何模板代码，包括 `HTML` 和其他组件。
- 如果 `<my-cmp>` 没有包含 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

```html
<my-cmp>
    写在组件标签结构中的内容
</my-cmp>
```
```js
Vue.component('my-cmp', {
    template: `
        <div>
            <slot></slot>
        </div>
    `
});
```

2. **编译作用域**

在插槽中使用的数据跟当前模板的其他地方一样，也就是**根实例的作用域**，而不能访问 `<my-cmp>` 的作用域。

<font color=#ff4500>记住：</font>父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

```html
<div id="app">
    <my-cmp>
        这是插槽中使用的数据：{{ user }}    <!-- 打印：根实例 -->
    </my-cmp>
</div>
```
```js
Vue.component('my-cmp', {
    data() {
        return {
            user: "组件"
        }
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `
});

const vm = new Vue({
    el: '#app',
    data: {
        user: "根实例"
    },
});
```


3. **后备内容**

> 我们可以设置默认插槽，它会在没有提供内容时被渲染。

如果我们希望 `<button>` 绝大多数情况下都渲染文本 “Submit”，此时就可以将 “Submit” 作为后备内容。当使用组件未提供插槽时，后备内容将会被渲染。如果提供插槽，则后备内容将会被取代。

```html
<div id="app">
    <my-cmp></my-cmp>
</div>
```
```js
Vue.compopnent('my-cmp', {
    template: `
        <button type="submit">
            <slot>Submit</slot>
        </button>
    `
});
```

4. **具名插槽**

> `v-slot` 的缩写：#。

有时我们需要多个插槽，如 `<my-cmp>` 组件中，需要在页头、主要内容和页脚分别插入插槽。

具体做法：

- 在组件模板中：在 `<slot>` 元素上使用一个特殊的特性 `name`，利用这个特性定义额外的插槽。一个不带 name 的 `<slot>` 会带有隐含的名字 “default”。

- 在根实例模板中：`<template>` 元素中的所有内容都会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。

```html
<div id="app">
    <my-cmp>
        <template v-slot:header>
            <h1>头部</h1>
        </template>

        <p>内容</p>
        <p>内容</p>

        <template v-slot:footer>
            <p>底部</p>
        </template>
  </my-cmp>
</div>
```
```js
Vue.compopnent('my-cmp', {
    template: `
        <div class="container">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    `
});
```

为了模板更清晰，也可以写成以下这样：
```html
<my-cmp>
    <template v-slot:header>
        <h1>头部</h1>
    </template>

    <template v-slot:default>
        <p>内容</p>
        <p>内容</p>
    </template>

    <template v-slot:footer>
        <p>底部</p>
    </template>
</my-cmp>
```

<font color=#ff4500>注意：</font>`v-slot` 只能添加在 `<template>` 上，只有一种例外情况。见


5. **具名插槽的缩写** (Vue 2.6.0 新增)

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，为 `#`。
当然，和其它指令一样，该缩写只在其有参数的时候才可用。

```html
<my-cmp>
    <template #header>
        <h1>头部</h1>
    </template>

    <template #default>
        <p>内容</p>
        <p>内容</p>
    </template>

    <template #footer>
        <p>底部</p>
    </template>
</my-cmp>
```

6. **作用域插槽**

为了能够让插槽内容访问子组件的数据，我们可以将子组件的数据作为 `<slot>` 元素的一个特性绑定上去。绑定在 `<slot>` 元素上的特性被称为**插槽prop**。我们可以在父级作用域中给 `v-slot` 带一个值来定义组件的**插槽prop**的名字。

```html
<div id="app">
    <my-cmp>
        <template v-slot:default="slotProps"> <!-- 定义组件插槽prop的名字为slotProps -->
            {{ slotProps.user.name }}
        </template>
    </my-cmp>
</div>
```
```js
Vue.component('my-cmp', {
    data () {
        return {
            user: {
                name: '杉杉',
                age: 18,
            }
        }
    },
    template: `
        <span>
            <slot v-bind:user="user"></slot>
        </span>
    `,
});
```

6.1 独占默认插槽的缩写语法

当被提供的内容只有默认插槽时，组件的标签可以被当作插槽的模板来使用，此时，可以将``v-slot``直接用在组件上：

```html
<my-cmp v-slot:default="slotProps">
    {{ slotProps.user.name }}
</my-cmp>
```
也可以更简单：
```html
<my-cmp v-slot="slotProps">
    {{ slotProps.user.name }}
</my-cmp>
```

6.2 默认插槽的缩写语法不能和具名插槽同时使用，因为它会导致作用域不明确。

```html
<!-- 无效，会导致警告 -->
<my-cmp v-slot="slotProps">
    {{ slotProps.user.name }}
    <template v-slot:other="otherSlotProps">
        slotProps 在这里是不合法的
    </template>
</my-cmp>

<!-- 正确写法 -->
<my-cmp>
    <template v-slot:default="slotProps">
        {{ slotProps.user.name }}
    </template>
    <template v-slot:other="otherSlotProps">
        slotProps 在这里合法
    </template>
</my-cmp>
```

<font color=#ff4500>注意：</font>只要出现多个插槽，就需要为所有的插槽使用完整的基于 `<template>` 的语法。

6.3 解构插槽Prop

我们可以使用解构传入具体的插槽prop，这样模板会更简洁，尤其是在为插槽提供了多个prop时。

```html
<my-cmp v-slot="{ user, person }">
    {{ user.name }} {{ person.name }} 
</my-cmp>
```
```js
Vue.component('my-cmp', {
    data () {
        return {
            user: {
                name: '杉杉',
                age: 18,
            },
            person: {
                name: 'yuyu',
                age: 22,
            }
        }
    },
    template: `
        <span>
            <slot v-bind="{ user: user, person: person }"></slot>
        </span>
    `,
});
```

- 解构用法1：将**插槽prop**重命名。
```html
<my-cmp v-slot="{ user: person }">
    {{ person.name }}
</my-cmp>
```

- 解构用法2：设置后备内容。 (**插槽prop**是undefined时生效)
```html
<my-cmp v-slot="{ user = { name: 'Guest' } }">
    {{ user.name }}
</my-cmp>
```

7. **动态插槽名** (Vue 2.6.0 新增)

```html
<my-cmp>
    <template v-slot:[dynamicSlotName]>
        ...
    </template>
</my-cmp>
```

8. **已废弃的语法**

8.1 带有slot特性的具名插槽 (Vue 2.6.0 废弃)

```html
<my-cmp>
    <template slot="header">
        <h1>头部</h1>
    </template>

    <template>
        <p>内容</p>
        <p>内容</p>
    </template>

    <template slot="footer">
        <p>底部</p>
    </template>
</my-cmp>
```

8.2 带有 slot-scope 特性的作用域插槽 (Vue 2.6.0 废弃)

```html
<my-cmp>
    <template slot="default" slot-scope="slotProps">
        {{ slotProps.user.name }}
    </template>
</my-cmp>
```

## 10.9 组件_动态组件

1. **基本使用**

当我们在一个多标签的界面中，在不同组件之间进行动态切换是非常有用的。

```html
<div id="app">
    <button 
        v-for="page in pages"
        @click="pageCmp = page.cmp"
        :key="page.id"
    >{{ page.name }}</button>

    <!-- 动态组件就是写一个component标签，特性is是展示的组件名 -->
    <component :is="pageCmp"></component>
</div>
```
```js
Vue.component('base-post', {
    data () {
        return {
            postCmp: '',
            posts: [
                { title: "标题1", content: { template: `<div>内容1</div>`}, id: 11}, 
                { title: "标题2", content: { template: `<div>内容2</div>`}, id: 12}, 
                { title: "标题3", content: { template: `<div>内容3</div>`}, id: 13}, 
            ],
        }
    },
    mounted () {
        this.postCmp = this.posts[0].content;
    },
    template: `
        <div>
            <button
                v-for="post in posts"
                @click="postCmp = post.content"
                :key="post.id"
            >{{ post.title }}</button>
            <component :is="postCmp"></component>
        </div>
    `
});

Vue.component('base-more', {
    template: `<div>更多内容</div>`
});

const vm = new Vue({
    el: '#app',
    data: {
        pages: [
            { name: '博客', cmp: 'base-post', id: 0},
            { name: '更多', cmp: 'base-more', id: 1}
        ],
        pageCmp: 'base-post'
    },
});
```

通过上面方法，我们可以实现组件间的切换。并且**每一次切换标签都会创建一个新的组件实例**。
一般来说，重新创建动态组件在更多情况下是非常有用的。但如果希望那些标签的组件实例能够在它们第一次被创建的时候缓存下来从而节约性能，该怎么做呢？

为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将动态组件包裹起来。

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
    <component :is="pageCmp"></component>
</keep-alive>
```
<font color=#ff4500>注意：</font>`<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项设置，还是局部/全局注册组件时设置。

2. **keep-alive**

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

3. **activated() & deactivated()**

当组件在 `<keep-alive>` 内被切换，它的 `activated()` 和 `deactivated()` 这两个独有的生命周期钩子函数将会被对应执行。

- activated()：keep-alive组件激活时调用。
- deactivated(): keep-alive组件停用时调用。

## 10.10 组件_处理边界情况

> 接下来我们要学习的都是和处理边界情况有关的功能，即一些需要对 Vue 的规则做一些小调整的特殊情况。
> <font color=#ff4500>注意：</font>这些功能都是有劣势或危险场景的。

1. **访问元素 & 组件**

在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过在一些情况下也需要做这些事情。

1.1 访问根实例

在每个子组件中，可以通过 `$root` 访问根实例。所有的子组件都可以将根实例作为一个全局store来访问或使用。

```js
// Vue 根实例
const vm = new Vue({
    data: {
        foo: 1
    },
    computed: {
        bar () { /* ... */ }
    },
    methods: {
        baz () { /* ... */ }
    }
});
```
```js
// 获取根组件的数据
this.$root.foo;

// 向根组件写入数据
this.$root.foo = 2;

// 访问根组件的计算属性
this.$root.bar;

// 调用根组件的方法
this.$root.baz();
```

在demo或在有少量组件的小型应用中使用是非常方便的。但是在大型应用里使用就会很复杂了。所以我们还是要用 `Vuex` 来管理应用的状态。


1.2 访问父组件实例

- 基本用法

在每个子组件中，可以通过 `$parent` 访问父组件实例。这可以用来替代将父组件数据以 prop 的方式传入子组件的方式。

```html
<cmp-parent>
    <cmp-a></cmp-a>
</cmp-parent>
```

若 `cmp-parent` 的所有子元素都需要访问它自身的 share 属性。在这种情况下，子组件可以通过 `this.$parent.share` 的方式访问到 share。

- 使用 `$parent` 访问父实例数据的问题

如果我们在 `cmp-a` 中嵌套一个子组件 `cmp-b`。那么在 `cmp-b` 组件中去访问 share 时，需要先查看其父组件中是否存在share，如果不存在，则在向上一级查找。

```html
<cmp-parent>
    <cmp-a>
        <cmp-b></cmp-b>
    </cmp-a>
</cmp-parent>
```
```js
var share = this.$parent.share || this.$parent.$parent.share;
```

这样做，很快组件就会失控：触达父级组件会使应用更难调试和理解。尤其是当变更父组件数据时，过一段时间后，很难找出变更是从哪里发起的。

- 上述问题的解决方法：使用依赖注入解决。

在上面的例子中，利用 `$parent` 没有办法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：`provide` 和 `inject`。

provide 选项允许我们指定想要提供给后代组件的数据/方法。然后在任何后代组件中，我们都可以使用 inject 选项来接受指定想要添加在实例上的属性。

```html
<cmp-parent>
    <cmp-a>
        <cmp-b></cmp-b>
    </cmp-a>
</cmp-parent>
```
```js
Vue.component('cmp-parent', {
    provide () {
        return {
            share: this.share,  //提供当前组件的share数据进行共享。
        }
    },
    data () {
        return {
            share: 'share',
        }
    },
    template: `<div>cmp-parent</div>`
});

Vue.component('cmp-a', {
    inject: ['share'],  //当前组件接收父组件的share数据进行使用。
    template: `<div>{{ share }}</div>`
});
```

相比 `$parent` 来说，这个用法可以让我们在任意后代组件中访问 share，而不需要暴露整个 cmp-parent 实例。这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 props 一样。

实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：
- 祖先组件不需要知道哪些后代组件使用它提供的属性
- 后代组件不需要知道被注入的属性来自哪里

  然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的属性是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 $root做这件事都是不够好的。如果你想要共享的这个属性是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 Vuex 这样真正的状态管理方案了。
<br>

1.3 访问子组件实例或子元素

尽管存在 prop 和事件，但是有时候我们仍可能需要在JS里直接访问一个子组件或者指定DOM元素。那么此时，我们可以通过 `ref` 特性为子组件赋予一个ID引用：

- 访问一个子组件

通过 `this.$refs.cmp` 来访问 `<my-cmp>` 实例。

```html
<my-cmp ref="cmp"></my-cmp>
```
```js
Vue.component('my-cmp', {
    data() {
        return {
            share: 'yuyu',
        }
    },
    template: `<div>cmp-parent</div>`
});

const vm = new Vue({
    el: '#app',
});

let res = vm.$refs.cmp.share; //yuyu
```

- 访问指定DOM元素

通过 `this.$refs.input1` 来访问到该 DOM 元素。

```html
<div id="app">
    <input ref="input1" />
</div>
```
```js
const vm = new Vue({
    el: '#app',
});

let res = vm.$refs.input1;
```

当 ref 特性和 v-for 一起使用时，得到的引用将会是一个包含了对应数据源的这些子组件的数组。

```html
<div id="app">
    <input ref="input1" v-for="per in person" :key=per.id/>
</div>
```
```js
const vm = new Vue({
    el: '#app',
    data: {
        person: [
            {id: 0, name: yu},
            {id: 1, name: yuwe},
            {id: 2, name: yurge},
        ]
    }
});

let res = vm.$refs.input1[0];
```

<font color=#ff4500>注意：</font>`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。应该避免在模板或计算属性中访问 `$refs`。


2. **程序化的事件侦听器**

除了 `v-on` 和 `$emit()` 外， Vue 实例在其事件接口中还提供了其它的方法。我们可以：

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 侦听一次事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

这几个方法一般不会被用到，但当需要在一个组件实例上手动侦听事件时，他们是可以派的上用场的。

例如，有时我们会在组件中集成第三方库：

```js
Vue.component('my-cmp', {
    // 一次性将这个日期选择器附加到一个输入框上
    // 它会被挂载到 DOM 上。
    mounted () {
        // Pikaday 是一个第三方日期选择器的库
        this.picker = new Pikaday({
            field: this.$refs.input,
            format: 'YYYY-MM-DD',
        })
    },
    // 在组件被销毁之前，
    // 也销毁这个日期选择器。
    beforeDestroy () {
        this.picked.destroy();
    },
    template: `
        <div>
            <input type="text" ref="input" />
            <button @click="$destroy()">销毁组件</button>
        </div>`,
});
```

使用上面的方法，有两个潜在的问题：
- 它需要在这个组件实例中保存这个 picker，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。

所有，我们可以通过程序化的侦听器解决这两个问题：
```js
Vue.component('my-cmp', {
  mounted () {
    var picker = new Pikaday({
      field: this.$refs.input,
      format: 'YYYY-MM-DD',
    })
    this.$once('hook:beforeDestroy', () => {
      picker.destroy();
    })
  },
  template: `
    <div>
      <input type="text" ref="input" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
使用了这个策略，我们还可以让多个输入框元素使用不同的pikaday：
```js
Vue.component('my-cmp', {
  mounted () {
    this.datePicker('inputA');
    this.datePicker('inputB');
  },
  methods: {
    datePicker (refName) {
      var picker = new Pikaday({
        field: this.$refs[refName],
        format: 'YYYY-MM-DD',
      })
      this.$once('hook:beforeDestroy', () => {
        picker.destroy();
      })
    },
  },
  template: `
    <div>
      <input type="text" ref="inputA" />
      <input type="text" ref="inputB" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
注意，即便如此，如果你发现自己不得不在单个组件里做很多建立和清理的工作，最好的方式通常还是创建更多的模块化组件，在这个例子中，我们推荐创建一个可复用的 ``<input-datepicker>`` 组件。

3. **循环引用**

3.1 递归组件

组件是可以在它们自己的模板中调用自身的，不过它们只能通过name选项来做这件事。

```js
name: 'my-cmp'
```
不过当使用 Vue.component 全局注册一个组件时，全局的ID会自动设置为该组件的 name 选项。

```js
Vue.component('my-cmp', { /** */});
```
稍有不慎，递归组件就可能导致无限循环：
```js
name: 'my-cmp',
template: `<div><my-cmp /></div>`
```
类似上述的组件将会导致“max stack size exceeded”错误，所以要确保递归调用是条件性的 (例如使用一个最终会得到 false 的 v-if)。

3.2 组件之间的循环引用

有时，在去构建一些组件时，会出现组件互为对方的后代/祖先:
```js
Vue.component('cmp-a', {
  template: `
    <div>
      <cmp-b></cmp-b>
    </div>
  `
})
```
```js
Vue.component('cmp-b', {
  template: `
    <div>
      <cmp-a></cmp-a>
    </div>
  `
})
```
此时，我们使用的是全局注册组件，并不会出现悖论，但是如果使用的为局部组件就会出现悖论。

但是即使用了全局注册组件，在使用webpack去导入组件时，也会出现一个错误：Failed to mount component: template or render function not defined。

模块系统发现它需要 A，但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，我们需要给模块系统一个点：“A 反正是需要 B 的，但是我们不需要先解析 B。”

```js
beforeCreate () {
  this.$options.components.CmpB = require('./tree-folder-contents.vue').default;
}
```
或者，在本地注册组件的时候，你可以使用 webpack 的异步 import：
```js
components: {
  CmpB: () => import('./tree-folder-contents.vue')
}
```

4. **模板定义的替代品(最好不要使用)**
> 模板定义是写在组件的 template 选项的代码。

4.1 内联模板
在使用组件时，写上特殊的特性：inline-template，就可以直接将里面的内容作为模板而不是被分发的内容（插槽）。

```html
<my-cmp inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-cmp>
```

不过，inline-template 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 ``<template>`` 元素来定义模板。

4.2 X-Template
另一个定义模板的方式是在一个 ``<script>`` 元素中，并为其带上 text/x-template 的类型，然后通过一个 id 将模板引用过去。例如：
```html
<script 
  type="text/x-template" 
  id="hello-world-template"
>
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开。

5. **控制更新**

5.1 强制更新
当 更改了某个数据，页面未重新渲染时，可以调用 \$forceUpdate 来做一次强制更新。

但是在做强制更新前，需要留意数组或对象的变更检测注意事项，99.9%的情况，都是在某个地方做错了事，如果做了上述检查，仍未发现问题，那么可以通过 \$forceUpdate来更新。

5.2 通过v-once创建低开销的静态组件
渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，就像这样：
```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```
试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 v-once 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。

## 10.11 组件_通信

> 通信就是组件之间传递数据

1. **实现双向数据通信**

- v-model
- v-bind.sync

2. **实现单向数据通信**

- `prop`

>推荐使用这种方式进行 **父-->子** 通信。

父组件通过特性传递数据给子组件。

- `$emit()`

> 推荐使用这种方式进行 **子-->父** 通信。

子组件触发事件，从而传递数据给父组件。

- `$attrs`

> 使用这种方式进行 **祖先-->子孙** 通信。

祖先组件传递数据给子孙组件时，可以利用 `$attrs` 传递。小型项目可以使用 `$attrs` 进行数据传递，中大型项目不推荐，数据流会变的难于理解。
`$attrs` 的真正目的是撰写基础组件，将非Prop特性赋予某些 DOM 元素。

- `$listeners`

可以在子孙组件中执行祖先组件的函数，从而实现数据传递。小型项目可以使用 `$listeners` 进行数据传递，中大型项目不推荐，数据流会变的难于理解。
`$listeners` 的真正目的是将所有的事件监听器指向这个组件的某个特定的子元素。

- `$root`

可以在子组件中访问根实例的数据。
对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

- `$parent`

可以在子组件中访问父实例的数据。
对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

- `$children`

可以在父组件中访问子实例的数据。
对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

- `$refs`

可以在父组件中访问子实例的数据。

`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的，适用于demo或小型项目。

- `provide() & inject()`

祖先组件提供数据(provide)，子孙组件按需注入(inject)。
会将组件的阻止方式，耦合在一起，从而使组件重构困难，难以维护。不推荐在中大型项目中使用，适用于一些小组件的编写。

- `eventBus(事件总线)`

适用于**兄弟组件**之间通信，以下代码是自己写的。
仅针对于小型项目。中大型项目使用时，会造成代码混乱不易维护。

```js
Vue.prototype.$bus = new Vue();
```
```js
Vue.component('cmp-a', {
    data () {
        return {
            a: 'a'
        }
    },
    methods: {
        onClick () {
            this.$bus.$on('click', this.a)
        }
    },
    template: `
        <div>
            <button @click="onClick">点击</button>
        </div>
    `,
})
```
```js
Vue.component('cmp-a', {
    mounted () {
        this.$bus.$on('click', data => {
            console.log(data);
        })
    },
    template: `
        <div>b</div>
    `,
})
```


-. `Vuex`

状态管理，中大型项目时强烈推荐使用此种方式。



# 11. 混入

> 1.混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
> 2.一个混入对象可以包含任意**组件选项**。当组件使用混入对象时，所有混入对象的选项将被 **混合** 进入该组件本身的选项。

1. **局部混入**

当组件和混入对象含有同名选项时，这些选项会以恰当的方式进行 “合并”。

- 合并数据，以组件数据优先。

```js
var mixin = {
    data () {
        return {
        msg: 'hello',
        }
    }
};

new Vue({
    el: '#app',
    mixins: [mixin],
    data: {
        msg: 'goodbye',
    },
    created: function () {
        console.log(this.msg);
    }
});
```

- 合并钩子函数，将合并为一个数组。先调用混入对象的钩子，再调用组件自身钩子。

```js
var mixin = {
    created () {
        console.log('混入对象钩子');
    }
}

new Vue({
    el: '#app',
    mixins: [mixin],
    created () {
        console.log('组件钩子');
    }
});
```

- 合并值为对象的选项，如 methods、components 等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

2. **全局混入**

>以上都是局部注册时使用混入，混入也可以进行全局注册，但是谨慎使用全局混入。因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。

最好配合**自定义选项**一起使用，这可以为自定义选项注入处理逻辑。配合了自定义选项，虽然依旧会混入每个单独创建的 Vue 实例。但是如果该实例没有此自定义选项，mixin 中的内容就不会执行。

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
    created () {
        var myOption = this.$options.myOption
        if (myOption) { // 如果实例没有自定义选项myOption，mixin中的内容就不会执行
            console.log(myOption);
        }
    }
});

new Vue({
  myOption: 'hello!'
});
```

# 12. 自定义指令

> 组件和自定义指令都是代码复用。不过前者是复用一个结构，一个样式，一个逻辑。后者是针对dom的底层操作定义一个指令

1. **简介**

我们可以自己写一个自定义指令去操作DOM元素，以达到代码复用的目的。注意，在 Vue 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

全局注册指令：
```js
Vue.directive('focus', {/** */});
```

局部注册指令：
```js
const vm = new Vue({
    el: '#app',
    directives: {
        focus: {/** */}
    }
});
```

使用：
```js 
<input v-focus></input>
```

例如，写一个自动聚焦的输入框：
```js
Vue.directive('focus', {
    // 当被绑定的元素插入到DOM时执行
    inserted: function (el) {
        el.focus();
    }
});
```
此时，在input元素上使用 v-focus 指令就可以实现自动聚焦了。

2. **钩子函数**

自定义指令对象提供了钩子函数供我们使用，这些钩子函数都为可选。

- `bind()`

只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- `inserted()`

被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)。

- `update()`

所在组件的 VNode(虚拟节点)更新时调用，**但是可能发生在其子 VNode 更新之前**。

补充：虚拟节点是一个对象：
```js
// VNode
{
    p:{
        className:'xxx',
        id:'xx',
        children:[
            {},
            {},
            {}
        ]
    }
}
```

- `componentUpdated()`

指令所在组件的 VNode **及其子VNode** 全部更新后调用。

- `unbind()`

只调用一次，指令与元素解绑时调用(被绑定的Dom元素被Vue移除)。

3. **钩子函数参数** 

- `el`: 指令所绑定的元素，可以用来直接操作DOM。
- `binding`：对象，包含以下属性：
    - name：指令名，不包括 v- 前缀。
    - value：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 2。
    - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    - expression：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 "1 + 1"。
    - arg：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 "foo"。
    - modifiers：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 { foo: true, bar: true }。
- `vnode`：Vue 编译生成的虚拟节点。其中的context属性就是Vue的实例。
- `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

```html
<my-cmp v-focus></my-cmp>
```
```js
Vue.directive('focus', {
    // ..
    bind(el, binding, vnode) {
        console.log(el);
        console.log(binding.name); //focus
        console.log(binding.value);
        console.log(binding.expression);
        console.log(binding.arg);
        console.log(binding.modifiers);
        console.log(vnode.context);
    }
});
```

## 练习

练习1. 模拟 v-show

```js
// 绑定的值为false，display为none。值为true，display为""
Vue.directive('myshow', {
    bind (el, binding, vnode, oldVnode) {
        var display = binding.value ? '' : 'none';
        el.style.display = display;
    },
    update (el, binding, vnode, oldVnode) {
        var display = binding.value ? '' : 'none';
        el.style.display = display;
    }
});
```

练习2. 模拟 v-model

```js
// 1. 通过绑定的数据，给元素设置value
// 2. 当触发input事件时，去更改数据的值
// 3. 更改数据后，同步input的value值
Vue.directive('mymodel', {
    bind (el, binding, vnode) {
        const vm = vnode.context;
        const { value, expression } = binding;
        el.value = value;

        el.oninput = function (e) {
            const inputVal = el.value;
            vm[expression] = inputVal;
        }
    },
    update (el, binding) {
        const { value } = binding;
        el.value = value;
    }
})
```

练习3. 写一个 v-slice (截取文本框)

```js
Vue.directive('slice', {
    bind (el, binding, vnode) {
        const vm = vnode.context;
        let { value, expression, arg, modifiers } = binding;

        if(modifiers.number) {
            value = value.replace(/[^0-9]/g, '');
        }

        el.value = value.slice(0, arg);
        vm[expression] = value.slice(0, arg);

        el.oninput = function (e) {
            let inputVal = el.value;

            if(modifiers.number) {
                inputVal = inputVal.replace(/[^0-9]/g, '');
            }

            el.value = inputVal.slice(0, arg);
            vm[expression] = inputVal.slice(0, arg);
        }
    },
    update (el, binding, vnode) {
        const vm = vnode.context;
        let { value, arg, expression, modifiers } = binding;

        if(modifiers.number) {
            value = value.replace(/[^0-9]/g, '');
        }

        el.value = value.slice(0, arg);
        vm[expression] = value.slice(0, arg);
    }
});
```

4. **动态指令参数**

指令的参数可以是动态的。如：`v-directive:[arguments]="value`

重写 v-slice：只需要将 input 事件写到update函数内即可。

```js
Vue.directive('slice', {
    bind (el, binding, vnode) {
        const vm = vnode.context;
        let { value, expression, arg, modifiers } = binding;

        if(modifiers.number) {
        value = value.replace(/[^0-9]/g, '');
        }

        el.value = value.slice(0, arg);
        vm[expression] = value.slice(0, arg);

        el.oninput = function (e) {
        let inputVal = el.value;

        if(modifiers.number) {
            inputVal = inputVal.replace(/[^0-9]/g, '');
        }

        el.value = inputVal.slice(0, arg);
        vm[expression] = inputVal.slice(0, arg);
        }
    },
    update (el, binding, vnode) {
        const vm = vnode.context;
        let { value, arg, expression, modifiers } = binding;
        
        if(modifiers.number) {
            value = value.replace(/[^0-9]/g, '');
        }

        el.value = value.slice(0, arg);
        vm[expression] = value.slice(0, arg);

        // 添加到下面
        el.oninput = function (e) {
            let inputVal = el.value;

            if(modifiers.number) {
                inputVal = inputVal.replace(/[^0-9]/g, '');
            }

            el.value = inputVal.slice(0, arg);
            vm[expression] = inputVal.slice(0, arg);
        }
    },
})
```

5. **函数简写**

当想在 bind() 和 update() 中触发相同行为，而不关心其他钩子时，`Vue.directive()` 的参数2可以写成函数的形式。

例1：
```js
Vue.directive('myshow', (el, binding) => {
    const { value } = binding;
    const display = value ? '' : 'none';
    el.style.display = display;
});
```

例2：
```js
Vue.directive('slice', (el, binding, vnode) => {
    const vm = vnode.context;
    let { value, expression, arg, modifiers } = binding;

    if(modifiers.number) {
        value = value.replace(/[^0-9]/g, '');
    }

    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
        let inputVal = el.value;
        if(modifiers.number) {
            inputVal = inputVal.replace(/[^0-9]/g, '');
        }
        el.value = inputVal.slice(0, arg);
        vm[expression] = inputVal.slice(0, arg);
    }
});
```

6. **对象字面量**

如果自定义指令需要多个值，可以传入一个 JS 对象字面量。指令函数能够接受所有合法的 JS 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
Vue.directive('demo', function (el, binding) {
    console.log(binding.value.color) // => "white"
    console.log(binding.value.text)  // => "hello!"
});
```


# 13. 过滤器

自定义过滤器，用于一些常见的文本格式化。

过滤器可用在两个地方：

- 双花括号插值
- v-bind 表达式

添加在JS表达式的尾部，由“管道”符号表示:

```html
<!-- 在双花括号中 -->
{{ message | filter }}

<!-- 在 v-bind 中 -->
<div v-bind:id="id | filter"></div>
```

1. **定义过滤器**

> 定义完必须要返回一个值。

全局过滤器：
```js
Vue.filter('filter', val => {
    if(!val) { return };    // 最好加上这句，使代码更健壮
    return xxx;
});
```

局部过滤器：
```js
filter () {
    if(!val) { return };
    return xxx;
}
```


2. **参数**

当过滤器形式为 ` msg | filter ` 时，filter过滤器接收一个参数，参数为`msg`。

当过滤器形式为 ` msg | filter('a') `时，filter过滤器接收两个参数，参数为`msg, 'a'`

3. **过滤器串联**

```js
{{ msg | filterA | filterB }}
``` 
在这个例子中，filterA的参数为`msg`，filterB的参数为filterA。

## 练习

1. **首字母大写**

```html
{{ content | capitalize }}
```
```js
Vue.filter('capitalize', value => {
    if(!value) { return };
    return value.charAt(0).toUpperCase() + value.slice(1);
})
```

2. **数字中间加上逗号**

```html
{{ money | toMoney }}
```
```js
Vue.filter('toMoney', value => {
    if(!value) { return };
    return value.toLocaleString();
});
```

3. **数字添加文字"万"**

```html
{{ likes | addWord }}
```
```js
Vue.filter('addWord', value => {
    if(!value) { return };

    if(value > 10000) {
        return ( value / 10000).toFixed(1) + '万';
    }
    return value;
});
```


# 14. 安装脚手架 (3.x版本)

> 1.之前都是使用 `webpack` 搭建框架，但那样写起来比较麻烦。
> 2.Vue官方提供了一个现成的框架，即使用 `@vue/cli` 自动初始化一个脚手架。
> 3.与 `webpack` 一样，`@vue/cli` 也是运行在node环境中。

## 14.1 安装 @vue/cli

> node 版本：`> 8.9`，推荐 `8.11.0 +`。

1. **卸载旧版本 @vue/cli (1.x 或 2.x)**

```shell
npm uninstall vue-cli -g
# OR
yarn global remove vue-cli
```

2. **安装新版本 @vue/cli**

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

3. **检查 @vue/cli 版本**

```shell
vue --version
```

## 14.2 如何使用 @vue/cli(3.x) 构建项目

1. **构建方法**

- 方法1：通过命令行

```js
1. 创建项目：`vue create 项目名(小写)`
2. 配置一系列选项：
  2.1 选择预设，即项目依赖的包，包可以选默认的，也可以自己配置。
  2.2 选择各个包的配置是单独一个文件，还是放一起
  2.3 选择是否要保存预设，要的话就取个名字。
3. 回车，然后开始自动安装项目中所有依赖的包。
```

- 方法2：使用ui页面构建

```js
1. 在命令行写：vue ui
2. 然后会自动在浏览器打开一个页面，然后可以构建项目。
```

2. **运行项目**

```shell
# 在项目路径下运行下面的命令
npm run serve
```


## 14.3 如何使用@vue/cli(2.x) 构建项目

- 方法1：卸载3.x，再安装2.x

```shell
# 安装2.x
npm install -g vue-cli
```

```js
// 使用
1. 创建项目：`vue init 模板名称(webpack) 项目名称`
2. 配置信息:
  2.1 项目的name，description，author，
  2.2 vue build(构建时是否压缩)，
  2.3 是否下载vue-router，
  2.4 是否用 ESLint 规范代码，用的话选一个配置，
  2.5 是否构建测试项目，
  2.6 是否构建测试目录，用什么下载依赖(npm)，
3. 然后开始自动安装项目中所有依赖的包。

// 在项目路径下运行下面的命令：
npm run dev
```

- 方法2：不卸载3.x，也可以使用2.x

```shell
# 在3.x 和 2.x 之间搭个桥梁，全局安装一个桥接工具
npm install -g @vue/cli-init

# 创建项目
vue init webpack my-project
```

## 14.4 快速原型开发

这个一般只有学习才会用，真正开发是不用的。只写了几个vue文件，可以使用。

- 安装：
```js
npm install -g @vue/cli-service-global
# OR
yarn global add @vue/cli-service-global
```

- 运行vue文件：
```js
// 1.在命令行输入以下命令：
vue serve vue文件名

// 2.在浏览器打开出现的网址：
// - Local:   http://localhost:8080/
// - Network: http://192.168.1.3:8080/
```

## 练习_树形组件

数据：

```js
data: [
  {
    label: "一级 1",
    children: [
      {
        label: "二级 1-1",
        children: [
          {
            label: "三级 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 2",
    children: [
      {
        label: "二级 2-1",
        children: [
          {
            label: "三级 2-1-1"
          }
        ]
      },
      {
        label: "二级 2-2",
        children: [
          {
            label: "三级 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 3",
    children: [
      {
        label: "二级 3-1",
        children: [
          {
            label: "三级 3-1-1"
          }
        ]
      },
      {
        label: "二级 3-2",
        children: [
          {
            label: "三级 3-2-1"
          }
        ]
      }
    ]
  }
]
```


## 14.5 安装vscode插件：Vetur。

> 用于高亮 `.vue` 文件代码。

1. **认识 .vue 文件**

- 一个vue文件就是一个组件。
- 我们使用组件就是为了复用组件里面的结构、样式、行为，即html、css、js。
- 一般将html代码放在 `template` 标签内，将js代码放在 `script` 标签内，将css放在 `style` 标签内。

2. **如何写一个vue文件？**

- 组件原来写法：

```js
Vue.component('mycmp', {
    data () {
        return {
            msg: 'hello world',
        }
    },
    template: `
        <div>{{msg}}</div>
    `
});
```

- 将上面的组件写到 `mycmp.vue` 文件中:

```js
<template>
    <div>{{msg}}</div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'hello world',
        }
    }
}
</script>
```

3. **如何在 .vue 文件里使用其他 .vue 文件？**

```js
<template>
    <div>{{msg}}</div>
    <base-son />
</template>

<script>
import baseSon from './Son';    // 导入其他vue文件，导入的结果在局部组件中使用。
export default {
    data () {
        return {
            msg: 'hello world',
        }
    },
    components: {
        baseSon,
    }
}
</script>
```

<font color=#ff4500>注意：</font>在style标签上写scoped特性，就表示这个样式只作用在自身的vue文件。


4. **运行.vue文件**

在 .vue 文件目录下，运行命令：`vue serve 文件名`。


# 15. 渲染函数 (了解)

## 15.1 回顾 Vue 的生命周期

- 先看有没有挂载：el选项 或者 $mount
- 再看有没有template 或者 el 的 outHTML
- 将template 或者 el的outHTML 使用编译器进行编译，然后放到render函数中

所以说，`render()` 里的代码就是编译后的 template 或 el的outHTML。

![|700](https://developer.duyiedu.com/myVue/lifecycle1.png) 


> 1. Vue这个框架分为很多种，其中有两个：完整版和运行时版。运行时版相对于完整版少了编译器，所以体积小了30%。
> 2. 如果使用 render() 函数来渲染页面，就不需要编译器。如果使用el或者template渲染页面，那么需要编译器。
> 3. 页面渲染的优先级：render函数 > template选项 > el选项。<font color=#ff4500>注意：</font>在 `.vue` 文件中，template标签的优先级是高于 render() 函数的。


## 15.2 render() 的基本使用

`render()` 函数是vue内部的函数，但我们可以调用它。因为：
- 使用render()的话，我们可以使用vue的运行时版，体积更小，效率更高。
- 相对于template，render()有更好的JS编程能力。渲染函数比模板更接近于编译器。

例：生成h1到h6的标题。

使用template：
```html
<template>
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
    <h5 v-else-if="level === 5">
        <slot></slot>
    </h5>
    <h6 v-else>
        <slot></slot>
    </h6>
</template>
```

使用渲染函数render()：
```js
props: {
    level: {
        type: Number,
        required: true
    }
},

// render函数里的this指向：.vue文件自身的组件实例。
render: function (createElement) {
    // createElement的第一个参数可以是一个组件，也可以是标签名
    return createElement(
        'h' + this.level,     // 标签名称
        this.$slots.default   // 子节点数组
    )
},
```
比较以上两种写法，会发现render()有更好的JS编程能力。


## 15.3 节点、树、以及虚拟DOM

1. **在深入渲染函数之前，先来了解一些浏览器的工作原理。**

例如下面这段HTML。当浏览器读到这些代码时，它会建立一个**DOM节点树** 来保持追踪所有内容。就像你画一张家谱树来追踪家庭成员一样。
```html
<div>
    <h1>My title</h1>
    Some text content
    <!-- TODO: Add tagline -->
</div>
```
以上 HTML 对应的DOM节点树如下图所示：

![avatar](https://cn.vuejs.org/images/dom-tree.png)


每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点。

高效地更新所有这些节点是比较困难的，不过幸运的是，我们不需要手动完成这个工作。只需要告诉Vue希望页面上的HTML是什么，例如在模板中：

```html
<h1>{{ blogTitle }}</h1>
```
或者是在一个渲染函数中：
```js
render: function (createElement) {
    return createElement('h1', this.blogTitle)
}
```
在这两种情况下，Vue 都会自动保持页面的更新，即便 `blogTitle` 发生了改变。

2. **Vue 如何自动保持页面的更新？**

Vue通过建立一个**虚拟DOM**来追踪自己要如何改变真实DOM。

例如：下面代码的 createElement() 会返回什么呢？

```js
return createElement('h1', this.blogTitle);
```

它不会返回一个实际的DOM元素，更准确的名字是：`createNodeDescription`。因为它所包含的信息会告诉 `Vue`：页面上需要渲染什么样的节点，包括其子节点的描述信息。
- 我们把这样的节点称为**虚拟节点** (virtual node)，也常简写它为 `VNode`。
- **虚拟DOM** 是我们对由Vue组件树建立起来的整个 `VNode` 树的称呼。


## 15.4 createElement() 函数的使用

1. **createElement() 接收的参数**

```js
// 标签名可以是一个组件，也可以字符串标签
// 数据对象见下。
// 子级虚拟节点可以是字符串，也可以是数组。如果是字符串，就会被当做字符串文本(子节点)直接放入第一个参数的标签里。如果是数组，就是不止一个子节点。子节点可以用createElement创建，也可以是字符串文本。
createElement(标签名(必需), 与模板中属性对应的数据对象(可选), 子级虚拟节点(可选));
```

2. **深入数据对象—— createElement() 的参数2**

```js
{
    // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
    class: {
        foo: true,
        bar: false
    },
    // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
    style: {
        color: 'red',
        fontSize: '14px',
    },
    // 普通的 HTML attribute
    attrs: {
        id: 'foo',
    },
    // 组件 prop
    props: {
        myProp: 'bar',
    },
    // DOM属性
    domProps: {
        innerHTML: 'baz',
    },
    // 事件监听器，不支持如“v-on:keyup.enter”这样的修饰器
    on: {
        click: this.onClick
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
    nativeOn: {
        click: this.nativeClickHandler
    },
    // 自定义指令。注意，无法对 `binding` 中的 `oldValue`赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
        {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
            bar: true
        }
        }
    ],
    // 其它特殊顶层属性
    key: 'myKey',
    ref: 'myRef',
    // 如果在渲染函数中给多个元素都应用了相同的 ref 名，那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
    // 作用域插槽，格式为：{ name: props => VNode | Array<VNode> }
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    scopedSlots: {
        default: props => createElement('span', props.text)
    },
}
```

## 15.5 使用 JavaScript 代替模板功能

1. **v-if 和 v-for**

```html
<ul v-if="items.length">
    <li v-for="item in items">{{ item }}</li>
</ul>
<p v-else>No items found.</p>
```

使用 render() 替代：
```js
props: ['items'],
render (createElement) {
    if(items.length) {
        return createElement('ul', this.items.map(item => createElement('li', item)))
    } else {
        return createElement('p', 'No items found');
    }
}
```

2. **v-model**

```html
<input v-model="value" />
```

使用 render() 替代：

```js
data () {
    return {
        value: 'test',
    }
},
render (createElement) {
    const self = this;
    return createElement('input', {
        attrs: {
            value: self.value
        },
        on: {
            input (e) {
                self.value = e.target.value;
            }
        },
    });
},
```

3. **事件 & 按键修饰符**

- 对于 `.passive`、`.capture` 和 `.once` 这些事件修饰符, Vue 提供了相应的前缀可以用于 on。

修饰符 | 前缀  
:-: | :-:  
.passive | & 
.capture | ! 
.once | ~ 
.capture.once 或 .once.capture | ~! 

例如：

```js
on: {
    '!click': this.doThisInCapturingMode,
    '~keyup': this.doThisOnce,
    '~!mouseover': this.doThisOnceInCapturingMode
}
```

- 对于所有其它的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法。

修饰符 | 处理函数中的等价操作  
:-: | :-:  
`.stop` | `event.stopPropagation()`
`.prevent` | `event.preventDefault()`
`.self` | `if (event.target !== event.currentTarget) return;`
按键：`.enter`，`.13` | `if (event.keyCode !== 13) return;` <br> 对于别的按键修饰符来说，可将 13 改为另一个按键码
修饰键：`.ctrl`，`.alt`，`.shift`，`.meta` | `if (!event.ctrlKey) return;` (将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)


4. **插槽**

- 可以通过 `this.$slots` 访问静态插槽的内容，每个插槽都是一个 VNode 数组。

```html
<div>
    <slot></slot>
</div>
```

使用 render() 替代：

```js
render: function (createElement) {
    return createElement('div', this.$slots.default)
}
```

- 也可以通过 `this.$scopedSlots` 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数。

```html
<div>
    <slot :text="msg"></slot>
</div>
```

使用 render() 替代：
```js
data() {
    return {
        msg: 'hello world',
    }
},
render: function (createElement) {
    return createElement('div', [
        this.$scopedSlots.default({
            text: this.msg
        });
    ]);
}
```

- 如果想使用 render() 向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 `scopedSlots` 字段。

```html
<div>
    <base-slot v-slot="slotProps">
        {{ slotProps.text }}
    </base-slot>
</div>
```

使用 render() 替代：
```js
render: function (createElement) {
    return createElement('div', [
        createElement('base-slot', {
            // 在数据对象中传递 `scopedSlots`
            // 格式为 { name: props => VNode | Array<VNode> }
            scopedSlots: {
                default: function (props) {
                    return createElement('span', props.text)
                }
            }
        })
    ])
}
```

# 16. JSX 语法 (了解)

> 1. JSX === JS + XML(html)
> 2. 只有在 Vue 中写了 render() 函数才会用 JSX 语法。但在 React 中会大量使用。
> 3. 在 JSX 语法中，所有html元素放在 `<>` 里面，所有js代码放在 `{}` 里面。

## 16.1 为什么使用 JSX 语法

由于使用 render() 渲染元素，要写的处理函数太过于复杂且不利于阅读。所以我们在 Vue 中使用 `JSX` 语法，它可以让我们回到更接近模板的语法上。

- 原来的写法：

```js
render: function (createElement) {
    return createElement('h1', "这是一个标题");
},
```

- JSX 的写法：

```js
render () {
    //()是为了换行还能显示标签元素
    return (
        <h1>这是一个标题</h1>
    )
}
```

## 16.2 JSX 语法的使用

1. **插值**

```js
<div>{ this.value }</div>
```

2. **指令**

在JSX中，一些指令并不存在，所以我们可以换一种方式来处理：

- v-text

```html
<div domPropsTextContent="<p>i am a p</p>"></div>
```

- v-html

```html
<div domPropsInnerHTML="<p>i am a p</p>"></div>
```

- v-show

JSX 支持 v-show 指令：

```html
<div v-show={this.show}></div>
```

- v-if 

如果判断的条件比较复杂，或者判断的情况比较多，我们可以写在函数里。
```html
<!-- v-if -->
render () {
    return (
        { true && <div>div</div> }
        { true ? <div>div</div> : <span>span</span> }
        { this.vIf() }
    )
}

methods: {
    vIf () {
        if(this.num === 1) {
            return <div>1</div>
        } else if(this.num === 2) {
            return <span>2</span>
        } else {
            return <p>{ this.num }</p>
        }
    }
}
```

- v-for

```html
{ [1, 2, 3].map(item => (<div key={item}>{ item }</div>))}
```

- v-on

```html
<button onClick={this.handleClick}>点击事件</button>
<button on-click={this.handleClick}>点击事件</button>

<!-- 对应@click.native -->
<cmp-button nativeOnClick={this.handleClick}>原生点击事件</cmp-button>

<!-- 传递参数 -->
<button onClick={e => this.handleClick(this.id)}>触发点击事件时，传递参数</button>
```

- v-bind

```html
<input value={this.value} />
```

在JSX中可以直接使用class="xx"来指定样式类，内联样式可以直接写成style="xxx"
```html
<div class="a b" style="font-size: 12px;">Content</div>
<div class={{a: true, b: false}}>Content</div>
<div style={{color: 'red', fontSize: '14px'}}>Content</div>
```

- v-model

有相应的插件支持 v-model，所以可以直接使用：

```html
<input type="text" v-model={this.value} />
```

- v-slot

```html
<my-cmp>
    默认插槽
    <div slot="a">具名插槽 a</div>
</my-cmp>
```

- v-pre
- v-cloak
- v-once
以上三个指令，不常用，无替代方案。

3. **Ref**

```html
<div ref="xxx">xxx</div>
```

当遍历元素或组件时，如：
```js
[1, 2, 3].map(item => <div ref="xx" key={ item }>{ item }</div>)
```
会发现从 this.$refs.xxx 中获取的并不是期望的数组值，而是最后一个引用代表的元素。此时就需要将refInFor属性设置为true了：
```js
[1, 2, 3].map(item => <div ref="xx" refInFor={true} key={item}>{ item }</div>)
```

4. **自定义指令**

```js
render () {
    // 写法1
    return (
        <input v-splice={{value: this.value, modifiers: {number: true }}}/>
    )

    // 写法2
    const directives = [
        { 
        name: 'splice', 
        value: this.value,  
        modifiers: {number: true }
        }
    ];

    return (
        <div {...{ directives} }></div>
    )
}
```

5. **过滤器**

- 正常使用过滤器

```html
<div>{{ msg | capitalize }}</div>
```

- 在 JSX 中使用过滤器

```html
<div>{ this.$options.filters('capitalize')(this.msg)}</div>
```


6. **插槽**

6.1 普通插槽

- 模板写法：

```html
<!-- my-cmp 组件内 -->
<div class="demo">
    <slot name="header"></slot>
    <slot></slot>
</div>
```

```html
<my-cmp>
    default
    <template v-slot:header>
        <div>header</div>
    </template>
</my-cmp>
```

- JSX 写法：

```html
<!-- my-cmp 组件内 -->
<div class="demo">
    { this.$slots.header }
    { this.$slots.default }
</div>
```

```html
<!-- 使用时 -->
<my-cmp>
    default
    <div slot="header">header</div>
</my-cmp>
```

6.2 作用域插槽

- 模板写法：

```html
<!-- 组件内 -->
<div class="demo">
    <slot :text="'HelloWorld'"></slot>
</div>
```

```html
<!-- 使用时 -->
<my-cmp v-slot="slotProps">
    {{ slotProps.text }}
</my-cmp>
```

- JSX写法：

```html
<!-- 组件内 -->
<div class="demo">
    { 
        this.$scopedSlots.default({
            text: 'HelloWorld',
        }) 
    }
</div>
```

```html
<!-- 使用时 -->
<div id="app">
    <base-demo { ...{scopedSlots: {default: props => props.text}} }></base-demo>
</div>
```

# 17. 函数式组件  (了解)

> 1. 当一个组件不需要状态（即响应式数据）、不需要任何生命周期场景、只接受一些 props 来显示组件时，我们可以将其标记为函数式组件。
> 2. 由于函数式组件只是函数，所以渲染开销会低很多。

## 17.1 函数式组件的基础

```js
functional: true,
```

1. **函数式组件的 props 选项**

在 `Vue 2.3.0 之前`的版本中，如果一个函数式组件想要接收 prop，则 props 选项必须存在。
在 `Vue 2.3.0 及以上` 的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。

2. **函数式组件的 this**

函数式组件没有状态，没有生命周期函数，也没有实例，组件里的 `this` 为 `undefined`。

为了弥补缺少的实例 (即`this`)，`render()` 函数提供第二个参数 context 作为上下文。context 包括如下字段：
- `props`：提供所有 prop 的对象
- `slots`: 一个函数，返回了包含所有插槽 (**非作用域**) 的对象
- `scopedSlots` (`Vue 2.6.0+`): 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- `parent`：对父组件的引用
- `listeners` (`Vue 2.3.0+`): 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是  data.on 的一个别名。
- `injections` (`Vue 2.3.0+`): 如果使用了 inject 选项，则该对象包含了应当被注入的属性。
- `children`: VNode 子节点的数组，包含了所有的**非作用域插槽**和**非具名插槽**。


## 17.2 slots() VS children

例1：
```html
<base-level :level="1" @click="handleClick">
    <template v-slot:header>
        <div>我是头部</div>
    </template>

    <div>div</div>
    <p>p</p>
    <template>template</template>
</base-level>
```

- slots() 的结果为：

```js
{
  default:[<div>div</div>, <p>p</p>, template],
  header: [<div>我是头部</div>]
}
```

- children的结果为：

```js
[<div>div</div>, <p>p</p>, template]
```

例2：

```html
<base-level :level="1" @click="handleClick">
    <template v-slot:header>
        <div>我是头部</div>
    </template>

    <template v-slot:default>
        <div>div</div>
    </template>

    <p>p</p>
    <template>template</template>
</base-level>
```

- slots() 的结果为：
```js
{
  default:[<div>div</div>],
  header: [<div>我是头部</div>]
}
```

- children的结果为：
```js
[<div>div</div>, <p>p</p>, template]
```



## 17.3 基于模板的函数式组件

在 `Vue 2.5.0 及以上` 版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：

```html
<template functional>
<!-- 写html代码 -->
</template>
```

# 18. 过渡

## 18.1 单元素过渡

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。如：通过**css样式**或**js**。

1. **单元素/组件的过渡**

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡
- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

2. **过渡的类名**

在进入/离开的过渡中，会有 6 个 class 切换。

<hr />

- v-enter：
  定义进入过渡的开始状态。
  在元素被插入之前生效，在元素被插入之后的下一帧移除。

- v-enter-active：
  定义进入过渡生效时的状态。
  在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
  这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

- v-enter-to: 
  定义进入过渡的结束状态(2.1.8+) 。
  在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

<hr />

- v-leave：
  定义离开过渡的开始状态。
  在离开过渡被触发时立刻生效，下一帧被移除。

- v-leave-active：
  定义离开过渡生效时的状态。
  在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。
  这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

- v-leave-to: 
  定义离开过渡的结束状态(2.1.8+) 。
  在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
<hr />

图示：
![过渡](https://cn.vuejs.org/images/transition.png)

3. **类名前缀**

- transition 无 name 特性
  类名前缀为 v-。

- transition 有 name 特性
  如 name 为 fade，则类名前缀为fade-。

4. **CSS 动画**

CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

5. **自定义过渡的类名**

通过在transition标签上，添加以下 attribute来自定义过渡类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

transition已经有name这个特性了，为什么还需要自定义类名呢？
因为我们一般不会自己写过渡，而是会使用其他第三方 CSS 动画库（如 Animate.css），所有自定义类名很有用。

Animate.css 官网地址：https://daneden.github.io/animate.css/
安装方式：``npm install animate.css --save``

6. **同时使用过渡和动画**

可使用 type 属性，来声明需要 Vue 监听的类型，type值可为 animation 或 transition 。设置谁，就以谁的时间为准。

当不设置type时，默认会取 transitioned 和 animationed 两者更长的为结束时刻。

7. **显性的过渡时间**

在一些情况下，Vue可以自动得出过渡效果的完成时机，从而对dom进行处理。

但是有些时候，我们会设置一系列的过渡效果。例如嵌套元素也有过渡动效，其过渡效果的时间长于父元素。此时我们可以设置duration属性，定制一个显性的过渡持续时间（以毫秒记）：

```html
<transition :duration="1000">...</transition>
```

也可以定制进入和移出的持续时间：
```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

注意：显性的过渡时间不会影响动画或过渡效果的时长。而是确定这些个class在dom元素身上呆的时长。

8. **初始渲染的过渡**

可以通过 ``appear`` attribute 设置节点在初始渲染的过渡。

和进入/离开过渡一样，同样也可以自定义 CSS 类名。如：
```js
appear-class="appear-enter"
appear-active-class="appear-enter-active"
appear-to-class="appear-enter-to"
```

9. **JavaScript 钩子**

可以在属性中声明 JavaScript 钩子:

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

- before-enter 动画入场前，可以在其中设置元素开始动画之前的起始样式
- enter 动画入场中，可以在其中写动画
- after-enter 动画完成后
- enter-cancelled 取消动画

对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

设置了 appear 特性的 transition 组件，也存在自定义 JavaScript 钩子：
```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

> 结合 Velocity.js

Velocity.js 官网地址：http://velocityjs.org/
安装方式: ``npm install velocity-animate``

## 18.2 多元素过渡

> 因为transition元素内部只能展示一个元素，当写多个元素时，是将这些元素切换展示，同时只能展示一个。

当切换展示的元素标签名相同时，需要给每一个元素设置不同的key值，否则Vue为了效率只会替换相同标签内部的内容。

```html
<transition>
  <div v-if="show" key="world">hello world</div>
  <div v-else key="shanshan">hello shanshan</div>
</transition>
```

也可以通过给同一个元素的key值设置不同的状态来替代 v-if 和 v-else。如：

```html
<transition>
  <div :key="keyName">hello {{ key Name}}</div>
</transition>
```

```js
keyName: 'world',
```

1. **过渡模式**
Vue提供一个一个 mode 特性，可以给多个元素过渡应用不同的模式，mode 的值可为：

- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

2. **多组件过渡**
我们可以使用动态组件切换展示不同的组件。当然也可以使用v-if和v-else。

## 18.3 列表过渡

不再是给一个元素添加过渡效果，而是真正给多个同时存在的元素添加过渡效果。

当想要给一个列表添加过渡动效时，我们可以使用 ``<transition-group>`` 组件。

该组件的特点：
- 不同于 ```<transition>```，它会以一个真实元素呈现：默认为一个 ``<span>``。你也可以通过 特性tag 更换为其他元素。
- 过渡模式不可用，因为我们不再相互切换特有的元素。
- 内部元素 总是需要 提供唯一的 key 属性值。
- CSS 的过渡class(如v-enter...)将会应用在内部的元素中，而不是这个组/容器本身。

1. **列表的排序过渡**

``<transition-group>`` 组件提供了一个新的特性：v-move，它会在元素改变定位的过程中应用。
如何使用？通过类名即可设置：.v-move {}。
当给 ``<transition-group>`` 设置 name 特性时，例如name为fade，则 v-move 在使用时，需要替换为 fade-move。

注意：当移除一个列表元素时，需要将移除的元素脱离文档流，否则，要溢出的元素在移除过渡中一直处于文档流中，会影响到后面元素的move过渡效果。

内部的实现：Vue 使用了一个叫 FLIP 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。

需要注意的是使用 FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中。

2. **列表的交错过渡**

如果要给列表中的元素，应用更丰富的过渡效果，可以配合JavaScript钩子。

## 18.4 复用过渡

过渡可以通过 Vue 的组件系统实现复用。
我们可以创建一个可复用的过渡组件。你需要做的就是将 ```<transition>``` 或者 ```<transition-group>``` 作为根组件，然后将任何子组件放置在其中就可以了。

注意：当使用函数式组件复用过渡时，不要设置css作用域(即：```<style scoped>```)。


# 19. 组件_异步组件

## 19.1 为什么要使用异步加载

在项目中，有些组件不会在第一次进入首屏时加载，而是当执行了某些操作时，才会加载进来。所以我们可以将此类组件设置成异步加载，需要使用的时候再加载进来，以达到提升首屏性能的目的。


## 19.2 如何使用异步加载

1. **异步加载一个组件**

在vue组件中引入**需要异步加载的组件**时，不写成如下的样子：

```js
<script>
import AsyncCmp from 'url';

export default {
    components: {
        AsyncCmp
    },
}
</script>
```

而是写成：
```js
<script>
export default {
    components: {
        AsyncCmp: () => import (url);
    },
}
</script>
```


2. **异步加载多个组件**

按照上面加载一个组件的方法，加载多个组件的话，会发送两个请求，生成两个js文件，比较耗性能。
我们希望将多个需要同时加载的组件合并到一个js文件中。
做法：在每一个组件的url前添加注释```/* webpackChunkName: "合并后的js文件名" */```

```js
components: {
    AsyncCmp1: () => import(/* webpackChunkName: "async" */ 'url'),
    AsyncCmp2: () => import(/* webpackChunkName: "async" */ 'url'),
}
```

异步加载的文件，会在link标签上设置 `rel="prefech"` 意味着：浏览器会在空闲时间内下载对应的资源，使用时可以直接从缓存中获取。与之对应的 `rel="preload"` 意味着：浏览器会及时下载对应的资源，并加载进来。



# 20. VueRouter

## 20.1 基础

1. **什么是路由？**

路由是根据不同的url地址展现不同的内容或页面。
早期的路由都是后端直接根据url来重载页面实现的，即后端控制路由。
后来页面越来越复杂，服务器压力越来越大，随着ajax（异步刷新技术）的出现，页面已经实现非重载就能刷新数据，让前端也可以控制url自行管理，前端路由由此而生。

2. **什么时候使用前端路由？**

前端路由更多用在单页应用上，也就是 `SPA` (Single Page Web Application)。SPA是指所有内容都写在一个html文件上，通过点击不同选项来展示不同区域内容，而不用刷新页面。
在单页面应用中，大部分页面结果不变，只改变部分内容的使用。

3. **安装路由**

```shell
npm install vue-router
```

4. **使用路由**

- 第一步：在JS文件中按如下步骤写：

```js
//1. 引入路由
import VueRouter from 'vue-router';

//2. 使用路由
Vue.use(VueRouter);

//3. 定义路由组件，也可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
```


```js
//4. 定义路由的配置，每个路由应该映射一个组件。
const routes = [
    { 
        path: '/foo', 
        component: Foo 
    },{ 
        path: '/bar', 
        component: Bar
    }
]
```


```js
//5. 创建 router 实例，然后传 `routes` 配置。即：将定义好的路由传递给VueRouter：
const router = new VueRouter({
    routes,
});
```


```js
//6. 创建和挂载根实例
const app = new Vue({
    router,
}).$mount('#app')
```

- 第二步：在html文件中写如下内容

```html
<div id="app">
    <h1>Hello App!</h1>
    <p>
        <!-- 使用 router-link 组件来导航。通过传入 `to` 属性指定链接。 -->
        <!-- <router-link> 默认会被渲染成一个 a 标签，但可以通过 tag 特性来指定渲染成什么标签。 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>

    <!-- 路由出口。路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```


5. **标签 `<router-link>` 天生自带的 class**

- `router-link-exact-active`：当前展示的路径，完全匹配 `<router-link>` 中特性 to 的值。
- `router-link-active`：当前展示的路径，包含 `<router-link>` 中特性 to 的值。

可以更改以上两个 class 名，写在 `new VueRouter()` 的配置中:
```js
new VueRouter({
    linkExactActiveClass: 'link-exact-active',
    linkActiveClass: 'link-active',
});
```

6. **vue-router非重载的实现模式**

- hash模式

vue-router 默认 `hash` 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如下：

```js
https://www.baidu.com/#/dgjhsgfw
```

- history 模式

如果不想要很丑的 hash，我们可以用路由的 `history` 模式。这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。如下：

```js
https://www.baidu.com/dgjhsgfw
```

在路由配置中设置：
```js
new VueRouter({
    mode: 'history',
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id, 也好看！


- hash vs history

`history` 模式要玩好，还需要后台配置支持。
因为我们的应用是个单页客户端应用，如果后台没有正确的配置，那么当用户在浏览器直接访问一个不存在的url，如：http://oursite.com/user/id 时，页面就会返回 404。所以你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面(如百度的error.html)，这个页面就是你 app 依赖的页面。

而 `hash` 模式没有这个问题，它会默认回到首页。


## 20.2 命名路由 / 嵌套路由 / 重定向 / 别名

1. **命名路由**

> 当一个路由嵌套了一个路由后，如果还往下嵌套很多层，那么最后一层的子路由组件的 `<router-link>` 中的to值将会很长。不利于阅读，可以通过命名路由解决这一问题。name写在最后一层子路由组件对应的routes配置里。

可以通过一个名称标识一个路由，这样在某些时候会显得更方便一些。特别是在链接一个路由，或者是执行一些跳转时，可以在创建Router实例时，在routes配置中给某个路由设置名称：
```js
routes = [
    {
        path: '/activity/personal',
        name: 'personal',
        component: Personal,
    }
];
```
要链接到一个命名路由，可以给 `router-link` 的 to 属性传一个对象：
```html
<router-link :to="{ name: 'personal' }">个人中心</router-link>
```

2. **嵌套路由**

> 当我们想在一个路由组件里在使用其他路由组件时，可以使用嵌套路由。

- 嵌套路由的使用

一个被 `<router-view>` 渲染的组件想要包含自己的嵌套 `<router-view>` 时，可以使用嵌套路由，如：

```js
// 在路由使用的第4步，配置 routes 时，将要嵌套的路由组件放在 children 属性里。
routes = [
    {
        path: '/activity',
        component: () => import('./views/Activity'),
        children: [
            {
                path: '/activity/academic',
                name: 'academic',
                component: () => import('./views/Academic'),
            },{
                path: '/activity/personal',
                name: 'personal',
                component: () => import('./views/Personal'),
            },{
                path: '/activity/download',
                name: 'download',
                component: () => import('./views/Download'),
            }
        ],
    },
]
```

经过这样的设置，在 Activity 组件中就可以使用 `<router-view>` 了。

- 子路由的path可以简写：

```js
routes = [
    {
        path: '/activity',
        component: () => import('./views/Activity'),
        children: [
            {
                path: 'personal',
                component: () => import('./views/Personal'),
            },
        ],
    },
]
```
这样会自动将父路由的路径，拼接在子路由前，最终结果为：`/activity/personal`。

- 一开始就展示子路由的某个组件(一般是第一个)的内容：

一开始访问 `/activity` 下的子路径时，并不会渲染出来任何东西。如果想要渲染子路由的某个组件(一般是第一个)的内容，可以提供一个空路由：

```js
{
    path: '/activity',
    children: [
        {
            path: '',
            component: () => import('./views/Academic'),
        },
    ],
}
```

3. **重定向**

> 当我们到达路由组件 a 的时候，我们想直接跳到 a/b 这个url。这时可以使用重定向。
> 注意：使用重定向的话，就不能使用空白路由。

重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 a/b：

- 重定向的目标可以是一个**url**：

```js
routes = [
    {
        path: '/a',
        redirect: 'a/b' 
    },
]
```

- 重定向的目标也可以是一个**命名路由**：

```js
routes = [
    {
        path: '/a',
        redirect: { 
            name: 'academic' 
        }
    },
]
```

- 甚至是一个**方法**，动态返回重定向目标：

```js
routes = [
    {
        path: '/a',
        redirect: to => {
            // 参数：目标路由(to) 
            // 返回：重定向的 字符串路径/路径对象
            return {
                name: 'academic',
            }
        }
    },
]
```

4. **别名**

> 当我们把首页的路由配置中的path由 `/` 改为 `/home` 之后，我们必须访问 `/home` 才可以看到首页内容。如百度：我们一般直接访问 `baidu.com`，不会访问 `baidu.com/home` 。可以使用**别名**解决这一问题。

- 给 `/home` 取别名 `/`

```js
routes = [
    {
        path: '/home', 
        component: 'A', 
        alias: '/'
    }
]
```


但是当我们使用别名后，`<router-link>` 天生自带的两个 class 也没有了。毕竟class 是加在 `/home` 上的，`/` 自然没有。所以我们最好还是用重定向：
```js
routes = [
    {
        path: '/',
        redirect: '/home',
    }
]
```

- 重定向 vs 别名

重定向：当用户访问 `/ `时，URL 将会被替换成 `/home`，然后匹配路由为 `/home`。
别名：当用户访问 `/` 时，URL 会保持为 `/` ，但是路由匹配为 `/home`，就像用户访问 `/home` 一样。


## 20.3 编程式的导航

> 在 Vue 根实例的 router 配置传入 router 实例后，`$router`、`$route` 两个属性会被注入到每个子组件。

1. **$router (路由实例对象)** 

除了使用 `<router-link>` 创建 `<a>` 来定义导航链接，我们还可以借助 `router` 的实例方法，通过编写 `JS` 代码来实现。

- $router.push()

想要导航到不同的 URL，则使用 `router.push()` 方法。这个方法会向 history 栈添加一个新的记录，所以当用户点击浏览器后退按钮时，会回到之前的 URL。

当你点击 `<router-link>` 时，这个方法会在内部调用。所以点击 `<router-link :to="...">` 等同于调用 `$router.push(...)`。

声明式 | 编程式
:-: | :-:
`<router-link :to="...">` | `this.$router.push(...)` 

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```js
// 字符串
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })

// 命名的路由
this.$router.push({ name: 'user' })
```


- $router.replace()

跟 `router.push()` 很像，唯一的不同就是它不会向 history 添加新记录，而是替换掉当前的 history 记录。

声明式 | 编程式
:-: | :-:
`<router-link :to="..." replace>` | `this.$router.replace(...)` 


- $router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步。类似 `window.history.go(n)`。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 后退一步记录，等同于 history.back()
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，就会默默地失败，页面什么也不会发生。
this.$router.go(-100)
this.$router.go(100)

// 如果为 0，页面会刷新。
this.$router.go(0)
```

2. **$route (路由信息对象，只读)**

- `$route.path`

字符串。对应当前路由的路径，总是解析为绝对路径。如 `/foo/bar`。

- `$route.params`

对象。包含了动态片段和全匹配片段。如果没有动态路径参数，就是一个空对象。

- `$route.query`

对象。表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`。如果没有查询参数，就是个空对象。

- `$route.hash`

字符串。路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串。

- `$route.fullPath`

字符串。完成解析后的 URL，包含查询参数和 hash 的完整路径。

- `$route.matched`

数组。包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 `routes` 配置数组和 `children` 数组中的对象副本。

```js
const router = new VueRouter({
    routes: [
    // 下面的对象就是路由记录
    {
        path: '/foo',
        component: Foo,
        children: [
        // 这也是个路由记录
            { 
                path: 'bar', 
                component: Bar 
            }
        ]
    }
    ]
})
```

当 URL 为 `/foo/a/b/c`，`$route.matched` 将会是一个包含从上到下的所有对象 (副本)。如下：

```js
matched: Array
    0: { path:"/foo", ... }
    1: { path:"/foo/a", ...  }
    2: { path:"/foo/a/b", ...  }
    3: { path:"/foo/a/b/c", ...  }
```

- `$route.name`

当前路由的名称，如果有的话。

- `$route.redirectedFrom`

如果存在重定向，即为重定向来源的路由的名字。



## 20.4 动态路由匹配

> 1.当我们想在 `/course` 路径下访问各种不同的课程信息(这些课程组件都一样)，如： `/course/111` 或者 `/course/222`，像这样的有10000个。
> 2.此时如果写成嵌套路由的话，要在 course 的路由配置的 children 里写10000个子路由，这是不现实的。这时我们可以使用动态路由。

当我们需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用 **“动态路径参数”** 来达到这个效果：
```js
const User = {
    template: '<div>User</div>'
}

const router = new VueRouter({
    routes: [
        { 
            path: '/user/:id',  //动态路径参数以冒号开头。
            component: User 
        }
    ]
})
```
经过这样的设置，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。
当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。



## 20.5 命名视图 / 路由组件传参

1. **命名视图**

> 当我们想在一个路由组件里同时展示多个视图，并且每个视图都要展示不同的组件时，可以使用命名视图。**视图**即 `<router-view>`

可以在组件a中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `<router-view>` 没有设置 name，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="student"></router-view>
```

因为组件a中的每一个视图都要使用不同的组件渲染，所以我们需要在组件a的路由配置中使用 components (带上 s)：
```js
const router = new VueRouter({
    routes: [
        {
            path: '/learn',
            // component: () => import('./views/Learn'),
            components: {
                default: () => import('./views/Learn'),
                student: () => import('./views/Student'),
            }
        }
        ]
})
```
注意：当我们写了多个视图(`<router-view>` )后，如果没有用到此视图，也不会报错。因为命名视图只有配置了路由，才会渲染。不配置就不会渲染。

2. **路由组件传参**

> 1. 如果在一个组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
> 2. 比如上节课的 `question.vue` 组件，它里面就使用了大量的 `$route`。当我们想在 `learn.vue` 组件里使用这个组件的时候，就会发现控制台报错。因为此时 `question.vue` 组件里用到的 `$route` 是 `learn.vue` 组件的信息，没有 `params: { id,}` 这个动态路径参数。
> 3. 此时我们可以使用路由组件传参解开限制，将 `$route` 上的值作为属性放到 props 里。

使用 props 将组件和路由解耦。

- 布尔模式
如果 props 被设置为 true，`route.params` 将会被设置为组件属性。

- 对象模式
如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

```js
const router = new VueRouter({
    routes: [
        { 
            path: '/promotion/from-newsletter', 
            component: Promotion, 
            props: { newsletterPopup: false } 
        }
    ]
})
```

- 函数模式
你可以创建一个函数返回 props。函数的第一个参数是 route （即 `$route`）。

```js
const router = new VueRouter({
    routes: [
        { 
            path: '/search', 
            component: SearchUser, 
            props: (route) => ({ 
                query: route.query.q 
            }) 
        }
    ]
})
```

## 20.6 导航守卫

> 导航：路由正在发生变化。
> 导航守卫主要用来通过**跳转**或**取消**的方式守卫导航。
> 导航守卫被分成三种：全局的、单个路由独享的、组件内的。

0. **完整的导航解析流程**

```js
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach() 守卫。
4. 在重用的组件里调用 beforeRouteUpdate() 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter()。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter()。
8. 调用全局的 beforeResolve() 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach() 钩子。
11. 触发 DOM 更新(组件开始被渲染)，可以执行组件里的生命钩子函数(mounted这些)。
12. 此时完成了挂载，可以用创建好的实例调用 beforeRouteEnter() 守卫中传给 next 的回调函数。
```

1. **全局守卫**

> 1. 路由的全局守卫指：只要从某个路由跳转到另一个路由，都会有守卫。
> 2. 这些守卫是指：路由实例上直接操作的**钩子函数**，触发路由跳转就会触发这些钩子函数。

- 全局前置守卫：`beforeEach()`

在路由跳转前触发，一般被用于登录验证。

```js
const router = new VueRouter({ ... })

/*
    beforeEach() 参数说明：(路由对象，即路由信息对象 `$route`)
        - `to`：目标路由对象
        - `from`：即将要离开的路由对象。
        - `next`：必须调用 next()，才能继续往下执行一个钩子，否则路由跳转会停止。
            - 使用 `next(false)` 中断当前的导航。
            - 使用 `next('/a')` 跳转到一个新的地址，从而进入一个新的导航。`next()` 参数和`$router.push()` 一致。
            - 使用 `next(error)`(2.4 +)：如果传入的参数是一个Error实例，则导航会被终止，且该错误会被传递给 `router.onError()` 注册过的回调。
*/
router.beforeEach((to, from, next) => {})
```


- 全局解析守卫：`beforeResolve()`

和 `boforeEach()` 类似，路由跳转前触发。

和 `boforeEach()` 的区别：在导航被确认**之前**，所有组件内守卫和异步路由组件被解析**之后**，解析守卫就被调用。

```js
const router = new VueRouter({ ... })
router.beforeResolve((to, from, next) => {})
```

- 全局后置钩子：`afterEach()`

和 `beforeEach()` 相反，路由跳转完成后触发。

```js
const router = new VueRouter({ ... })
router.afterEach((to, from) => {})
```

2. **路由独享守卫**

> 1. 路由home的独享守卫指：只要跳转的目的地是路由home，不论起点是哪个路由，都会有守卫。
> 2. 这些守卫是指：在单个路由配置的时候可以设置的**钩子函数**。

- `beforeEnter()`

和 `beforeEach()` 完全相同，如果都设置则在 `beforeEach()` 之后紧随执行。

```js
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```

3. **组件内守卫**

> 1. 组件内守卫是指：在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加**生命周期钩子函数**。
> 2. 不是每一个组件都有组件内守卫，只有页面级组件才有。(页面级组件指：放在 views 文件夹的组件)

- `beforeRouteEnter()`：路由进入之前调用。

```js
/*
    1. 在该守卫内访问不到组件的实例，this 值为 `undefined`。在这个钩子函数中，可以通过传一个回调给 `next` 来访问组件实例。

    2. 什么时候执行 `next` 回调？
    在导航被确认的时候执行 `next` 回调，并且把组件实例作为回调方法的参数。

    3. 注意：`next` 回调的执行在组件 `mounted()` 之后，是为了确保能对组件实例进行完整访问。

    4. 使用场景示例：
    可以在这个守卫中向服务端发送请求，从而获取数据。
    当成功获取并能进入路由时，调用next并在回调中通过 vm 访问组件实例进行赋值等操作。
*/
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`。因为当守卫执行前，组件实例还没被创建

    next( vm => {
        // 通过 `vm` 访问组件实例
    })
},
```

- `beforeRouteUpdate()`：在当前路由改变时，并且该组件被复用时调用。

```js
/*
    何时组件会被复用？
        1. 动态路由间互相跳转。
        2. 路由的 `query` 变更。如：`/home?a=1` 变为 `/home?a=2`
*/
beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用。
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，当在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以通过 `this` 访问组件实例。
},
```

- `beforeRouteLeave()`：导航离开该组件的对应路由时调用。

```js
beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用。
    // 可以通过 `this` 访问组件实例。
}
```


## 20.7 路由元信息

定义路由的时候可以配置 `meta` 字段，用于自定义一些信息。

```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            children: [
                {
                    path: 'bar',
                    component: Bar,
                    meta: { requiresLogin: true } //自定义一些信息
                }
            ]
        }
    ]
})
```


## 20.8 过渡动效 / 滚动行为

1. **过渡动效**

`<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果。

```html
<transition>
    <router-view></router-view>
</transition>
```

2. **滚动行为**

- 什么是滚动行为？

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。

- 什么浏览器可以使用滚动行为？

`vue-router` 可以自定义路由切换时页面如何滚动。但这个功能只在支持 `history.pushState` 的浏览器中可用。

- 如何使用滚动行为？

当创建一个路由实例，你可以提供一个 `scrollBehavior()` 方法：

```js
/*
    scrollBehavior() 的参数：
        - `to`：目标路由对象。
        - `from`：即将要离开的路由对象。
        - `savedPosition`： 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用，它记录了之前的页面位置。浏览器返回上个页面时，会回到那个位置。
*/
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
    }
});
```

```js
/*
    scrollBehavior() 返回：滚动位置的对象信息，有两种写法：
        - { x: number, y: number }
        - { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
*/

scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
}

scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
        return {
            selector: to.hash // selector 的 值为 hash 值
        }
    }
}
```


# 21. Vuex

> 当多个组件都使用同一个数据时，当我们在组件a更改了该数据的值，我们希望其他组件中对应的值也要改。
> **之前的做法**：组件a告诉根实例数据改变了，然后根实例依次往下通知每一个用到该数据的子组件。如果各组件嵌套层级很高，就很浪费性能。
> **现在**：我们可以通过 `vuex` 来实现之前的要求。vuex 将所有需要共享的数据都放在它的数据仓库里，谁需要谁就从仓库拿。仓库里的数据一改，所有共享的组件的数据也都跟着改。

## 21.1 Vuex 的使用

`Vuex` 是 `Vue` 的状态管理工具(第三方库)，为了更方便的实现多个组件共享状态。
狭义上说，状态就是数据。

1. **安装**

```js
npm install vuex --save
```

2. **使用**

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    }
});

const vm = new Vue({
    store,
});
```

## 21.2 State

> 单一状态树，使用一个对象 state 就包含了全部的应用层级状态。

1. **如何在Vue组件中获得 Vuex 的共享状态？**

- 方法1：`$store.state`

Vuex 通过 store 选项，提供了一种机制( 即：调用 `Vue.use(Vuex)` )，将状态从根组件注入到每一个子组件中。

在根实例中注册 store 选项后，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问。

```html
<div class="home">
    {{ $store.state.count }}  <!-- $store.state.count 也可以写成计算属性。 -->
</div>
```
```js
const store = new Vuex.Store({
    state: {
        count: 0
    }
});

const vm = new Vue({
    store,
});
```


- 方法2：`mapState()`

当一个组件需要获取多个 vuex 状态时，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState()` 辅助函数帮助我们生成计算属性：

```js
import { mapState } from 'vuex';

export default {
    computed: {
        // 写本组件自己的计算属性
        yu () {},
        
        // 写本组件需要用到的vuex状态
        ...mapState(['count']),
    },
}
```

2. **如何给 Vuex 的共享状态改名？**

为了避免本组件内的 data数据 和 vuex 里的共享状态 名称冲突，可以给共享状态改名。

```js
computed: {
    ...mapState({
        // key是新名称，函数返回值作为value值
        storeCount: state => state.count,
        // 简写
        storeCount: 'count', // 等同于 state => state.count
    }),
},
```

## 21.3 Getter

store 的计算属性。`Getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

`Getter` 接收 state 作为其第一个参数、getters 作为其第二个参数。

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        doubleCount (state) {
            return state.count * 2;
        }
    }
});
```

1. **如何在 Vue 组件中获得 Vuex 的 getters 值？**

- 方法1：通过 `$store.getters`

Getter 会暴露为 `$store.getters` 对象。

```js
getters: {
    doubleCount (state) {
        return state.count * 2;
    }
}
```
```js
// Vue 组件中
this.$store.getters.doubleCount;
```

- 方法2：通过 getters 中的方法名

也可以让 getter 返回一个函数，来实现给 getter 传参。

```js
getters: {
    addCount: state => num => state.count + num;
}
```
```js
this.$store.addCount(3);
```

- 方法3：`mapGetters()`

```js
// 根实例
getters: {
    addCount: state => num => state.count + num;
}
```
```js
// 组件
import { mapsGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'doubleCount',
            'addCount',
        ])
    }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：
```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  storeDoubleCount: 'doubleCount'
})
```

## 21.4 Mutation

在严格模式下，更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

1. **如何在Vue组件中提交 Mutation？**

- 方法1：**通过this.$store.commit('xxx')访问**

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
```js
// commit 第一个参数：写在 mutations 里的函数名
this.$store.commit('increment');
```
这个写法不同于 state 和 getters。它更像是事件注册：“当触发一个类型为``increment``的mutation时，调用此函数。”

- 方法2：**mapMutations 辅助函数**：

这个辅助函数的写法是写在methods里的，而不是computed里。
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

2. **提交载荷（Payload）**

你可以向store.commit传入额外的参数，即mutation的载荷（payload）：
```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
```js
store.commit('increment', 10)
```
在大多数情况下，载荷应该是一个对象，这样可以包含多个参数，并且记录的mutation会更易读：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
```js
store.commit('increment', {
  amount: 10
})
```

3. **对象风格的提交方式**

提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
```js
store.commit({
  type: 'increment',
  amount: 10
})
```
当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

4. **使用常量替代 Mutation 事件类型** 

把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
```js
// mutation-types.js
export const COUNT_INCREMENT = 'COUNT_INCREMENT'
```
```js
// store.js
import Vuex from 'vuex'
import { COUNT_INCREMENT } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    [COUNT_INCREMENT] (state) {
      // ...
    }
  }
})
```
用不用常量取决于自己，在需要多人协作的大型项目中，这会很有帮助。

5. **Mutation 需遵守 Vue 的响应规则**

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

- 最好提前在你的 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，你应该
  - 使用 Vue.set(obj, 'newProp', 123), 或者
  - 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
    ```js
    state.obj = { ...state.obj, newProp: 123 }
    ```

6. **表单处理**

在Vuex的state上使用v-model时，由于会直接更改state的值，所以Vue会抛出错误。

如果想要使用双向数据的功能，那么该怎么做呢？

- 方法1：自己模拟一个v-model

:value="msg" @input="updateMsg"

- 方法2：使用双向绑定的计算属性

方法1的做法，比v-model本身繁琐很多，所以我们还可以使用计算属性的setter来实现双向绑定：
```html
<input v-model="msg">
```

```js
computed: {
  msg: {
    get () {
      return this.$store.state.obj.msg;
    },
    set (value) {
      this.$store.commit(UPDATE_MSG, { value });
    }
  }
}
```

7. **Mutation 必须是同步函数**

要记住 **mutation 必须是同步函数**。why？

```js
mutations: {
  [COUNT_INCREMENT] (state) {
    setTimeout(() => {
      state.count ++;
    }, 1000)
  },
}
```
执行上端代码，我们会发现更改state的操作是在回调函数中执行的，这样会让我们的代码在devtools中变的不好调试：当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用，任何在回调函数中进行的状态的改变都是不可追踪的。

8. **严格模式**

开启严格模式，仅需在创建 store 的时候传入 strict: true：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

<font color="red">注意：不要在发布环境下启用严格模式！</font>
严格模式会深度监测状态树来检测不合规的状态变更，要确保在发布环境下关闭严格模式，以避免性能损失。

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

## Vuex_Action
Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters:

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

1. **分发Action**

```js
$store.dispatch('increment')
```
虽然和mutation差不多，但是在action中，可以执行异步操作，但是mutation中不行！！！
```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```


2. **组合 Action**

Action 通常是异步的，那么如何知道 action 什么时候结束呢？
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
```js
$store.dispatch('actionA').then(() => {
  // ...
})
```

3. **Vuex 管理模式**

![](https://vuex.vuejs.org/vuex.png)



## Vuex_Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

```js
modules: {
  a,
  b
}
```
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.getters.xxx
- 提交 mutation：this.\$store.commit('xxx');
- 分发 action：this.\$store.dispatch('xxx');
- 可以通过mapXXX的方式拿到getters、mutations、actions，但是不能拿到state，如果想通过这种方式获得state，需要加命名空间。

1. **命名空间**

可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.['moduleName/getters'].xxx
- 提交 mutation：this.\$store.commit('moduleName/xxx');
- 分发 action：this.\$store.dispatch('moduleName/xxx');
- 可以通过mapXXX的方式获取到state、getters、mutations、actions。

2. **模块的局部状态**

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState。

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。