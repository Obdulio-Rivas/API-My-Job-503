const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogle = async (id_token) => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const {
    given_name: name,
    family_name: lastname,
    picture: imgURL,
    email: email,
    email_verified: state,
  } = ticket.getPayload();

  return { name, lastname, imgURL, email, state };
};

module.exports = verifyGoogle;
