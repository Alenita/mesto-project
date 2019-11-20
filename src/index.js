import {Api} from './script/api.js';
import {CardList} from './script/cardlist.js';
import {Popup} from './script/popup.js';
import {formValidityHandler} from './script/validation.js';
import {checkForm} from './script/validation.js';



const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort4',
  headers: {
    authorization: 'e31b8201-6546-4dbc-95b4-55518f77f3d1',
    'Content-Type': 'application/json'
  }
});

/*получаем данные с сервера*/ 
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

/*слушатели открытия попапов*/
document.querySelector(".user-info__button").addEventListener("click", popupHandler);
document.querySelector(".edit__button").addEventListener("click", editPopupHandler);
cardsContainer.addEventListener ("click", imagePopupHandler); 

/*слушатели открытия форм*/
addCardForm.addEventListener("submit", addingCardHandler)
editButton.addEventListener("click", editProfileHandler);

/*добавление валидации полям форм*/
addCardPopup.addEventListener("input", formValidityHandler);
editAboutForm.addEventListener("input", formValidityHandler);
editAboutForm.addEventListener("input", checkForm);
addCardPopup.addEventListener("input", checkForm);
  
editFormField();

