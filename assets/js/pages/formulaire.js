import  navigationInit  from "../components/navigation.js"
// Variables globales
let sectionActuelle = 0;

// Éléments HTML
const formulaireHTML = document.querySelector("form");
const dateLivraisonInput = document.querySelector("#date-livraison");
const sectionsHTML = formulaireHTML.querySelectorAll("[data-page]");
const sectionResumeHTML = formulaireHTML.querySelector(".resume");
const champsHTML = formulaireHTML.querySelectorAll("[name]");
const boutonReinitialiserHTML = formulaireHTML.querySelector(".bouton-effacer"); 
const boutonAvancerHTML = formulaireHTML.querySelector(".form-navigation [data-direction='1']");
const boutonReculerHTML = formulaireHTML.querySelector(".form-navigation [data-direction='-1']");
const progressionHTML = formulaireHTML.querySelector(".progress-bar__fill");
const boutonEnvoiHTML = formulaireHTML.querySelector("input[type='submit']");
const modeNotification = formulaireHTML.querySelector("#mode-notification");


function init() {


  formulaireHTML.addEventListener("submit", soumettreFormulaire);

  boutonReinitialiserHTML.addEventListener("click", reinitialiserFormulaire);
  boutonAvancerHTML.addEventListener("click", function() {
    changerSection(1);
  });
  boutonReculerHTML.addEventListener("click", function() {
    changerSection(-1);
  });
  
  champsHTML.forEach(function (champHTML) {
    champHTML.addEventListener("change", onChangementChamp);

  });
  navigationInit();
  afficherSection(0);
  afficherProgression();
  definirDateMinLivraison();
  validerFormulaire();
  initialiserResume(); 
}


/* =============================================== Navigation ========================================================== */

/**
 * Fonction pour afficher les boutons de navigation en fonction de la section actuelle.
 */
function afficherNavigation() {
  boutonReculerHTML.classList.toggle("inactif", sectionActuelle === 0);
  boutonAvancerHTML.classList.toggle("invisible", sectionActuelle == sectionsHTML.length - 1);
  boutonAvancerHTML.classList.toggle("inactif", !validerSection(sectionActuelle) && sectionActuelle < sectionsHTML.length - 1);
  boutonEnvoiHTML.classList.toggle("invisible", sectionActuelle !== sectionsHTML.length - 1);
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour afficher ou masquer un élément en fonction de son index.
 * @param {number} index L'index de l'élément à afficher.
 * @param {NodeList} elements Les éléments à manipuler.
 */
function afficherElement(index, elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("invisible", i !== index);
  }
}

// ___________________________________________________________________________________________ //

/**
* Fonction pour afficher une section spécifique.
* @param {number} index 
*/
function afficherSection(index) {
  afficherElement(index, sectionsHTML);
  sectionActuelle = index;
  afficherNavigation();
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour changer de section.
 * @param {number} direction - Nombre de sections à avancer (positif) ou reculer (négatif)
 */
function changerSection(direction) {
  const nouvelIndex = sectionActuelle + direction;
  
  // Vérifier si la nouvelle section est dans les limites valides
  if (nouvelIndex >= 0 && nouvelIndex < sectionsHTML.length) {
    // Si on avance, vérifier que la section actuelle est valide
    if (direction > 0 && !validerSection(sectionActuelle)) {
      return; // Ne pas avancer si la section actuelle n'est pas valide
    }
    
    afficherSection(nouvelIndex);
    afficherProgression();
  }
}

// ___________________________________________________________________________________________ //

/**
* Fonction pour mettre à jour la barre de progression en fonction de la section actuelle.
*/
function afficherProgression() {
const progressWidth = (sectionActuelle / (sectionsHTML.length - 1)) * 100;
progressionHTML.style.width = progressWidth + "%";
progressionHTML.style.opacity = sectionActuelle > 0 ? "1" : "0";
progressionHTML.textContent = sectionActuelle > 0 ? Math.round(progressWidth) + "%" : "";
}


/* =============================================== Validation ========================================================== */

/**
 * Fonction pour valider un champ de formulaire en fonction de son type.
 * Elle nettoie la valeur du champ, applique des règles spécifiques selon le type,
 * et met à jour l'affichage des erreurs.
 * 
 * @param {HTMLElement} champHTML 
 * @returns {boolean} 
 */
function validerChamp(champHTML) {
  champHTML.value = champHTML.value.trim();

  if (champHTML.dataset.type === "nom-prenom") {
      const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
      champHTML.setCustomValidity(
          regexNomPrenom.test(champHTML.value) && champHTML.value.length >= 2 
          ? "" 
          : "Ce champ doit contenir uniquement des lettres et au moins 2 caractères."
      );
  }

  return mettreAJourErreur(champHTML);
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour valider une section entière du formulaire.
 * Vérifie la validité de tous les champs de la section spécifiée et renvoie un booléen indiquant si la section est valide.
 * @param {number} index 
 * @returns {boolean} 
 */
function validerSection(index) {
  const sectionHTML = sectionsHTML[index];
  const champsDansSection = sectionHTML.querySelectorAll("[name]");
  let estValide = true;

  champsDansSection.forEach(function (champ) {
    if (!validerChamp(champ)) {
      estValide = false;
    }
  });

  const notificationOui = formulaireHTML.querySelector("input[name='notifications'][value='oui']:checked");

  if (notificationOui && modeNotification.value === "") {
    modeNotification.classList.add("invalide");
    estValide = false;
  } else {
    modeNotification.classList.remove("invalide");
  }

  return estValide;
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour valider l'ensemble du formulaire.
 * @returns {boolean} 
 */
function validerFormulaire() {
  let estValide = true;

  for (let i = 0; i < champsHTML.length; i++) {
    if (!validerChamp(champsHTML[i])) {
      estValide = false;
    }
  }

  boutonEnvoiHTML.disabled = !estValide;

  return estValide;
}


/**
 * Fonction pour cacher le message d'erreur d'un champ.
 * @param {HTMLElement} champ 
 */
function cacherMessageErreur(champ) {
  const messageErreur = document.querySelector(".message-erreur-" + champ.name);
  if (messageErreur) {
    messageErreur.classList.add("invisible");
  }
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour mettre à jour l'affichage de l'erreur d'un champ.
 * Affiche l'erreur uniquement si l'utilisateur a déjà modifié le champ.
 * @param {HTMLElement} champHTML 
 * @returns {boolean} 
 */
function mettreAJourErreur(champHTML) {
  const estValide = champHTML.checkValidity();
  
  // Si le champ est modifié, on affiche l'erreur ou on la cache en fonction de la validité
  if (champHTML.value.length > 0) { 
    champHTML.classList.toggle("invalide", !estValide); 
    cacherMessageErreur(champHTML);
  }

  return estValide;
}


/* =============================================== Gestion des Modifications ========================================================== */


/**
 * Fonction captée au changement d'un champ de formulaire.
 * Met à jour le résumé et la navigation, et valide le formulaire.
 * @param {Event} evenement L'événement du changement de champ.
 */
function onChangementChamp(evenement) {
  const champHTML = evenement.currentTarget;
  const champNom = champHTML.name;
  const champValeur = champHTML.value;

  // Si l'utilisateur modifie un champ, l'erreur peut être mise à jour
  mettreAJourErreur(champHTML);

  if (validerChamp(champHTML)) {
    const spanHTML = sectionResumeHTML.querySelector(`[data-champ="${champNom}"]`);
    if (spanHTML) {
      spanHTML.textContent = champValeur;
    }
  }

  if (champNom === "notifications") {
    activerModeNotification(champValeur);
  }

  afficherNavigation();
  validerFormulaire();
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour mettre à jour le résumé concernant le mode de notification.
 * @param {string} champValeur 
 */
function mettreAJourResumeModeNotification(champValeur) {
  const spanModeNotif = sectionResumeHTML.querySelector(`[data-champ="mode-notification"]`);

  if (spanModeNotif) {
    if (champValeur !== "oui") {
      spanModeNotif.textContent = "Non";
    } else {
      spanModeNotif.textContent = modeNotification.value || "Non";
    }
  }
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour activer/désactiver le champ de mode notification.
 * @param {string} champValeur 
 */
function activerModeNotification(champValeur) {
  modeNotification.disabled = champValeur !== "oui";
  modeNotification.required = champValeur === "oui";
  mettreAJourResumeModeNotification(champValeur);
}

// ___________________________________________________________________________________________ //

/**
 * Fonction pour initialiser le résumé de la section de notification.
 */
function initialiserResume() {
  const notificationValue = formulaireHTML.querySelector("input[name='notifications']:checked");
  if (notificationValue) {
    activerModeNotification(notificationValue.value);
  } else {
    mettreAJourResumeModeNotification("non");
  }
}

// ___________________________________________________________________________________________ //

/**
 * * Fonction pour récupèrer la date du jour au format ISO (YYYY-MM-DD).
 * 
 * La méthode `toISOString()` retourne la date au format ISO 8601, qui est sous la forme 'YYYY-MM-DDTHH:mm:ss.sssZ'.
 * Nous utilisons ensuite `split("T")[0]` pour extraire uniquement la partie de la date avant le "T", qui correspond à la date sans l'heure.
 * Cela nous permet de définir une date minimale pour le champ de livraison, en nous assurant que l'utilisateur ne peut pas sélectionner une date antérieure à aujourd'hui
 * @returns {String}
 */
function definirDateMinLivraison() {
  const aujourdHui = new Date().toISOString().split("T")[0];
  dateLivraisonInput.min = aujourdHui;
  return aujourdHui;
}


/* =============================================== Réinitialisation ========================================================== */

/**
 * Fonction pour réinitialiser le formulaire, vider les champs modifiés, et réafficher la première section.
 */
function reinitialiserFormulaire() {
  formulaireHTML.reset();
  afficherSection(0); 
  afficherProgression(); 
  // Supprime les erreurs des champs et cache les messages d'erreur
  champsHTML.forEach(function(champ) {
    champ.classList.remove("invalide");
    champ.setCustomValidity("");
    cacherMessageErreur(champ); 
  });
  afficherNavigation(); 

  alert("Le formulaire a été réinitialisée avec succès !");
}


/* =============================================== Soumission du Formulaire ========================================================== */

/**
  * Fonction pour soumettre le formulaire.
  * Cette fonction est appelée lors de la soumission du formulaire, elle empêche l'action par défaut (rechargement de la page),
  * vérifie la validité de l'ensemble du formulaire et affiche un message de succès si tout est valide.
 * @param {Event} evenement 
 */
function soumettreFormulaire(evenement) {
    evenement.preventDefault();
    if (validerFormulaire()) {
        alert("Formulaire soumis avec succès !");
        window.location.href = "formulaire.html";
    }
}

// Initialisation de la page
init();



// ________________________________________________________________________         Explications       _______________________________________________________ //



// J'ai utilisé toggle() pour ajouter ou supprimer dynamiquement la classe "invalide".Cela permet de gérer visuellement l'état de validité des champs de manière concise.
//------ champHTML.classList.toggle("invalide", !estValide);


// J'ai utilisé test() pour valider le champ avec une expression régulière. Vérifie si la valeur du champ respecte le format requis (par exemple, lettres et espaces pour le nom).
//------ champHTML.setCustomValidity(regexNomPrenom.test(champHTML.value) 

// P.S : J'ai apporté les corrections que tu m'as suggérées concernant le premier TP.

// ________________________________________________________________________         Reférences      _______________________________________________________ //

// Les séances de Maxime ( cours, centre aide )
// Les videos youtube sur la chaine de Maxime Lacasse
// https://developer.mozilla.org/fr/docs/Web/API/DOMTokenList/toggle     /* Pour toggle ()
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test  /* Pour test()