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


//convert usd 


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



let getBasketProductList = document.querySelector(".basket-number");


  
  let tableicon = document.querySelector(".info-basket");



  $(getBasketProductList).click(function () {
    $(tableicon).toggle();


  });




});


//basket


let tableBody = document.querySelector("tbody")

let products = JSON.parse(localStorage.getItem("basket"))






getBasketDatas()

function getBasketDatas() {

    if (products != null) {



        for (const product of products) {
            tableBody.innerHTML += `
            <tr data-id ="${product.id}">
            <td>
            <img src="${product.img}" alt="" class ="images-product">
            </td>
            <td class ="product-name">${product.name}</td>


            
            
            <td class = "price">${product.price}</td>


            <td><span class="minus">-</span><span class ="count">${product.count}</span><span class="plus">+</span></td>

            <td class="total-price-basket">${product.price * product.count}</td>
            

            <td>

            <i class="fa-solid fa-xmark delete-btn " style="color: black; cursor: pointer;"></i>
            </td>


            </tr>`




           

        }

        getBasketCount(products);
        getBasketPrice(products)






    } else {

        showAlert();
    }



}

// getBasketDatas()




function showAlert(e) {

    document.querySelector(".info-basket").classList.add("d-none");
    document.querySelector(".basket-button").classList.remove("basket-btn");

   
}





function getBasketCount(products) {
  

    
 
  document.querySelector("sup").innerText = products.length 

}



function getBasketPrice(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.price * item.count
    }

    document.querySelector("._total-price").innerText = "$" + sum + ".00"

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
            showAlert();

        }
        showTotalPrice();
        getBasketCount(products);
        getBasketPrice(products)












    })
});




function showTotalPrice() {
    if (products != null) {
        let tittle = document.querySelector(".total");
        

        let sum = 0;
        for (const product of products) {
            sum += parseInt(product.price * product.count);
        }
        tittle.nextElementSibling.innerHTML = sum + "$";
    }
}
showTotalPrice();





let minusIcons = document.querySelectorAll("tbody tr td .minus")

for (const minusIcon of minusIcons) {
    minusIcon.addEventListener("click", function () {
        for (const product of products) {
            if (product.id == minusIcon.parentNode.parentNode.getAttribute("data-id")) {
                if (minusIcon.nextElementSibling.innerText == 1) {
                    return;
                }
                minusIcon.nextElementSibling.innerText--;
                
                product.count--;
              
                minusIcon.parentNode.nextElementSibling.innerText = product.price * product.count;
            }
        }
        localStorage.setItem("basket", JSON.stringify(products))

        showTotalPrice()
        getBasketCount(products)
        getBasketPrice(products)
    })
}




let plusIcons = document.querySelectorAll("tbody tr td .plus")

for (const plusIcon of plusIcons) {

    plusIcon.addEventListener("click", function () {


        for (const product of products) {
            if (product.id == plusIcon.parentNode.parentNode.getAttribute("data-id")) {
                plusIcon.previousElementSibling.innerText++;



                product.count++;                                      

                plusIcon.parentNode.nextElementSibling.innerText = product.price * product.count;
            }
        }

        localStorage.setItem("basket", JSON.stringify(products));  

        showTotalPrice()
        getBasketCount(products)
        getBasketPrice(products)                                                          
    })
}