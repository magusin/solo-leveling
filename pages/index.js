import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-gradient-to-r from-purple-500 to-indigo-600">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
          >
            <source src="/images/solo-leveling.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Features Section */}
        <div className="relative py-16 px-6 bg-gray-900">
          {/* Decorative Gradient */}
          <div className="absolute -top-3 left-0 w-full h-10 bg-gradient-to-b from-gray-900 to-transparent transform skew-y-3 z-0" />
          <div className="absolute -top-3 left-0 w-full h-10 bg-gradient-to-b from-gray-900 to-transparent transform skew-y-1 z-0" />
          <h1 className="text-5xl text-center font-extrabold mb-4 text-purple-500 z-10 relative">
            Solo Leveling: Builder
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-center text-gray-300 z-10 relative">
            Créez, partagez et explorez les meilleurs sets d'artefacts pour
            dominer vos adversaires !
          </p>

          {/* Animated GIF with Effects */}
          <div className="relative flex justify-center items-center mt-12">
            {/* Glowing Background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 blur-3xl opacity-50"></div>
            </div>

            {/* The GIF */}
            <img
              src="/images/hero.gif"
              alt="Animated GIF"
              className="relative w-auto max-h-64 object-contain z-10"
            />

            {/* Subtle Overlay */}
            <div className="absolute -bottom-5 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-900 transform skew-y-3 z-0" />
          </div>

          <h2 className="text-3xl font-bold text-center mt-12 mb-8 text-white z-10 relative">
            Pourquoi utiliser notre set builder ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Création intuitive
              </h3>
              <p className="text-gray-300">
                Sélectionnez facilement vos artefacts et attribuez des
                statistiques en quelques clics.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Communauté active
              </h3>
              <p className="text-gray-300">
                Consultez les builds partagés par d'autres joueurs et inspirez-vous
                de leurs stratégies.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Optimisation garantie
              </h3>
              <p className="text-gray-300">
                Analysez les statistiques pour maximiser vos performances dans
                tous les combats.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 flex justify-center">
            <a
              href="/build"
              className="px-8 py-3 bg-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Accéder aux Builds
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 shadow-inner">
        <div className="container mx-auto text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Solo Leveling Set Builder. Tous droits
            réservés.
          </p>
          <p>
            Créé avec ❤️ pour les fans de Solo Leveling: ARISE.
          </p>
        </div>
      </footer>
    </div>
  );
}
