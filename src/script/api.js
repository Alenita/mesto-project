

export class Api {
    constructor(options) {
      this.url = serverUrl;
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