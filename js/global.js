function changeColor(colorName){
    let currentValue = getComputedStyle(html).getPropertyValue(colorName);
    let currentName = colorName.split("-")[2];
    let currentSrcArr = logo.src.split("/");
    currentSrcArr[currentSrcArr.length - 1] = `${currentName}-logo.png`
    let newLogeSrc = currentSrcArr.join("/");
    logo.src = newLogeSrc;
    let currentCorrect = colorName.split("-")[2];
    let currentCorrectSrcArr = correct.src.split("/");
    currentCorrectSrcArr[currentCorrectSrcArr.length - 1] =
    `${currentCorrect}-correct.png`;
    let newCorrectSrc = currentCorrectSrcArr.join("/");
    correct.src = newCorrectSrc;
    let currentCorrect2 = colorName.split("-")[2];
    let currentCorrectSrcArr2 = correct2.src.split("/");
    currentCorrectSrcArr2[currentCorrectSrcArr2.length - 1] =
    `${currentCorrect2}-correct.png`;
    let newCorrectSrc2 = currentCorrectSrcArr2.join("/");
    correct2.src = newCorrectSrc2;
    html.style.setProperty("--main-color",currentValue);
}
function toNext(){
    let currentCarsouel=document.querySelector(".fg-carousel .fg-carousel-inner .fg-carousel-item.active");
    let nextcarousel=currentCarsouel.nextElementSibling??document.querySelector(".fg-carousel .fg-carousel-inner .fg-carousel-item:nth-of-type(1)");
    let currentColor=nextcarousel.dataset.colorName;
    currentCarsouel.classList.remove("active","show");
    nextcarousel.classList.add("active","show");
    changeColor(currentColor);
}
function toPrev(){
    let currentCarsouel=document.querySelector(".fg-carousel .fg-carousel-inner .fg-carousel-item.active");
    let prevcarousel=currentCarsouel.previousElementSibling??document.querySelector(".fg-carousel .fg-carousel-inner .fg-carousel-item:last-child");
    let currentColor=prevcarousel.dataset.colorName;
    changeColor(currentColor);
    currentCarsouel.classList.remove("active","show");
    prevcarousel.classList.add("active","show");
}
function showPopUpLogin(){
    popUpLogin.classList.add("show");
}
function hidePopUpLogin(){
    popUpLogin.classList.remove("show");
}
function showPopUpShop(){
    popUpShop.classList.add("show");
}
function hidePopUpShop(){
    popUpShop.classList.remove("show");
}
function showPopUpImg(){
    popUpImg.classList.add("show");
}
function hidePopUpImg(){
    popUpImg.classList.remove("show");
}
function showPopUpInfo(){
    popUpInfo.classList.add("show");
}
function hidePopUpInfo(){
    popUpInfo.classList.remove("show");
}
function ScrollToShop() {
    let shop = document.querySelector("#Features");
    let shopHeight = shop.getBoundingClientRect().top + window.scrollY - heightOfNav;
    window.scrollTo({
        top: shopHeight
    });
}
function changeImg(that) {
    let currentImg = that.parentElement.parentElement.parentElement.parentElement.querySelector(".selected");
    currentImg.src = that.src;
}
function changeImgShop(that) {
    console.log(that);
    let currentImg = popUpImg.querySelector(".box img")
    console.log(currentImg);
    currentImg.src=that.src
}
function changeImg2(that) {
    console.log(that);
    let currentImg = that.parentElement.parentElement.querySelector(".imgcon img");
    let currentImgSrc = currentImg.src;
    currentImg.src = "imgs/products/" + that.dataset.img;
}
function getProduct(prodctId) {
    return  products.find((item) => {
        return item.id == prodctId;
    });
}
function getProductInPopUp(prodctId) {
    let product = getProduct(prodctId);
    let box = document.querySelector(".box.info");
    let imgs = ``;
    let sizeHTML = ``;
    let color = ``;
    let isProductInCart = cart.find((item) => {
        return item.id == products.id;
    });
    for (let i = 0; i < product.colors.length; i++) {
        color += `
                <li class="${(i == 0) ? 'active' : ''}">
                    <div class="shape" style="background-color:${product.colors[i]
            }"></div>
                </li>
        `
    }
    for (let i = 0; i < product.sizes.length; i++) {
        if (isProductInCart == undefined) {
            sizeHTML += `
        <li class="fg-btn ${(i == 0) ? "active" : ""}">${product.sizes[i]}</li>
        `
        } else {
            sizeHTML += `
        <li class="fg-btn ${(isProductInCart.sizes==product.sizes[i]) ? "active" : ""}">${product.sizes[i]}</li>
        `
        }
    }
    for (let i = 0; i < product.images.length; i++) {
        imgs += `<li onclick="changeImg3(this)">
                    <img src="imgs/products/${product.images[i]}">
                </li>`;
    }
    box.innerHTML = `
        <div class="row content"data-id="${prodctId}"data-size="" data-color="">
                <div class="col-md-6 col1" >
                    <div class="imgcon">
                        <img src="imgs/products/${product.images[0]}">
                    </div>
                    <ul>
                        ${imgs}
                    </ul>
                </div>
                <div class="col-md-6 col2">
                    <div class="item">
                        <h3>${product.name}</h3>
                        ${(product.discount == 0) ? `<p class="text-dark">${product.price} <sup>$</sup></p>` : `<p class="text-dark"><del class="text-danger">${product.price}</del><sup class="text-danger">$</sup> ${(product.price * 1 - product.discount).toFixed(2)} <sup>$</sup></p>`}
                        <hr>
                        <p>${product.description}</p>
                        <div class="size">
                            <p class="fw-bolder">Size :</p>
                            <ul data-storage="false">
                                ${sizeHTML}
                            </ul>
                        </div>
                        <div class="color">
                            <p class="fw-bolder">Color :</p>
                            <ul data-storage="false">
                                ${color}
                                
                            </ul>
                        </div>
                        <button class="fg-btn add-to-cart" data-product-id="${product.id}"onclick="addToCart(${product.id})">Add To Cart</button>
                    </div>
                </div>
            </div>
    `

let shapes = document.querySelectorAll(".box.info .col2 .color ul li");
shapes.forEach((item) => {
    item.addEventListener("click", () => {
        let shapeActive = item.parentElement.querySelector("li.active")
        shapeActive.classList.remove("active");
        item.classList.add("active");
        item.closest(".content").dataset.color = item.firstElementChild.style.backgroundColor;
    })
    
})
let sizes = document.querySelectorAll(".box.info .col2 .size ul li");
sizes.forEach((size) => {
    size.addEventListener("click", function() {
        let sizeActive = size.parentElement.querySelectorAll("li.active");
        sizeActive.forEach((item) => {
            item.classList.remove("active")
        })
        size.classList.add("active");
        this.closest(".content").dataset.size = size.innerText;
    });
});
}
function changeImg3(that) {
    let clickedImg = that.querySelector("img");
    let clickedImgSrc = clickedImg.src;
    let currentImg = that.parentElement.parentElement.querySelector(".imgcon img");
    currentImg.src = clickedImg.src;
}
function addToCart(prodctId){
    let product = getProduct(prodctId);
    let newPrduct = { ...product };
    let productEle = document.querySelector(`.content[data-id="${prodctId}"]`);
    let sizeUl = productEle.querySelectorAll(`ul[data-storage]`);
    sizeUl.forEach((ul) => {
        ul.setAttribute("data-storage",true)
    })
    // sizeUl.setAttribute("data-storage",true)
    newPrduct.sizes = productEle.dataset.size;
    newPrduct.colors = productEle.dataset.color;
    cart.push(newPrduct);
    toggleBtn("remove", prodctId)
    showInCart();
    updateLocalStorage();
    
}
function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function toggleBtn(status,prodctId) {
    let currentBtn=document.querySelector(`button[data-product-id="${prodctId}"]`)
    if (status == "add") {
        currentBtn.textContent = "Add To Cart"
        currentBtn.classList.remove("remove");
       currentBtn.setAttribute("onclick", `addToCart(${prodctId})`);

    } else if (status == "remove") {
        currentBtn.textContent = "Remove From Cart";
    currentBtn.classList.add("remove");
    currentBtn.setAttribute("onclick", `removeFromCart(${prodctId})`);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    let productEle = document.querySelector(`.content[data-id="${productId}"]`);
    if (productEle) {
        let sizeUl = productEle.querySelectorAll(`ul[data-storage]`);
        sizeUl.forEach((ul) => {
            ul.setAttribute("data-storage", false);
        });
        toggleBtn("add", productId);
    }
    showInCart();
    updateLocalStorage();
}

function showInCart() {
    productsIntoPopUp.innerHTML = "";
    for (let i = 0; i < cart.length; i++){
    productsIntoPopUp.innerHTML += `
        <div class="col-lg-4 col-md-6 procon">
                    <div class="box products">
                        <div class="imgcon">
                            <img src="imgs/products/${cart[i].images[0]}" class="img-fluid">
                        </div>
                        <h3 class="name">${cart[i].name}</h3>
                        <div class="pricecon d-flex">
                            <p class="me-1">Price : </p>
                            <p> ${(cart[i].price * (1 - cart[i].discount)).toFixed(2)} <sup>$</sup></p></p>
                        </div>
                        <div class="sizecon d-flex">
                            <p>size :</p>
                            <ul>
                                <li class="fg-btn size">${cart[i].sizes}</li>
                            </ul>
                        </div>
                        <div class="colorcon d-flex">
                            <p>Color :</p>
                            <ul>
                                <li class="active" style="background-color:${cart[i].colors}"></li>
                            </ul>
                        </div>
                        <button onclick="removeFromCart(${cart[i].id})">Remove</button>
                    </div>
                </div>
    `
}

}