 // Références aux éléments principaux
 const mainImage = document.getElementById('main-image');
 const productTitle = document.getElementById('produit-title');
 const productDescription = document.getElementById('produit-description');
 const productPrice = document.getElementById('produit-prix');

 // Ajouter un écouteur d'événements sur chaque miniature
 document.querySelectorAll('.thumbnail').forEach(thumb => {
     thumb.addEventListener('click', (e) => {
         // Changer l'image principale
         mainImage.src = e.target.src;

         // Mettre à jour les détails du produit
         productTitle.textContent = e.target.dataset.title;
         productDescription.textContent = e.target.dataset.description;
         productPrice.textContent = `Prix : ${e.target.dataset.price}`;
     });
 });

 // Récupère le panier du stockage local ou initialise un panier vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Met à jour le compteur de panier
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Totalise la quantité des produits
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount; // Met à jour le compteur
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none'; // Cache si aucun produit
    }
}

// Ajoute un produit au panier
function addToCart(title, price, image) {
    // Recherche si le produit existe déjà dans le panier
    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1; // Incrémente la quantité
    } else {
        cart.push({
            title: title,
            price: parseFloat(price.replace(' Fr', '').replace(',', '')), // Convertit le prix en nombre
            image: image,
            quantity: 1
        });
    }

    // Sauvegarde le panier dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Met à jour le compteur
    updateCartCount();
}

// Ajoute un événement au bouton "Ajouter au panier"
document.querySelector('.add-to-cart').addEventListener('click', () => {
    const title = document.getElementById('produit-title').textContent;
    const price = document.getElementById('produit-prix').textContent.replace('Prix : ', '');
    const image = document.getElementById('main-image').src;

    addToCart(title, price, image);
});

// Met à jour le compteur de panier au chargement de la page
updateCartCount();


