var Dotter = (function () {
    function Dotter() {
    }
    Dotter.prototype.sayHello = function () {
        console.log('Hello world!');
    };
    return Dotter;
}());
(function () {
    var dotter = new Dotter();
    dotter.sayHello();
})();
//# sourceMappingURL=dotter.js.map