const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Insérer les types d'items
    const itemSets = [
        {
            name: "Ténacité",
            description1: "Le taux de coup critique de l'utilisateur augmente de 8 %.",
            description2: "Le taux de coup critique de l'utilisateur augmente de 32 %.",
            description3: ""
        },
        {
            name: "Analyse imparable",
            description1: "L'efficacité de Bris est augmentée de 15 %.",
            description2: "Augmente l'effet de Bris de 30 % en attaquant des ennemis dotés d'une faiblesse élémentaire.",
            description3: ""
        },
        {
            name: "Gardien",
            description1: "Les effets Bouclier de l'utilisateur augmentent de 30 %.",
            description2: "Lorsqu'un membre de l'équipe (joueur compris) active un Bouclier, les dégats infligés augmentent de 10% pendant 10 secondes.",
            description3: ""
        },
        {
            name: "Noble sacrifice",
            description1: "Les PV de l'utilisateur augmentent de 8 %.",
            description2: "L'attaque de l'utilisateur diminue de 8%, mais l'Attaque des membres de l'équipe augmente de 8 %.",
            description3: ""
        },
        {
            name: "Mort en un coup",
            description1: "Augmente les dégats de compétence ultime de 25 %.",
            description2: "Réduit le temps de rechargement de la compétence ultime de 40 %.",
            description3: ""
        },
        {
            name: "Armé",
            description1: "Augmente l'Attaque de l'utilisateur de 5 %.",
            description2: "En attaquant, l'utilisateur ignore 18 % de la Défense de la cible.",
            description3: ""
        },
        {
            name: "Fondation solide",
            description1: "Augmente les dégats des Attaques de base de l'utilisateur de 18 %.",
            description2: "Augmente les dégats des Attaques de noyau de l'utilisateur de 18 % et lorsqu'une attaque touche sa cible la jauge de noyau de l'utilisateur se remplit de 60.",
            description3: ""
        },
        {
            name: "Destructeur",
            description1: "Le taux de remplissage de la jauge de puissance augmente de 20 %.",
            description2: "Au début de chaque combat, la jauge de puissance de l'utilisateur se charge de 50 % et le taux de remplissage de la jauge de puissance de l'utilisateur et des membres de son équipe augmente de 20 %",
            description3: ""
        },
        {
            name: "Champion de la bataille",
            description1: "Augmente l'Ataque de l'utilisateur de 8 % pendant 8 secondes en cas de coup critique réussi (temps de rechargement : 0.8 seconde).",
            description2: "Le cumul maximal de l'effet d'attaque augmentée passe à 6.",
            description3: ""
        },
        {
            name: "Exécuteur",
            description1: "Lorsque les PV de l'ennemie sont à 40 % ou en dessous, les dégats infligés par l'utilisateur augmentent de 30 %.",
            description2: "La condition concernant les PV est passée à 70 % et l'effet d'augmentation des dégats passe à 60 %.",
            description3: ""
        },
        {
            name: "Berserker",
            description1: "Lorsque les PV du joueur sont à 50 % ou en dessous, les dégats infligés augmentent de 30 %.",
            description2: "La condition concernant les PV est passée à 70 % et l'effet d'augmentation des dégats passe à 60 %.",
            description3: ""
        },
        {
            name: "Expert",
            description1: "Lorsqu'un coup critique est porté, l'utilisateur à 25 % de chances d'augmenter l'attaque de 0.8 % (cumulable jusqu'à 100 fois, temps de rechargement : 1 seconde)",
            description2: "Fait passer le taux d'activation à 50 % et l'attaque à 1.6 %.",
            description3: ""
        },
        {
            name: "Connexion exceptionnelle",
            description1: "Lorsqu'un personnage quitte le combat, l'attaque de l'utilisateur et des membres de l'équipe augmente de 12 % pendant 10 secondes (temps de rechargement : 20 secondes).",
            description2: "Fait passer l'effet d'augmentation de l'attaque de 28 % et la durée à 15 secondes.",
            description3: ""
        },
        {
            name: "Malédiction ardente",
            description1: `
            Applique l'effet Malédiction.
            - Augmente les dégats subis de 20 %.
            - Augmente les dégâts infligés de 10 % et augmente les dégats infligés de 0.1 % toutes les 1 seconde. (cumulable jusqu'à 100 fois).
          `.trim(),
            description2: `
            Malédiction devient Malédiction améliorée.
            - Augmente les dégats subis de 20 %.
            - Augmente les dégâts infligés de 20 % et augmente les dégats infligés de 0.1 % toutes les 1 seconde. (cumulable jusqu'à 100 fois).
            Applique l'effet Sauvetage
            - Si les PV de l'utilisateur sont à 25 % ou moins, il récupère 25 % de ses PV (Ne s'active qu'une fois par instance).
          `.trim(),
            description3: `
            Malédiction améliorée devient Malédiction ardente.
            - Augmente les dégats subis de 20 %.
            - Augmente les dégâts infligés de 30 % et augmente les dégats infligés de 0.2 % toutes les 1 seconde. (cumulable jusqu'à 100 fois).
            `.trim()
        },
        {
            name: "Avarice ardente",
            description1: `
            Lorsque l'utilisateur touche une cible avec une attaque infligeant des dégats de Bris l'effet Avarice s'applique.
            - Augmente le taux de coup critique de l'utilisateur de 1 % (cumulable jusqu'à 10 fois).
            - Temps de rechargement : 1.5 seconde.
          `.trim(),
            description2: `
            Lorsque Avarice est cumulé 10 fois Avarice Ardente s'active.
            - Augmente le taux de coup critique de l'utilisateur et de ses alliés de 10 % et leur dégats de coup critique de 15 %.
          `.trim(),
            description3: `
            Augmente l'effet de Bris de 30 % en attaquant des ennemis dotés d'une faiblesse élémentaire.
            Avarice améliorée est remplacé par Avarice ardente.
            - Augmente le taux de coup critique de l'utilisateur et de ses alliés de 15 % et leur dégats de coup critique de 30 %.
            `.trim()
        },
        {
            name: "Ange en blanc",
            description1: "Les PV de l'utilisateur augmentent de 8 %",
            description2: "Augmente les soins reçus par l'utilisateur de 8 %. Augmente les dégats du membre de l'équipe ayant la puissance totale la plus élevée de 8 %",
            description3: ""
        },
        {
            name: "Belliciste",
            description1: "Augmente l'attaque et la défense de l'utilisateur de 4 %",
            description2: "Lorsque les attaques touchent leur cible augmente l'attaque et la défense de l'utilisateur de 3 % pendant 8 secondes (cumulable 8 fois, temps de rechargement : 0.5 seconde)",
            description3: ""
        },
        {
            name: "Bénédiction de Sylphe",
            description1: "Lors de l'utilisation de compétences QTE, de soutien ou d'ultime les dégats de faiblesse élémentaire de l'utilisateur et de son équipe augmentent de 5 % (durée : 30 secondes)",
            description2: "Elève la durée de l'effet à 60 secondes et augmente à 3 cumuls maximum de l'augmentation de dégats sur les faiblesse élémentaires.",
            description3: ""
        },
        {
            name: "Bénédiction ardente",
            description1: `
            Lorsqu'un personnage quitte le combat il applique l'effet Bénédiction à toute l'équipe.
            - Augmente les dégats infligés par l'utilisateur de 8 % (Durée : 10 secondes).
            - Temps de rechargement : 25 seconde.
          `.trim(),
            description2: `
            Bénédiction est remplacée par Bénédiction améliorée.
            - Augmente les dégats infligés par l'utilisateur de 10 % et restaure 0.2 % de ses P¨V toutes les 1 seconde (Durée : 10 secondes).
            - Temps de rechargement : 25 seconde.
          `.trim(),
            description3: `
            Bénédiction améliorée devient Bénédiction ardente.
            - Augmente les dégats infligés par l'utilisateur de 20 % et restaure 0.2 % de ses P¨V toutes les 1 seconde (Durée : 20 secondes).
            - Temps de rechargement : 25 seconde.
          `.trim(),
        },
        {
            name: "Concentration de puissance de feu",
            description1: "La consommation de PM pour les compétences de l'utilisateur augmente de 20 %, mais les dégats infligés par l'utilisateur augmentent de 5 % et le temps de rechargement des compétences de base diminue de 5 %.",
            description2: "Ajoute 18 % de pénétration de la défense et l'effet de diminition du temps de rechargement passe à 18 %.",
            description3: ""
        },
        {
            name: "Capacité exceptionnelle",
            description1: "Lorsque les PM de l'utilisateur sont à 70 % ou plus les dégats infligés augmentent de 30 %.",
            description2: "La condition concernant les PM est passée à 40 % ou plus et l'effet d'augmentation des dégats passe à 60 %.",
            description3: ""
        }
    ];

    for (const itemSet of itemSets) {
        await prisma.itemSet.create({
            data: itemSet,
        });
    }

    console.log('Item sets added successfully.');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
