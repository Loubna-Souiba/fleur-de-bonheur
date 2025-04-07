import navigationInit, { formaterTexte } from "../components/navigation.js";
// === Variables globales ===
const nombreDeProduitsAfficher = 9; // le nombre de produits à afficher dans la liste
const chemin = ["assets", "img", "produits"]; // Chemin de base pour les images des produits
const produits = [
  {
    id: 1,
    nom: "Bouquet de fleur",
    prix: 10,
    description: "idéal pour toute occasion spéciale.",
    image: obtenirCheminImage("Catégorie bouquet"),
    meilleurVente: true,
  },
  {
    id: 2,
    nom: "Tulipe rose",
    prix: 15,
    description: "Une tulipe rose délicate pour ajouter fraîcheur et élégance.",
    image: obtenirCheminImage("Catégorie Fleur"),
    meilleurVente: false,
  },
  {
    id: 3,
    nom: "bouquet de Camille",
    prix: 25,
    description: "Un bouquet élégant, symbole d'amour et de beauté.",
    image: obtenirCheminImage("bouquet mariage cam"),
    meilleurVente: true,
  },
  {
    id: 4,
    nom: "Vase décoration",
    prix: 22,
    description: "Un vase chic pour une décoration sophistiquée.",
    image: obtenirCheminImage(" Bouquet Déssin"),
    meilleurVente: false,
  },
  {
    id: 5,
    nom: "Fleur rouge",
    prix: 12,
    description: "Une fleur rouge éclatante, symbole de passion et de joie.",
    image: obtenirCheminImage("fleur Rouge"),
    meilleurVente: true,
  },
];

// === Sélections HTML ===
const listeProduitsHTML = document.querySelector(".listeProduits");
const detailsProduitHTML = document.querySelector(".detailProduit");
const boutonsTriHTML = document.querySelectorAll(".bouton-tri");

// === Fonctions ===

/**
 * Fonction d'initialisation
 */
function init() {
  navigationInit();
  ajouterProduit();
  afficherProduits(produits.slice(0, nombreDeProduitsAfficher)); // Affiche les premiers produits selon la valeur définie par `nombreDeProduitsAfficher` sans toucher aux autres.
  initialiserTri();
  masquerDetailsProduit();
}

/**
 * Obtient le chemin complet de l'image d'un produit en fonction de son nom.
 * @param {string} nomImageProduit - Le nom de l'image du produit.
 * @returns {string} - Le chemin complet vers l'image.
 */
function obtenirCheminImage(nomImageProduit) {
  nomImageProduit = formaterTexte(nomImageProduit).replaceAll(" ", "_"); // (Appel de la fonction formaterTexteLien() définie dans navigation.js)
  let srcImgComplet = `${chemin.join("/")}/${nomImageProduit}.jpg`;
  return srcImgComplet;
}

/**
 * Crée un objet représentant un produit.
 * @param {string} nom - Le nom du produit.
 * @param {number} prix - Le prix du produit.
 * @param {string} description - La description du produit.
 * @param {string} image - Le chemin de l'image du produit.
 * @param {boolean} meilleurVente - Indicateur si le produit est une meilleur-vente.
 * @returns {Object} - L'objet représentant le produit créé.
 */
function creerProduit(nom, prix, description, image, meilleurVente) {
  return {
    id: produits.length + 1,
    nom: nom,
    prix: prix,
    description: description,
    image: image,
    meilleurVente: meilleurVente,
  };
}

/**
 * Ajoute un nouveau produit à la liste des produits.
 */
function ajouterProduit() {
  const nouveauProduit = creerProduit(
    "bouquet de mariage",
    20,
    "Un bouquet raffiné, parfait pour célébrer l'union avec grâce et délicatesse.",
    obtenirCheminImage(" bouquet fleur"),
    false
  );
  produits.push(nouveauProduit);
}

/**
 * Affiche la liste des produits dans le HTML.
 * @param {Array} listeProduits - Liste des produits à afficher.
 */
function afficherProduits(listeProduits) {
  listeProduitsHTML.innerHTML = ""; // Réinitialiser la liste pour éviter les doublons

  // Boucle pour parcourir chaque produit dans la liste
  for (let i = 0; i < listeProduits.length; i++) {
    const produit = listeProduits[i];

    // Vérifier si le produit a un ID valide
    if (!produit.id) {
      console.warn("Produit sans ID ignoré :", produit);
      continue; // Si le produit n'a pas d'ID, on passe à l'itération suivante
    }

    const nomProduit = formaterTexte(produit.nom);

    const produitHTML = `
            <div class="produit" data-id="${produit.id}">
                <img src="${produit.image}" alt="${nomProduit}">
                <h3>${nomProduit}</h3>
                <p>${produit.prix} $</p>
            </div>
        `;

    listeProduitsHTML.insertAdjacentHTML("beforeend", produitHTML); // Insère le produit dans le DOM.

    const produitElement = listeProduitsHTML.lastElementChild;
    produitElement.addEventListener("click", gererClicProduit); // Utilisation de la fonction nommée
  }
}

/**
 * Gère le clic sur un produit et affiche ses détails.
 * @param {Event} evenement - L'événement déclenché lors du clic sur un produit.
 */
function gererClicProduit(evenement) {
  const produitId = evenement.currentTarget.dataset.id; // Utilisation de l'attribut data-id
  afficherDetailsProduit(produitId);
  gererBorduresEtMettreEnEvidence(evenement);
}

/**
 * Met en évidence le produit sélectionné en modifiant son style.
 * @param {Event} evenement - L'événement déclenché lors du clic sur un produit.
 */
function gererBorduresEtMettreEnEvidence(evenement) {
  const produitsHTML = document.querySelectorAll(".produit");
  produitsHTML.forEach(function (produitHTML) {
    produitHTML.style.cssText = ""; // La réinitialisation complète des styles est volontaire pour assurer des styles cohérents à chaque clic
  });

  // Ajouter la bordure et les styles au produit cliqué
  const declencheur = evenement.currentTarget;
  declencheur.style.border = "2px solid #8D0334";
  declencheur.style.backgroundColor = "#e4ecc4";
  declencheur.style.fontFamily = "DancingScript";
  declencheur.style.fontSize = "large";
  declencheur.style.color = "var(--couleur-primaire)";
}

/**
 * Affiche les détails d'un produit sélectionné.
 * @param {number} produitId - ID du produit à afficher.
 */
function afficherDetailsProduit(produitId) {
  produitId = Number(produitId); // Assurer que l'ID est bien un nombre
  const produit = produits.find(function (produitDetail) {
    return produitDetail.id === produitId;
  });

  if (produit) {
    detailsProduitHTML.innerHTML = `
            <h2>${produit.nom}</h2>
            <img src="${produit.image}" alt="${produit.nom}">
            <p>${produit.description}</p>
            <p><strong>${produit.prix} $</strong></p>
        `;
    detailsProduitHTML.style.visibility = "visible"; // Afficher la section des détails
  }
}

/**
 * Trie les produits en fonction du critère donné.
 * @param {string} critere - Critère de tri (nom, prix-asc, prix-desc, meilleurVente).
 * @returns {Array} - Liste des produits triés.
 */
function trierProduits(critere) {
  const produitsTriees = [...produits]; // Créer une copie du tableau

  if (critere === "nom") {
    produitsTriees.sort(function (a, b) {
      const nomA = formaterTexte(a.nom);
      const nomB = formaterTexte(b.nom);
      if (nomA < nomB) {
        return -1;
      } else if (nomA > nomB) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (critere === "prix-asc") {
    produitsTriees.sort(function (a, b) {
      return a.prix - b.prix;
    });
  } else if (critere === "prix-desc") {
    produitsTriees.sort(function (a, b) {
      return b.prix - a.prix;
    });
  } else if (critere === "meilleurs-vendus") {
    return produitsTriees.filter(function (produit) {
      return produit.meilleurVente;
    });
  }

  return produitsTriees;
}

/**
 * Masque la section des détails produits.
 */
function masquerDetailsProduit() {
  detailsProduitHTML.innerHTML = "";
  detailsProduitHTML.style.visibility = "hidden";
}

/**
 * Gère le clic sur un bouton de tri.
 * @param {Event} evenement - L'événement déclenché lors du clic sur un bouton de tri.
 */
function gererClicTri(evenement) {
  masquerDetailsProduit(); // Masquer les détails du produit avant de changer de tri
  boutonsTriHTML.forEach(function (bouton) {
    bouton.style.backgroundColor = "";
    bouton.style.color = "";
  });

  evenement.currentTarget.style.backgroundColor = "#2980b9";
  evenement.currentTarget.style.color = "white";
  const critere = evenement.currentTarget.dataset.tri;
  afficherProduits(trierProduits(critere)); // Affiche les produits triés.
}

/**
 * Configure les boutons de tri et leurs événements.
 */
function initialiserTri() {
  boutonsTriHTML.forEach(function (boutonTri) {
    boutonTri.addEventListener("click", gererClicTri); // Utilisation de la fonction nommée
  });
}

// Appel de la fonction d'initialisation lors du chargement de la page
init();

// ************** Références ************ //

// J'ai utilisé des images d'Unsplash, mais j'ai modifié certaines d'entre elles avec Photoshop. Une de ces images est ma création personnelle, tandis que l'autre est une photo de ma meilleure amie Camille. Ces modifications ont été réalisées lors d'une précédente session avec le professeur David Ross."

// Les Séances de Maxime, Lacasse-Germain

// https://www.w3schools.com/js/js_window_location.asp

// https://www.w3schools.com/jsref/jsref_split.asp [Pour toute (.split , .join , .slice .... )

// https://developer.mozilla.org/fr/docs/Web/API/console/warn_static
