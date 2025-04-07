// === Sélections HTML ===
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = document.querySelectorAll("[data-mode-option]");

// === Fonctions ===
function init() {
    const themeEnregistre = localStorage.getItem("theme") || "nuit";
    
    changerTheme(themeEnregistre);
    
    parentHTML.addEventListener("click", gererClicBouton);
}

/**
 * Gère le clic sur les boutons de changement de thème
 * @param {Event} evenement - L'événement de clic
 */
function gererClicBouton(evenement) {
    const elementClic = evenement.target;
    const bouton = elementClic.closest("[data-mode-option]");
    
    if (bouton) {
        const nouveauTheme = bouton.dataset.modeOption;
        
        enregistrerTheme(nouveauTheme);
    }
}

/**
 * Applique le thème choisi à la page
 * @param {String} theme - Le thème à appliquer ("jour" ou "nuit")
 */
function changerTheme(theme) {
    document.body.dataset.theme = theme;
    
    mettreAJourBoutons(theme);
}

/**
 * Met à jour l'affichage des boutons selon le thème actif
 * @param {String} themeActif - Le thème actuellement actif
 */
function mettreAJourBoutons(themeActif) {
    boutonsHTML.forEach(function(bouton) {
        const themeOption = bouton.dataset.modeOption;
        bouton.classList.toggle("invisible", themeOption === themeActif);
    });
}

/**
 * Enregistre le thème choisi dans le localStorage et l'applique
 * @param {String} nouveauTheme - Le nouveau thème à enregistrer
 */
function enregistrerTheme(nouveauTheme) {
    changerTheme(nouveauTheme);
    
    localStorage.setItem("theme", nouveauTheme);
}

export default init;
