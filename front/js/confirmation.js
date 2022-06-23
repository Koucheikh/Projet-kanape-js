// Récuperer le numéro de commande dans le liens (adresse web)

let str = window.location.href;
let url = new URL(str);
let orderId = url.searchParams.get('orderId');

// Afficher le numéro de commande

document
    .getElementById('orderId')
    .innerHTML = orderId;
