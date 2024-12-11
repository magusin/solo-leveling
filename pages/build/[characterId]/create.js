import { useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function CreateBuildPage({ character, items, itemTypes }) {
  const [build, setBuild] = useState(
    itemTypes.map((type) => ({
      slot: type.name,
      item: null,
      primaryStat: null,
      secondaryStats: [],
    }))
  );
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '',
    slotIndex: null,
    availableOptions: [],
    currentSelection: null,
  });

  const handleItemSelect = (slotIndex, item) => {
    const updatedBuild = [...build];
    updatedBuild[slotIndex].item = item;
    updatedBuild[slotIndex].primaryStat = null;
    updatedBuild[slotIndex].secondaryStats = [];
    setBuild(updatedBuild);

    openModal('primary', slotIndex, item.type.primaryStats);
  };

  const handleChangeSlot = (slotIndex) => {
    const updatedBuild = [...build];
    updatedBuild[slotIndex] = {
      slot: build[slotIndex].slot,
      item: null,
      primaryStat: null,
      secondaryStats: [],
    };
    setBuild(updatedBuild);
  
    // Réouvrir la modal pour sélectionner un nouvel item
    openModal(
      'item',
      slotIndex,
      items.filter((item) => item.type.name === updatedBuild[slotIndex].slot)
    );
  };

  const handleStatSelect = (slotIndex, stat, isPrimary) => {
    const updatedBuild = [...build];
    if (isPrimary) {
      updatedBuild[slotIndex].primaryStat = stat;
  
      // Ouvrir la modal pour les stats secondaires, en excluant la stat principale
      openModal(
        'secondary',
        slotIndex,
        updatedBuild[slotIndex].item.type.secondaryStats.filter((s) => s !== stat)
      );
    } else {
      const secondaryStats = updatedBuild[slotIndex].secondaryStats;
      if (secondaryStats.includes(stat)) {
        // Désélectionner la stat
        updatedBuild[slotIndex].secondaryStats = secondaryStats.filter((s) => s !== stat);
      } else {
        // Ajouter la stat si moins de 4 sélectionnées
        if (secondaryStats.length < 4) {
          updatedBuild[slotIndex].secondaryStats.push(stat);
        }
      }
  
      // Fermer la modal si 4 stats différentes sont sélectionnées
      if (updatedBuild[slotIndex].secondaryStats.length === 4) {
        closeModal(false);
      }
    }
  
    setBuild(updatedBuild);
  };

  const openModal = (type, slotIndex, availableOptions) => {
    setModalState({
      isOpen: true,
      type,
      slotIndex,
      availableOptions,
      currentSelection: build[slotIndex],
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: '',
      slotIndex: null,
      availableOptions: [],
      currentSelection: null,
    });
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
    <main>
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Créer un Build pour {character.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {build.map((slotData, index) => (
          <ItemSlot
            key={index}
            slotIndex={index}
            slotData={slotData}
            onOpen={openModal}
            items={items}
          />
        ))}
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <SelectionModal
        type={modalState.type}
        title={
          modalState.type === 'details'
            ? 'Détails du Slot'
            : modalState.type === 'item'
            ? 'Sélectionnez un Item'
            : modalState.type === 'primary'
            ? 'Sélectionnez une Stat Principale'
            : 'Sélectionnez une Stat Secondaire'
        }
        slotDetails={modalState.currentSelection}
        options={modalState.availableOptions}
        currentSelection={modalState.currentSelection}
        onSelect={(option) =>
          modalState.type === 'item'
            ? handleItemSelect(modalState.slotIndex, option)
            : handleStatSelect(
                modalState.slotIndex,
                option,
                modalState.type === 'primary'
              )
        }
        onClose={closeModal}
        onChange={() => handleChangeSlot(modalState.slotIndex)}
      />
      )}

      <div className="text-center mt-8">
        <button
          className="px-6 py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purple-600 transition"
          onClick={handleSaveBuild}
        >
          Sauvegarder le Build
        </button>
      </div>
    </div>
    </main>
  );
}

// Composant pour un slot
function ItemSlot({ slotIndex, slotData, onOpen, items }) {
  const handleClick = () => {
    if (slotData.item) {
      onOpen('details', slotIndex, []);
    } else {
      onOpen(
        'item',
        slotIndex,
        items.filter((item) => item.type.name === slotData.slot)
      );
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <div
        className="relative bg-gray-700 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-600 transition w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 flex-shrink-0"
        onClick={handleClick}
      >
        {slotData.item ? (
          <img
            src={slotData.item.image || '/default-item.png'}
            alt={slotData.item.name || 'Item'}
            className="w-full h-full object-contain rounded-md"
          />
        ) : (
          <div className="text-gray-500">Vide</div>
        )}
      </div>
      {slotData.item && (
        <div className="flex flex-col items-start text-sm text-gray-300 max-w-[200px]">
          <p className="font-semibold text-white truncate">{slotData.item.name}</p>
          <p className="mt-1">
            <span className="font-semibold">Stat principale :</span> {slotData.primaryStat || 'Non définie'}
          </p>
          <p className="font-semibold">Stats secondaires :</p>
          <ul className="mt-1 space-y-1">
            {slotData.secondaryStats.length > 0 ? (
              slotData.secondaryStats.map((stat, index) => (
                <li key={index} className="text-gray-300">
                  - {stat}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Non définies</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Composant pour la modal
function SelectionModal({ type, title, currentSelection, slotDetails, options, onSelect, onClose, onChange }) {
  const isSecondarySelection = type === 'secondary';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-2xl overflow-auto max-h-screen space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        {type === 'details' ? (
          <div>
            <p className="text-lg mb-2">
              <span className="font-semibold">Item :</span> {slotDetails.item?.name || 'Aucun'}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Stat principale :</span> {slotDetails.primaryStat || 'Non définie'}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Stats secondaires :</span>{' '}
              {slotDetails.secondaryStats.length
                ? slotDetails.secondaryStats.join(', ')
                : 'Non définies'}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Annuler
              </button>
              <button
                onClick={onChange}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Changer
              </button>
            </div>
          </div>
        ) : (
          <div>
            {isSecondarySelection && (
              <p className="text-center text-gray-400 mb-4">
                {slotDetails.secondaryStats.length}/4 stats sélectionnées
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {options.map((option) => (
                <button
                  key={option.id || option}
                  onClick={() => onSelect(option)}
                  className={`bg-gray-700 rounded-lg p-4 hover:bg-gray-600 flex flex-col items-center transition ${
                    currentSelection &&
                    (currentSelection.primaryStat === option ||
                      currentSelection.secondaryStats.includes(option))
                      ? 'ring-2 ring-purple-500'
                      : ''
                  }`}>
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.name || 'Option'}
                      className="w-16 h-16 object-contain mb-2"
                    />
                  )}
                  <p className="text-sm text-center text-white">{option.name || option}</p>
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
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

  const itemTypes = await prisma.itemType.findMany({
    select: {
      id: true,
      name: true,
      primaryStats: true,
      secondaryStats: true,
    },
  });

  const itemSets = await prisma.itemSet.findMany({
    select: {
      id: true,
      name: true,
      description1: true,
      description2: true,
      description3: true,
    },
  });

  const items = await prisma.item.findMany({
    include: {
      type: {
        select: {
          name: true,
          primaryStats: true,
          secondaryStats: true,
        },
      },
      itemSet: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!character) {
    return { notFound: true };
  }

  return {
    props: {
      character,
      itemTypes,
      itemSets,
      items,
    },
  };
}
