const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ajout de personnages
  const characters = [
    { id: 1, name: 'Sung Jin-Woo', image: '/images/Sung_Jin_Woo.webp' },
    { id: 2, name: 'Cha Hae-In', image: '/images/Cha_Hae_In.webp' },
    { id: 3, name: 'Go Gun-Hee', image: '/images/Go_Gunhee.webp' },
    { id: 4, name: 'Amamiya Mirei', image: '/images/Amamiya_Mirei.webp' },
    { id: 5, name: 'Choi Jong-In', image: '/images/Choi_Jong_In.webp' },
    { id: 6, name: 'Emma Laurent', image: '/images/Emma_Laurent.webp' },
    { id: 7, name: 'Baek Yunho', image: '/images/Baek_Yunho.webp' },
    { id: 8, name: 'Min Byung-Gu', image: '/images/Min_ByungGu.webp' },
  ];

  for (const character of characters) {
    await prisma.character.create({ data: character });
  }
}

main()
  .then(() => console.log('Données de seed ajoutées pour les personnages.'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());