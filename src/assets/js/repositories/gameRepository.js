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

    /**
     * Create a game
     * @returns {Promise<void>}
     */
    async create(body) {
        return await networkManager
            .doRequest(this.route + `/create/`, body, "POST");
    }
    /**
     * upload a game image
     * @returns {Promise<void>}
     */
    async upload() {
        return await networkManager
            .doRequest(this.route + `/upload/`, {}, "POST");
    }


    /**
     * Delete a game
     * @returns {Promise<void>}
     */

    async delete(gameID) {
        return await networkManager
            .doRequest(`${this.route}/delete/${gameID}`, {}, "DELETE");
    }

    /**
     * Update a game
     * @param id
     * @param values
     * @returns {Promise<void>}
     */
    async update(body) {
        return await networkManager
            .doRequest(this.route + `/update/`, body, "POST");
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
     * Get rules of a game
     * @param gameID
     * @returns {Promise<unknown>}
     */
    async getRules(gameID) {
        return await networkManager
            .doRequest(this.route + `/rules/${gameID}`, {}, "GET");
    }

    async addRules(body) {
        return await networkManager
            .doRequest(this.route + `/rules/`, body, "POST");
    }

    async deleteRules(body) {
        return await networkManager
            .doRequest(this.route + `/rules/`, body, "DELETE");
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

    /**
     * Get materialID associated with game
     * @param gameID
     * @returns {Promise<unknown>}
     */
    async getMaterialGames(materialID) {
        return await networkManager
            .doRequest(this.route + `/material/games/${materialID}`, {}, "GET");
    }

    /**
     * Gets difficulty variants
     * @param gameID
     * @returns {Promise<unknown>}
     */
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

    /**
     * Sets user rating for a game
     * @param body
     * @returns {Promise<unknown>}
     */
    async getRating(gameID) {
        return await networkManager
            .doRequest(this.route + `/rating/${gameID}`,{},"GET");
    }

    async getLessons(userID) {
        return await networkManager
            .doRequest(this.route + `/lessons/${userID}`, {}, "GET");
    }

    async getLesson(lessonID) {
        return await networkManager
            .doRequest(this.route + `/lesson/${lessonID}`, {}, "GET");
    }

    async getLessonGames(lessonID) {
        return await networkManager
            .doRequest(this.route + `/lesson/game/${lessonID}`, {}, "GET");
    }

    async addLesson(body) {
        return await networkManager
            .doRequest(`${this.route}/lesson/`, body, "POST");
    }

    async deleteLesson(body) {
        return await networkManager
            .doRequest(`${this.route}/lesson/`, body, "DELETE");
    }

    async addLessonGame(body) {
        return await networkManager
            .doRequest(`${this.route}/lesson/game/`, body, "POST");
    }
}
