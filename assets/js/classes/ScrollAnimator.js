/**
 * Cette classe permet d'afficher des éléments au défilement de la page
 */
class ScrollAnimator {
    /**
     * Initialise l'animation des éléments lorsqu'ils apparaissent dans la zone visible.
     * @param {HTMLElement} zoneVisibilite - L'élément racine pour l'observation (null pour `viewport`).
     * @param {HTMLElement[]} targets - Les éléments à observer et animer.
     */
    constructor(zoneVisibilite, targets) {
        this.zoneVisibilite = zoneVisibilite; 
        this.targets = targets; 
        this.options = {
            root: this.zoneVisibilite,
            rootMargin: "0px",
            threshold: 0.5,
        };

        //Création de l'instance de l'intersection observer
        //On passe la fonction de rappel qui sera appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
        this.observer = new IntersectionObserver(this.onIntersection.bind(this), this.options);


        //On observe les éléments cibles
        targets.forEach(
            function (target) {
                //On observe chaque élément cible
                this.observer.observe(target);

                target.classList.add('defilement-container');

            }.bind(this)
        );
    }

    /**
     * Fonction de rappel appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
     * @param {*} entries
     */
    onIntersection(entries) {
        //Entries est un tableau d'objets IntersectionObserverEntry, donc tous les éléments cibles observés
        entries.forEach(
            function (objetVisible) {
                let element = objetVisible.target; //L'élément HTML cible
                let intersecte = objetVisible.isIntersecting; //Si l'élément cible est dans la zone d'intersection
                    if (intersecte) {
                        element.animate([
                            { 
                                opacity: 0, 
                                transform: 'translateX(-100px)' 
                            },
                            { 
                                opacity: 1, 
                                transform: 'translateX(0)' 
                            }
                        ], { 
                            duration: 2000,
                            fill: "forwards",
                            easing: "ease-out"
                        });
    
                        // arrête d'observer l'élément après animation
                        this.observer.unobserve(element);
                    }
                }.bind(this)
            );
        }
    }
    export default ScrollAnimator;