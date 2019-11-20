export class Card {
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