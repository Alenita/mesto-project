# Mesto-project 

Последняя актуальная версия *v0.0.6*.
На интерактивной странице реализованы: 
* добавление новых карточек на сервер через форму (удаление отражается после перезагрузки страницы),
* изменение информации о пользователе, 
* просмотр количества лайков,
* валидация форм.

При создания проекта использовались: 
- HTML/CSS,
- JavaScript,
- GIT,
- Webpack.

Файлы скриптов разбиты на модули по классам: 

```
export class Api {
    constructor(options) {
      this.url = options.serverUrl;
      this.key = options.headers.authorization;
    }
    
    getAllInfo() {
      return Promise.all([this.getInfo(), this.getInitialCards()]);
    }
```


Открыть страницу можно по [ссылке] (https://alenita.github.io/mesto-project/) или из репозитория, собрав командами 

```
npm run build
npm run dev
