/**
 * Game Highlighted Template
 * @param title
 * @param imageUrl
 * @param description
 * @returns {string}
 * @constructor
 */
const Highlighted = ({id, title, imageUrl, description}) => `
                                                       <div class="jumbotron p-3 p-md-5 text-white w-100"
                                                             style="background-image: url(${imageUrl});background-size: cover;background-position: center;position: relative; border-radius: 25px;">
                                                            <div class="overlay"></div>
                                                            <div class="col-md-6 px-0">
                                                                <h1 class="display-4 font-italic">${title}</h1>
                                                                <p class="lead my-3">${description.substring(0, 200) + "..."}</p>
                                                                <p class="lead mb-0"><a class="text-white font-weight-bold highlighted" data-id="${id}">Meer informatie <i
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
const Brick = ({gameID, title, imageUrl, type, gradeID, isFavorite = false}) => `
                                            <div class="brick" data-id="${gameID}" data-grade="${gradeID}">
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
                                                    <i class="fas fa-heart favorite-btn ${isFavorite ? "favoriteBtnActive" : ""}" data-target="#authenticationBox" data-toggle="modal"></i>
                                                    <!--<i class="fas fa-plus add-btn" data-target="#authenticationBox" data-toggle="modal"></i>-->
                                                    <!--<i class="fas fa-external-link-alt share-btn"></i>-->
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


/**
 * Game Brick Template
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const GradeFilterButton = ({description, variant, gradeID}) => `
                            <li>
                                <a class="js-collection-section-tag" data-variant="${variant}" data-id="${gradeID}" href="#">${description}</a>
                            </li>
                                 `;

/**
 * Game Brick Template
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const MaterialFilterButton = ({description, variant, materialID}) => `
                            <li>
                                <a class="js-collection-section-tag" style="border-radius: 25px;" data-variant="${variant}" data-id="${materialID}" href="#">${description}</a>
                            </li>
                                 `;

const RuleListItem = ({description}) => `
                        <li class="list-group-item">${description}</li>
                        `;

const MaterialListItem = ({description}) => `
                        <span class="badge badge-pill badge-secondary" style="font-size: 15px; margin: 5px 5px 0 0;">${description}</span>
                        `;

const DifficulyListItem = ({moeilijkheidsgraad}) => `
                           <a aria-controls="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}" aria-selected="true" class="nav-link" data-toggle="pill"
                       href="#v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}"
                       id="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}-tab" role="tab">${moeilijkheidsgraad}</a>
                        `;

const DifficulyDesc = ({moeilijkheidsgraad, beschrijving}) => `
                        <div aria-labelledby="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}-tab" class="tab-pane fade show" id="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}"
                         role="tabpanel">
                         ${beschrijving}
                        </div>
                        `;
