module.exports = {
    googleAuth: {
        clientID:
            '574477827788-o7gkom3f7c6k9o5ioc6f7nqn8n78jsjc.apps.googleusercontent.com',
        clientSecret: 'rMf3dTI7IoAmIc2Fs4aQnzJ6',
        callbackURL: `http://${process.env.HOST_URL}:${
            process.env.PORT || 3000
        }/auth/google/callback`
    }
};
