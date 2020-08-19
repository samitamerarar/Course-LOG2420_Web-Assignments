/* Patron Observateur
 * Observe le changement de température de la chambre
*/

function Avertisseur() {
    this.observateurs = [];
}
  
// pour s'abonner à l'avertisseur
Avertisseur.prototype.ajouter = function(observateur) {
    this.observateurs.push(observateur);
};

// pour se désabonner de l'avertisseur
Avertisseur.prototype.retirer = function(observateur) {
    const indice = this.observateurs.indexOf(observateur);
    this.observateurs.splice(indice, 1);
};

/* Creation d'observateurs. */

// pour alerter les abonnés avec la temperature du thermometre
Avertisseur.prototype.alerter = function(temperatureThermometre) {
    this.observateurs.forEach(function(observateur) {
        observateur.update(temperatureThermometre);
    });
};

// creer premier observateur change la couleur de Actif sur la vue.
const observateur1 = {
    update: function(temperatureThermometre) {
      controlerActiviteChauffage(`${temperatureThermometre}`);
    }
  };
  
  // creer deuxieme observateur controle le remplissage du thermometre.
  const observateur2 = {
    update: function(temperatureThermometre) {
      controlerRemplissageThermometre(`${temperatureThermometre}`);
    }
  };
  
  // creer troisieme observateur qui affiche la temperature du thermometre sur la vue
  const observateur3 = {
    update: function(temperatureThermometre) {
      document.getElementById("tdValeurInterieure").innerHTML = Math.round(`${temperatureThermometre}`);
    }
  };
  
  // on abonne les 2 observateurs a la chambre.
  const avertisseurDeTemperature = new Avertisseur();
  avertisseurDeTemperature.ajouter(observateur1);
  avertisseurDeTemperature.ajouter(observateur2);
  avertisseurDeTemperature.ajouter(observateur3);
  