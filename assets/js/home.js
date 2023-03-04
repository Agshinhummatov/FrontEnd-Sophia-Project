$(document).ready(function () {


  //flag 
  $('.ui.dropdown')
    .dropdown();


  $("#country").change(function () {
    if ($(this).val() == 'ma') {
      $('#state').html('  <option value="1">State1</option><option value="2">State2</option>');
    } else if ($(this).val() == 'ps') {
      $('#state').html('  <option value="1">State3</option><option value="2">State4</option>');
    } else if ($(this).val() == 'tr') {
      $('#state').html('  <option value="1">State5</option><option value="2">State6</option>');
    } else if ($(this).val() == 'us') {
      $('#state').html('  <option value="1">State7</option><option value="2">State8</option>');
    } else {
      $('#state').html('');
    }


  });







  //cardsilder


  $('.carousel .carousel-item').each(function () {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) { next = next.next(); if (!next.length) { next = $(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); }
  });




  //silder 


  var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },

  });


  //card carusel

  var swiper = new Swiper(".mySwipers", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-paginations",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },



  });


  //gozu legv edir duzeldecem

  // let iconsWishlist = document.querySelectorAll("#card .swiper-slide");

  // iconsWishlist.forEach(iconWishlist => {

  //   iconWishlist.addEventListener("mouseover",function(){

  //     let icons = document.querySelector(".icon-wishlist")

  //     icons.classList.remove("d-none")



  //   })

  // });

  // iconsWishlist.forEach(iconWishlist => {

  //   iconWishlist.addEventListener("mouseleave",function(){

  //     let icons = document.querySelector("#card .mySwipers .swipers  .swiper-slide .card-prodact .icon-wishlist ")


  //     icons.classList.add("d-none")



  //   })

  // });



  /// tab menu carusel


  const tabLink = document.querySelectorAll(".tab-menu-link");
  const tabContent = document.querySelectorAll(".tab-bar-content");

  tabLink.forEach((item) => {
    item.addEventListener("click", activeTab);
  });

  function activeTab(item) {
    const btnTarget = item.currentTarget;
    const content = btnTarget.dataset.content;

    tabContent.forEach((item) => {
      item.classList.remove("is-active");
    });

    tabLink.forEach((item) => {
      item.classList.remove("is-active");
    });

    document.querySelector("#" + content).classList.add("is-active");
    btnTarget.classList.add("is-active");
  }









});




