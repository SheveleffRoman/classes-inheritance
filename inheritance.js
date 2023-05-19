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