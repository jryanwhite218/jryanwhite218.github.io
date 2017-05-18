
var $ = jQuery.noConflict();

(function($) {
    "use strict";

    /*-------------------------------------------------*/
    /* =  loader
    /*-------------------------------------------------*/
    Pace.on("done", function(){
        $("#myloader").fadeOut(500);
    });
    /*-------------------------------------------------*/
    /* =  Menu
    /*-------------------------------------------------*/
    try {
        var width  =  $(window).width();
        
        $('.nav-product-toggle').on("click",function() {
            $('#nav-product').toggleClass('nav-close');
        });
        $('.menu-button').on("click",function() {
            $('#menu').toggleClass('open');
            $('#menu').addClass('animated slideInDown');
            if(width<1350){
                $('body').toggleClass('no-scroll');
            }
        });
        $('.menu-holder ul > li:not(.submenu) > a').click(function(){
            $('#menu').toggleClass('open');
        });
        $('.close-menu').on("click",function() {
            $('#menu').removeClass('animated slideInDown');
            $('#menu').addClass('animated fadeOutUp');
            setTimeout(function(){ 
                $('#menu').toggleClass('open');
                $('#menu').removeClass('animated fadeOutUp');
            },1000);
            if(width<1350){
                $('body').toggleClass('no-scroll');
            }
        });
        if(width<1350){
            $('#menu .menu-holder ul li a').on("click",function() {
                $('body').toggleClass('no-scroll');
            });
        }
    } catch(err) {

    };
    /*-------------------------------------------------*/
    /* =  Sticky menu
    /*-------------------------------------------------*/
    $(window).on('scroll', function (){

        var scroll  =  $(window).scrollTop();
        var height  =  $(window).height();
        var stickyHeader = $('.sticky-header');

        if( scroll >= 90 ) {
            stickyHeader.addClass("fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
        } else if ( scroll <= height ) {
            stickyHeader.removeClass("fixed-top fadeInDown");
        } else {
            stickyHeader.removeClass("fixed-top animated fadeInDown");
        }
    });
    /*-------------------------------------------------*/
    /* =  Back to top
    /*-------------------------------------------------*/
    $(window).on('scroll', function (){

        var scroll  =  $(window).scrollTop();
        var backTop = $('#back-to-top');
        
        if( scroll >= 1920 ) {
            backTop.addClass("visible");
        } else {
            backTop.removeClass("visible");
        }
    });
    /*-------------------------------------------------*/
    /* =  Slider
    /*-------------------------------------------------*/
    try {
        $(window).load(function() {
            $('.flexslider').flexslider({
                animation: "fade",
                controlNav: false,
                directionNav: false,
                useCSS: false,
                start: function(slider){
                    $('.slides').show();
                    $('.slides li').on("click",function(event) {
                        event.preventDefault();
                        slider.flexAnimate(slider.getTarget("next"));
                    });
                }
            });
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Count increment
    /*-------------------------------------------------*/
    try {
        $('#counters').appear(function(e) {
            $(e.target).find('.statistic span').countTo ({
                speed: 4000,
                refreshInterval: 60,
                formatter: function (value, options) {
                    return value.toFixed(options.decimals);
                }
            });
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Isotope
    /*-------------------------------------------------*/
    try {
        var $mainContainer=$('.gallery-items');
        $mainContainer.imagesLoaded( function(){

            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $(window).load(function () {
                    var $container=$('.gallery-items').isotope({itemSelector:'.one-item'});

                    $('#gallery .filters').on('click','li',function(){
                        var filterValue=$(this).attr('data-filter');$container.isotope({
                            filter:filterValue});
                    });
                    $('#gallery .filters').each(function(i,buttonGroup){
                        var $buttonGroup=$(buttonGroup);
                        $buttonGroup.on('click','li',function(){
                            $buttonGroup.find('.is-checked').removeClass('is-checked');
                            $(this).addClass('is-checked');
                        });
                    });
                });
            } else {
                var $container=$('.gallery-items').isotope({itemSelector:'.one-item'});

                $('#gallery .filters').on('click','li',function(){
                    var filterValue=$(this).attr('data-filter');$container.isotope({
                        filter:filterValue});
                });
                $('#gallery .filters').each(function(i,buttonGroup){
                    var $buttonGroup=$(buttonGroup);
                    $buttonGroup.on('click','li',function(){
                        $buttonGroup.find('.is-checked').removeClass('is-checked');
                        $(this).addClass('is-checked');
                    });
                });
            }
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Magnific popup
    /*-------------------------------------------------*/
    try {
        $('.gallery-items').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: '.lightbox',
                type: 'image',
                fixedContentPos: true,
                gallery: {
                    enabled:true
                },
                closeBtnInside: false,
                callbacks:{
                    beforeOpen:function(){
                        $('footer').addClass("not-visible");
                        $('#page-content').addClass("not-visible");
                    },
                    beforeClose:function() {
                        $('footer').removeClass("not-visible");
                        $('#page-content').removeClass("not-visible");
                    }
                }
            });
        });
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            closeBtnInside: false,
            fixedContentPos: true
        });
        $('.lightbox-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled:true
            },
            closeBtnInside: false
        });
        $('.open-popup').magnificPopup({
            type:'inline',
            midClick: true,
            removalDelay: 160,
            preloader: false,
            closeBtnInside: false,
            fixedContentPos: true
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Contact Form
    /*-------------------------------------------------*/
    var submitContact = $('#submit-contact'),
        message = $('#msg');

    submitContact.on('click', function(e){
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: false,
            data: $('#contact-form').serialize(),
            success: function(data) {

                if(data.info !== 'error'){
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
                }
            }
        });
    });
})(jQuery);

$(document).ready(function($) {
    "use strict";
    
    /*-------------------------------------------------*/
    /* =  Menu item active
    /*-------------------------------------------------*/
    var sections = $('section')
    , menu = $('.menu-holder')
    , menuHeight = menu.outerHeight()+100;

    $(window).on('scroll', function () {
        var curPos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - menuHeight,
                bottom = top + $(this).outerHeight();

            if (curPos >= top && curPos <= bottom) {
                menu.find('a').removeClass('active');
                
                menu.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });
    /*-------------------------------------------------*/
    /* =  Scroll between sections
    /*-------------------------------------------------*/
    $('.menu-holder ul li a[href*=#], #back-to-top a[href*=#]').on("click",function(event) {
        var $this = $(this);
        var offset = -70;
        $.scrollTo( $this.attr('href') , 850, { easing: 'swing' , offset: offset , 'axis':'y' } );
        event.preventDefault();
    });
    /*-------------------------------------------------*/
    /* =  Carousel
    /*-------------------------------------------------*/
    try {
        $(".service-carousel").owlCarousel({
            loop:true,
            animateOut: 'fadeOut',
            items:1,
            autoplay:true,
            autoplayHoverPause:true,
            mouseDrag:true,
            dots:true
        });
        $(".person-carousel").owlCarousel({
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:4,
                    loop:false
                }
            }
        });
        $(".testimonials-carousel").owlCarousel({
            loop:true,
            animateOut: 'fadeOut',
            animateIn: 'slideInUp',
            items:1,
            autoplay:true,
            autoplayHoverPause:true,
            mouseDrag:false,
            dots:true
        });
        $('.project-carousel').owlCarousel({
            items:1,
            dots:true
        });
        $(".image-carousel").owlCarousel({
            loop:true,
            animateOut: 'fadeOut',
            items:1,
            autoplay:true,
            autoplayHoverPause:false,
            dots:true
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Parallax
    /*-------------------------------------------------*/
    try {
        $('.parallax').scrolly({bgParallax: true});
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Slider Background Move
    /*-------------------------------------------------*/
    try {
        var sliderWidth = $(window).width();
        if(sliderWidth>1200){
            var movementStrength = 25;
            var height = movementStrength / $(window).height();
            var width = movementStrength / $(window).width();
            $(".flexslider").on("mousemove",function(e) {
                var pageX = e.pageX - ($(window).width() / 2);
                var pageY = e.pageY - ($(window).height() / 2);
                var newvalueX = width * pageX * -1 - 25;
                var newvalueY = height * pageY * -1 - 50;
                $('.flexslider .slides').css("background-position", newvalueX+"px     "+newvalueY+"px");
            });
        }
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Skills
    /*-------------------------------------------------*/
    try {
        $('#skills').appear(function(e) {
            $(e.target).find('li span').each(function(){
                $(this).animate({
                    width:jQuery(this).attr('data-percent')
                },2000);
            });
        });
    } catch(err) {

    }
    /*-------------------------------------------------*/
    /* =  Project div
    /*-------------------------------------------------*/
    try {
        var projectWidth = $(window).width();
        if(projectWidth>1200){
            var divHeight = $('.project').height();
            $( ".project-carousel .item" ).each(function() {
                $( this ).css({
                    'height': divHeight + 'px'
                });
            });
        }
    } catch(err) {

    }
});
