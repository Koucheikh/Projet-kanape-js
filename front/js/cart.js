let addProduct = JSON.parse(localStorage.getItem('cart'));

// Afficher les produits ajoutés au panier

fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((products) => {
    const cart = async() => {
        if(addProduct){
            await addProduct;
            addProduct.map((product) => {
                const article = document.createElement('article');
                article.setAttribute('class', 'cart__item');
                products.forEach(element => {
                    if(element._id == product.id){
                        article.dataset.id = product.id;
                        article.dataset.color = product.color;
                        document
                            .getElementById('cart__items')
                            .appendChild(article)
                            .innerHTML = 
                                `<div class="cart__item__img">
                                    <img src="`+ element.imageUrl +`" alt="`+ element.altTxt +`">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>`+ element.name +`</h2>
                                        <p>${product.color}</p>
                                        <p>`+ element.price +` €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                            <p>Qté : </p>
                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>`;
                    };
                });
            });
            totalPrice();
    
            //Modifier les quantités dans localstorage à partir de la page panier
    
            document
                .querySelectorAll('.itemQuantity')
                .forEach(el => {
                    el.addEventListener('change', () => {
                        el.setAttribute('value', el.value);
                        let product = {
                            id : el.closest('article').dataset.id,
                            color : el.closest('article').dataset.color,
                            quantity : parseInt(el.value)
                        }
                        for(i=0; i < addProduct.length; i++){
                            if(product.id == addProduct[i].id && product.color == addProduct[i].color && product.quantity != addProduct[i].quantity){
                                addProduct.splice(i, 1, product)
                            }
                        };
                        localStorage.setItem('cart', JSON.stringify(addProduct));
                        totalQuantity();
                        totalPrice();
                     })
                });
            removeProduct();
        }else{
            alert('Ajouter un produit au panier')
        }
    };
    
    cart();
    
    // Additionner les elements d'un tableau
    
    const sumArray = (array) =>{
        let sum = 0;
        for(let i of array){
            sum += i
        }
        return sum
    };
    
    // Afficher la quantité totale des produits ajoutés au panier
    
    let arrayQuantity = [];
    const totalQuantity = () => {
        arrayQuantity.splice(0, arrayQuantity.length);
        for(i=0; i < addProduct.length; i++){
            arrayQuantity.push(addProduct[i].quantity)
        };
        sumArray(arrayQuantity);
        document
            .getElementById('totalQuantity')
            .innerHTML = sumArray(arrayQuantity);
    };
    totalQuantity();
        
    // Afficher le prix total à payer
    
    let arrayPrice = [];
    const totalPrice = async(cart) => {
        await cart;
        arrayPrice.splice(0, arrayPrice.length);
        addProduct.map((product) => {
            products.forEach(element => {
                if(element._id == product.id){
                    arrayPrice.push(product.quantity * element.price);
                }
            })
        });
        sumArray(arrayPrice);
        document
        .getElementById('totalPrice')
        .innerHTML = sumArray(arrayPrice); 
    };    
                
    // Supprimer un produit du panier
    
    const removeProduct = async(cart) => {
        await cart;
        let remove = document.querySelectorAll('.deleteItem');
        remove.forEach(element => {
            element.addEventListener('click', () => {
                if(addProduct.length == 1){
                    localStorage.removeItem('cart');
                    document
                        .getElementById('cart__items')
                        .removeChild(document.querySelector('.cart__item'));
                    document
                        .getElementById('totalQuantity')
                        .innerHTML = '';
                    document
                        .getElementById('totalPrice')
                        .innerHTML = '';
                }else{
                    let deleteItems = {
                        id : element.closest('article').dataset.id,
                        color : element.closest('article').dataset.color
                    };
                    for(i=0; i < addProduct.length; i++){
                        if(addProduct[i].id == deleteItems.id && addProduct[i].color == deleteItems.color){
                            addProduct.splice(i, 1);
                            document
                                .getElementById('cart__items')
                                .removeChild(document.getElementsByClassName('cart__item')[i])
                        }
                    };
                    localStorage.setItem('cart', JSON.stringify(addProduct));
                    totalQuantity();
                    totalPrice();
                }
            })
        })
    }
});

// Vérifier les données saisies par les utilisateurs

// Vérifier la validation du prénom

document
    .getElementById('firstName')
    .addEventListener('change', (e) => {
        if(e.target.value.length == 0){
            document
                .getElementById('firstNameErrorMsg')
                .innerHTML = 'Veuillez ajouter votre prénom'
        }else if(e.target.value.length < 3 || e.target.value.length > 20){
            document
                .getElementById('firstNameErrorMsg')
                .innerHTML = 'Prénom doit contenir entre 3 et 20 caractères'
        }else if(e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('firstNameErrorMsg')
                .innerHTML = ''
        }else if(!e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('firstNameErrorMsg')
                .innerHTML = 'Prénom doit contenir que des lettres'
        }
    });

// Vérifier la validation du nom

document
    .getElementById('lastName')
    .addEventListener('change', (e) => {
        if(e.target.value.length == 0){
            document
                .getElementById('lastNameErrorMsg')
                .innerHTML = 'Veuillez ajouter votre nom'
        }else if(e.target.value.length < 3 || e.target.value.length > 20){
            document
                .getElementById('lastNameErrorMsg')
                .innerHTML = 'Nom doit contenir entre 3 et 20 caractères'
        }else if(e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('lastNameErrorMsg')
                .innerHTML = ''
        }else if(!e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('lastNameErrorMsg')
                .innerHTML = 'Nom doit contenir que des lettres'
        }
    });

// Vérifier la validation de l'adresse

document
    .getElementById('address')
    .addEventListener('change', (e) => {
        if(e.target.value.length == 0){
            document
                .getElementById('addressErrorMsg')
                .innerHTML = 'Veuillez ajouter votre adresse'
        }else if(e.target.value.length < 5 || e.target.value.length > 35){
            document
                .getElementById('addressErrorMsg')
                .innerHTML = 'Adresse doit contenir entre 5 et 35 caractères'
        }else if(e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/)){
            document
                .getElementById('addressErrorMsg')
                .innerHTML = ''
        }else if(!e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/)){
            document
                .getElementById('addressErrorMsg')
                .innerHTML = 'Adresse commence par des chiffres puis des lettres et ne doit pas contenir  des caractères spécials'
        }
    });

// Vérifier la validation de la ville

document
    .getElementById('city')
    .addEventListener('change', (e) => {
        if(e.target.value.length == 0){
            document
                .getElementById('cityErrorMsg')
                .innerHTML = 'Veuillez ajouter votre ville'
        }else if(e.target.value.length < 3 || e.target.value.length > 20){
            document
                .getElementById('cityErrorMsg')
                .innerHTML = 'Ville doit contenir entre 3 et 20 caractères'
        }else if(e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('cityErrorMsg')
                .innerHTML = ''
        }else if(!e.target.value.match(/^[a-z A-Z]{3,20}$/)){
            document
                .getElementById('cityErrorMsg')
                .innerHTML = 'Ville doit contenir que des lettres'
        }
    });

// Vérifier la validation de l'email

document
    .getElementById('email')
    .addEventListener('change', (e) => {
        if(e.target.value.length == 0){
            document
                .getElementById('emailErrorMsg')
                .innerHTML = 'Veuillez ajouter votre email'
        }else if(e.target.value.match(/\S+@\S+\.\S+/)){
            document
                .getElementById('emailErrorMsg')
                .innerHTML = ''
        }else if(!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length !== 0){
            document
                .getElementById('emailErrorMsg')
                .innerHTML = 'Email incorrect ex: exemple@hotmail.com'
        }
    });

//  Récupérer les données saisies par les utilisateurs

let products_id = [];
for(i=0; i < addProduct.length; i++){
    products_id.push(addProduct[i].id)
};

document
    .getElementById('order')
    .addEventListener('click', (e) => {
        e.preventDefault();
        let contact = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        };
        let products = products_id;
        let data = {
            contact, 
            products
        };
        sendToServer(data)
    });

// Envoie de l'objet "toSend" vers le serveur

const sendToServer = (toSend) => {
    fetch('http://localhost:3000/api/products/order', {
        method : 'POST',
        body : JSON.stringify(toSend),
        headers : {
            'Accept' : 'Application/json',
            'Content-Type' : 'Application/json'
        }
    })
    .then((res) => res.json())
    .then((value) => {
        console.log(value.orderId);
        location.href = './confirmation.html?orderId='+ value.orderId
    })
};