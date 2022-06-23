// Récuperer l'identifiant dans le liens (adresse web)

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get('id');

// Afficher le produit et ses données

fetch('http://localhost:3000/api/products/' + id)
.then((res) => res.json())
.then(function(products){
    document
        .querySelector('title')
        .innerHTML = products.name; 
    document
        .querySelector('div.item__img')
        .innerHTML = '<img src="'+ products.imageUrl +'" alt="'+ products.altTxt +'">';
    document
        .getElementById('title')
        .innerHTML = products.name;
    document
        .getElementById('price')
        .innerHTML = products.price;
    document
        .getElementById('description')
        .innerHTML = products.description;
    for(let color of products.colors){
        let option = document.createElement('option');
        option.setAttribute('value', color);
        option.innerHTML = color;
        document
            .getElementById('colors')
            .appendChild(option)
    }    
});

// Vérifier le contenue du localStorage

const getCart = () =>{
    let cart = localStorage.getItem('cart');
    if(cart == null){
        return []
    }else{
        return JSON.parse(cart)
    }
};

// Ajouter les données au localStorage

document
    .getElementById('addToCart')
    .addEventListener('click', () =>{
        let product = {
            id : id,
            color : document.getElementById('colors').value
        };
        let cart = getCart();

        // Vérifier l'éxistance du produit dans le panier

        let foundProduct = cart.find(p => p.id == product.id && p.color == product.color);
        if(product.color == '' || document.getElementById('quantity').value == 0){
            alert('Veuillez choisir une couleur et une quantité')
        }else if(foundProduct != undefined){

            // Incrémenter la quantité du produit éxistant

            foundProduct.quantity += parseInt(document.getElementById('quantity').value)
        }else{

            // Ajouter un nouveau produit 

            product.quantity = parseInt(document.getElementById('quantity').value);
            cart.push(product);
        };
        localStorage.setItem('cart', JSON.stringify(cart))
    });