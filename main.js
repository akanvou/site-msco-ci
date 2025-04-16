document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');
    const cardForm = document.getElementById("card-payment");
    const mobileForm = document.getElementById("mobile-payment");

    paymentMethodInputs.forEach(input => {
        input.addEventListener("change", function () {
            if (this.value === "card") {
                cardForm.classList.remove("hidden");
                mobileForm.classList.add("hidden");
            } else {
                cardForm.classList.add("hidden");
                mobileForm.classList.remove("hidden");
            }
        });
    });

    const transactionId = "txn_" + new Date().getTime();
    const amount = localStorage.getItem("cartTotal") || 1000;

    function processPayment(channel) {
        CinetPay.setConfig({
            apikey: "126457366867e299f55039e8.38662934",
            site_id: "105890672",
            notify_url: "https://votre-site.com/notification",
            mode: "PRODUCTION"
        });

        CinetPay.getCheckout({
            transaction_id: transactionId,
            amount: amount,
            currency: "XOF",
            channels: channel,
            description: "Achat sur mon site e-commerce",
        });

        CinetPay.waitResponse(function (data) {
            if (data.status === "ACCEPTED") {
                alert("Paiement réussi !");
            } else {
                alert("Paiement échoué !");
            }
            localStorage.removeItem("cart");
            window.location.href = "index.html"; // redirection
        });

        CinetPay.onError(function (data) {
            console.error("Erreur de paiement : ", data);
            alert("Une erreur est survenue !");
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        });
    }

    cardForm.addEventListener("submit", function (e) {
        e.preventDefault();
        processPayment("CARD");
    });

    mobileForm.addEventListener("submit", function (e) {
        e.preventDefault();
        processPayment("MOBILE_MONEY");
    });
});

document.addEventListener("DOMContentLoaded", updateCartCount);
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

