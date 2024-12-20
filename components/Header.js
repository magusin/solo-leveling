import Link from "next/link";

export default function Header() {
    return (
      <header className="bg-gray-800 py-4 shadow-md fixed w-full z-10">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            SoloLeveling<span className="text-purple-500">Builder</span>
          </Link>
  
          {/* Navigation */}
          <nav className="flex space-x-6 items-center">
            <Link
              href="/build"
              className="text-white hover:text-purple-400 transition duration-200"
            >
              Build
            </Link>
            <Link
              href="/auth/login"
              className="text-white bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Connexion
            </Link>
          </nav>
        </div>
      </header>
    );
  }
  