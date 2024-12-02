import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { sendConfirmationEmail } from '../../../lib/email';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "L'email est requis." });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé avec cet email." });
    }

    // Vérifier si l'utilisateur a déjà confirmé son email
    if (user.emailVerified) {
      return res.status(400).json({ error: 'Cet email est déjà confirmé.' });
    }

    // Générer un nouveau token de confirmation
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token valable 24 heures

    // Supprimer les anciens tokens non utilisés pour cet utilisateur
    await prisma.emailConfirmation.deleteMany({
      where: {
        userId: user.id,
        used: false,
      },
    });

    // Enregistrer le nouveau token dans la base de données
    await prisma.emailConfirmation.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Envoyer l'email de confirmation
    try {
      await sendConfirmationEmail(email, token);
      res.status(200).json({ message: 'Email de confirmation renvoyé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email de confirmation :', error);
      res.status(500).json({ error: "Impossible d'envoyer l'email de confirmation." });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
