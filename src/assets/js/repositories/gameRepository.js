/**
 * -- THIS IS AN EXAMPLE REPOSITORY WITH EXAMPLE DATA FROM DB --
 * Repository responsible for all room related data from server - CRUD
 * Make sure all functions are using the async keyword when interacting with `networkManager`!
 *
 * @author Pim Meijer
 */
class GameRepository {

    constructor() {
        this.route = "/game"
    }

    async getAll() {
        return await networkManager
            .doRequest(this.route, {}, "GET");
    }

    /**
     * async function to get a piece of room example data by its id via networkmanager
     * [id: roomId] - "id" is also called id in database! Make sure this is always the same
     * @param roomId
     * @returns {Promise<room>}
     */
    async get(id) {
        return await networkManager
            .doRequest(`${this.route}/${id}`, {}, "GET");
    }

    async create() {

    }

    async delete() {

    }

    async update(id, values = {}) {

    }

    async getGrades() {
        return await networkManager
            .doRequest(this.route + "/grades/", {}, "GET");
    }

    async setRating(body) {
        return await networkManager
            .doRequest(this.route + "/rating/", {body}, "POST");
    }
}
