//Impression de la page avec le résultat après clic sur le bouton "Impression"
const printPdf = document.getElementById("printPdf");
printPdf.addEventListener("click", generatePdf);
function generatePdf(){
    print()
}
// Affichage du résultat du calcul de l'ANV en cas d'achat du véhicule après clic sur bouton "Calcul"
const calculAchat = document.querySelector("#btn_calcul_ANV_achat");
if (calculAchat != null){
    calculAchat.addEventListener("click", PrintResulANVAchatOnclick);
}
function PrintResulANVAchatOnclick(){
// Récuparation des éléments et valeurs saisis par l'utilisateur
    const coutTTC = document.querySelector("#coutTTC").value;
    const date1ereCirculation = document.querySelector("#dateMiseEnCirculation").value;
    const fuelPaid = document.getElementById("employeurPaieCarburant").checked;
// Exécution de la fonction calculAnvAchat avec les paramètres saisis + Récupération du résulat de la fonction
    const resultat = calculAnvAchat(coutTTC,date1ereCirculation,fuelPaid);
    const resultatMensuel = resultat/12;
   
// Affichage du texte + resultat dans la page html    
    document.getElementById("resultatANVAchat").innerHTML = "Le montant annuel de l'avantage en nature est de : " + resultat.toFixed(2) + "€, soit " +resultatMensuel.toFixed(2) + "€ par mois."
}
