/**
 * Game Highlighted Template
 * @param title
 * @param imageUrl
 * @param description
 * @returns {string}
 * @constructor
 */
const Highlighted = ({title, imageUrl, description}) => `
                                                       <div class="jumbotron p-3 p-md-5 text-white w-100"
                                                             style="background-image: url(${imageUrl});background-size: cover;background-position: center;position: relative; border-radius: 25px;">
                                                            <div class="overlay"></div>
                                                            <div class="col-md-6 px-0">
                                                                <h1 class="display-4 font-italic">${title}</h1>
                                                                <p class="lead my-3">${description.substring(0, 200) + "..."}</p>
                                                                <p class="lead mb-0"><a class="text-white font-weight-bold" data-controller="gamedetail">Meer informatie <i
                                                                        class="fas fa-arrow-right"></i></a></p>
                                                            </div>
                                                       </div>
                                                        `;


/**
 * Game Brick Template
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const Brick = ({gameID, title, imageUrl, type}) => `
                                            <div class="brick">
                                                <a data-id="${gameID}">
                                                    <div class="brick__top">
                                                        <div class="brick__title">
                                                         <h1>${title}</h1>
                                                        </div>
                                                        <p class="brick__author">${type}</p>
                                                    </div>
                                
                                                    <img alt="${title}" src="${imageUrl}" title="${title}">
                                                </a>
                                
                                                <div class="brick__bottom">
                                                    <i class="fas fa-heart favorite-btn" data-target="#authenticationBox" data-toggle="modal"></i>
                                                    <i class="fas fa-plus add-btn" data-target="#authenticationBox" data-toggle="modal"></i>
                                                    <i class="fas fa-external-link-alt share-btn"></i>
                                                </div>
                                            </div>
                                            `;

/**
 * Game Brick Template
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const FavoriteBrick = ({gameID, title, imageUrl, type}) => `
                                                                  <div class="brick">
                                                <a data-id="${gameID}">
                                                    <div class="brick__top">
                                                        <div class="brick__title">
                                                         <h1>${title}</h1>
                                                        </div>
                                                        <p class="brick__author">${type}</p>
                                                    </div>
                                
                                                    <img alt="${title}" src="${imageUrl}" title="${title}">
                                                </a>
                                
                                                <div class="brick__bottom">
                                                    <i class="fas fa-times remove-favorite"></i>                                                
                                                </div>
                                            </div>
                                            `;
