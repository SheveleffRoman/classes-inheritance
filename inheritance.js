// Base class
function BaseBuilder(value) {
    this.value = value;
}

BaseBuilder.prototype.plus = function(...args) {
    this.value = args.reduce((accumulator, currentValue) => {
        if (typeof currentValue === 'string') {
            return accumulator + currentValue;
        } else {
            return accumulator + Number(currentValue);
        }
    }, this.value);
    return this;
};

BaseBuilder.prototype.get = function() {
    return this.value;
};

//ES5 class
function StringBuilder(value) {
    BaseBuilder.call(this, value);
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(n) {
    this.value = this.value.slice(0, -n);
    return this;
};

StringBuilder.prototype.multiply = function(n) {
    this.value = this.value.repeat(n);
    return this;
};

StringBuilder.prototype.divide = function(n) {
    let k = Math.floor(this.value.length / n);
    this.value = this.value.slice(0, k);
    return this;
};

StringBuilder.prototype.remove = function(str) {
    this.value = this.value.split(str).join('');
    return this;
};

StringBuilder.prototype.sub = function(from, n) {
    this.value = this.value.substr(from, n);
    return this;
};

let builder = new StringBuilder('Hello');

let result = builder
    .plus(' All', '!')
    .minus(4)
    .multiply(3)
    .divide(4)
    .remove('l')
    .sub(1, 1)
    .get();

console.log(result); // e

//ES6 class
class IntBuilder extends BaseBuilder {
    constructor(value) {
        super(value);
    }

    minus(...args) {
        this.value -= args.reduce((accumulator, currentValue) => {
            return accumulator + Number(currentValue);
        }, 0);
        return this;
    }

    multiply(n) {
        this.value *= n;
        return this;
    }

    divide(n) {
        this.value = Math.floor(this.value / n);
        return this;
    }

    mod(n) {
        this.value = this.value % n;
        return this;
    }
    static random(from, to) {
        return Math.ceil(Math.random() * (to - from) + from);
    }
}

const intBuilder = new IntBuilder(10);

const resultInt = intBuilder
    .plus(2, 3, 2)
    .minus(1, 2)
    .multiply(2)
    .divide(4)
    .mod(3)
    .get();

console.log(resultInt); // 1

console.log(IntBuilder.random(10, 100));