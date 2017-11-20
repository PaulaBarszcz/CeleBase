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
    
    class Slider {
        constructor(options) {
            this.counter = 0;
            this.options = options;
            this.slider = $(this.options.selector);
            this.prev = this.slider.find('.main-slider-prev');
            this.next = this.slider.find('.main-slider-next');
            this.slides = this.slider.find('.main-slide');
        }

        prevSlide() {
            this.counter--;
            if (this.counter < 0) {
                this.counter = this.slides.length-1;
            }
            this.slides.removeClass('active');
            this.slides.eq(this.counter).addClass('active');
        }

        nextSlide() {
            this.counter++;
            if (this.counter > this.slides.length-1) {
                this.counter = 0;
            }
            this.slides.removeClass('active');
            this.slides.eq(this.counter).addClass('active');
        }

        bindButtons() {
            this.next.on('click', () => {
                this.nextSlide();
            });
            this.prev.on('click', () => {
                this.prevSlide();
            });
        }
    }

    const actors = [
        {"id": 1,
        "name": "Antonio",
        "surname": "Banderas",
        "gender": "male",
        "nationality": "Spanish",
        "photo": "http://www.dailygossip.org/wp-content/uploads/2017/03/antonio-banderas.jpg",
        "imdb": "http://www.imdb.com/name/nm0000104/"
        },
        {"id": 2,
        "name": "Christian",
        "surname": "Bale",
        "gender": "male",
        "nationality": "Welsh",
        "photo": "https://www.alux.com/wp-content/uploads/2017/04/Christian-Bale-Net-Worth.jpg",
        "imdb": "http://www.imdb.com/name/nm0000288/"
        },
        {"id": 3,
        "name": "Anne",
        "surname": "Hathaway",
        "gender": "female",
        "nationality": "American",
        "photo": "https://www.hdwallpapers.in/walls/anne_hathaway_3-normal.jpg",
        "imdb": "http://www.imdb.com/name/nm0004266/"
        }
    ]

    console.log('actors[0].gender: -------',actors[0].surname);


    const slider = new Slider({
        selector : '#mainSlider'
    })
    slider.bindButtons();

    let coverRed = document.querySelector(".coverRed");
    console.log(coverRed);
    coverRed.addEventListener("click", function(){
        console.log("red");
        if (coverRed.style.opacity!=="1") {
            coverRed.style.opacity = 1; 
        }else {
            coverRed.style.opacity = 0; 
        }
    })

    let coverGreen = document.querySelector(".coverGreen");
    console.log(coverGreen);
    coverRed.addEventListener("mouseover", function(){
        console.log("green");
        if (coverGreen.style.opacity!=="1") {
            coverGreen.style.opacity = 1; 
        }else {
            coverGreen.style.opacity = 0; 
        }
    })



    let quizOptions = document.querySelector(".quiz-text");
    console.log(quizOptions);

    quizOptions.addEventListener("click", function(){
        console.log("click option");
    })


});