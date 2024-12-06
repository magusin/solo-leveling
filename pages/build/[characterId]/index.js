import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default function CharacterBuildsPage({ character, builds }) {
  return (
    <main>
    <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 object-cover mx-auto rounded-full"
        />
      </div>
      <div>
        <Link href={`/build/${character.id}/create`}>
          <button className="px-6 py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purple-600 transition">
            Créer un Build
          </button>
        </Link>
      </div>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builds.map((build) => (
          <div
            key={build.id}
            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition"
          >
            <h2 className="text-2xl font-semibold">{build.title}</h2>
            <p className="text-sm text-gray-400">Auteur : {build.author}</p>
            <p className="mt-2 text-gray-300">{build.description}</p>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}

// Récupérer les données statiques pour un personnage spécifique
export async function getStaticProps({ params }) {
    try {
      const characterId = parseInt(params.characterId);
  
      console.log("Character ID:", characterId);
  
      if (isNaN(characterId)) {
        return { notFound: true };
      }
  
      const character = await prisma.character.findUnique({
        where: { id: characterId },
        select: { id: true, name: true, image: true },
      });
  
      console.log("Character:", character);
  
      const builds = await prisma.build.findMany({
        where: { characterId },
        select: { id: true, title: true, description: true, author: true },
      });
  
      console.log("Builds:", builds);
  
      if (!character) {
        return { notFound: true };
      }
  
      return {
        props: {
          character,
          builds,
        },
        revalidate: 60,
      };
    } catch (error) {
      console.error("Error in getStaticProps:", error);
      return { notFound: true };
    }
  }
  

// Générer les chemins dynamiques pour chaque personnage
export async function getStaticPaths() {
    try {
      const characters = await prisma.character.findMany({
        select: { id: true }, // Récupère uniquement les IDs des personnages
      });
  
      console.log("Characters:", characters);
  
      const paths = characters.map((character) => ({
        params: { characterId: character.id.toString() },
      }));
  
      console.log("Generated Paths:", paths);
  
      return {
        paths,
        fallback: 'blocking',
      };
    } catch (error) {
      console.error("Error in getStaticPaths:", error);
      return {
        paths: [],
        fallback: false,
      };
    }
  }
  
