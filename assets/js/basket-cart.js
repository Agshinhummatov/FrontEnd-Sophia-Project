
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

            <td>$${product.total}</td>


           
            
            
           

        
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
    e.preventDefault();
}



function getBasketCount(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }
    document.querySelector("sup").innerText = sum;
}


function getBasketPrice(arr){
    let sum = 0;
    for (const item of arr) {
        sum += item.total
    }
  
    document.querySelector("._total-price").innerText =  "$" + sum +".00"
   
  }
  
  getBasketPrice(products)
  












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


        // Swal.fire({
        //     position: 'top-center',
        //     icon: 'warning',
        //     title: 'Your work has been saved',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })

    })
});


function showTotalPrice() {     //function-komeyi ile butun mehsullarin toplam giymetin tapiriq
    if (products != null) {
        let title = document.querySelector(".total");
        title.classList.remove("d-none");
        title.nextElementSibling.classList.remove("d-none");

        let sum = 0;
        for (const item of products) {
            sum += parseInt(item.price)  //parse edib localdaki butun datalarnin qiymetini toplayiriq
        }
        title.nextElementSibling.innerHTML = sum + "$";     //ve yazdir h-tagine toplami
    }

}
showTotalPrice()




let minusIcons = document.querySelectorAll("tbody tr td .minus");


for (const icon of minusIcons) {           //minus icona basanda gedib mehsulun hem UI-daki sayini hemde local storagdaki sayini azaldiriq hemin mehsulun
    let res = 0;
    icon.addEventListener("click", function () {    //minus icona basanda

        let res = 0;
        for (const product of products) {

            if (product.id == icon.parentNode.parentNode.getAttribute("data-id")) {    //hemin plus icona uyqun productu idisine gore tapaq
                icon.nextElementSibling.innerText--;
                let nativePrice = product.price / product.count;   //bir price elde etmek ucun  butun pricelari bolursen saylarina
                product.count--;                                 //artirsan
                product.price = nativePrice * product.count;

                res = nativePrice * product.count;
                icon.parentNode.previousElementSibling.innerText = product.price;



            }

        }

        localStorage.setItem("basket", JSON.stringify(products))   //localstorage yenilenmis array yerlesdirek
        showTotalPrice()

    })



}



let plusIcons = document.querySelectorAll("tbody tr td .plus"); //plus icon basanda gedib mehsulun hem UI-daki sayini hemde local storagdaki sayini coxaldiriq 


for (const icon of plusIcons) {

    icon.addEventListener("click", function () {
        let res = 0;
        for (const product of products) {

            if (product.id == icon.parentNode.parentNode.getAttribute("data-id")) {    //hemin plus icona uyqun productu idisine gore tapaq
                icon.previousElementSibling.innerText++;
                let nativePrice = product.price / product.count;   //bir price elde etmek ucun  butun pricelari bolursen saylarina
                product.count++;                                 //artirsan
                product.price = nativePrice * product.count;

                res = nativePrice * product.count;
                icon.parentNode.previousElementSibling.innerText = product.price;



            }

        }

        localStorage.setItem("basket", JSON.stringify(products))   //localstorage yenilenmis array yerlesdirek
        showTotalPrice()          //ve cem qiymeti hesablayan function

    })

}
