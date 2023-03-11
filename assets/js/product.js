$(document).ready(function () {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });





  //slide

  
$('._slider').slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow:'<i class="fa-solid fa-chevron-left  slider-icon"></i>',
  nextArrow:'<i class="fa-solid fa-chevron-right"></i>'
});

let mainImg = document.querySelector(".main-img img");


let sliderImg = document.querySelectorAll("._slider .slide")

for (const item of sliderImg) {
  
  item.addEventListener("click",function(){

    mainImg.setAttribute("src",this.firstElementChild.getAttribute("src"));
  })
}
 





  //tab menu 

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