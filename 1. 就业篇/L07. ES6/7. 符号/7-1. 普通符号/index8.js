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

// 非要使用Hero类里的私有方法，方法如下：
const sybs = Object.getOwnPropertySymbols(Hero.prototype);  
const prop = sybs[0];
console.log(h[prop](3, 5))

