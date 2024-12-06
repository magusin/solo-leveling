const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insérer les types d'items
  const items = [
    // Belliciste set
    {
      name: 'Heaume de chevalier sanglant',
      image: '/images/Heaume-sanglant.webp',
      typeId: 1,
      itemSetId: 17
    },
    {
      name: 'Armure de chevalier sanglant',
      image: '/images/Armure-sanglante.webp',
      typeId: 2,
      itemSetId: 17
    },
    {
      name: 'Gants de chevalier sanglant',
      image: '/images/Gants-sanglants.webp',
      typeId: 3,
      itemSetId: 17
    },
    {
      name: 'Bottes de chevalier sanglant',
      image: '/images/Bottes-sanglantes.webp',
      typeId: 4,
      itemSetId: 17
    },
    // Destructeur set
    {
      name: 'Heaume de démon de rang supérieur',
      image: '/images/Heaume-démon.webp',
      typeId: 1,
      itemSetId: 8
    },
    {
      name: 'Armure de démon de rang supérieur',
      image: '/images/Armure-démon.webp',
      typeId: 2,
      itemSetId: 8
    },
    {
      name: 'Gants de démon de rang supérieur',
      image: '/images/Gants-démon.webp',
      typeId: 3,
      itemSetId: 8
    },
    {
      name: 'Bottes de démon de rang supérieur',
      image: '/images/Bottes-démon.webp',
      typeId: 4,
      itemSetId: 8
    },
    // Fondation solide set
    {
      name: 'Heaume de chevalier dragon',
      image: '/images/Heaume-dragon.webp',
      typeId: 1,
      itemSetId: 7
    },
    {
      name: 'Armure de chevalier dragon',
      image: '/images/Armure-dragon.webp',
      typeId: 2,
      itemSetId: 7
    },
    {
      name: 'Gants de chevalier dragon',
      image: '/images/Gants-dragon.webp',
      typeId: 3,
      itemSetId: 7
    },
    {
      name: 'Bottes de chevalier dragon',
      image: '/images/Bottes-dragon.webp',
      typeId: 4,
      itemSetId: 7
    },
    // Armé set
    {
      name: 'Casque de lion noir',
      image: '/images/Casque-lion.webp',
      typeId: 1,
      itemSetId: 6
    },
    {
      name: 'Armure de lion noir',
      image: '/images/Armure-lion.webp',
      typeId: 2,
      itemSetId: 6
    },
    {
      name: 'Gants de lion noir',
      image: '/images/Gants-lion.webp',
      typeId: 3,
      itemSetId: 6
    },
    {
      name: 'Bottes de lion noir',
      image: '/images/Bottes-lion.webp',
      typeId: 4,
      itemSetId: 6
    },
    // Mort en un coup set
    {
      name: 'Chapeau de grand enchanteur',
      image: '/images/Chapeau-enchanteur.webp',
      typeId: 1,
      itemSetId: 5
    },
    {
      name: 'Robe de grand enchanteur',
      image: '/images/Robe-enchanteur.webp',
      typeId: 2,
      itemSetId: 5
    },
    {
      name: 'Gants de grand enchanteur',
      image: '/images/Gants-enchanteur.webp',
      typeId: 3,
      itemSetId: 5
    },
    {
      name: 'Bottes de grand enchanteur',
      image: '/images/Bottes-enchanteur.webp',
      typeId: 4,
      itemSetId: 5
    },
    // Noble sacrifice set
    {
      name: 'Chapeau sacré',
      image: '/images/Chapeau-sacré.webp',
      typeId: 1,
      itemSetId: 4
    },
    {
      name: 'Robe sacrée',
      image: '/images/Robe-sacrée.webp',
      typeId: 2,
      itemSetId: 4
    },
    {
      name: 'Gants sacrés',
      image: '/images/Gants-sacrés.webp',
      typeId: 3,
      itemSetId: 4
    },
    {
      name: 'Bottes sacrées',
      image: '/images/Bottes-sacrées.webp',
      typeId: 4,
      itemSetId: 4
    },
    // Ange en blanc set
    {
      name: 'Chapeau de prêtre',
      image: '/images/Chapeau-prêtre.webp',
      typeId: 1,
      itemSetId: 16
    },
    {
      name: 'Robe de prêtre',
      image: '/images/Robe-prêtre.webp',
      typeId: 2,
      itemSetId: 16
    },
    {
      name: 'Gants de prêtre',
      image: '/images/Gants-prêtre.webp',
      typeId: 3,
      itemSetId: 16
    },
    {
      name: 'Bottes de prêtre',
      image: '/images/Bottes-prêtre.webp',
      typeId: 4,
      itemSetId: 16
    },
    // Gardien set
    {
      name: 'Casque de garde du palais',
      image: '/images/Casque-garde.webp',
      typeId: 1,
      itemSetId: 3
    },
    {
      name: 'Armure de garde du palais',
      image: '/images/Armure-garde.webp',
      typeId: 2,
      itemSetId: 3
    },
    {
      name: 'Gants de garde du palais',
      image: '/images/Gants-garde.webp',
      typeId: 3,
      itemSetId: 3
    },
    {
      name: 'Bottes de garde du palais',
      image: '/images/Bottes-garde.webp',
      typeId: 4,
      itemSetId: 3
    },
    // Analyse imparable set
    {
      name: 'Casque de nouveau chasseur',
      image: '/images/Casque-chasseur.webp',
      typeId: 1,
      itemSetId: 2
    },
    {
      name: 'Armure de nouveau chasseur',
      image: '/images/Armure-chasseur.webp',
      typeId: 2,
      itemSetId: 2
    },
    {
      name: 'Gants de nouveau chasseur',
      image: '/images/Gants-chasseur.webp',
      typeId: 3,
      itemSetId: 2
    },
    {
      name: 'Bottes de nouveau chasseur',
      image: '/images/Bottes-chasseur.webp',
      typeId: 4,
      itemSetId: 2
    },
    // Ténacité set
    {
      name: 'Casque en cuir rigide',
      image: '/images/Casque-cuir.webp',
      typeId: 1,
      itemSetId: 1
    },
    {
      name: 'Armure en cuir rigide',
      image: '/images/Armure-cuir.webp',
      typeId: 2,
      itemSetId: 1
    },
    {
      name: 'Gants en cuir rigide',
      image: '/images/Gants-cuir.webp',
      typeId: 3,
      itemSetId: 1
    },
    {
      name: 'Bottes en cuir rigide',
      image: '/images/Bottes-cuir.webp',
      typeId: 4,
      itemSetId: 1
    },
    // Concentration de puissance de feu set
    {
      name: 'Collier verdâtre',
      image: '/images/Collier-verdâtre.webp',
      typeId: 5,
      itemSetId: 20
    },
    {
      name: 'Bracelet verdâtre',
      image: '/images/Bracelet-verdâtre.webp',
      typeId: 6,
      itemSetId: 20
    },
    {
      name: 'Bague verdâtre',
      image: '/images/Bague-verdâtre.webp',
      typeId: 7,
      itemSetId: 20
    },
    {
      name: 'Boucles d’oreilles verdâtres',
      image: '/images/Boucles-verdâtres.webp',
      typeId: 8,
      itemSetId: 20
    },
    //Connexion exceptionnelle set
    {
      name: "Collier en aigue-marine",
      image: '/images/Collier-aigue-marine.webp',
      typeId: 5,
      itemSetId: 13
    },
    {
      name: "Bracelet en aigue-marine",
      image: '/images/Bracelet-aigue-marine.webp',
      typeId: 6,
      itemSetId: 13
    },
    {
      name: "Bague en aigue-marine",
      image: '/images/Bague-aigue-marine.webp',
      typeId: 7,
      itemSetId: 13
    },
    {
      name: "Boucles d'oreilles en aigue-marine",
      image: '/images/Boucles-aigue-marine.webp',
      typeId: 8,
      itemSetId: 13
    },
    // Bénédiction de Sylphe set
    {
      name: "Collier de péridot",
      image: '/images/Collier-péridot.webp',
      typeId: 5,
      itemSetId: 18
    },
    {
      name: "Bracelet de péridot",
      image: '/images/Bracelet-péridot.webp',
      typeId: 6,
      itemSetId: 18
    },
    {
      name: "Bague de péridot",
      image: '/images/Bague-péridot.webp',
      typeId: 7,
      itemSetId: 18
    },
    {
      name: "Boucles d'oreilles de péridot",
      image: '/images/Boucles-péridot.webp',
      typeId: 8,
      itemSetId: 18
    },
    // Expert set
    {
      name: "Collier de bête",
      image: '/images/Collier-bête.webp',
      typeId: 5,
      itemSetId: 12
    },
    {
      name: "Bracelet de bête",
      image: '/images/Bracelet-bête.webp',
      typeId: 6,
      itemSetId: 12
    },
    {
      name: "Bague de bête",
      image: '/images/Bague-bête.webp',
      typeId: 7,
      itemSetId: 12
    },
    {
      name: "Boucles d'oreilles de bête",
      image: '/images/Boucles-bête.webp',
      typeId: 8,
      itemSetId: 12
    },
    // Capacité exceptionnelle set
    {
      name: "Collier en obsidienne",
      image: '/images/Collier-obsidienne.webp',
      typeId: 5,
      itemSetId: 21
    },
    {
      name: "Bracelet en obsidienne",
      image: '/images/Bracelet-obsidienne.webp',
      typeId: 6,
      itemSetId: 21
    },
    {
      name: "Bague en obsidienne",
      image: '/images/Bague-obsidienne.webp',
      typeId: 7,
      itemSetId: 21
    },
    {
      name: "Boucles d'oreilles en obsidienne",
      image: '/images/Boucles-obsidienne.webp',
      typeId: 8,
      itemSetId: 21
    },
    // Berserker set
    {
      name: "Collier de squelette",
      image: '/images/Collier-squelette.webp',
      typeId: 5,
      itemSetId: 11
    },
    {
      name: "Bracelet de squelette",
      image: '/images/Bracelet-squelette.webp',
      typeId: 6,
      itemSetId: 11
    },
    {
      name: "Bague de squelette",
      image: '/images/Bague-squelette.webp',
      typeId: 7,
      itemSetId: 11
    },
    {
      name: "Boucles d'oreilles de squelette",
      image: '/images/Boucles-squelette.webp',
      typeId: 8,
      itemSetId: 11
    },
    // Exécuteur set
    {
      name: "Collier de béhémoth",
      image: '/images/Collier-béhémoth.webp',
      typeId: 5,
      itemSetId: 10
    },
    {
      name: "Bracelet de béhémoth",
      image: '/images/Bracelet-béhémoth.webp',
      typeId: 6,
      itemSetId: 10
    },
    {
      name: "Bague de béhémoth",
      image: '/images/Bague-béhémoth.webp',
      typeId: 7,
      itemSetId: 10
    },
    {
      name: "Boucles d'oreilles de béhémoth",
      image: '/images/Boucles-béhémoth.webp',
      typeId: 8,
      itemSetId: 10
    },
    // Champion de la bataille
    {
      name: "Collier à oeil rouge",
      image: '/images/Collier-oeil-rouge.webp',
      typeId: 5,
      itemSetId: 9
    },
    {
      name: "Bracelet à oeil rouge",
      image: '/images/Bracelet-oeil-rouge.webp',
      typeId: 6,
      itemSetId: 9
    },
    {
      name: "Bague à oeil rouge",
      image: '/images/Bague-oeil-rouge.webp',
      typeId: 7,
      itemSetId: 9
    },
    {
      name: "Boucles d'oreilles à oeil rouge",
      image: '/images/Boucles-oeil-rouge.webp',
      typeId: 8,
      itemSetId: 9
    },
    // Bénédiction ardente
    {
      name: "Casque de bénédiction ardente",
      image: '/images/Casque-bénédiction-ardente.webp',
      typeId: 1,
      itemSetId: 19
    },
    {
      name: "Armure de bénédiction ardente",
      image: '/images/Armure-bénédiction-ardente.webp',
      typeId: 2,
      itemSetId: 19
    },
    {
      name: "Gants de bénédiction ardente",
      image: '/images/Gants-bénédiction-ardente.webp',
      typeId: 3,
      itemSetId: 19
    },
    {
      name: "Bottes de bénédiction ardente",
      image: '/images/Bottes-bénédiction-ardente.webp',
      typeId: 4,
      itemSetId: 19
    },
    {
      name: "Collier de bénédiction ardente",
      image: '/images/Collier-bénédiction-ardente.webp',
      typeId: 5,
      itemSetId: 19
    },
    {
      name: "Bracelet de bénédiction ardente",
      image: '/images/Bracelet-bénédiction-ardente.webp',
      typeId: 6,
      itemSetId: 19
    },
    {
      name: "Bague de bénédiction ardente",
      image: '/images/Bague-bénédiction-ardente.webp',
      typeId: 7,
      itemSetId: 19
    },
    {
      name: "Boucles d'oreilles de bénédiction ardente",
      image: '/images/Boucles-bénédiction-ardente.webp',
      typeId: 8,
      itemSetId: 19
    },
    // Avarice ardente
    {
      name: "Casque d'avarice ardente",
      image: '/images/Casque-avarice-ardente.webp',
      typeId: 1,
      itemSetId: 15
    },
    {
      name: "Armure d'avarice ardente",
      image: '/images/Armure-avarice-ardente.webp',
      typeId: 2,
      itemSetId: 15
    },
    {
      name: "Gants d'avarice ardente",
      image: '/images/Gants-avarice-ardente.webp',
      typeId: 3,
      itemSetId: 15
    },
    {
      name: "Bottes d'avarice ardente",
      image: '/images/Bottes-avarice-ardente.webp',
      typeId: 4,
      itemSetId: 15
    },
    {
      name: "Collier d'avarice ardente",
      image: '/images/Collier-avarice-ardente.webp',
      typeId: 5,
      itemSetId: 15
    },
    {
      name: "Bracelet d'avarice ardente",
      image: '/images/Bracelet-avarice-ardente.webp',
      typeId: 6,
      itemSetId: 15
    },
    {
      name: "Bague d'avarice ardente",
      image: '/images/Bague-avarice-ardente.webp',
      typeId: 7,
      itemSetId: 15
    },
    {
      name: "Boucles d'oreilles d'avarice ardente",
      image: '/images/Boucles-avarice-ardente.webp',
      typeId: 8,
      itemSetId: 15
    },
    // Malédiction ardente
    {
      name: "Casque de malédiction ardente",
      image: '/images/Casque-malédiction-ardente.webp',
      typeId: 1,
      itemSetId: 14
    },
    {
      name: "Armure de malédiction ardente",
      image: '/images/Armure-malédiction-ardente.webp',
      typeId: 2,
      itemSetId: 14
    },
    {
      name: "Gants de malédiction ardente",
      image: '/images/Gants-malédiction-ardente.webp',
      typeId: 3,
      itemSetId: 14
    },
    {
      name: "Bottes de malédiction ardente",
      image: '/images/Bottes-malédiction-ardente.webp',
      typeId: 4,
      itemSetId: 14
    },
    {
      name: "Collier de malédiction ardente",
      image: '/images/Collier-malédiction-ardente.webp',
      typeId: 5,
      itemSetId: 14
    },
    {
      name: "Bracelet de malédiction ardente",
      image: '/images/Bracelet-malédiction-ardente.webp',
      typeId: 6,
      itemSetId: 14
    },
    {
      name: "Bague de malédiction ardente",
      image: '/images/Bague-malédiction-ardente.webp',
      typeId: 7,
      itemSetId: 14
    },
    {
      name: "Boucles d'oreilles de malédiction ardente",
      image: '/images/Boucles-malédiction-ardente.webp',
      typeId: 8,
      itemSetId: 14
    },
  ];

  for (const item of items) {
    await prisma.item.create({
      data: item,
    });
  }

  console.log('Item added successfully.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
