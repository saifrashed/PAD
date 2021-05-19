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
const Brick = ({gameID, title, imageUrl, type, gradeID, ratingStarsHTML, isFavorite = false}) => `
                                            <div class="brick" data-id="${gameID}" data-grade-id="${gradeID}">
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
                                                    <div class="stars">
                                                        ${ratingStarsHTML}
                                                    </div>
                                                    
                                                    
                                                    <div class="controls">
                                                        <i class="fas fa-star favorite-btn ${isFavorite ? "favoriteBtnActive" : ""}" data-target="#authenticationBox" data-toggle="modal"></i>
                                                        <i class="fas fa-plus add-btn" data-target="#authenticationBox" data-toggle="modal" data-id="${gameID}"></i>
                                                        <!--<i class="fas fa-external-link-alt share-btn"></i>-->
                                                    </div>
                                                </div>
                                            </div>
                                            `;

/**
 * Slider Brick Template
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const SliderBrick = ({gameID, title, imageUrl, type, gradeID, isFavorite = false}) => `
                                      <div style="padding:10px;">
                                            <div class="brickSlider" data-id="${gameID}" data-grade-id="${gradeID}" style="background-image: url('${imageUrl}'); background-size:cover;">
                                                <a data-id="${gameID}">
                                                    <div class="brick__top">
                                                        <div class="brick__title">
                                                            <h1>${title}</h1>
                                                        </div>
                                                        <p class="brick__author">${type}</p>
                                                    </div>
                                
                                                </a>
                                
                                                <div class="brick__bottom">
                                                     <div class="controls">
                                                    <i class="fas fa-external-link-alt share-btn" data-id="${gameID}"></i>
                                                    </div>
                                                </div>
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
                                                    <div class="controls">
                                                        <i class="fas fa-times remove-favorite"></i>  
                                                    </div>                                              
                                                </div>
                                            </div>
                                            `;


/****
 * Dashboard elements
 ****/


const DashboardBrick = ({gameID, title, imageUrl, type, gradeID}) => `
                                            <div class="brick" data-id="${gameID}" data-grade-id="${gradeID}">
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
                                                    <div class="controls">
                                                        <a data-target="#updateBox" data-toggle="modal"><i class="fas fa-pen" data-id="${gameID}"></i></a>
                                                        <i id="deleteGame" class="fas fa-times" data-id="${gameID}"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            `;

/****
 * Lessons elements
 ****/


/**
 * Lesson layout screen
 * @param title
 * @param amountGames
 * @param lessonID
 * @param imageUrl
 * @returns {string}
 * @constructor
 */
const LessonsLayout = ({title, amountGames, lessonID, imageUrl = ""}) => `                                                                
                                <div class="brick" data-id="${lessonID}" style="background-image: url(${imageUrl}); background-position: center; background-color: #25CE73; background-size: cover; border-radius: 25px;">
                                        <a>
                                            <div class="brick__top">
                                                <div class="brick__title">
                                                    <h1>${title}</h1>
                                                </div>
                                                <p class="brick__author">aantal spellen: ${amountGames}</p>
                                            </div>
                                        </a>                           
                                </div>                                                               
`;

/**
 * Lesson detail screen
 * @param lessonID
 * @param title
 * @param description
 * @param lessonGamesHTML
 * @returns {string}
 * @constructor
 */
const LessonsDetailLayout = ({lessonID, title, description, lessonGamesHTML}) => `                                                                
                                <div>
                                   <div class="masonry p-3">
                                    ${lessonGamesHTML}
                                    </div>
                                    <div class="auth-button-container">
                                        <button class="auth-button lesson-delete" data-id="${lessonID}" style="background-color: #DC1C13;">
                                            Verwijder les
                                        </button>
                                    </div>       
                                </div>                                                               
                                           `;

/**
 * Lesson games bricks
 * @param gameID
 * @param title
 * @param imageUrl
 * @param type
 * @returns {string}
 * @constructor
 */
const LessonGames = ({gameID, title, imageUrl, type}) => `<div class="brick">
                                                <a data-id="${gameID}">
                                                    <div class="brick__top">
                                                        <div class="brick__title">
                                                         <h1>${title}</h1>
                                                        </div>
                                                        <p class="brick__author">${type}</p>
                                                    </div>
                                                    <img alt="${title}" src="${imageUrl}" title="${title}">
                                                </a>
                                            </div>`;

/**
 * Lesson create screen
 * @returns {string}
 * @constructor
 */
const LessonsCreateLayout = ({}) => `      
                                <div class="form-group text-center">
                                    <label >Titel</label>
                                    <input type="text" class="form-control mb-3 lesson-title">
                                </div>                                                             
                                <div class="form-group text-center">
                                    <label >Beschrijving</label>
                                    <textarea class="form-control lesson-description"></textarea>
                                </div>   
                                <div class="auth-button-container">
                                    <button class="auth-button lessons-create" >
                                        Maak aan
                                    </button>
                                </div>                                                          
                                            `;


/****
 * Filter elements
 ****/


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

/**
 * Gamedetail rule list item
 * @param description
 * @returns {string}
 * @constructor
 */
const RuleListItem = ({description}) => `
                        <li class="list-group-item">${description}</li>
                        `;

/**
 * Gamedetail material list item
 * @param description
 * @returns {string}
 * @constructor
 */
const MaterialListItem = ({description, amount}) => `
                        <span class="badge badge-pill badge-secondary" style="font-size: 15px; margin: 5px 5px 0 0;">${description} x ${amount}</span>
                        `;

/**
 * Gamedetail difficulty list item
 * @param moeilijkheidsgraad
 * @returns {string}
 * @constructor
 */
const DifficulyListItem = ({moeilijkheidsgraad}) => `
                           <a aria-controls="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}" aria-selected="true" class="nav-link" data-toggle="pill"
                       href="#v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}"
                       id="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}-tab" role="tab">${moeilijkheidsgraad}</a>
                        `;

/**
 * Gamedetail difficulty description
 * @param moeilijkheidsgraad
 * @param beschrijving
 * @returns {string}
 * @constructor
 */
const DifficulyDesc = ({moeilijkheidsgraad, beschrijving}) => `
                        <div aria-labelledby="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}-tab" class="tab-pane fade show" id="v-pills-${moeilijkheidsgraad.replace(/[^A-Z0-9]/ig, "_")}"
                         role="tabpanel">
                         ${beschrijving}
                        </div>
                        `;
