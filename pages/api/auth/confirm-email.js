import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    // Rechercher le token
    const emailConfirmation = await prisma.emailConfirmation.findUnique({
      where: { token },
    });

    if (!emailConfirmation || emailConfirmation.used) {
      return res.status(400).json({ error: 'Token invalide ou déjà utilisé.' });
    }

    // Vérifier si le token est expiré
    if (new Date() > emailConfirmation.expiresAt) {
      return res.status(400).json({ error: 'Token expiré.' });
    }

    // Marquer l'email comme confirmé
    await prisma.user.update({
      where: { id: emailConfirmation.userId },
      data: { emailVerified: true },
    });

    // Marquer le token comme utilisé
    await prisma.emailConfirmation.update({
      where: { id: emailConfirmation.id },
      data: { used: true },
    });

    res.status(200).json({ message: 'Email confirmé avec succès.' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
