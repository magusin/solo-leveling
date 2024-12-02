import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Nom d’utilisateur', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Rechercher l'utilisateur
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          throw new Error('Nom d’utilisateur incorrect.');
        }

        // Vérifier si l'email est confirmé
        if (!user.emailVerified) {
          throw new Error('Veuillez confirmer votre email avant de vous connecter.');
        }

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Mot de passe incorrect.');
        }

        return { id: user.id, username: user.username };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, username: token.username };
      return session;
    },
  },
});
