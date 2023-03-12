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


  //usd

  let europrice = document.querySelector("#nav  ._usd .europrice");

  europrice.addEventListener("click", function () {
    let euroPriceText = this.firstElementChild.innerText

    this.parentNode.previousElementSibling.innerText = euroPriceText
  })

  let usdprice = document.querySelector("#nav ._usd .usdprice");

  usdprice.addEventListener("click", function () {
    let usdPriceText = this.firstElementChild.innerText

    this.parentNode.previousElementSibling.innerText = usdPriceText
  })





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


  });


  //card carusel

  var swiper = new Swiper(".mySwipers", {

    slidesPerView: 7,
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



  let getBasketProductList = document.querySelector(".basket-number");



  let tableicon = document.querySelector(".info-basket");



  $(getBasketProductList).click(function () {
    $(tableicon).toggle();


  });











});





//basket

let cardBtns = document.querySelectorAll("#card-prodacts-carousel .button");


let products = [];

if (localStorage.getItem("basket") != null) {
  products = JSON.parse(localStorage.getItem("basket"));
}





cardBtns.forEach(btn => {
  btn.addEventListener("click", function (e) {

    // e.preventDefault();
    let prodoctImage = this.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");



    let productName = this.parentNode.parentNode.firstElementChild.lastElementChild.innerText;

    // let productDesc = this.previousElementSibling.previousElementSibling.innerText;
    let productPrice = parseInt(this.parentNode.previousElementSibling.previousElementSibling.innerText);

    let productId = parseInt(this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));

    let existProduct = products.find(m => m.id == productId);

    if (existProduct != undefined) {
      existProduct.count += 1;
      // existProduct.total =existProduct.price * existProduct.count

    } else {

      products.push({

        id: productId,
        name: productName,
        img: prodoctImage,

        price: productPrice,
        count: 1,
        // total: productPrice * 1

      })
    }








    getBasketPrice(products);
    localStorage.setItem("basket", JSON.stringify(products));

    itemCountTotal(products);
    getBasketDatas();
    // getBasketCount(products);















  })


});


// function getBasketCount(arr) {
//   let sum = 0;
//   for (const item of arr) {
//     sum += item.count
//   }
//   document.querySelector("sup").innerText = sum;
// }

// getBasketCount(products)





function getBasketPrice(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item.price * item.count
  }

  document.querySelector("._total-price").innerText = "$" + sum + ".00"

  document.querySelector(".total-price-basket").innerText = "$" + sum + ".00"




}

getBasketPrice(products)






let totalItem = document.querySelector(".item-count")


itemCountTotal(products);

function itemCountTotal(products) {



  totalItem.innerText = products.length
  document.querySelector("sup").innerText = products.length


}















//basket add 

let tableBody = document.querySelector("tbody")






getBasketDatas()


function getBasketDatas() {

  if (products != null) {

    tableBody.innerHTML = "";

    for (const product of products) {


      tableBody.innerHTML += `

      <tr data-id ="${product.id}">
      
      
      <td class ="name">${product.name}</td>

      

      <td><span class="minus"></span><span></span><span class="plus"></span></td>

      <td class ="price">${product.count}X${product.price}</td>

      
      

      <td>
      

      <i class="fa-solid fa-trash delete-btn" style="color: black; cursor: pointer;"></i>
      </td>
      


      </tr>`





    }




    function deleteProduct(id) {
      products = products.filter(m => m.id != id);
      localStorage.setItem("basket", JSON.stringify(products));

    }

    let deleteIcons = document.querySelectorAll(".delete-btn");


    deleteIcons.forEach(icon => {

      icon.addEventListener("click", function () {

        let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        deleteProduct(id);
        this.parentNode.parentNode.remove();
        if (products.length == 0) {
          localStorage.removeItem("basket")
          // showAlert();

        }


        // getBasketCount(products);
        getBasketPrice(products);
        itemCountTotal(products);













      })
    });








  } else {


  }



}












// ad wishtlist


let cardWishlist = document.querySelectorAll("#card-prodacts-carousel .cardwishlist");



let likeProducts = [];

if (localStorage.getItem("wishtlist") != null) {
  likeProducts = JSON.parse(localStorage.getItem("wishtlist"));
}




cardWishlist.forEach(btn => {
  btn.addEventListener("click", function (e) {

    e.preventDefault();

    let prodoctImage = this.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src");




    let productName = this.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild.lastElementChild.innerText;



    let productPrice = parseInt(this.parentNode.parentNode.parentNode.nextElementSibling.lastElementChild.previousElementSibling.previousElementSibling.innerText);



    let productId = parseInt(this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));



    let existProduct = likeProducts.find(m => m.id == productId);

    if (existProduct != undefined) {


    } else {

      likeProducts.push({

        id: productId,
        name: productName,
        img: prodoctImage,

        price: productPrice,


      })
    }








    localStorage.setItem("wishtlist", JSON.stringify(likeProducts));
















  })


});






let eyes = document.querySelectorAll(".eyes");

let modal = document.querySelector(".modal");

eyes.forEach(item => {

  item.addEventListener("click", function (e) {

    e.preventDefault();

    document.getElementById("overlay").style.display = "block";

    modal.classList.remove("d-none");

    modal.children[2].children[0].children[0].innerText = this.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild.lastElementChild.innerText;

    modal.children[2].children[0].children[1].children[0].children[1].innerText = this.parentNode.parentNode.parentNode.nextElementSibling.lastElementChild.previousElementSibling.previousElementSibling.innerText * 2;

    modal.children[2].children[0].children[2].children[1].innerText = this.parentNode.parentNode.parentNode.nextElementSibling.lastElementChild.previousElementSibling.previousElementSibling.innerText;

    let img = this.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src");

    modal.children[1].children[0].setAttribute('src', img)

  })
});


let overlay = document.getElementById("overlay")


overlay.addEventListener("click", function () {


  modal.classList.add("d-none");

  overlay.style.display = "none"


})



let close = document.querySelector(".close");

close.addEventListener("click", function () {

  modal.classList.add("d-none");

  document.getElementById("overlay").style.display = "none";

  document.body.style.overflow = "block";
})




