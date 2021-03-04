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

    async getAll() {

    }

    /**
     * async function that handles a Promise from the networkmanager
     * @param username
     * @param password
     * @returns {Promise<user>}
     */
    async login(email, password) {
        return await networkManager
            .doRequest(`${this.route}/login`, {
                "email":    email,
                "password": password
            }, "POST");
    }

    async delete() {

    }


    async register(firstName, lastName, email, password) {

        return await networkManager
            .doRequest(`${this.route}/register`, {
                "firstname": firstName,
                "lastname":  lastName,
                "email":     email,
                "password":  password
            }, "POST");
    }

    async update(id, values = {}) {

    }
}
