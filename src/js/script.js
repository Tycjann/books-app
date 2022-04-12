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

    const app = {
        initData: function(){
            const thisApp = this;
            thisApp.data = dataSource;
        },

        render: function(){
            const thisApp = this;
            for (const bookData of thisApp.data.books) {

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
        },

        initActions: function(){
           
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
                // console.log('favoriteBooks',favoriteBooks);
            });

            document.querySelector(select.containerOf.filters).addEventListener('click', function(event){
                const thisElement = event.target;

                if (
                    thisElement.tagName == 'INPUT'
                    && thisElement.name == 'filter'
                    && thisElement.type == 'checkbox'
                ) {
                    const indexOfId = filters.indexOf(thisElement.value);
                    if (thisElement.checked) {
                        if (indexOfId == -1) filters.push(thisElement.value);
                    }
                    else {
                        if (indexOfId != -1) filters.splice(indexOfId,1);
                    }
                    app.filtersActiv();
                }
            });

            // for (const book of books) {
            //     book.addEventListener('dblclick', function(event){
            //         event.preventDefault();
            //         const clickedIdBook = this.getAttribute('data-id');
            //         this.classList.toggle(select.book.favorite);
            //         const indexOfId = favoriteBooks.indexOf(clickedIdBook);
            //         if (indexOfId == -1) favoriteBooks.push(clickedIdBook);
            //         else favoriteBooks.splice(indexOfId,1);
            //         console.log('favoriteBooks',favoriteBooks);
            //     }); 
            // }
        },

        filtersActiv: function(){
            const thisApp = this;

            for (const book of thisApp.data.books) {
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
        },

        // initActions: function(){
        //     const books = document.querySelectorAll(select.book.aBookImage);
        //     for (const book of books) {
        //         book.addEventListener('dblclick', function(event){
        //             event.preventDefault();
        //             const clickedIdBook = this.getAttribute('data-id');
        //             this.classList.toggle(select.book.favorite);
        //             const indexOfId = favoriteBooks.indexOf(clickedIdBook);
        //             if (indexOfId == -1) favoriteBooks.push(clickedIdBook);
        //             else favoriteBooks.splice(indexOfId,1);
        //         }); 
        //     }
        // },

        init: function(){
            const thisApp = this;
            thisApp.initData();
            thisApp.render();
            thisApp.initActions();
        }
    };

    app.init();

}