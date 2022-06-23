// Récuperer les données du server

fetch('http://localhost:3000/api/products')
.then(function(res){
   if(res.ok){
    return res.json()
    } 
})
.then(function(products){

    //ajouter les produits à la page d'accueil

    for(let i = 0; i < products.length; i++){
        const aElement = document.createElement('a');
        aElement.setAttribute('href', './product.html?id='+ products[i]._id);
        aElement.innerHTML = '<article><img src="'+ products[i].imageUrl +'" alt="'+ products[i].altTxt +'"><h3 class="productName">'+ products[i].name +'</h3><p class="productDescription">'+ products[i].description +'</p></article>'
        document
            .getElementById('items')
            .appendChild(aElement)
    }   
});