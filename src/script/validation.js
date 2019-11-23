export function formValidityHandler(event) {
    const validator = event.target.name === "link" ? 
    validateLink : 
    validateText;
    validator(event.target);
  }
  
export  function checkForm(event) { 
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
  