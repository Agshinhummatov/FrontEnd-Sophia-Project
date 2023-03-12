
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










  // ad basket

  let getBasketProductList = document.querySelector(".basket-number");


  
  let tableicon = document.querySelector(".info-basket");



  $(getBasketProductList).click(function () {
    $(tableicon).toggle();


  });




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

function itemCountTotal(products){

 

  totalItem.innerText =  products.length 
  document.querySelector("sup").innerText = products.length 
  

}






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

    // itemCountTotal(products);
    // getBasketCount(products);
    // getBasketPrice(products);
    

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

    // showAlert();
  }



}










});














