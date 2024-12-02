import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sendConfirmationEmail } from '../../../lib/email';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Nom d’utilisateur ou email déjà utilisé.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Générer un token de confirmation
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Valable 24 heures

    await prisma.emailConfirmation.create({
      data: {
        token,
        userId: newUser.id,
        expiresAt,
      },
    });

    // Envoyer l'email de confirmation
    try {
      await sendConfirmationEmail(email, token);
      res.status(201).json({ message: 'Utilisateur créé. Vérifiez votre email.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Inscription réussie, mais échec de l’envoi de l’email.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
