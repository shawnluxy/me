
function main() {

(function () {
   'use strict';
   
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 50
            }, 1000);
            return false;
          }
        }
      });

    $('#header').height($(window).innerHeight());
    var h = $(window).innerHeight()-72;
    $($('#nav').parent()).css('margin-top',h);

    $("#toTop").click(function () {
        $("html, body").animate({scrollTop: 0}, 800);
    });

  	// affix the navbar after scroll below header
    $('#nav').affix({
          offset: {
            top: h
          }
    });

  // meteor animation
  function meteor(nums) {
    function _create(m) {
      var elem = m.elem || $('<div>').addClass("meteor").addClass(m.name).appendTo(".intro");
        m.elem = elem;
      var timer = setInterval(function() {
        if (elem.offset().top < $(window).height() && elem.offset().top > -m.height && elem.hasClass("move")) {
          return;
        } else {
          var left = Math.round(Math.random() * $(window).width() * 0.8 + $(window).width() * 0.1),
            top = -m.height;
          clearInterval(timer);
          var dur = Math.round(Math.random() * (m.durRange[1] - m.durRange[0]) + m.durRange[0]) * 1000,
            delay = Math.round(Math.random() * 4 + 2) * 500;
          elem.removeClass("move");
          setTimeout(function() {
            elem.attr("style", 'left: ' + left + 'px;top: ' + top + 'px;animation-duration: ' + dur + 'ms;-webkit-animation-duration: ' + dur + 'ms;animation-delay: ' + delay + 'ms;-webkit-animation-delay: ' + delay + 'ms;animation-iteration-count: ' + 1 + ';-webkit-animation-iteration-count: ' + 1 + ';').addClass('move');
          }, 100);
          setTimeout(function() {
            _create(m);
          }, delay + dur);
        }
      }, 100);
      return m;
    }
    var meteors = {
      name: "shine",
      height: 272,
      durRange: [3, 6]
    };
    
    for (var i = 0; i < nums; i++) {
      var _m = $.extend({}, meteors);
      _create(_m);
    }
  }
  meteor(3);

  // hide header
  $(document).ready(function(e){
    var intro_text = $('.intro-text').children();
    var intro_h = [];
    var offset = 400;
    for(var i=0; i<intro_text.length; i++){
      offset += $(intro_text[i]).outerHeight(true);
      intro_h.push($(window).height()-offset);
    }
    $(document).scroll(function(){
      for(var i=0; i<intro_text.length; i++){
        if($(window).scrollTop() > intro_h[i]){
          $(intro_text[i]).hide();
        } else{
          $(intro_text[i]).show();
        }
      }
    });
  });

	// skills chart
	$(document).ready(function(e) {
  	var index=0;
  	$(document).scroll(function(){
  		var top = $('#about').height()-$(window).scrollTop();
  		// console.log(top);
  		if(top<-500){
  			if(index==0){	
  				$('.chart').easyPieChart({
  					easing: 'easeOutBounce',
  					onStep: function(from, to, percent) {
  						$(this.el).find('.percent').text(Math.round(percent));
  					}
  				});
  			}
  			index++;
  		}
  	})
	});
  // skill hover
  var skills = $('.skill-items').children();
  $(skills[2]).hover(function(){$($(this).children()[1]).text("jQuery");},
    function(){$($(this).children()[1]).text("JavaScript");}
  );
  $(skills[6]).hover(function(){$($(this).children()[1]).text("Debian");},
    function(){$($(this).children()[1]).text("Linux");}
  );

	// skills isotope filter
  $(window).load(function() {
      var $container = $('.skill-items');
      $container.isotope({
          filter: '*',
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
          }
      });
      $('.cat a').click(function() {
          $('.cat .active').removeClass('active');
          $(this).addClass('active');
          var selector = $(this).attr('data-filter');
          $container.isotope({
              filter: selector,
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
              }
          });
          return false;
      });
  });

  // CounterUp
	$(document).ready(function( $ ) {
		if($("span.count").length > 0){	
			$('span.count').counterUp({
					delay: 10, // the delay time in ms
			time: 1500 // the speed time in ms
			});
		}
	});
	
  // Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	

}());

}
main();
