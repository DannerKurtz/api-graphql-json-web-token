export default {
  jwt: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: '7d',
  },
};
