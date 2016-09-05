(function(window) {
    'use strict';

    var carousel = document.querySelector('.carousel');
    var items = carousel.querySelectorAll('.item');
    var indicators = carousel.querySelectorAll('li');
    var prev = carousel.querySelector('.prev');
    var next = carousel.querySelector('.next');

    function Carousel(objConfig) {
        this.config = objConfig;
        this.time = this.config.time; //轮播时间
        this.timer; // 定时器
        this._init(); // 初始化，开始轮播和注册DOM事件
    }

    Carousel.prototype = {
        constructor: Carousel,
        _init: function() {
            this.start();
            this._register();
        },
        start: function(index) { // 开始轮播
            var self = this;
            var i = index || 0;

            // 设定一个计时器，通过添加和移除类来轮播图片
            self.timer = setInterval(function() {
                self._hide(items[i], indicators[i]);
                i++;
                if(i === items.length) {
                    i = 0;
                }
                self._show(items[i], indicators[i]);
            }, self.time);

        },
        _show: function(item, indicator) {
            if (item.classList.contains('hide')) {
                item.classList.remove('hide');
            }
            item.classList.add('show');
            indicator.classList.add('active');
        },
        _hide: function(item, indicator) {
            if(item.classList.contains('show')) {
                item.classList.remove('show');
            }
            item.classList.add('hide');
            indicator.classList.remove('active');
        },
        _register: function() { // 注册DOM事件
            var self = this;

            // 为每个指示器注册移入移出事件
            indicators.forEach(function(item, key) {
                // 指示器移入事件
                item.addEventListener('mouseenter', function(ev) {
                    clearInterval(self.timer);
                    // 获取点击前正在展示的图片
                    var curShowItem = carousel.querySelector('.item.show');
                    // 如果正在展示的图片不是点击的图片，则更换图片和指示器
                    if(curShowItem !== items[key]) {
                        var curShowIndicator = carousel.querySelector('li.active');
                        self._hide(curShowItem, curShowIndicator);
                        self._show(items[key], indicators[key]);
                    }
                });
                // 指示器移除事件
                item.addEventListener('mouseleave', function(ev) {
                    self.start(key);
                });
            });

            // 为控制器注册点击事件
            prev.addEventListener('click', function(ev) {
                clearInterval(self.timer);
                var curShowItem = carousel.querySelector('.item.show');
                var curShowIndicator = carousel.querySelector('li.active');
                var prevItem = curShowItem.previousElementSibling || items[items.length-1];
                var prevIndicator = curShowIndicator.previousElementSibling || indicators[indicators.length-1];

                self._hide(curShowItem, curShowIndicator);
                self._show(prevItem, prevIndicator);
                // 因为items是类数组并非真正的数组，无法直接使用indexOf方法，所以这里调用了原理的call方法
                self.start(Array.prototype.indexOf.call(items, prevItem));
            });
            next.addEventListener('click', function(ev) {
                clearInterval(self.timer);
                var curShowItem = carousel.querySelector('.item.show');
                var curShowIndicator = carousel.querySelector('li.active');
                var nextItem = curShowItem.nextElementSibling || items[0] ;
                var nextIndicator = curShowIndicator.nextElementSibling || indicators[0];

                self._hide(curShowItem, curShowIndicator);
                self._show(nextItem, nextIndicator);
                self.start(Array.prototype.indexOf.call(items, nextItem));
            });
        }

    };


    window.Carousel = Carousel;

})(window);