
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