$(window).on("scroll load resize", function(){

  if($(window).scrollTop() > 0) {
    $('.navbar').addClass("navbar-shadow");
  }
  else {
    $('.navbar').removeClass("navbar-shadow");
  }

});

$(document).ready(function () {

  var links = $('.nav-link');
  $.each(links, function (key, va) {
    if (va.href == document.URL) {
      $(this).parent().addClass('active');
    }
  });

  var c, currentScrollTop = 0,
  navbar = $('.navbar');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();

    currentScrollTop = a;

    if (c < currentScrollTop && a > b + b && !$("html").hasClass("nav-open")) {
      navbar.addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });

});

$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');


/*!
=========================================================
* Material Kit - v2.0.4
=========================================================
* Product Page: https://www.creative-tim.com/product/material-kit
* Copyright 2018 Creative Tim (http://www.creative-tim.com)
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

$(document).ready(function() {

    $('body').bootstrapMaterialDesign();
    window_width = $(window).width();
    $navbar_collapse = $('.navbar').find('.navbar-collapse');

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (materialKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    materialKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo("body").click(function() {
      $('html').removeClass('nav-open');
      materialKit.misc.navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function() {
        $toggle.removeClass('toggled');
      }, 550);
    });

    $('html').addClass('nav-open');
    materialKit.misc.navbar_menu_visible = 1;
  }
});

materialKit = {
  misc: {
    navbar_menu_visible: 0,
    window_width: 0,
    transparent: true,
    colored_shadows: true,
    fixedTop: false,
    navbar_initialized: false,
    isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
  },
};
