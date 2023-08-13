export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
    secretRefresh: process.env.JWT_SECRET_REFRESH_KEY,
    expiresInRefresh: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  mailer: {
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    defaults: {
      from: `"No Reply" < ${process.env.MAIL_FROM}>`,
    },
  },
});
