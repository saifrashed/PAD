/**
 * Repository responsible for all user data from server - CRUD
 * Make sure all functions are using the async keyword when interacting with network!
 *
 * @author Pim Meijer
 */
class GeneralRepository {

    constructor() {
        this.route = "/general"
    }


    async getAverageRating() {
        return await networkManager
            .doRequest(`${this.route}/average-rating/`, {}, "GET");
    }

    async getAmountUsers() {
        return await networkManager
            .doRequest(`${this.route}/amount-users/`, {}, "GET");
    }

    async getAmountFavorites() {
        return await networkManager
            .doRequest(`${this.route}/amount-favorites/`, {}, "GET");
    }
}
