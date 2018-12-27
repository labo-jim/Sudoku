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

function conterCasesVides(grille){
    let nb = 0;
    for(let ligne of grille){
        for(let chiffre of ligne){
            if(chiffre === null) nb++;       
        }
    } 
    return nb;
}



// Cette fonction retrourne les chiffre d'une colomne
function chiffresColomne(colomne,grille){
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

function coordonnesCarre(ligne,colomne){
    let premiereLigne = premierDuCarre(ligne);
    let premiereColomne = premierDuCarre(colomne);
    
    return [
        [premiereLigne,premiereColomne],
        [premiereLigne,premiereColomne+1],
        [premiereLigne,premiereColomne+2],
        [premiereLigne +1 ,premiereColomne],
        [premiereLigne+1,premiereColomne+1],
        [premiereLigne+1,premiereColomne+2],
        [premiereLigne+2,premiereColomne],
        [premiereLigne+2,premiereColomne+1],
        [premiereLigne+2,premiereColomne+2]
    ];
}

// Cette fonction retourne les chiffres présents dans le même carré que les coordonnées données
function carre(ligne,colomne,grille){
    let chiffresDuCarre = [];
    
    let coordonnes = coordonnesCarre(ligne,colomne);
    for(let paireCoord of coordonnes){
        chiffresDuCarre.push(grille[paireCoord[0]][paireCoord[1]]);
    }
       
    return chiffresDuCarre;
}

// Cette fonction retourne la liste des chiffres possibles sur une case donnée
function chiffresPossibles(ligne,colomne,grille){
    
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
   for(let chiffreDejaSurLaLigne of grille[ligne]){
       if(chiffreDejaSurLaLigne !== null){
           // console.log("On exclut " + chiffreDejaSurLaLigne + "qui est déjà dans la ligne");
           delete possibilites[chiffreDejaSurLaLigne];
           // console.log(possibilites);
       }
   }
   
   // Eliminer les chiffres déjà présents sur la colomne
   for(let chiffreDejaSurLaColomne of chiffresColomne(colomne,grille)){
       if(chiffreDejaSurLaColomne !== null){
           // console.log("On exclut " + chiffreDejaSurLaColomne + "qui est déjà dans la colomne");
           delete possibilites[chiffreDejaSurLaColomne];
           // console.log(possibilites);
       }
   }
   
   // Eliminer les chiffres déjà présents dans le carré
   for(let chiffreDejaDansLeCarre of carre(ligne,colomne,grille)){
       if(chiffreDejaDansLeCarre !== null){
           //console.log("On exclut " + chiffreDejaDansLeCarre + "qui est déjà dans le carré");
           delete possibilites[chiffreDejaDansLeCarre];
           //console.log(possibilites);
       }
   }
   
   return Object.keys(possibilites);
}




// ================================

var vide = null;
var grilleTest = [];

// grille difficile
grilleTest[0] = [vide,4,vide,vide,vide,vide,vide,1,vide];
grilleTest[1] = [vide,vide,vide,1,vide,5,vide,vide,2];
grilleTest[2] = [vide,vide,vide,vide,2,3,vide,vide,9];

grilleTest[3] = [vide,2,5,vide,6,vide,vide,vide,4];
grilleTest[4] = [vide,8,vide,vide,vide,vide,vide,7,vide];
grilleTest[5] = [6,vide,vide,vide,7,vide,2,9,vide];

grilleTest[6] = [3,vide,vide,9,5,vide,vide,vide,vide];
grilleTest[7] = [4,vide,vide,8,vide,7,vide,vide,vide];
grilleTest[8] = [vide,9,vide,vide,vide,vide,vide,3,vide];



afficher(grilleTest);

console.log("il faut trouver " + conterCasesVides(grilleTest) + " cases");
console.log("==================================\n\n\n\n");

// ================================

function chiffresPossibleSurLeResteDeLaLigne(ligneCourante,colomneCourante,grille){
       // On fait un set des chiffres possibles ailleurs sur cette ligne
    let possibDesAutresCasesDeLaLigne = new Set();
      for(let c = 0; c < 9;c++){
          if(grille[ligneCourante][c] === null && c != colomneCourante){
              for(let chiffrePossibleDansLaLigne of chiffresPossibles(ligneCourante,c,grille)){
                  possibDesAutresCasesDeLaLigne.add(chiffrePossibleDansLaLigne);
              }
          }
      }
      
     return possibDesAutresCasesDeLaLigne;
}

function resoudre(grille,verbose){
    let nbCaseResolues = 0;
    if(typeof verbose === "undefined"){
        verbose = false;
    }
    for(let ligneCourante = 0; ligneCourante < grille.length ; ligneCourante++){
        for(let colomneCourante = 0; colomneCourante < grille[ligneCourante].length; colomneCourante++){
            let chiffre = grille[ligneCourante][colomneCourante];
           if(chiffre === null){
             
               
               let chiffresRestants = chiffresPossibles(ligneCourante,colomneCourante,grille)
               
               if(verbose){
                   console.log(ligneCourante + " - " + colomneCourante + " : " + chiffresRestants.length + " possibilités restantes");
                   console.log(chiffresRestants);
               }

               if(chiffresRestants.length === 1){
                   // il ne reste qu'une posibilite
                   let leBonChiffre = Number(chiffresRestants[0]);
                   
                   if(verbose)console.log("il n'y a qu'une seule possibilité : " + leBonChiffre);
                   
                   grille[ligneCourante][colomneCourante] = leBonChiffre;
                   nbCaseResolues++;
               } else {
                   // + condition supplémentaire "forcer" ?
                   
                   // L'un de ces chiffres :
                   // N'est pas possible ailleurs sur la ligne ?
                   

                   let possibDesAutresCasesDeLaLigne = chiffresPossibleSurLeResteDeLaLigne(ligneCourante,colomneCourante,grille);
                  
                  // On vérifie pour chaque chiffre possible pour cette case
                  // S'il est dans le set en question. Si non : c'est celui là !
                  for(let chiffreRestant of chiffresRestants){
                      if(!possibDesAutresCasesDeLaLigne.has(chiffreRestant)){
                          if(verbose)console.log(chiffreRestant + "  ne peut être qu'ici dans la ligne");
                          
                          grille[ligneCourante][colomneCourante] = chiffreRestant;
                          nbCaseResolues++;
                          continue;
                      }
                  }
               }
               
           }
        }
    }
    
    return nbCaseResolues;
}


// ==========================


let casesRestantes = conterCasesVides(grilleTest);

while(casesRestantes > 0){
    let nbCasesResolues = resoudre(grilleTest);
    if(nbCasesResolues == 0){
        console.log("L'algorithme est bloqué !");
        break;
    } else {
        casesRestantes -= nbCasesResolues;
        afficher(grilleTest);
        console.log("il reste " + conterCasesVides(grilleTest) + " cases à trouver.");
    }
}





