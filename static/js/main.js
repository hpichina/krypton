(function($) {
  
  function init_tabs() {
    $('.tab a').click(function() {
      console.log('clicking tab');
      var content = '.' + $(this).attr('data-tab');
      $('.tab-content').not(content).hide();
      $(content).fadeIn();
      var $li = $(this).parent();
      $li.siblings().removeClass('active');
      $li.addClass('active');
    })
  }

  function init_nav() {
    var page = $('body').attr('data-page') || 'index';
    $('.nav li[data-page="' + page + '"]').addClass('active');
  }

  function init_faq() {
    $('.faq-list li h4').click(function() {
      $(this).next().slideToggle();
    });
  }

  function init_page_nav() {
    $('.page-nav a').click(function(e) {
      e.preventDefault();
      var ele = $(this).attr('href');

      $('html, body').animate({
          scrollTop: $(ele).offset().top
      }, 500);
    });
  }

  $(document).ready(function() {
    console.log('initializing');
    init_nav();
    init_tabs();
    init_faq();
    init_page_nav();
  });

})(jQuery || window.jQuery);