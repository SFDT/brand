 /**
 * Functionality specific
 *
 * Provides helper functions to enhance the theme experience.
 */

var $ = jQuery;
var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
var hash;

var windowWidth;
var containerWidth;
var headerShrinked = false;
var connect_content = '';
var scrollOffset = -65;
var $news;

( function( $ ) {
  $.fn.equalizeHeights = function(){
    return this.height( Math.max.apply(this, $(this).map(function(i,e){return $(e).height()}).get() ) )
  }
  
  function scrollToElement(selector, time, verticalOffset, callback) {
    time = typeof(time) != 'undefined' ? time : 500;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    t = ($(window).scrollTop() - offsetTop);
    if (t <= 0) t *= -1;
    t = parseInt(t * .5);
    if (t < time) t=time;
    if (t > 1500) t=1500;
    
    $('html, body').animate({
      scrollTop: offsetTop
    }, t, '', callback);
  } 
  
  
  var body    = $( 'body' ),
      _window = $( window );

  
  ( function() {
    var ww = $(window).width();
    
    $('.navigation').affix({
      offset: {     
        top: $('.navigation').offset().top,
        bottom: ($('#site-footer').outerHeight(true)) + 80
      }
    });
    
    
    // Cache selectors
    var lastId;
    var $siteNavWrapper= $(".navigation");
    var topMenu = $(".main-nav", $siteNavWrapper);
    var headerHeight = $siteNavWrapper.outerHeight();
    
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top+1;
//          offsetTop = href === "#" ? 0 : $(href).offset().top-headerHeight+1;
      $('html, body').stop().animate({ 
        scrollTop: offsetTop
      }, 500);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+headerHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";

       if (lastId !== id) {
          lastId = id;
          // Set/remove active class
          menuItems.parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");
       }                   
    });
   
   
    
    if($('.guidelines-wrapper').length > 0) {
      $('.guidelines-wrapper').each(function() {
        var $container = $(this);
        var $items = $('.section', $container);
//        $('.item:eq(0)', $container).addClass('active');
        
        $items.each(function() {
          var $item = $(this);
          var $itemHeader = $('.section-header', $item);
          var $itemContent = $('.section-content', $item);
          
          if($item.hasClass('active')) {
            $itemContent.stop().slideToggle();
          }
          
          $itemHeader.click(function(e) {
            e.preventDefault();
            $itemContent.stop().slideToggle();
            $item.toggleClass('active');
            
            //max one item will open at a time
//            if($item.hasClass('active')) {
//              $itemContent.stop().slideToggle();
//              $item.toggleClass('active');
//            } else {
//              $curActive = $('.active', $container);
//              $('.item-content', $curActive).slideToggle();
//              $curActive.toggleClass('active');
//              $itemContent.stop().slideToggle();
//              $item.toggleClass('active');
//            }

              //one item will alwaysopen at a time
//            if($item.hasClass('active')) {
//              // do nothing
//            } else {
//              $curActive = $('.active', $container);
//              $('.item-content', $curActive).slideToggle();
//              $curActive.toggleClass('active');
//              $itemContent.stop().slideToggle();
//              $item.toggleClass('active');
//            }
          });
        });
      });
    }
    
  } )();
  
} )( jQuery );