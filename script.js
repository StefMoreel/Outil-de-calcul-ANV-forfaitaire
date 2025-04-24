//Saisie de la date maximum au jour d'aujourd'hui
// Récupération de la date du jour
const today = new Date();
// Récupération de l'élément input de type date
const dateInput = document.querySelector("#dateMiseEnCirculation");
// Vérification si l'élément input existe
if (dateInput) {
    // Formatage de la date au format YYYY-MM-DD
    const formattedDate = today.toISOString().split("T")[0];
    // Définition de la valeur maximale de l'input date
    dateInput.setAttribute("max", formattedDate);
}

//Calcul du montant de l'ANV en cas d'achat du véhicule
function calculAnvAchat(prixTTC,dateCirculation,carbEstPrisEnCharge){
//Calculer l'age du vehicule
    const age = getAgeCar(dateCirculation);
//Détermination du taux applicable au prix TTC
    const rate = getRateCost(age,carbEstPrisEnCharge);
// Application du taux au prix TTC
    const montant = prixTTC * rate;
// Retourner le résultat = montant ANV
    return montant;
}
// Calcul de l'âge du véhcicule en années
function getAgeCar(date1ereCirculation){
// Récupération de la date saisie par l'utilisateur (date de 1ère mise en circulation du véhicule)
    const dateSaisie = new Date(date1ereCirculation);
// Déclaration de la date du jour J    
    const today = new Date();
// Calcul de la différence entre la date du jour J et la date saisie par l'utilisateur
    const age = today.getFullYear() - dateSaisie.getFullYear();
// Retourner le nombre d'années entre la date du jour J et la date saisie par l'utilisateur stockée dans la variable "age"
    return age;  
}
// Calcul du taux a appliquer au coût TTC du véhicule en fonction de l'age et de la prise en charge ou non du carburant par l'employeur
function getRateCost(age,fuelIsPaid){
    let rate;
    // 1ere condition : si le véhicule a moins de 5 ans + prise en charge carburant => Cout TTC x 20%
    if (age < 5 && fuelIsPaid) {
        rate = (20/100);
    // 2ème condition : si le véhicule a moins de 5 ans sans prise en charge carburant => Cout TTC x 15%
    }else if (age < 5 && fuelIsPaid===false) { 
        rate = (15/100);
    // 3ème condition : si le véhicule a plus de 5 ans + prise en charge carburant => Cout TTC x 15%
    } else if (age > 5 && fuelIsPaid){
        rate = (15/100);
    // 4ème conddition : si le véhicule a plus de 5 ans sans prise en charge carburant => Cout TTC x 10%
    } else if (age > 5 && fuelIsPaid===false){
        rate = (10/100);
    } else{

    }
    return rate;
}
// Détermination du taux applicable en cas de location
function getRateLocation(fuelIsPaid){
    let rateLocation;
// Si le carburant n'est pas pris en charge par l'employeur : ANV = 50% du coût global annuel
    if (fuelIsPaid){
        rateLocation = (50/100);
    } else{
        rateLocation = (67/100);
    }
    return rateLocation;
}
//Calcul du montant de l'ANV en cas de location du véhicule
function calculAnvLocation(montantLoyer,montantAssurance,montantEntretien,carbEstPrisEnCharge){
    //Calcul du coût global mensuel de la location
        const coutGlobalLocation = parseFloat(montantLoyer)+parseFloat(montantAssurance)+parseFloat(montantEntretien);
    //Récupération du taux applicable au coût global de la location
        const rateLocation = getRateLocation(carbEstPrisEnCharge);
    // Calcul du montant de l'ANV location
        const montantANVLocation = coutGlobalLocation * rateLocation;
    // Retourner le résultat = montant ANV

        return montantANVLocation;
    }
//Comparaison entre le montant de l'ANV Location et le montant de l'ANV Achat : si le montant de l'ANV location > au montant de l'ANV achat, alors le montant retenu est celui de l'ANV Achat
function compare(resultatLocationMensuel,resultatAchatMensuel){
    let montantRetenu;
    if (resultatLocationMensuel > resultatAchatMensuel){
        montantRetenu = resultatAchatMensuel;
    }else{
        montantRetenu = resultatLocationMensuel;
    }
        return montantRetenu;
    }