import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('');

  const confirmEmail = async () => {
    const response = await fetch('/api/auth/confirm-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      setMessage('Votre email a été confirmé ! Vous pouvez maintenant vous connecter.');
      // rediriger l'utilisateur vers la page de connexion
        setTimeout(() => {
            router.push('/auth/login');
        }
        , 2000);
    } else {
      const error = await response.json();
      setMessage(error.error || 'Erreur lors de la confirmation.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Confirmation d'email</h1>
        {message ? (
          <p>{message}</p>
        ) : (
          <button
            onClick={confirmEmail}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600"
          >
            Confirmer mon email
          </button>
        )}
      </div>
    </div>
  );
}
