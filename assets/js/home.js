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


  });


  //card carusel

  var swiper = new Swiper(".mySwipers", {
    loop: true,
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





//basket

let cardBtns = document.querySelectorAll("#card-prodacts-carousel .button");


let products = [];

if (localStorage.getItem("basket") != null) {
  products = JSON.parse(localStorage.getItem("basket"));
}





cardBtns.forEach(btn => {
  btn.addEventListener("click", function (e) {

    e.preventDefault();
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

        id: productId,                              // gotrduyum elementleri add edirem
        name: productName,
        img: prodoctImage,

        price: productPrice,
        count: 1,
        // total: productPrice * 1

      })
    }






    
    getBasketPrice(products);
    localStorage.setItem("basket", JSON.stringify(products));

    getBasketDatas(products)
    getBasketCount(products);
    

   
    
    
    
   
    
    





  })


});


function getBasketCount(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item.count
  }
  document.querySelector("sup").innerText = sum;
}

getBasketCount(products)





function getBasketPrice(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item.price * item.count
  }

  document.querySelector("._total-price").innerText = "$" + sum + ".00"

}

getBasketPrice(products)


// function getBasketPrice(arr){
//   let sum = 0;
//   for (const item of arr) {
//       sum += item.price
//   }

//   document.querySelector("._total-price").innerText =  "$" + sum +".00"

// }

// getBasketPrice(products)








//basket add 

let tableBody = document.querySelector("tbody")

// let products = JSON.parse(localStorage.getItem("basket"))


// cardBtns.forEach(btn => {

//   btn.addEventListener("click", function (e) {

//     e.preventDefault();
//     localStorage.setItem("basket", JSON.stringify(products));
//     localStorage.getItem("basket",JSON.stringify(products))
//     getBasketDatas()

//   })


// });




getBasketDatas(products)

function getBasketDatas(products) {

  if (products != null) {



    for (const product of products) {
      
      tableBody.innerHTML = "";

      tableBody.innerHTML += `
            <tr data-id ="${product.id}">
            
            <td>${product.name}</td>

            <td>$${product.price}</td>

            <td><span class="minus">-</span><span>${product.count}</span><span class="plus">+</span></td>

            <td>$${product.price * product.count}</td>
            

            <td>

            <i class="fa-solid fa-xmark delete-btn" style="color: black; cursor: pointer;"></i>
            </td>


            </tr>`






    }
    
    
    getBasketCount(products);
    getBasketPrice(products);
    // console.log(deleteProducts(document.querySelectorAll(".delete-btn")));
    







  } else {

    showAlert();
  }



}

// getBasketDatas()




function showAlert(e) {

  document.querySelector(".info-basket").classList.add("d-none");

  //eyer data yoxdusa bos Total sozunu sil
  // document.querySelector("#basket .clear .clear-button").classList.add("d-none")
  // e.preventDefault();
}



// function getBasketCount(arr) {
//   let sum = 0;
//   for (const item of arr) {
//     sum += item.count
//   }
//   document.querySelector("sup").innerText = sum;

// }



//  delete


function deleteProduct(id) {
  products = products.filter(m => m.id != id);
  localStorage.setItem("basket", JSON.stringify(products));

}

let deleteIcons = document.querySelectorAll(".delete-btn");

deleteProducts(deleteIcons);

function deleteProducts(deleteIcons){

  
deleteIcons.forEach(icon => {

  icon.addEventListener("click", function () {
    let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
    deleteProduct(id);
    // this.parentNode.parentNode.remove();
    if (products.length == 0) {
      localStorage.removeItem("basket")
      showAlert();

    }


    // showTotalPrice();

    getBasketCount(products);
    getBasketPrice(products);
    












  })
});


}








