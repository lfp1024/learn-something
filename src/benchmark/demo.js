'use strict'

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

suite
    .add('let store = {}', function () {
        let store = {}
        store.key = 'value'
    })
    .add('let store = new Map()', function () {
        let store = new Map()
        store.set('key', 'value')
    })
    .add('let store = Object.create(null)', function () {
        let store = Object.create(null)
        store.key = 'value'
    })
    // 每个测试跑完后，输出信息
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });

    