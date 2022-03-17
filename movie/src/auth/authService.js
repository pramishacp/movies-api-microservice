const AuthDAL = require("./authDAL");

const authService = {
    /**
     * Get auth token
     * @param {Object} user - user information
     */
    getAuthToken: (user) => {
        const {
            username,
            password,
        } = user;
        return AuthDAL.getAuthToken(username, password);
    },
};

module.exports = authService;