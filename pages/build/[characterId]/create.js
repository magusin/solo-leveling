import { PrismaClient } from '@prisma/client';
import { useState } from 'react';

const prisma = new PrismaClient();

export default function CreateBuildPage({ character, items }) {
  const [build, setBuild] = useState(
    items.map((slot) => ({
      slot: slot.type,
      item: null,
      primaryStat: null,
      secondaryStats: [],
    }))
  );

  const handleItemSelect = (slotIndex, item) => {
    const updatedBuild = [...build];
    updatedBuild[slotIndex].item = item;
    updatedBuild[slotIndex].primaryStat = null; // Réinitialise les stats
    updatedBuild[slotIndex].secondaryStats = [];
    setBuild(updatedBuild);
  };

  const handleSaveBuild = async () => {
    const response = await fetch('/api/builds/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        characterId: character.id,
        build,
      }),
    });

    if (response.ok) {
      alert('Build créé avec succès !');
    } else {
      alert('Erreur lors de la création du build.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Créer un Build pour {character.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {build.map((slotData, index) => (
          <div key={slotData.slot} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">{slotData.slot}</h2>
            {slotData.item ? (
              <>
                <p className="text-center">{slotData.item.name}</p>
                <p className="text-sm text-gray-400 mt-2">Stat principale :</p>
                <select
                  className="w-full p-2 mt-1 bg-gray-700 rounded-lg"
                  value={slotData.primaryStat || ''}
                  onChange={(e) => {
                    const updatedBuild = [...build];
                    updatedBuild[index].primaryStat = e.target.value;
                    setBuild(updatedBuild);
                  }}
                >
                  <option value="">Choisir...</option>
                  {slotData.item.primaryStats.map((stat) => (
                    <option key={stat} value={stat}>
                      {stat}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-400 mt-2">Stats secondaires (4 max) :</p>
                <select
                  multiple
                  className="w-full p-2 mt-1 bg-gray-700 rounded-lg"
                  value={slotData.secondaryStats}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map((o) => o.value);
                    const updatedBuild = [...build];
                    updatedBuild[index].secondaryStats = selectedOptions.slice(0, 4); // Max 4
                    setBuild(updatedBuild);
                  }}
                >
                  {slotData.item.secondaryStats.map((stat) => (
                    <option key={stat} value={stat}>
                      {stat}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-center">Aucun item sélectionné</p>
                <div className="mt-4">
                  {items
                    .find((i) => i.type === slotData.slot)
                    ?.items.map((item) => (
                      <button
                        key={item.id}
                        className="block w-full text-left p-2 mt-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600"
                        onClick={() => handleItemSelect(index, item)}
                      >
                        {item.name}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          className="px-6 py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purple-600 transition"
          onClick={handleSaveBuild}
        >
          Sauvegarder le Build
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { characterId } = context.params;

  const character = await prisma.character.findUnique({
    where: { id: parseInt(characterId) },
    select: { id: true, name: true, image: true },
  });

  const items = await prisma.item.groupBy({
    by: ['type'],
    _items: {
      id: true,
      name: true,
      primaryStats: true,
      secondaryStats: true,
    },
  });

  if (!character) {
    return { notFound: true };
  }

  return {
    props: {
      character,
      items,
    },
  };
}
