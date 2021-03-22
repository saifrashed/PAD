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
    async get(gameID) {
        return await networkManager
            .doRequest(`${this.route}/${gameID}`, {}, "GET");
    }

    async create() {

    }

    async delete() {

    }

    async update(id, values = {}) {

    }

    /**
     * Get all grades
     * @returns {Promise<unknown>}
     */
    async getGrades() {
        return await networkManager
            .doRequest(this.route + `/grades/`, {}, "GET");
    }

    /**
     * Get all materials
     * @returns {Promise<unknown>}
     */
    async getMaterials() {
        return await networkManager
            .doRequest(this.route + `/material/`, {}, "GET");
    }

    /**
     * Get materials associated with game
     * @param gameID
     * @returns {Promise<unknown>}
     */
    async getMaterial(gameID) {
        return await networkManager
            .doRequest(this.route + `/material/${gameID}`, {}, "GET");
    }

    async getDifficulty(gameID) {
        return await networkManager
            .doRequest(this.route + `/difficulty/${gameID}`, {}, "GET");
    }


    /**
     * Sets user rating for a game
     * @param body
     * @returns {Promise<unknown>}
     */
    async setRating(body) {
        return await networkManager
            .doRequest(this.route + `/rating/`, {body}, "POST");
    }
}
