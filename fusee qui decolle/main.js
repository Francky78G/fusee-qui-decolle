let start = document.querySelector(".start");
let reset = document.querySelector(".reset");
let stopup = document.querySelector(".stop");
let time = document.querySelector(".decollage");
let fusee = document.querySelector(".imgfusee");

let interval;
let fuseeY = 400; // position de départ
let vitesse = 1;  // vitesse initiale
let acceleration = 1.1; // accélération exponentielle (facteur)
let compteur = 4;
let compteARebourd;
let enCours = false

start.addEventListener("click", () => {

   if (enCours) return; //  empêche de relancer
   enCours = true;
   depart(); // Lance le décompte

  // ⏳ Attendre la fin du décompte avant de démarrer la fusée
  setTimeout(() => {
    interval = setInterval(() => {
      // Mettre à jour la position de la fusée
      fuseeY -= vitesse;
      fusee.style.top = fuseeY + "px";

      // Accélération exponentielle
      vitesse *= acceleration;

      // Arrêter quand elle sort de l'écran
      if (fuseeY < -100) {
        clearInterval(interval);
        console.log("🚀 La fusée a quitté l'écran !");
      }
    }, 100);
  }, compteur * 1000); // attendre la durée du compte à rebours
});

// Bouton stop
stopup.addEventListener("click", () => {
   clearInterval(interval);
   enCours = false;
});

// Bouton reset , remet tout à zéro
reset.addEventListener("click", () => {
  clearInterval(interval);
  clearInterval(compteARebourd);
  fuseeY = 400;
  vitesse = 1;
  compteur = 4;
  fusee.style.top = fuseeY + "px";
  time.textContent = "Décollage";
  enCours = false;
});

// Fonction de décompte
function depart() {
  time.textContent = compteur;
  fusee.classList.add("tremble"); // 💥 Tremblement avant le décollage

  compteARebourd = setInterval(() => {
    compteur--;
    if (compteur > 0) {
      // Mets à jour le texte et relance l’animation à chaque chiffre
      time.textContent = compteur;
      time.classList.remove("active");
      void time.offsetWidth; // Trick pour relancer l’animation
      time.classList.add("active");
    } else {
      time.textContent = "Décollage 🚀";
      time.classList.remove("active");
      clearInterval(compteARebourd);
    }
  }, 1000);
}
