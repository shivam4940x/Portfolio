var compose = function (functions) {
    if (functions.length === 0) {
        return function (x) { return x; };
    }

    return functions.reduceRight(function (accumFn, currentFn) {
        return function (x) {
            // accumFn = (x)=>2*x;

            return currentFn(accumFn(x));
        };
    });
};
function f(x) {
    return x + 1;
}
function g(x) {
    return x * x;

}
function h(x) {
    return x * 2;
}
console.log(f(g(h(4))))
const nums = [x => x + 1, x => x * x, x => 2 * x]
const ans = compose(nums)
console.log(ans(4))
