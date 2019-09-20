class Dotter {
    sayHello() {
        console.log('Hello world!');
    }
}

(() => {
    const dotter: Dotter = new Dotter();
    dotter.sayHello();
})();
