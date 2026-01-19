//Basic setup

function Book(
    name,
    author,
    genre,
    pages,
) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.displaying = false;
}

theFellowship = new Book(
    'The Fellowship of the Ring',
    'J.R.R. Tolkien',
    'Fantasy',
    500
);

gameOfThrones = new Book(
    'A Game of Thrones',
    'George R. R. Martin',
    'Fantasy',
    1200,
);

coldComfortFarm = new Book(
    'Cold Comfort Farm',
    'Stella Gibbons',
    'Classic',
    280
);

imGladMyMomDied = new Book(
    "I'm Glad My Mom Died",
    'Jeanette McCurdy',
    'Autobiography',
    340
);

const library = [
    theFellowship,
    gameOfThrones,
    coldComfortFarm,
    imGladMyMomDied
];


//Adding new books

function addBookToLibrary(
    library,
    name,
    author,
    genre,
    pages,
) {
    const newBook = new Book (
        name,
        author,
        genre,
        pages,
    );

    library.push(newBook);
}

const addNewBookButton = document.querySelector('button#add-book');
addNewBookButton.addEventListener('click', () => {
    //Find book variables.
    const name = document.querySelector('input#book-name').value;
    const author = document.querySelector('input#book-author').value;
    const genre = document.querySelector('input#book-genre').value;
    const pages = document.querySelector('input#book-pages').value;

    addBookToLibrary(
        library,
        name,
        author,
        genre,
        pages,        
    );

    //Clear inputs
    document.querySelectorAll('input').forEach((e) => {e.value = null;});
});




//Displaying books
function displayBook(
    book,
) {
    if (book.displaying === false) {
        //Create the text elements
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.id = book.id;

        const name = document.createElement('p');
        name.classList.add('book-name');

        const author = document.createElement('p');
        author.classList.add('book-author');
        
        const genre = document.createElement('p');
        genre.classList.add('book-genre');
        
        const pages = document.createElement('p');
        pages.classList.add('book-pages');

        //Set their text
        name.textContent = book.name;
        author.textContent = book.author;
        genre.textContent = book.genre;
        pages.textContent = book.pages;

        // Append to the container
        bookCard.appendChild(name);
        bookCard.appendChild(author);
        bookCard.appendChild(genre);
        bookCard.appendChild(pages);
        

        //Create and append the button
        const removeBookButton = document.createElement('button');
        removeBookButton.id = 'remove-book';
        removeBookButton.textContent = 'Remove Book';
        //Add remove book functionality, see below
        removeBookButton.addEventListener('click', removeBook)
        bookCard.appendChild(removeBookButton);

        //Append the card as a child of the card-container element
        const library = document.querySelector('div.card-container');
        library.appendChild(bookCard);

        book.displaying = true;
    }
}

const displayLibraryButton = document.querySelector('button#display-library');
displayLibraryButton.addEventListener('click', () => {
    library.forEach(displayBook);
});


//Removing books
function removeBookFromLibrary(id) {
    //Find the book's index and then remove it from the library array
    const bookIndex = library.findIndex(element => element.id === id);
    if (bookIndex >= 0) {
        library.splice(bookIndex);
    };
}

function removeBook(event) {
        //Remove the book from the library using the id of the bookCard (the same as the book's ID)
        removeBookFromLibrary(event.target.parentElement.id);
        //Remove the book from the display
        event.target.parentElement.remove();
}


//Clear display
function clearDisplay() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.textContent = '';
    //Set displaying flags to false
    library.forEach(book => book.displaying = false);
}

document.querySelector('button#clear-display').addEventListener('click', clearDisplay);