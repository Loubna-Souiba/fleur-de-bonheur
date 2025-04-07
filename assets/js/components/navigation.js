// Variables
// Remarque : Les espaces inutiles dans les valeurs seront nettoyés plus tard.
const liensNavigation = ["aCcueil", " a propos", " formulaire "];

// === Sélections HTML ===
const nav = document.querySelector("nav");


function init(){
    genererNavigation()   
}
/**
 * Fonction pour formater le texte d'un lien
 * @param {string} texte - Le texte à formater.
 * @returns {string} - Le texte formaté avec la première lettre en majuscule et les autres en minuscule, les espaces supprimés.
 */
export function formaterTexte(texte) {  
    // 1. Supprime les espaces avant et après le texte
    let texteNettoye = texte.trim();
    
    if (texteNettoye.length === 0) {  
        return ""; // Si la chaîne est vide après trim(), on retourne ""
    }
    // 2. Supprime les accents pour éviter les problèmes d'encodage dans les URLs ou comparaisons  
    texteNettoye = texteNettoye.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // 3. Récupère la première lettre et la met en majuscule  
    const premiereLettreMajuscule = texteNettoye.charAt(0).toUpperCase();  
    // 4. Récupère le reste du texte et le met en minuscule  
    const resteDuTexte = texteNettoye.slice(1).toLowerCase();  
    // 5. Concatène le tout  
    const texteFormate = premiereLettreMajuscule + resteDuTexte;  

    return texteFormate;  
}

/**
 * Génère les liens de navigation et les insère dans le DOM.
 * Chaque lien est formaté en utilisant la fonction formaterTexteLien.
 * Le lien correspondant à la page actuelle est mis en surbrillance avec un style spécifique.
 */
function genererNavigation() {
    let pageActuelle = window.location.pathname.split("/").pop();
   
    // Vérifie si la page actuelle est vide ou correspond à la racine ("/")
    if (!pageActuelle || pageActuelle === "/") {
        pageActuelle = "index.html";  
    }

    // Normalisation de la page actuelle pour la comparer avec les liens de navigation
    let pageActuelleFormatee = formaterTexte(pageActuelle.replace(".html", "").replace(/\-/g, " "));

    for (let i = 0; i < liensNavigation.length; i++) {
        const nomLienAffiche = formaterTexte(liensNavigation[i]); // Nom formaté pour affichage
        let urlLien = liensNavigation[i].trim().toLowerCase().replace(/\s+/g, "-") + ".html"; // URL en minuscule et espaces remplacés par des tirets

        // Gestion spécifique de l'accueil pour éviter "accueil.html" au lieu de "index.html"
        if (nomLienAffiche === "Accueil") {
            urlLien = "index.html";
        }

        // Création et insertion du lien dans la navigation
        const lienHTML = `<a href="${urlLien}">${nomLienAffiche}</a>`;
        nav.insertAdjacentHTML("beforeend", lienHTML);
    }

    // Après avoir inséré tous les liens, on peut appliquer un style spécifique à celui correspondant à la page actuelle
    const liens = nav.querySelectorAll("a");

    liens.forEach(function(lien) {
        const texteLien = formaterTexte(lien.textContent);

        // Vérifie si le lien correspond à la page actuelle et applique le style
        if (texteLien === pageActuelleFormatee || (pageActuelle === "index.html" && texteLien === "Accueil")) {
            lien.style.backgroundColor = "var(--couleur-primaire)";  
            lien.style.color = "var(--couleur-secondaire)";          
        }
    });
}

export default init;

