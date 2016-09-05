(function(window) {
    'use strict';

    window.onload = function() {
        var navbarToggle = document.querySelector('.navbar-toggle');
        var nav = document.querySelector('.nav');
        var items = document.querySelectorAll('.item');

        navbarToggle.addEventListener('click', function(ev) {
            if(window.getComputedStyle(nav,null).display === 'none') {
                nav.style.display = 'block';
                items.forEach(function(item) {
                    item.classList.add('show-item');
                });
            } else {
                nav.style.display = 'none';
                if(items[0].classList.contains('show-item')) {
                    items.forEach(function(item) {
                        item.classList.remove('show-item');
                    });
                }
            }
            console.log(window.getComputedStyle(nav,null).display);
        });

        /**
         * 当从小屏幕变成大屏幕时，要恢复大屏幕最开始的状态
         * @param  {String} ev) {                       console.log(document.documentElement.scrollWidth);            if (document.documentElement.scrollWidth > 768) {                nav.style.display [description]
         * @return {[type]}     [description]
         */
        window.addEventListener('resize', function(ev) {
            if (document.documentElement.scrollWidth > 768) {
                    console.log('hi');
                if(window.getComputedStyle(nav,null).display === 'none') {
                    nav.style.display = 'block';
                }
                if(items[0].classList.contains('show-item')) {
                    items.forEach(function(item) {
                        item.classList.remove('show-item');
                    });
                }
            } else {
                if(window.getComputedStyle(nav,null).display === 'block') {
                    nav.style.display = 'none';
                }
            }
        })
    };

})(window);