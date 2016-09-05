/**
 *
 * Created by Viker on 2016/8/5.
 *
 * 这是一个滚动监听+附近导航的插件，使用前需添加jquery和bootstrap，或者自己修改下有关内容。
 *
 * 功能：
 * 1.滚动监听：当滚动到导航栏标题所对应的区域时该标题会点亮。
 * 2.附加导航：导航栏开始时并未固定，当滚动一定距离后将导航栏固定在顶部。
 *
 * 原理：
 * 主要是利用了scroll事件和offset属性，当window/document...滚动时会触发scroll事件，监听该事件获取scrollTop，并与offset().top做比较，
 * 就可以实现上述功能了。
 */

$(function() {
 
    // 各区域距顶部的距离
    var infoPoint = $('#info').offset().top;
    var proPoint = $('#product').offset().top;
    var cooPoint = $('#cooperation').offset().top;
    var aboPoint = $('#about').offset().top;

    //导航栏DOM
    var $navbar = $('.navbar');
    var $navList = $('.nav a');
    var $Brand = $(".navbar-brand img");

    /*监听window对象的滚动事件，主要有两个设置，一是当滚动至资讯就开始固定导航栏到顶部，
    二是设置当滚动到导航栏相应区域时点亮导航栏该标题*/
    $(document).scroll(function(ev) {

        // 滚动条滚动的距离
        var scrollTop = $(this).scrollTop();
        // 导航栏点亮的标题
        var $activeA = $('.nav a.active');

        switch(true) {

            //当滚动距离小于资讯时将导航栏恢复原样
            case scrollTop < infoPoint:
                $navList.css({"color":"#fff"})
                    .hover(function(ev) {
                        $(this).css({"color": "#4CBD71"});
                    }, function(ev) {
                        $(this).css({"color": "#fff"});
                    });
                $Brand.attr("src", "images/logo-home.png")
                    .css({"margin-top": "0"});
                $navbar.removeClass('navbar-fixed-top navbar-fix').fadeIn('slow');
                // 点亮导航栏[首页]标题
                if($activeA !== $navList.eq(0)) {
                    $activeA.removeClass('active');
                    $navList.eq(0).addClass('active');
                }
                break;

            // 设置当滚动至资讯就开始固定导航栏到顶部
            case scrollTop >= infoPoint:
                $navList.css({"color": "#333"})
                    .hover(function(ev) {
                        $(this).css({"color": "#4CBD71"});
                    }, function(ev) {
                        $(this).css({"color": "#333"});
                    });
                $Brand.attr("src", "images/top1-logo.png")
                    .css({"margin-top": "15px"});
                $navbar.addClass('navbar-fixed-top navbar-fix').fadeIn('slow');

                // 点亮导航栏标题的判断
                switch(true) {
                    // 资讯
                    case scrollTop < proPoint:
                        //点亮导航栏的[资讯]标题
                        if($activeA !== $navList.eq(1)) {
                            $activeA.removeClass('active');
                            $navList.eq(1).addClass('active');
                        }
                        break;

                    // 产品
                    case scrollTop >= proPoint && scrollTop < cooPoint:
                        if($activeA !== $navList.eq(2)) {
                            $activeA.removeClass('active');
                            $navList.eq(2).addClass('active');
                        }
                        break;

                    // 合作
                    case scrollTop >= cooPoint && scrollTop < aboPoint:
                        if($activeA !== $navList.eq(3)) {
                            $activeA.removeClass('active');
                            $navList.eq(3).addClass('active');
                        }
                        break;

                    // 我们
                    case scrollTop >= aboPoint:
                        if($activeA !== $navList.eq(4)) {
                            $activeA.removeClass('active');
                            $navList.eq(4).addClass('active');
                        }
                            break;
                } // 点亮标题判断结束

            break;
        }
    });

});











