// Variables globales
let indexImageCarrousel = 0;
let intervalCarrousel;

// === Sélections HTML ===
const carrouselConteneurHTML = document.querySelector(".carrousel");
const imagesCarrouselHTML = carrouselConteneurHTML.querySelectorAll(".carrousel-image-conteneur");
const boutonsNavCarrouselHTML = carrouselConteneurHTML.querySelectorAll("[data-direction]");

// === Fonctions ===

function init() {
    for (let i = 0; i < boutonsNavCarrouselHTML.length; i++) {
        const bouton = boutonsNavCarrouselHTML[i];
        bouton.addEventListener("click", clicNavigationCarrousel);
    }
    
    afficherImageCarrousel(indexImageCarrousel);
    demarrerDefilementAutomatique();
    
     // Arrêter le défilement quand la souris est sur le carrousel
    carrouselConteneurHTML.addEventListener("mouseenter", arreterDefilementAutomatique);
    carrouselConteneurHTML.addEventListener("mouseleave", demarrerDefilementAutomatique);
}

/**
 * Démarre le défilement automatique du carrousel.
 */
function demarrerDefilementAutomatique() 
{
    arreterDefilementAutomatique();
    intervalCarrousel = setInterval(function() 
    {
        changerImage(1);
    }, 3000);
}

/**
 * Arrête le défilement automatique du carrousel.
 */
function arreterDefilementAutomatique() {
    if (intervalCarrousel) {
        clearInterval(intervalCarrousel);
    }
}

/**
 * Gère la navigation du carrousel lors d'un clic sur un bouton.
 * @param {Event} evenement - L'événement de clic.
 */
function clicNavigationCarrousel(evenement) {
    const declencheur = evenement.currentTarget;
    const direction = Number(declencheur.dataset.direction);

    arreterDefilementAutomatique(); // Arrêter temporairement le défilement automatique lors d'un clic
    changerImage(direction);
    setTimeout(demarrerDefilementAutomatique, 300);

}

/**
 * Change l'image affichée selon la direction donnée.
 * @param {number} direction - La direction du changement (-1 ou 1).
 */
function changerImage(direction) {
    
    indexImageCarrousel = (indexImageCarrousel + direction + imagesCarrouselHTML.length) % imagesCarrouselHTML.length;
    afficherImageCarrousel(indexImageCarrousel);
}

/**
 * Affiche l'image correspondant à l'index donné.
 * @param {number} index - L'index de l'image à afficher.
 */
function afficherImageCarrousel(index) {
    for (let i = 0; i < imagesCarrouselHTML.length; i++) {
        const image = imagesCarrouselHTML[i];
        
        image.classList.toggle("invisible", i !== index);
    }
}

export default init;