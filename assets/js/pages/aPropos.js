import navigationInit from "../components/navigation.js";
import carrouselInit from "../components/carrousel.js";
import modeNuit from "../components/modeNuit.js";
import boiteModale from "../components/boiteModale.js";
import ScrollAnimator from "../classes/ScrollAnimator.js"

function init() {
    navigationInit();
    carrouselInit();
    modeNuit();
    boiteModale();
    new ScrollAnimator(null, document.querySelectorAll(".defilement-container"));
}

init();