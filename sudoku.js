console.log('hello\n\n');

function afficher(grille){
    let affichage = '';
    for(let ligne of grille){
        for(let chiffre of ligne){
            if(chiffre === null) chiffre = '_';
            affichage += chiffre + ' ';
        }
        affichage += '\n';
    }
    
    console.log(affichage);
}


// Cette fonction retrourne les chiffre d'une colomne
function colomne(colomne,grille){
    let chiffresDeLaColomne = [];
    
    for(let ligne of grille){
        chiffresDeLaColomne.push(ligne[colomne]);
    }
    
    return chiffresDeLaColomne;
}

// Cette fonction retourne l'indice de début du carré pour un indice donné
// (rappel : on compte de zéro à huit) 
function premierDuCarre(indice){
    switch(indice){
        case 0:
        case 1:
        case 2:
        return 0;
        case 3:
        case 4:
        case 5:
        return 3;
        case 6:
        case 7:
        case 8:
        return 6;
    }
}

// Cette fonction retourne les chiffres présents dans le même carré que les coordonnées données
function carre(ligne,colomne,grille){
    let chiffresDuCarre = [];
    
    let premiereLigne = premierDuCarre(ligne);
    let premiereColomne = premierDuCarre(colomne);
    for(let ligne = premiereLigne; ligne <= premiereLigne+2; ligne++ ){
        for(let colomne = premiereColomne; colomne <= premiereColomne+2; colomne++ ){
            chiffresDuCarre.push(grille[ligne][colomne]);   
        }        
    }
    
    return chiffresDuCarre;
}

// Sur une map clé(chiffre de 1 à 9), valeur(true si encore possible)
// renvoie la liste des chiffres encore possibles
function chiffresPossibles(tablePossibilites){
    let chiffres = [];
    for(let chiffre of tablePossibilites.keys()){
        
    }
}


// ================================

var vide = null;
var grilleTest = [];

grilleTest[0] = [8,7,vide,vide,9,vide,vide,6,5];
grilleTest[1] = [vide,9,vide,5,vide,vide,vide,vide,vide];
grilleTest[2] = [vide,vide,vide,vide,1,4,vide,vide,vide];

grilleTest[3] = [7,vide,vide,vide,vide,vide,5,vide,9];
grilleTest[4] = [vide,vide,2,vide,vide,vide,1,vide,vide];
grilleTest[5] = [5,vide,4,2,vide,vide,vide,vide,6];

grilleTest[6] = [vide,vide,vide,4,2,vide,vide,vide,vide];
grilleTest[7] = [vide,vide,vide,vide,vide,7,vide,5,vide];
grilleTest[8] = [6,5,vide,vide,3,vide,vide,4,7];



afficher(grilleTest);

function resoudre(grille,verbose){
    if(typeof verbose === "undefined"){
        verbose = false;
    }
    for(let ligneCourante = 0; ligneCourante < grille.length ; ligneCourante++){
        for(let colomneCourante = 0; colomneCourante < grille[ligneCourante].length; colomneCourante++){
            let chiffre = grille[ligneCourante][colomneCourante];
           if(chiffre === null){
               // lister toute les possibilitées, les 9 chiffres
               // Au début, ils sont tous 'true', c'est à dire potentiellement possibles
               let possibilites = {
                   1: true,
                   2: true,
                   3: true,
                   4: true,
                   5: true,
                   6: true,
                   7: true,
                   8: true,
                   9: true
               };
               

               
               // Eliminer les chiffres déjà présents sur la ligne
               for(let chiffreDejaSurLaLigne of grille[ligneCourante]){
                   if(chiffreDejaSurLaLigne !== null){
                       // console.log("On exclut " + chiffreDejaSurLaLigne + "qui est déjà dans la ligne");
                       delete possibilites[chiffreDejaSurLaLigne];
                       // console.log(possibilites);
                   }
               }
               
               // Eliminer les chiffres déjà présents sur la colomne
               for(let chiffreDejaSurLaColomne of colomne(colomneCourante,grille)){
                   if(chiffreDejaSurLaColomne !== null){
                       // console.log("On exclut " + chiffreDejaSurLaColomne + "qui est déjà dans la colomne");
                       delete possibilites[chiffreDejaSurLaColomne];
                       // console.log(possibilites);
                   }
               }
               
               // Eliminer les chiffres déjà présents dans le carré
               for(let chiffreDejaDansLeCarre of carre(ligneCourante,colomneCourante,grille)){
                   if(chiffreDejaDansLeCarre !== null){
                       //console.log("On exclut " + chiffreDejaDansLeCarre + "qui est déjà dans le carré");
                       delete possibilites[chiffreDejaDansLeCarre];
                       //console.log(possibilites);
                   }
               }
               
               let chiffresRestants = Object.keys(possibilites);
               if(verbose){
                   console.log(ligneCourante + " - " + colomneCourante + " : " + chiffresRestants.length + " possibilités restantes");
                   console.log(possibilites);
               }

               if(chiffresRestants.length === 1){
                   let leBonChiffre = Number(chiffresRestants[0]);
                   if(verbose)console.log("il n'y a qu'une seule possibilité : " + leBonChiffre);
                   grille[ligneCourante][colomneCourante] = leBonChiffre;
               }
               
           }
        }
    }
}


for(let i = 0;i < 100; i++){
  resoudre(grilleTest);
}


afficher(grilleTest);


resoudre(grilleTest,true);



