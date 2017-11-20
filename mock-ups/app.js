document.addEventListener('DOMContentLoaded', function(){

     //wlacza wylacza mobilna nawigacje
    $('.main-nav-toogle').on('click', function() {
            $('body').toggleClass('nav-show');
        });

    //po kliknieciu na link w menu przewijam strone
    $('.main-nav a').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        const $target = $(href);

        $('body, html').animate({
            scrollTop : $target.offset().top
        }, 1500);
    })
      
});