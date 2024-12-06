import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default function BuildsPage({ characters }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Choisissez un personnage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link key={character.id} href={`/build/${character.id}`}>
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-[300px] object-contain rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-center">{character.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Récupérer les personnages depuis la base avec Prisma
export async function getStaticProps() {
  const characters = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  return {
    props: {
      characters,
    },
    revalidate: 60, // Revalide toutes les 60 secondes pour assurer des données à jour
  };
}
