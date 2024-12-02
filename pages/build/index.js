import Link from 'next/link';

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

export default function BuildsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Choisissez un personnage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link key={character.id} href={`/builds/${character.name.toLowerCase()}`}
            className="bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-[300px] object-contain rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-center">{character.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
