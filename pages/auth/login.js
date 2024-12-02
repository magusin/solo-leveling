import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Inscription
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification(
          'Inscription réussie ! Veuillez vérifier votre email pour le confirmer.'
        );
        setIsRegistering(false);
      } else {
        alert(data.error || 'Une erreur est survenue.');
      }
    } else {
      // Connexion
      const res = await signIn('credentials', {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (res.ok) {
        window.location.href = '/';
      } else {
        alert('Identifiants incorrects ou mail non confirmé.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isRegistering ? 'Inscription' : 'Connexion'}
        </h1>

        {notification && (
          <p className="bg-green-500 text-white p-2 rounded mb-4">
            {notification}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300">
                Adresse Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
          )}
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-300">
              Nom d’utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-300">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 py-2 rounded text-white font-bold hover:bg-purple-600 transition"
          >
            {isRegistering ? "S'inscrire" : 'Se connecter'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-purple-400 hover:underline"
          >
            {isRegistering
              ? 'Déjà un compte ? Connectez-vous'
              : 'Pas encore de compte ? Inscrivez-vous'}
          </button>
        </div>
      </div>
    </div>
  );
}
