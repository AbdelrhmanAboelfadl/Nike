// =======================================================
let html = document.querySelector("html");
let body=document.querySelector("body")
let btnToNext=document.querySelector(".next");
let btnToPrev = document.querySelector(".prev");
let NavBtn = document.querySelectorAll("nav .container .nav-item");
let navLinks = document.querySelectorAll("nav .container .nav-item .nav-link");
let heightOfNav = document.querySelector("nav").clientHeight;
let navBar = document.querySelector("nav");
let popUpLogin = document.querySelector(".pop-up.login");
let popUpBoxLogin = document.querySelector(".box");
let popUpShop = document.querySelector(".shop");
let popUpBoxShop = document.querySelector(".box.shop");
let productsIntoPopUp = popUpBoxShop.querySelector(".big");
console.log(productsIntoPopUp);
let btnOpenPopUpLogin = document.querySelector("nav .container .icons i:last-child");
let btnToClosePopUpLogin = popUpBoxLogin.querySelector(".fa-circle-xmark");
let btnToOpenPopUpShop = document.querySelector("nav .container .icons .fa-cart-shopping");
let btnToClosePopUpShop = popUpBoxShop.querySelector(".fa-circle-xmark");
let shopNow = document.querySelector(".pop-up .box .noData");
let photos = document.querySelectorAll(".photo .row .part");
let popUpImg = document.querySelector(".pop-up.ShowImg");
let popUpImgBox = document.querySelector(".pop-up.ShowImg .box");
let nextImg = document.querySelector(".pop-up.ShowImg .box .fa-chevron-right");
let prevImg = document.querySelector(".pop-up.ShowImg .box .fa-chevron-left");
let correct = document.getElementById("correct");
let correct2 = document.getElementById("correct2");
let popUpInfo = document.querySelector(".info");
let boxInfo = popUpInfo.querySelector(".box");
let cart = [];

// =======================================================
window.addEventListener("load", function() {
    let preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hide");
    }, 3000);
});

if (localStorage.getItem("cart") != null) {
    cart=JSON.parse(localStorage.getItem("cart"))
} else {
    updateLocalStorage();
}
window.addEventListener("DOMContentLoaded", function () {
    let firstCarousel = document.querySelector(".fg-carousel .fg-carousel-inner .fg-carousel-item:nth-of-type(1)");
    firstCarousel.classList.add("active", "show");
});
body.addEventListener("click", hidePopUpLogin);
body.addEventListener("click", hidePopUpShop);
body.addEventListener("click", hidePopUpImg);
body.addEventListener("click", hidePopUpInfo);
btnToNext.addEventListener("click",toNext);
btnToPrev.addEventListener("click", toPrev);
NavBtn.forEach((item) => {
    item.addEventListener("click", () => {
        let currentActive = document.querySelector("nav .container .nav-item.active");
        currentActive.classList.remove("active");
        item.classList.add("active");
    })
});
navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (e) => {
        e.preventDefault();
        let idOfCurrentSection = navLink.getAttribute("href");
        let currentSection = document.querySelector(`${idOfCurrentSection}`);
        let currentSectionTop = currentSection.getBoundingClientRect().top + window.scrollY-heightOfNav;
        window.scrollTo({
            top: currentSectionTop,
            behavior: "smooth"
        });

    })
});
window.addEventListener("scroll", () => {
    let sections = ["Home", "Latest", "Features"];
    for (let item of sections) {
        let section = document.querySelector(`#${item}`);
        let sectionId = section.id;
        let topOfWindow = window.scrollY;
        if (topOfWindow >= 1) {
            navBar.classList.add("scrolled");
        } else {
            navBar.classList.remove("scrolled");
        }
        let topOfSection = section.getBoundingClientRect().top + window.scrollY - heightOfNav;
        let buttomOfSection = topOfSection + section.clientHeight;
        if (topOfWindow >= topOfSection && topOfWindow <= buttomOfSection) {
            let newActive = document.querySelector(`nav .nav-link[href="#${sectionId}"]`).parentElement;
            let oldActive = document.querySelector("nav .nav-item.active");
            oldActive.classList.remove("active");
            newActive.classList.add("active");
        }
    }
});
btnOpenPopUpLogin.addEventListener("click", (e) => {
    e.stopPropagation();
});
popUpBoxLogin.addEventListener("click", (e) => {
    e.stopPropagation();
});
btnToOpenPopUpShop.addEventListener("click", (e) => {
    e.stopPropagation();
});
popUpBoxShop.addEventListener("click", (e) => {
    e.stopPropagation();
});
popUpImgBox.addEventListener("click", (e) => {
    e.stopPropagation();
});
boxInfo.addEventListener("click",(e) => {
    e.stopPropagation();
})
btnOpenPopUpLogin.addEventListener("click", showPopUpLogin);
btnToClosePopUpLogin.addEventListener("click", hidePopUpLogin);
btnToOpenPopUpShop.addEventListener("click", showPopUpShop);
btnToClosePopUpShop.addEventListener("click", hidePopUpShop);
shopNow.addEventListener("click", () => {
    hidePopUpShop();
    ScrollToShop();
});
photos.forEach((photo) => {
    photo.addEventListener("click", ScrollToShop);
});
latest.forEach((product) => {
    let ImgsHTML = ``;
    let sizeHTML = ``;
    let isProductInCart = cart.find((item) => {
        return item.id == product.id;
    });
    console.log(isProductInCart);
    for (let i = 0; i < product.images.length; i++) {
        ImgsHTML += `
        <li>
            <img class="img-fluid "src="imgs/products/${product.images[i]}"onclick="changeImg(this),showPopUpImg()">
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
    document.querySelector("#Latest .products").innerHTML += `
        <div class="content" data-id="${product.id}" data-color="${(isProductInCart==undefined)?product.colors[0]:isProductInCart.color}" data-size="${(isProductInCart==undefined)?product.sizes[0]:isProductInCart.size}">
                <div class="row">
                    <div class="col-md-6 part1">
                        <div class="row">
                            <div class="col-2 col1">
                                <ul>
                                    ${ImgsHTML}
                                </ul>
                            </div>
                            <div class="col-10 col2">
                                <img class="img-fluid selected" onclick="showPopUpImg(),changeImgShop(this)" src="imgs/products/${product.images[0]}">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 part2">
                        <h3 class="mb-3">${product.name}</h3>
                        <p class="mb-3">${product.description}</p>
                        <div class="price">
                            <p>Price :</p>
                            ${(product.discount == 0) ? `<p>${product.price} <sup>$</sup></p>` : `<p><del class="text-danger">${product.price}</del><sup class="text-danger">$</sup> ${product.price * (1 - product.discount)} <sup>$</sup></p>`}
                        </div>
                        <div class="size">
                            <p>Size :</p>
                            <ul data-storage="">
                                ${sizeHTML}
                            </ul>
                        </div>
                        ${(isProductInCart==undefined)?`<button class="fg-btn add-to-cart" data-product-id="${product.id}"onclick="addToCart(${product.id})">Add To Cart</button>`:`<button class="fg-btn add-to-cart remove" data-product-id="${product.id}"onclick="removeFromCart(${product.id})">Remove From Cart</button>`}
                        
                    </div>
                </div>
            </div>
    `;
});
let sizes = document.querySelectorAll("#Latest .container .content .part2 .size ul li");
sizes.forEach((size) => {
    size.addEventListener("click", function(){
        let sizeActive = size.parentElement.querySelectorAll("li.active");
        sizeActive.forEach((item) => {
            item.classList.remove("active")
        })
        size.classList.add("active");
        this.closest(".content").dataset.size = size.innerText;
    });
});
let ProductsImg = document.querySelectorAll("#Latest .products .col2 img");
console.log(ProductsImg);
ProductsImg.forEach((ProductsImg) => {
    ProductsImg.addEventListener("click", (e) => {
        e.stopPropagation();
    })
});
features.forEach((feature) => {
    let imgHTML = ``;
    for (let i = 0; i < feature.images.length; i++) {
        imgHTML += `
                <li class="${(i == 0) ? 'active' : ''}" onclick="changeImg2(this)" data-img="${feature.images[i]}">
                        <div class="shape" ></div>
                </li>
        `
    }
    document.querySelector("#Features .content .row").innerHTML += `
        <div class="col-sm-6 col-lg-3 mb-4 item" id="${feature.id}">
                <div class="info">
                <div class="imgcon">
                    <div class="sale">
                        <p class="p-0 m-0 ${(feature.discount == 0) ? 'd-none' : 'p-0 m-0'}">-${feature.discount * 100}%</p>
                    </div>
                    <img src="imgs/products/${feature.images[0]}">
                </div>
                <div class="glass">
                    <i class="fa-solid fa-magnifying-glass"onclick="getProductInPopUp(${feature.id})"></i>
                </div>
                <ul>
                    ${imgHTML}
                </ul>
                <div class="nameProduct">
                    <p class="m-0">${feature.name}</p>
                </div>
                <div class="price">
                    ${(feature.discount == 0) ? `<p class="text-dark">${feature.price} <sup>$</sup></p>` : `<p class="text-dark"><del class="text-danger">${feature.price}</del><sup class="text-danger">$</sup> ${(feature.price * 1 - feature.discount).toFixed(2)} <sup>$</sup></p>`}
                </div>
                </div>
        </div>
    `;
});
let shapes = document.querySelectorAll("#Features .content .item ul li ");
shapes.forEach((shape) => {
    shape.addEventListener("click", () => {
        let shapeActive = shape.parentElement.querySelectorAll("li.active");
        shapeActive.forEach((item) => {
            item.classList.remove("active")
        })
        shape.classList.add("active");
        
    });
});
let btnOpenInfo = document.querySelectorAll("#Features .content .item .glass i");
btnOpenInfo.forEach((item) => {
    item.addEventListener("click",(e) => {
        e.stopPropagation();
    })
})
btnOpenInfo.forEach((item) => {
    item.addEventListener("click", showPopUpInfo)
});
showInCart();