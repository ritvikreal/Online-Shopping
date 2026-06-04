
function openProduct(product) {

    localStorage.setItem("product", product);

    window.location.href =
        "product.html";
}


let product =
    localStorage.getItem("product");


let products = {

    hoodie: {
        title: "Stylish Hoodie",
        price: 1500,
        images: [
            "./images/hoodies1.png",
            "./images/hoodies2.png",
            "./images/hoodies3.png"
        ]
    },

    laptop: {
        title: "Gaming Laptop",
        price: 25000,
        images: [
            "./images/laptop1.png",
            "./images/laptop2.png",
            "./images/laptop3.png"
        ]
    },

    watch: {
        title: "Smart Watch",
        price: 5000,
        images: [
            "./images/watch1.png",
            "./images/watch2.png",
            "./images/watch3.png"
        ]
    },

    shoes: {
        title: "Running Shoes",
        price: 3500,
        images: [
            "./images/shoes1.png",
            "./images/shoes2.png",
            "./images/shoes3.png"
        ]
    },

    headphone: {
        title: "Wireless Headphone",
        price: 2200,
        images: [
            "./images/headphone1.png",
            "./images/headphone2.png",
            "./images/headphone3.png"
        ]
    },

    mobile: {
        title: "Smartphone",
        price: 18000,
        images: [
            "./images/mobile1.png",
            "./images/mobile2.png",
            "./images/mobile3.png"
        ]
    },

    bag: {
        title: "Travel Backpack",
        price: 1400,
        images: [
            "./images/backpack1.png",
            "./images/backpack2.png",
            "./images/backpack3.png"
        ]
    },

    camera: {
        title: "DSLR Camera",
        price: 45000,
        images: [
            "./images/camera1.png",
            "./images/camera2.png",
            "./images/camera3.png"
        ]
    }
};


let selected =
    products[product];



if (document.getElementById("title")) {

    document.getElementById("title").innerHTML =
        selected.title;

    document.getElementById("price").innerHTML =
        selected.price;

    document.getElementById("mainImage").src =
        selected.images[0];

    document.getElementById("img1").src =
        selected.images[0];

    document.getElementById("img2").src =
        selected.images[1];

    document.getElementById("img3").src =
        selected.images[2];
}

function changeImage(img) {

    document.getElementById("mainImage").src =
        img;
}

// ..............................


function buyNow() {

    let qty =
        document.getElementById("qty").value;

    let shipping = 100;

    let total =
        (selected.price * qty) + shipping;

    let paymentData = {

        title: selected.title,

        price: selected.price,

        quantity: qty,

        shipping: shipping,

        total: total
    };

    localStorage.setItem(

        "payment",

        JSON.stringify(paymentData)
    );

    window.location.href =
        "payment.html";
}


// ............................


if (document.getElementById("pname")) {

    let paymentData =

        JSON.parse(
            localStorage.getItem("payment")
        );

    document.getElementById("pname").innerHTML =
        paymentData.title;

    document.getElementById("price").innerHTML =
        paymentData.price;

    document.getElementById("qty").innerHTML =
        paymentData.quantity;

    document.getElementById("shipping").innerHTML =
        paymentData.shipping;

    document.getElementById("total").innerHTML =
        paymentData.total;
}



function makePayment() {

    alert("✅ Payment Successful");

    localStorage.removeItem("payment");

    window.location.href =
        "index.html";
}


// .........................................


function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerHTML = cart.length;
    }
}



function addToCart() {

    let qty = document.getElementById("qty").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let alreadyAdded = cart.find(item => item.title === selected.title
    );


    if (alreadyAdded) {
        alert("Product Already Added");

        return;
    }


    let productData = {

        title: selected.title,

        price: selected.price,

        image: selected.images[0],

        quantity: qty
    };


    cart.push(productData);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)
    );


    updateCartCount();

    alert("✅ Product Added To Cart");
}


// ................................


function removeCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)
    );


    updateCartCount();

    window.location.reload();
}


// .......................



if (document.getElementById("cartContainer")) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let container = document.getElementById("cartContainer");


    showCart();


    function showCart() {

        container.innerHTML = "";


        cart.forEach((item, index) => {

            container.innerHTML += `

            <div class="cartBox">

                <img src="${item.image}">

                <h1>${item.title}</h1>

                <h2>
                    ₹ ${item.price}
                </h2>

                <h3>
                    Quantity :
                    ${item.quantity}
                </h3>

                <button class="btn btn-danger mt-2"

                    onclick="removeCart(${index})">

                    Remove

                </button>

            </div>
            `;
        });
    }
}

updateCartCount();