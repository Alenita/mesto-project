import {Card} from './card.js';

export class CardList {
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
  }