$(document).ready(function(){
  setTimeout(function(){
    $('body').addClass('ani-in')
    setTimeout(function(){
      $('#home').addClass('active')
    }, 1200);
  }, 2000)

  $('.internal-nav-link').click(function(e){
    e.preventDefault();
    $('#content-container section').each(function(){
      $(this).removeClass('active');
    });
    var section = $(this).attr('href');
    $(section).addClass('active');
  });
})
