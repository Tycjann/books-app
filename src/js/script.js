{
    'use strict';
    console.clear();

    const select = {
        templateOf: {
            templateBook: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
            filters: '.filters',
        },
        book: {
            aBookImage: 'a.book__image',
            bookImage: 'book__image',
            favorite: 'favorite',
        },
        // filters: {
        // input: 'input[name="filter"]',
        // },
    };

    const ratingStyle = {
        rating6: 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);',
        rating6_8: 'background: linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);',
        rating8_9: 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);',
        rating9: 'background: linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);',
    };

    const templates = {
        templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };

    const favoriteBooks = [];

    const filters = [];

    class BookList {
        constructor() {
            const thisBookList = this;
            thisBookList.initData();
            thisBookList.render();
            thisBookList.initActions();
            thisBookList.filtersActiv();
        }

        initData(){
            const thisBookList = this;
            thisBookList.data = dataSource;
        }

        render(){
            const thisBookList = this;
            for (const bookData of thisBookList.data.books) {

                let elementStyle = '';

                if (bookData.rating < 6) elementStyle = ratingStyle.rating6;
                if (bookData.rating > 6 && bookData.rating <= 8) elementStyle = ratingStyle.rating6_8;
                if (bookData.rating > 8 && bookData.rating <= 9) elementStyle = ratingStyle.rating8_9;
                if (bookData.rating > 9) elementStyle = ratingStyle.rating9;

                bookData['style'] = elementStyle + ';width: ' + bookData.rating*10 + '%';
                
                const generateHTML = templates.templateBook(bookData);
                const element = utils.createDOMFromHTML(generateHTML);
                const listContainer = document.querySelector(select.containerOf.booksList);
                listContainer.appendChild(element);
            }
        }

        initActions(){
            const thisBookList = this;

            document.querySelector(select.containerOf.booksList).addEventListener('dblclick', function(event){
                const thisBook = event.target.offsetParent;
                if(thisBook.classList.contains(select.book.bookImage)) {
                    event.preventDefault();
                    
                    const clickedIdBook = thisBook.getAttribute('data-id');
                    
                    thisBook.classList.toggle(select.book.favorite);
                    
                    const indexOfId = favoriteBooks.indexOf(clickedIdBook);
                    
                    if (indexOfId == -1) favoriteBooks.push(clickedIdBook);
                    else favoriteBooks.splice(indexOfId,1);
                }
            });

            document.querySelector(select.containerOf.filters).addEventListener('click', function(event){
                const eventTarget = event.target;

                if (
                    eventTarget.tagName == 'INPUT'
                    && eventTarget.name == 'filter'
                    && eventTarget.type == 'checkbox'
                ) {
                    const indexOfId = filters.indexOf(eventTarget.value);
                    if (eventTarget.checked) {
                        if (indexOfId == -1) filters.push(eventTarget.value);
                    }
                    else {
                        if (indexOfId != -1) filters.splice(indexOfId,1);
                    }
                    thisBookList.filtersActiv();
                }
            });
        }

        filtersActiv(){
            const thisBookList = this;

            for (const book of thisBookList.data.books) {
                const selectBook = document.querySelector('[data-id~="' + book.id + '"]');

                if (filters.length == 0){
                    selectBook.classList.remove('hidden');
                }
                else {
                    let bookActiv = true;
                    for (const filter of filters) {
                        if(!book.details[filter]) {
                            bookActiv = false;
                            break;
                        }
                    }
                    
                    if(!bookActiv) selectBook.classList.add('hidden');
                    else selectBook.classList.remove('hidden');
                }
            }
        }
    }

    const app = new BookList();
}