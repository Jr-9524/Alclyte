let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCardsContainer = document.querySelector('.listcard'); 
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantityDisplay = document.querySelector('.quantity'); 

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'Tide Plus Ultra Oxi Laundry Booster', image: '../images/pro-1.png', price: 580 },
    { id: 2, name: 'Tide Auto Dispense Liquid Laundry Detergent', image: '../images/pro-2.png', price: 550 },
    { id: 3, name: 'Tide Power PODS® Febreze Odor Eliminators', image: '../images/pro-3.png', price: 530 },
    { id: 4, name: 'Tide Simply PODS® Plus Oxi Boost + Odor Defense Liquid Laundry Detergent Pacs', image: '../images/pro-4.png', price: 530 },
    { id: 5, name: 'Tide PODS® Light Laundry Detergent White Lavender Scent', image: '../images/pro-5.png', price: 530 },
    { id: 6, name: 'Tide PODS® Light Laundry Detergent Ocean Mist Scent', image: '../images/pro-6.png', price: 500 },
    { id: 7, name: 'Tide Power PODS® Febreze Odor Eliminators + Lasting Freshness Spring & Renewal', image: '../images/pro-7.png', price: 509 },
    { id: 8, name: 'Tide Simply Clean and Fresh Liquid Laundry Detergent Berry Blossom', image: '../images/pro-8.png', price: 509 },
    { id: 9, name: 'Tide Hygienic Clean Heavy Duty 10X Free Liquid Laundry Detergent', image: '../images/pro-9.png', price: 509 },
];

let listCards = {};

function initApp() {
    products.forEach((product, index) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="../img/${product.image}" alt="${product.name}"/>
            <div class="title">${product.name}</div>
            <button onclick="addToCard(${index})">₱${product.price.toLocaleString()}<img src="../images/cart.svg"></button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(index) {
    if (!listCards[index]) {
        listCards[index] = { ...products[index], quantity: 1 };
    } else {
        listCards[index].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCardsContainer.innerHTML = ''; 
    let count = 0;
    let totalPrice = 0;

    for (const key in listCards) {
        const item = listCards[key];
        if (item) {
            totalPrice += item.price * item.quantity;
            count += item.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="../img/${item.image}" alt="${item.name}"/></div>
                <div>${item.name}</div>
                <div>${item.price.toLocaleString()}</div>
                <div>${item.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
                </div>
            `;
            listCardsContainer.appendChild(newDiv);
        }
    }

    total.innerText = `₱${totalPrice.toLocaleString()}`; 
    quantityDisplay.innerText = count;
}

function changeQuantity(key, newQuantity) {
    if (newQuantity <= 0) {
        delete listCards[key];
    } else if (listCards[key]) {
        listCards[key].quantity = newQuantity; 
    }
    reloadCard(); 
}