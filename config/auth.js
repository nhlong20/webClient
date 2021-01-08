module.exports = {
    googleAuth: {
        clientID:
            '981888513888-pjlqpg3q99gcj9cpjc8epd7ko0anbb97.apps.googleusercontent.com',
        clientSecret: 'OhegKEUXsT-x5HwXII78dS1i',
        callbackURL: `http://${process.env.HOST_URL}:${
            process.env.PORT || 3000
        }/auth/google/callback`
    }
};
