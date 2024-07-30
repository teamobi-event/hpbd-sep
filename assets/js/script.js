const splide = new Splide('.splide', {
    type: 'fade',
    rewind: true,
    pagination: false,
    drag: false,
    speed: 800,
    easing: 'cubic-bezier(0.6,0.6,0,1)',
});
  
splide.mount();

splide.on('move', function() {
    const customNextSlide = splide.Components.Slides.getAt(0).slide;
    const customPrevSlide = splide.Components.Slides.getAt(splide.length - 1).slide;

    // // Get the index of the currently active slide.
    const activeIndex = splide.index;

    // Remove the custom classes from both slides first.
    customNextSlide.classList.remove('custom-next');
    customPrevSlide.classList.remove('custom-prev');

    if ((activeIndex === splide.length - 1) && activeIndex !== 0) {
        customNextSlide.classList.add('custom-next');
    }
    
    if (activeIndex === 0 && activeIndex !== splide.length - 1) {
        customPrevSlide.classList.add('custom-prev');
    }
});


let chanegMainSlideTriggerTime = 800 / 1.5;

document.querySelector('[data-fake-navigation="prev"]').addEventListener('click', function(){
    const newIndex = (splide.index - 1 + splide.length) % splide.length;

    if(newIndex === splide.length - 1){
        chanegMainSlideTriggerTime = 800 / 3;
    }else{
        chanegMainSlideTriggerTime = 800 / 1.5;
    }
    const prevSlideWhichGonnaActive = splide.Components.Slides.getAt(newIndex).slide;
    prevSlideWhichGonnaActive.classList.add('jumpShowPrev');
    setTimeout(()=>{
        document.querySelector('[data-main-navigation="prev"]').click()
    }, chanegMainSlideTriggerTime)
    function handleAnimationEnd() {
        prevSlideWhichGonnaActive.classList.remove('jumpShowPrev');
        prevSlideWhichGonnaActive.removeEventListener('animationend', handleAnimationEnd);
    }
    prevSlideWhichGonnaActive.addEventListener('animationend', handleAnimationEnd);
})

document.querySelector('[data-fake-navigation="next"]').addEventListener('click', function(){
    const newIndex = (splide.index + 1) % splide.length;

    if(newIndex === 0){
        chanegMainSlideTriggerTime = 800 / 3;
    }else{
        chanegMainSlideTriggerTime = 800 / 1.5;
    }
    const nextSlideWhichGonnaActive = splide.Components.Slides.getAt(newIndex).slide;
    nextSlideWhichGonnaActive.classList.add('jumpShowNext');
    setTimeout(()=>{
        document.querySelector('[data-main-navigation="next"]').click()
    }, chanegMainSlideTriggerTime)
    function handleAnimationEnd() {
        nextSlideWhichGonnaActive.classList.remove('jumpShowNext');
        nextSlideWhichGonnaActive.removeEventListener('animationend', handleAnimationEnd);
    }
    nextSlideWhichGonnaActive.addEventListener('animationend', handleAnimationEnd);
})



function stars() {
    let e = document.createElement('div');
    e.setAttribute('class', 'star');
    document.body.appendChild(e);
    e.style.left = Math.random() * + innerWidth + 'px';

    let size = Math.random() * 12;
    let duration = Math.random() * 3;

    e.style.fontSize = 12 + 'px';
    e.style.animationDuration = 2 + duration + 's';
    setTimeout(function () {
        document.body.removeChild(e);
    }, 5000);
}

setInterval(function () {
    stars()
}, 100);
