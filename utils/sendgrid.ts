import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendPasswordResetEmail(email, token) {
  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/passwordReset/resetPassword?token=${token}`;
  const msg = {
    to: email,
    from: "help@15minuteplan.ai", // Replace with your own email address
    subject: "Password Reset",
    text: `You requested a password reset. Please click on the following link to reset your password: ${magicLink}`,
    html: `<p>You requested a password reset. Please click on the following link to reset your password:</p><a href="${magicLink}">Reset Password</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}
