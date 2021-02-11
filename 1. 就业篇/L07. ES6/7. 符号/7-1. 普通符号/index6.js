
/* 
    如何将对象的成员私有化：
        1.将对象写成立即执行函数，函数返回这个对象
        2.在函数内定义一个符号，替换掉对象原来的成员
*/ 
const hero = (function () {
    const getRandom = Symbol();
    return {
        attack: 30,
        hp: 300,
        defence: 10,
        gongji() {
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        },
        // 此方法变为私有方法
        [getRandom](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})()
console.log(hero);

/*
    如何将类的成员私有化：
        1.将类写成立即执行函数，函数返回这个类
        2.在函数内定义一个符号，替换掉类中原来的成员
*/
const Hero = (() => {
    const getRandom = Symbol();
    return class {
        constructor(attack, hp, defence) {
            this.attack = attack;
            this.hp = hp;
            this.defence = defence;
        }

        gongji() {
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        }

        [getRandom](min, max) { 
            return Math.random() * (max - min) + min;
        }
    }
})();

const h = new Hero(3, 6, 3);
console.log(h);