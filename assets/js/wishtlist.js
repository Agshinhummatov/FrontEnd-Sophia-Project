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


    //usd -convert

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






  

let tableBody = document.querySelector("tbody")



let products = JSON.parse(localStorage.getItem("wishtlist"))






getBasketDatas()

function getBasketDatas() {

    if (products != null) {



        for (const product of products) {
            tableBody.innerHTML += `
            <tr data-id ="${product.id}">
            <td>
            <img src="${product.img}" alt="" class="images">
            </td>
            <td class = "names">${product.name}</td>


            
            
            <td class="price">$${product.price}</td>


          

            

            <td>

            <i class="fa-solid fa-xmark delete-btn" style="color: black; cursor: pointer;"></i>
            </td>


            </tr>`




           

        }

        






    } else {

        showAlert();
    }



}






function showAlert(e) {

    document.querySelector(".info-basket").classList.add("d-none");
    document.querySelector(".basket-button").classList.remove("basket-btn");

  
   
}



















function deleteProduct(id) {
    products = products.filter(m => m.id != id);
    localStorage.setItem("wishtlist", JSON.stringify(products));

}

let deleteIcons = document.querySelectorAll(".delete-btn");


deleteIcons.forEach(icon => {

    icon.addEventListener("click", function () {
        let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        deleteProduct(id);
        this.parentNode.parentNode.remove();
        if (products.length == 0) {
            localStorage.removeItem("wishtlist")
            showAlert();

        }
       


    })


});






  










});










