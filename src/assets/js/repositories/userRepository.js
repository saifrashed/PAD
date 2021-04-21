/**
 * Repository responsible for all user data from server - CRUD
 * Make sure all functions are using the async keyword when interacting with network!
 *
 * @author Pim Meijer
 */
class UserRepository {

    constructor() {
        this.route = "/user"
    }


    async get(id) {
        return await networkManager
            .doRequest(`${this.route}/${id}`, {}, "GET");
    }

    async getAll() {
        return await networkManager
            .doRequest(`${this.route}/`, {}, "GET");
    }

    /**
     * async function that handles a Promise from the networkmanager
     * @param username
     * @param password
     * @returns {Promise<user>}
     */
    async login(username, password) {
        return await networkManager
            .doRequest(`${this.route}/login`, {
                "username":    username,
                "password": password
            }, "POST");
    }

    async createFavorite(userID, gameID) {
        return await networkManager
            .doRequest(`${this.route}/favorite`, {
                "userID": userID,
                "gameID": gameID,
            }, "POST");
    }

    async deleteFavorite(userID, gameID) {
        return await networkManager
            .doRequest(`${this.route}/favorite`, {
                "userID": userID,
                "gameID": gameID,
            }, "DELETE");
    }

    async delete() {

    }

    async getRating(userID, gameID) {
        return await networkManager
            .doRequest(`${this.route}/rating`, {
                "userID": userID,
                "gameID": gameID,
            }, "POST");
    }


    async register(firstName, lastName, username, password) {

        return await networkManager
            .doRequest(`${this.route}/register`, {
                "firstname": firstName,
                "lastname":  lastName,
                "username":  username,
                "password":  password
            }, "POST");
    }

    async update(id, values = {}) {

    }

    async logout() {
        sessionManager.clear();
    }
}
