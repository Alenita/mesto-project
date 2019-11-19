class Card {
    constructor (name, link, id) {
    this.id = id;
    this.cardElement = this.createCard(name, link);
    this.remove = this.remove.bind(this);
    this.cardElement.querySelector(".place-card__like-icon").addEventListener("click", this.like);
    this.cardElement.querySelector(".place-card__delete-icon").addEventListener("click", this.remove);
    
  }

  createCard (nameValue, linkValue) {
    const placeCard = document.createElement("div");
    const cardImage = document.createElement("div");
    const deleteIcon = document.createElement("button");
    const cardDescription = document.createElement("div");
    const cardName = document.createElement("h3");
    const likeContainer = document.createElement("div");
    const likeIcon = document.createElement("button");
    const likeAmount = document.createElement("p");
    

    placeCard.classList.add("place-card");
    cardImage.classList.add("place-card__image");
    cardImage.style.backgroundImage = "url(" + linkValue + ")";
    deleteIcon.classList.add("place-card__delete-icon");
    cardDescription.classList.add("place-card__description");
    cardName.classList.add("place-card__name");
    cardName.textContent = nameValue;
    likeContainer.classList.add("place-card__like-container");
    likeIcon.classList.add("place-card__like-icon");
    likeAmount.classList.add("place-card__like-amount");
    
    placeCard.appendChild(cardImage);
    cardImage.appendChild(deleteIcon);
    placeCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeContainer);
    likeContainer.appendChild(likeIcon);
    likeContainer.appendChild(likeAmount);
  
    return placeCard;
  }

  addLikes(element, likesValue) {
    element.querySelector(".place-card__like-amount").textContent = likesValue;
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    api.deleteMyCard(this.id);
  }
}

class CardList {
  constructor(container) {
  this.container = container;
  this.array = [];
  }

  render (element) {
    this.container.appendChild(element);
  }

  addCard(name, link, id, likes) {
    const card = new Card(name, link, id);
    this.array.push(card.cardElement);  
    this.render(card.cardElement);
    card.addLikes(card.cardElement, likes);
    }

  /*delete(element) {
    this.container.removeChild(element);
  }*/
}


class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.key = options.headers.authorization;
  }
  
  getAllInfo() {
    return Promise.all([this.getInfo(), this.getInitialCards()]);
  }

  //подгружает данные пользователя
  getInfo() {
    return fetch (this.url + "/users/me", {
      method: 'GET',
      headers: {
      authorization: this.key
      }
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(e => console.log('Ошибка загрузки данных пользователя!'))
  }

  //подгружает карточки
  getInitialCards() {
    return fetch(this.url + "/cards" , {
      method: 'GET',
      headers: {
      authorization: this.key
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(e => console.log('Ошибка загрузки карточек!'))
  }
  
  //меняет информацию о пользователе
  changeInfo(editName, editAbout) {
    return fetch(this.url + "/users/me", {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editName,
        about: editAbout
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(e => console.log('Ошибка при изменении информации!'))
  }

  //добавляет новую карточку
  addNewCard(cardName, cardLink) {
    return fetch(this.url + "/cards", {
      method: 'POST',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: cardName,
          link: cardLink
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(e => console.log('Ошибка добавления карточек!'))
    }
  //удаление карточки
  deleteMyCard(id) {
    return fetch(this.url + "/cards/"+ id, {
      method: 'DELETE',
      headers: {
        authorization: this.key
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch(e => console.log('Ошибка удаления карточек!'))
  }
}

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort4',
  headers: {
    authorization: 'e31b8201-6546-4dbc-95b4-55518f77f3d1',
    'Content-Type': 'application/json'
  }
});


api.getAllInfo()
  .then(([userInfo, cardsInfo]) => {
    
    cardsInfo.forEach(function(element) {
    cardList.addCard(element.name, element.link, element._id, element.likes.length);
  });

    document.querySelector(".user-info__name").textContent = userInfo.name;
    document.querySelector(".user-info__photo").backgroundImage = `url(${userInfo.avatar})`;
    document.querySelector(".user-info__job").textContent = userInfo.about;
    editFormField(userInfo.name, userInfo.about);
  });

class Popup { 
  constructor(popup) {
    this.popup = popup;
    this.popup.querySelector(".popup__close").addEventListener("click", this.close);
  }

  close(event) {
    event.target.closest(".popup").classList.remove("popup_is-opened");
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }
} 

const userName = document.querySelector(".user-info__name");
const userInfo = document.querySelector(".user-info__job");

const cardsContainer = document.querySelector(".places-list");

const addCardPopup = document.querySelector(".popup");
const cardButton = document.querySelector("#card-button");
const addCardForm = document.forms.new;

const editProfilePopup = document.querySelector(".popup-edit");
const editButton = document.querySelector("#edit-button");
const editAboutForm = document.forms.about;
const formName = editAboutForm.elements.naming;
const formInfo = editAboutForm.elements.info;

const cardList = new CardList(document.querySelector(".places-list"));

const popupPlace = new Popup(document.querySelector(".popup"));
const popupEdit = new Popup(document.querySelector(".popup-edit"));
const popupImage = new Popup(document.querySelector(".popup-img"));


function popupHandler() {
  popupPlace.open();
}

function editPopupHandler() {
  popupEdit.open();
}

//открывает большую картинку
function imagePopupHandler (event) {
  if (event.target.classList.contains("place-card__image")) {
    const image = document.querySelector(".popup__image");
    let imgLink = event.target.getAttribute("style");
    let imgLinkAdd = imgLink.slice(23, -3);
    image.src = `${imgLinkAdd}`;
    popupImage.open();
  }
}

//передаёт в форму данные профиля
function editFormField(userNameAdd, userAboutAdd) {
  formName.value = userNameAdd;
  formInfo.value = userAboutAdd;
  editButton.removeAttribute("disabled");
  editButton.classList.add("popup__button_active");
  }

//редактирует профиль при нажатии на кнопку
function editProfileHandler(event) {
  if (editButton.classList.contains("popup__button_active")) {
    event.preventDefault();
    userName.textContent = formName.value;
    userInfo.textContent = formInfo.value;
    editProfilePopup.classList.remove("popup_is-opened");
    api.changeInfo(formName.value, formInfo.value);
  }
}

//загружает карточки из формы
function addingCardHandler(event) {
  if (cardButton.classList.contains("popup__button_active")) {
    event.preventDefault();

    const params = {
      name: addCardForm.elements.name.value,
      link: addCardForm.elements.link.value
    }

    api.addNewCard(params.name, params.link);
    cardList.addCard(params.name, params.link, params.id);
    addCardPopup.classList.remove("popup_is-opened");
    addCardForm.reset();
  }
}

//валидация форм
function formValidityHandler(event) {
  const validator = event.target.name === "link" ? 
  validateLink : 
  validateText;
  validator(event.target);
}

function checkForm(event) { 
  event.preventDefault();
  const inputs = Array.from(event.target.closest(".form").elements);
  let isValidForm = true;
  inputs.forEach(function(elem) {
    if (!elem.querySelector('[type = submit]')) {
      if (!elem.checkValidity()) {
        isValidForm = false;
        event.target.closest(".form").querySelector('.button').setAttribute("disabled", true);
        event.target.closest(".form").querySelector('.button').classList.remove("popup__button_active");
      }
    }
  })

  if (isValidForm) {
    event.target.closest(".form").querySelector('.button').removeAttribute("disabled");
    event.target.closest(".form").querySelector('.button').classList.add("popup__button_active");
  }
}

function validateText(inputText) {
  let errorMessage = document.querySelector(`#error-${inputText.id}`);
  errorMessage = "";
  if (inputText.validity.tooShort || inputText.validity.tooLong) {
    errorMessage = "Должно быть от 2 до 30 символов"; 
  }
  if (inputText.validity.valueMissing) {
    errorMessage = "Это обязательное поле";
  }
inputText.nextElementSibling.textContent = errorMessage;
}

function validateLink(inputLink) {
  let errorMessage = document.querySelector(`#error-${inputLink.id}`);
  errorMessage = "";
  if (inputLink.validity.valueMissing) {
    errorMessage = "Это обязательное поле";
  }
  if (inputLink.validity.typeMismatch) {
    errorMessage =  "Здесь должна быть ссылка";
  }
  inputLink.nextElementSibling.textContent = errorMessage;
}

document.querySelector(".user-info__button").addEventListener("click", popupHandler);
document.querySelector(".edit__button").addEventListener("click", editPopupHandler);
cardsContainer.addEventListener ("click", imagePopupHandler);
  
addCardForm.addEventListener("submit", addingCardHandler)

editButton.addEventListener("click", editProfileHandler);

/*добавление валидации полям форм*/
addCardPopup.addEventListener("input", formValidityHandler);
editAboutForm.addEventListener("input", formValidityHandler);
editAboutForm.addEventListener("input", checkForm);
addCardPopup.addEventListener("input", checkForm);
  
editFormField();

