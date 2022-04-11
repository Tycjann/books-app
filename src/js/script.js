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
            favorite: 'favorite',
        },
        filters: {
            input: 'input[name="filter"]',
        },
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
                const generateHTML = templates.templateBook(bookData);
                const element = utils.createDOMFromHTML(generateHTML);
                const listContainer = document.querySelector(select.containerOf.booksList);
                listContainer.appendChild(element);
            }
        },

        initActions: function(){
            const booksList = document.querySelector(select.containerOf.booksList);
           
            booksList.addEventListener('dblclick', function(event){
                const thisBook = event.target.offsetParent;
                // ? nie chce znaleźć .book__image
                if(thisBook.classList.contains('book__image')) {
                    event.preventDefault();
                    
                    const clickedIdBook = thisBook.getAttribute('data-id');
                    
                    thisBook.classList.toggle(select.book.favorite);
                    
                    const indexOfId = favoriteBooks.indexOf(clickedIdBook);
                    
                    if (indexOfId == -1) favoriteBooks.push(clickedIdBook);
                    else favoriteBooks.splice(indexOfId,1);
                }
                // console.log('favoriteBooks',favoriteBooks);
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

        //             // console.log('favoriteBooks',favoriteBooks);
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