(function($) {
  'use strict';
  ////////////////on load page////////////////////////////////

  // $( "#" ).click(function() {
  //
  //   });
  //
  // $( "#" ).click(function() {
  //
  //   });
  //
  // $(document).ready(function(){
  //
  //
  //   if($(window).width() > 1024) {
  //
  //     });
  //   }
  //   else {
  //     $( window ).on( "load", function() {
  //
  //     });
  //   }
  // });

  //////////////delegation//////////////////////////////////

  // $('body').on("click","#playDesk",function(){
  //   $('.video').css('display','block');
  //   $('body').css('overflow','hidden');
  //   $('.video__container').html('<video src="dist/media/toulouse.mp4" autoplay poster="" class="video__file"></video>');
  //
  // });







  $('#nav').hide();

  $( "#title" ).click(function() {
      $('#nav').fadeToggle(1000);
    });

  $('#jesus').hide();

  $( "#fire" ).click(function() {
      $('#jesus').fadeToggle(1000);
    });

  $('#jesus').hide();

  $( "#fire" ).click(function() {
      $('#graff').fadeToggle(1000);
  });
})(jQuery);



var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
