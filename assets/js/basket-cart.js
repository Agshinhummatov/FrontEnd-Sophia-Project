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


});




let tableBody = document.querySelector("tbody")

let products = JSON.parse(localStorage.getItem("basket"))






getBasketDatas()

function getBasketDatas() {

    if (products != null) {



        for (const product of products) {
            tableBody.innerHTML += `
            <tr data-id ="${product.id}">
            <td>
            <img src="${product.img}" alt="">
            </td>
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
        getBasketPrice(products)






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



function getBasketCount(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }
    document.querySelector("sup").innerText = sum;

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
        // this.parentNode.parentNode.remove();
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
        tittle.classList.remove("d-none");
        tittle.nextElementSibling.classList.remove("d-none");

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
                // let nativePrice = product.price/product.count; 
                product.count--;
                // product.price = nativePrice*product.count;
                // res = nativePrice * product.count;
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



                product.count++;                                      //mehsulun sayini artirdiqca...

                plusIcon.parentNode.nextElementSibling.innerText = product.price * product.count;
            }
        }

        localStorage.setItem("basket", JSON.stringify(products));  //en sonda yene locala yazdiririq neticeni

        showTotalPrice()
        getBasketCount(products)
        getBasketPrice(products)   //totalda gosteririk                                                          
    })
}