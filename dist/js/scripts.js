$(document).ready(function(){
  setTimeout(function(){
    $('nav').addClass('ani-in')
  }, 400)

  $('.internal-nav-link').click(function(e){
    e.preventDefault();
    $('#content-container section').each(function(){
      $(this).removeClass('active');
    });
    var section = $(this).attr('href');
    $(section).addClass('active');
  });
})
