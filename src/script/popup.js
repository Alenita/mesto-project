export class Popup { 
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
  