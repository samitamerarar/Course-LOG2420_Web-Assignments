/* Extrait les valeurs produites dans la page Web et par le simulateur
 * et déclanche l'affichage des valeurs dans la page
*/

const GRADATION_THERMOMETRE_A_ZERO = 50;  // valeur a zéro du thermometre (gradation)
const GRADATION_THERMOSTAT_A_ZERO = 10; // valeur a zéro du thermostat (gradation)

var tic; // servent à l'appel de la fonction ticTac de chambre.js
var tac; // ils sont appelés a chaque seconde (tic et tac)
var premiereFoisQueSlideChange = true;  // pour demarrer chrono() une seule fois

/*Code jquery qui affiche un glisseur dans le conteneur ayant
 *l'identifiant #thermostat, qui initalise sa position et ses valeurs
 *par défaut et qui affiche la valeur sélectionnée dans un conteneur
 *ayant l'identifiant #valeurThermostat
 *
 *Pour démarrer le chauffage, il faut cliquer le curseur de défilement
 */
/*********************Ne pas modifier***********************/
$(document).ready(function() {
    $("#thermostat").slider(
    {
      orientation: 'vertical',
      max: 40 ,
      value:temperatureThermostat,
      min: -10 ,
      step: 1
    });
    $("#thermostat").slider({
      change: function(event, ui) {
        $("#tdValeurThermostat").text( ui.value );
      }
    });
  });
/*********************Ne pas modifier***********************/

// demarre le chrono quand le slider bouge pour la premiere fois
$(document).ready(function() {
  $( "#thermostat" ).on( "slidechange", function( event, ui ) { 
    if (premiereFoisQueSlideChange) {
      chrono();
      tic(tac);
      remplirThermostat();
    }
    premiereFoisQueSlideChange = false;
  });
});

/* Informer les observateurs de la temperature de la chambre a chaque seconde. */
function chrono() {
  tic = ()=> {
    setTimeout(function()
      {
        ticTac();
        tac();
        avertisseurDeTemperature.alerter(temperatureInterieure);
        if (chauffage === false) {  // ces 2 lignes rendent plus rapide le changement
          chauffageNonActif();      // de actif/inactif
        }
      }, intervalleTemps);
  }
  
  tac = ()=> {
    tic();
  }
}

/* Mettre a jour le remplissage du thermometre. */
function controlerRemplissageThermometre(temperatureThermometre) {
  if (temperatureThermometre !== getTemperatureThermostat()) {
    remplirThermometre(temperatureThermometre);
  }
}

/* Remplir/vider le thermometre d'une couleur rouge. */
function remplirThermometre(temperatureThermometre) {
  const facteur = obtenirFacteurTemperatureThermometreAPixel();
  document.getElementById("thermometre-fill").style.height = (temperatureThermometre*facteur)+(GRADATION_THERMOMETRE_A_ZERO*facteur) + 'px';
}

/* Mettre a jour l'affichage du thermostat a chaque 50ms. */
function remplirThermostat() {
  setInterval( ()=> {
    const facteur = obtenirFacteurTemperatureThermostatAPixel();
    document.getElementById("thermostat-fill").style.height = (getTemperatureThermostat()*facteur)+(GRADATION_THERMOSTAT_A_ZERO*facteur) + 'px';
  }, 50);
}

/* Retourne facteur pour convertir la gradation en pixels pour le remplissage du thermometre. */
function obtenirFacteurTemperatureThermometreAPixel() {
  return tailleThermometre/(thermometreMax-thermometreMin);
}

/* Retourne facteur pour convertir la gradation en pixels pour le remplissage du thermostat. */
function obtenirFacteurTemperatureThermostatAPixel() {
  return tailleThermometre/(40-(-10)); // valeur max-min du thermostat
}

/* Choisis la couleur rouge ou blanche pour le mot Actif/Inactif sur la vue. */
function controlerActiviteChauffage(temperatureThermometre) {
  if (temperatureThermometre < getTemperatureThermostat()) {
    chauffageActif();
    document.getElementById("actif").style.backgroundColor = "Red";
  }
  else {
    chauffageNonActif();
    document.getElementById("actif").style.backgroundColor = "White";
  }
}

/* La couleur rouge est choisis et est Actif. */
function chauffageActif() {
  document.getElementById("actif").style.backgroundColor = 'red';
  document.getElementById("actif").innerHTML = "Actif";
}

/* La couleur blanche est choisis et est Inactif. */
function chauffageNonActif() {
  document.getElementById("actif").style.backgroundColor = 'white';
  document.getElementById("actif").innerHTML = "Inactif";
}

/* Met a jour la temperature exterieure sur la vue */
function getTemperatureExterieure() {
  document.getElementById("tdValeurExterieure").innerHTML = temperatureExterieure;
}
