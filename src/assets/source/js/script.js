// Preloader js    
$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

(function ($) {
  'use strict';

	// navbarDropdown
	if ($(window).width() < 992) {
		$('.navigation .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
	}
  
  // product Slider
  // $('.product-image-slider').slick({
  //   autoplay: false,
  //   infinite: true,
  //   arrows: false,
  //   dots: true,
  //   customPaging: function (slider, i) {
  //     var image = $(slider.$slides[i]).data('image');
  //     return '<img class="img-fluid" src="' + image + '" alt="product-image">';
  //   }
  // });

  // Product slider
  // $('.product-slider').slick({
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   dots: false,
  //   arrows: false,
  //   responsive: [{
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1
  //       }
  //     }
  //   ]
  // });
  if (typeof (window.Layout) == "undefined") {
    window.Layout = new Object();
}

(function (Layout) {

    //return
    Layout.Init = Init;

    function Init() {
        InitMainNav();
    }

    function InitMainNav() {
        var mainNav$ = $('#siteNav .mainNav:first');
        var burger$ = $('#mainNavBurger');
        var nodeToggles$ = mainNav$.find('.toggle');
        burger$.on('click', function () {
            if ($(this).hasClass('open')) {
                nodeToggles$.removeClass('open');
                burger$.removeClass('open');
                mainNav$.removeClass('open');
            } else {
                burger$.addClass('open');
                mainNav$.addClass('open');
            }
        });
        nodeToggles$.on('click', function (e) { _handleClick(e, false); });
        nodeToggles$.on('keydown', function (e) { _handleClick(e, true); });
      

        function _handleClick(e, isKeyPress) {
            var key = e.keyCode || e.which;
            if (isKeyPress && key !== 13) { return; }
            e.preventDefault();
            var this$ = $(e.currentTarget);
            var sibToggles$ = this$.closest('li').siblings('li').find('.toggle');
            var kidToggles$ = this$.siblings('ul').find('.toggle');
            if (this$.hasClass('open')) {
                sibToggles$.removeClass('open');
                kidToggles$.removeClass('open');
                this$.removeClass('open');
            } else {
                sibToggles$.not(this$).removeClass('open');
                kidToggles$.removeClass('open')
                this$.addClass('open');
            }
        }
    }


})(Layout);

jQuery(document).ready(function () {    
    Layout.Init();
});

})(jQuery);