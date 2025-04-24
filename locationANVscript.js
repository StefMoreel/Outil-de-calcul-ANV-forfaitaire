    //Impression de la page avec le résultat après clic sur le bouton "Impression"
const printPdf = document.getElementById("printPdf");
printPdf.addEventListener("click", generatePdf);
function generatePdf(){
    print()
}
    // Affichage du résultat du calcul de l'ANV en cas de location du véhicule après clic sur bouton "Calcul"
    const calculLocation = document.querySelector("#btn_calcul_ANV_Location");
    if (calculLocation != null){
        calculLocation.addEventListener("click", PrintResulANVLocationOnclick);
    }
function PrintResulANVLocationOnclick(event){
    // Récuparation des éléments et valeurs saisis par l'utilisateur
        const loyer = document.querySelector("#montantLoyer").value;
        const assurance = document.querySelector("#montantAssurance").value;
        const entretien = document.querySelector("#montantEntretien").value;
        const fuelPaid = document.getElementById("employeurPaieCarburant").checked;
        const coutTTC = document.querySelector("#coutTTC").value;
        const date1ereCirculation = document.querySelector("#dateMiseEnCirculation").value;
        const fuel = document.querySelector('input[name="fuel"]:checked');    
    
        if (loyer == "" || assurance == "" || entretien == "" || coutTTC == "" || date1ereCirculation == "" || fuel == null){
            // Si l'un des champs obligatoires est vide, afficher une alerte et empêcher l'envoi du formulaire
            alert("Veuillez remplir tous les champs obligatoires.");
            event.preventDefault();
            return;
        }
    // Exécution de la fonction calculAnvLocation avec les paramètres saisis + Récupération du résulat de la fonction
        const resultatLocationMensuel = calculAnvLocation(loyer,assurance,entretien,fuelPaid);
        const resultatAchatAnnuel = calculAnvAchat(coutTTC,date1ereCirculation,fuelPaid);
        const resultatAchatMensuel = resultatAchatAnnuel/12;
    // Affichage du texte + resultat ANV Location dans la page html    
        document.getElementById("resultatANVLocation").innerHTML = "Le montant mensuel de l'avantage en nature est de : " + resultatLocationMensuel.toFixed(2)+ "€"
    // Affichage du texte + resultat ANV Achat dans la page html
        document.getElementById("resultatANVAchatMensuel").innerHTML = "Si le véhicule avait été acheté, le montant mensuel de l'avantage en nature aurait été de : " + resultatAchatMensuel.toFixed(2)+ "€"

    // Comparatif : si le montant de l'ANV location > au montant de l'ANV achat, alors le montant retenu est celui de l'ANV Achat
        const montantRetenu = compare(resultatLocationMensuel,resultatAchatMensuel);
    
    
    //Affichage du résultat final a appliquer après la comparaison
        document.getElementById("montantANVretenu").innerHTML = "Le montant à retenir pour l'avantage en nature est de : "+ montantRetenu.toFixed(2) + "€ par mois."
}
