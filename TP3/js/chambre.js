/* Simule les variations de températures dans une pièce
 * @auteur: francois.lemieux@polymtl.ca 2010-07-26
*/
var facteurChauffage      = 0.01;  // échange calorifique avec le chauffage
var facteurIsolation      = 0.01;  // échange calorifique avec l'extérieur
var temperatureChauffage  = 70;    // température des calorifères
var temperatureExterieure = 0;     // température extérieure
var temperatureInterieure = 10;    // température intérieure par défaut
var chauffage             = false; // le chauffage n'est pas actif par défaut
var temperatureThermostat = 20;       // le chauffage démarre à  moins de 20° par défaut

var thermometreMax        =50      // Température maximale affichée par le thermomètre
var thermometreMin        =-50     // Température minimale affichée par le thermomètre
var intervalleTemps       =1000;   // intervalle en milisecondes de lecture de la température
var tailleThermometre     =300;    // Taille du thermomètre en pixels
var positionThermometre   =50;     // Position du thermomètre par rapport au haut de la page

/*Extrait la température réglée par le thermostatr */
function getTemperatureThermostat(){
  return document.getElementById("tdValeurThermostat").innerHTML;
}

/* Définit les échanges calorifiques selon les valeurs
 * de la temppérature extérieure, de l'isolation,
 * de la température intérieure, de la température fixée
 * par le thermostat et par l'efficacité du système
 * de chauffage.
 * Un "ticTac" correspond à  un échange calorifique
 */
function ticTac() {
  temperatureInterieure += ((temperatureExterieure - temperatureInterieure) * facteurIsolation);

  if (chauffage == true) {
    temperatureInterieure += ((temperatureChauffage - temperatureInterieure) * facteurChauffage);

    if (temperatureInterieure > getTemperatureThermostat()) {
      chauffage=false;
    }
  } else if (temperatureInterieure < getTemperatureThermostat()) {
    chauffage=true;
  }
}