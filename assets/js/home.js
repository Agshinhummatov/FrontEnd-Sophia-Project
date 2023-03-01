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


  //slider



  $("#slideshow > div:gt(0)").hide();

  var buttons = "<button class=\"slidebtn prev\"><i class=\"fa fa-chevron-circle-left\"></i></button><button class=\"slidebtn next\"><i class=\"fa fa-chevron-circle-right\"></i></button\>";

  var slidesl = $('.slideitem').length
  var d = "<li class=\"dot active-dot\">&bull;</li>";
  for (var i = 1; i < slidesl; i++) {
    d = d + "<li class=\"dot\">&bull;</li>";
  }
  var dots = "<ul class=\"slider-dots\">" + d + "</ul\>";

  $("#slideshow").append(dots).append(buttons);
  var interval = setInterval(slide, 3000);

  function intslide(func) {
    if (func == 'start') {
      interval = setInterval(slide, 3000);
    } else {
      clearInterval(interval);
    }
  }

  function slide() {
    sact('next', 0, 1200);
  }

  function sact(a, ix, it) {
    var currentSlide = $('.current');
    var nextSlide = currentSlide.next('.slideitem');
    var prevSlide = currentSlide.prev('.slideitem');
    var reqSlide = $('.slideitem').eq(ix);

    var currentDot = $('.active-dot');
    var nextDot = currentDot.next();
    var prevDot = currentDot.prev();
    var reqDot = $('.dot').eq(ix);

    if (nextSlide.length == 0) {
      nextDot = $('.dot').first();
      nextSlide = $('.slideitem').first();
    }

    if (prevSlide.length == 0) {
      prevDot = $('.dot').last();
      prevSlide = $('.slideitem').last();
    }

    if (a == 'next') {
      var Slide = nextSlide;
      var Dot = nextDot;
    }
    else if (a == 'prev') {
      var Slide = prevSlide;
      var Dot = prevDot;
    }
    else {
      var Slide = reqSlide;
      var Dot = reqDot;
    }

    currentSlide.fadeOut(it).removeClass('current');
    Slide.fadeIn(it).addClass('current');

    currentDot.removeClass('active-dot');
    Dot.addClass('active-dot');
  }

  $('.next').on('click', function () {
    intslide('stop');
    sact('next', 0, 400);
    intslide('start');
  });//next

  $('.prev').on('click', function () {
    intslide('stop');
    sact('prev', 0, 400);
    intslide('start');
  });//prev

  $('.dot').on('click', function () {
    intslide('stop');
    var index = $(this).index();
    sact('dot', index, 400);
    intslide('start');
  });//prev
  //slideshow





});




const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;

    optionMenu.classList.remove("active");
  });
});