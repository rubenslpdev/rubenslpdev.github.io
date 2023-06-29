const swiper = new Swiper('.sample-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 300,
   coverflowEffect: {
    rotate: 30,
    slideShadows: true
  },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });