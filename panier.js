const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        if (!item.price || typeof item.price !== "number" || !item.quantity || !item.title || !item.image) {
            console.error(`Erreur dans l'article à l'index ${index}:`, item);
            return;
        }
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h3>${item.title}</h3>
                <p>Prix : ${item.price.toFixed(2)} Fr</p>
                <div class="quantity-controls">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `Total : ${total.toFixed(2)} Fr`;

    // Ajouter les événements pour augmenter/diminuer la quantité
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            saveCart();
            updateCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Supprime l'article s'il n'en reste plus
            }
            saveCart();
            updateCart();
        });
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCart();

document.getElementById("checkout-btn").addEventListener("click", function() {
    loadCartForPayment(); // Charger les données du panier dans la section paiement
    document.getElementById("payment-section").scrollIntoView({ behavior: "smooth" }); // Aller à la section paiement
});
document.getElementById('back-to-shop-btn').addEventListener('click', () => {
    // Vider le panier dans localStorage
    localStorage.removeItem('cart');

    // Recharger la page pour mettre à jour l'affichage
    location.reload();

    // Rediriger vers la boutique (remplace "index.html" par la vraie page de ta boutique)
    window.location.href = "index.html";
});

function loadCartForPayment() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryContainer = document.getElementById("order-summary");
    let total = 0;

    summaryContainer.innerHTML = ""; // Vider l'ancien contenu

    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemElement = document.createElement("div");
        itemElement.classList.add("order-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <p>${item.title} x ${item.quantity} - ${item.price * item.quantity} Fr</p>
        `;
        summaryContainer.appendChild(itemElement);
    });

    document.getElementById("total-price").textContent = `Total : ${total.toFixed(2)} Fr`;
}

// Charger le panier quand on arrive sur la section paiement
loadCartForPayment();
// Gestion du choix de mode de paiement
const paymentMethods = document.getElementsByName('payment-method');
const cardPaymentForm = document.getElementById('card-payment');
const mobilePaymentForm = document.getElementById('mobile-payment');

paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            cardPaymentForm.classList.remove('hidden');
            mobilePaymentForm.classList.add('hidden');
        } else if (e.target.value === 'mobile') {
            mobilePaymentForm.classList.remove('hidden');
            cardPaymentForm.classList.add('hidden');
        }
    });
});

// Gestion du paiement par carte
//cardPaymentForm.addEventListener('submit', (e) => {
   // e.preventDefault();
   // alert('Paiement par carte effectué avec succès.');
    // Ajoute ici l'intégration avec une API de paiement comme Stripe.
//});

// Gestion du paiement via réseau mobile
//mobilePaymentForm.addEventListener('submit', (e) => {
  //  e.preventDefault();
    //alert('Paiement via réseau mobile effectué avec succès.');
    // Ajoute ici l'intégration avec une API de paiement mobile.
//});

   