const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insérer les types d'items
  const itemTypes = [
    {
      name: 'Casque',
      primaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'PV (%)', 'PV supplémentaire'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Taux de coups critiques'],
    },
    {
      name: 'Armure',
      primaryStats: ['Défense (%)', 'Défense supplémentaire'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Taux de coups critiques'],    
    },
    {
      name: 'Gants',
      primaryStats: ['Attaque (%)', 'Attaque supplémentaire'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Taux de coups critiques'],    
    },
    {
      name: 'Bottes',
      primaryStats: ['Défense (%)', 'PV (%)', 'Dégâts des coups critiques', 'Pénétration de la défense', 'Hausse des soins donnés (%)'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Taux de coups critiques'],    
    },
    {
      name: 'Collier',
      primaryStats: ['PV supplémentaire', 'PV (%)'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Dégats de coups critiques'],    
    },
    {
      name: 'Bracelet',
      primaryStats: ['Dégâts Feu (%)', 'Dégâts Eau (%)', 'Dégâts Vent (%)', 'Dégâts Lumière (%)', 'Dégâts Ténèbres (%)'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Dégats de coups critiques'],    
    },
    {
      name: 'Anneau',
      primaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'PV (%)', 'PV supplémentaire'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Dégats de coups critiques'],    
    },
    {
      name: 'Boucles d’oreilles',
      primaryStats: ['PM supplémentaires'],
      secondaryStats: ['Attaque (%)', 'Attaque supplémentaire', 'Défense (%)', 'Défense supplémentaire', 'Hausse des dégâts infligés', 'Hausse du taux de récupération des PM (%)', 'Pénétration de la défense', 'PM supplémentaires', 'PV (%)', 'PV supplémentaire', 'Réduction des dégâts subis', 'Réduction du coût en PM', 'Dégats de coups critiques'],    
    },
  ];

  for (const itemType of itemTypes) {
    await prisma.itemType.create({
      data: itemType,
    });
  }

  console.log('Item types added successfully.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
