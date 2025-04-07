// Variables globales
let elementHTML;
let conteneurHTML;

// Fonction d'initialisation de la boîte modale
function init() {
    conteneurHTML = document.body; // Assurer que le conteneur est bien défini

    if (!conteneurHTML) {
        console.error("Erreur: Aucun conteneur trouvé pour la boîte modale.");
        return;
    }

    if (!localStorage.getItem("infolettre")) {

        let message = "Abonnez-vous à notre infolettre pour recevoir nos offres exclusives !";
        
        // Injection du HTML après un délai de 5 secondes
        setTimeout(function() {
            injecterHTML(message, "infolettre");
            afficherModale();
        }, 5000);
    }
}

/**
 * Ferme la boîte modale et enregistre l'état dans le localStorage.
 */
function onClicModale() {
    cacherModale();
    localStorage.setItem("infolettre", true); // Enregistrer l'état dans le localStorage pour ne plus afficher la modale
}

/**
 * Injecte le HTML de la boîte modale dans le document.
 * @param {String} message- Le message à afficher dans la modale.
 * @param {string} type - Le type de modale (ex: "infolettre").
 */
function injecterHTML(message, type) {
    if (!conteneurHTML) return; // Évite une erreur si le conteneur est absent

    let gabarit = `
    <div class="boite-modale modale-active" data-type="${type}">
        <span class="bouton-fermer">×</span>
        <p>${message}</p>
        <div class="bouton">D'accord!</div>
    </div>`;

    conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    elementHTML = conteneurHTML.querySelector(".boite-modale:last-child");

    const boutonFermer = elementHTML.querySelector(".bouton-fermer");
    const boutonOk = elementHTML.querySelector(".bouton");
    
    if (boutonFermer) boutonFermer.addEventListener("click", onClicModale);
    if (boutonOk) boutonOk.addEventListener("click", onClicModale);
}

/**
* Affiche la boîte modale en ajoutant la classe CSS appropriée.
 */
function afficherModale() {
    if (elementHTML) {
        elementHTML.classList.add("modale-active");
    }
}

/**
 * Cache la boîte modale en la supprimant du DOM
 */
function cacherModale() {
    if (elementHTML) {
        elementHTML.remove();
        elementHTML = null; // Réinitialiser la variable pour éviter des références obsolètes
    }
}

export default init;