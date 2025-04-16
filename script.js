//document.addEventListener('DOMContentLoaded', () => {
    //const Hamburger = document.querySelector('.hamburger');
    //const navLinksContainer = document.querySelector('.navlinks-container');

    //if (Hamburger && navLinksContainer) {
        //hamburgerButton.addEventListener('click', () => {
            // Toggle classes
           // navLinksContainer.classList.toggle('active');
            //hamburgerButton.classList.toggle('open');

            // Update aria-expanded
            //const expanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            //hamburgerButton.setAttribute('aria-expanded', !expanded);
      //  });
   // }
//});

const Hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector(".navlinks-container");

Hamburger.addEventListener('click', () => {
    Hamburger.classList.toggle('open'); // Change l'apparence de l'icône hamburger
    navLinksContainer.classList.toggle('active'); // Ouvre ou ferme le menu
  
});
