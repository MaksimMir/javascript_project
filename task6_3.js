window.addEventListener('load', () => {
    const slides = document.querySelectorAll('.slider-box img');
    const line = document.querySelector('.slider-line');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let index = 0;
    
    let width = window.getComputedStyle(line.parentNode).width;;

    for (const slide of slides) {
        slide.style.width = width;
    };

    let pos = 0;
    line.style.width = 100 * slides.length + '%';

    
    prev.addEventListener('click', (evt) => {
        evt.preventDefault();

        if(index < slides.length - 1) index++;                       
        slideShow(width, pos);
    });

    next.addEventListener('click', (evt) => { 
        evt.preventDefault();

        if(index > 0) index--;              
        slideShow(width, pos); 
    });

    function slideShow(w, p) {
        p = w.replace(/px/g, '') * index; 
        line.style.transition = 'all 1s'; 
        line.style.marginLeft = -p + 'px';
    }
})