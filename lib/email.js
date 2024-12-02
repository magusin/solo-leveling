import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Votre adresse Gmail
    pass: process.env.EMAIL_PASS, // Votre mot de passe d'application ou le mot de passe normal
  },
});

export const sendConfirmationEmail = async (email, token) => {
  const confirmationUrl = `${process.env.NEXTAUTH_URL}/auth/confirm-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation de votre email',
    html: `
      <h1>Confirmez votre email</h1>
      <p>Merci de vous être inscrit sur notre site !</p>
      <p>Cliquez sur le lien suivant pour confirmer votre email :</p>
      <a href="${confirmationUrl}">${confirmationUrl}</a>
      <p>Ce lien expirera dans 24 heures.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${email}`);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', error);
    throw new Error('Impossible d’envoyer l’email de confirmation.');
  }
};
