//Basic setup

function Book(
    name,
    author,
    genre,
    pages,
    read,
) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.displaying = false;
    this.read = read;
}

theFellowship = new Book(
    'The Fellowship of the Ring',
    'J.R.R. Tolkien',
    'Fantasy',
    500,
    true,
);

gameOfThrones = new Book(
    'A Game of Thrones',
    'George R. R. Martin',
    'Fantasy',
    1200,
    true,
);

coldComfortFarm = new Book(
    'Cold Comfort Farm',
    'Stella Gibbons',
    'Classic',
    280,
    true,
);

imGladMyMomDied = new Book(
    "I'm Glad My Mom Died",
    'Jeanette McCurdy',
    'Autobiography',
    340,
    false,
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
    read,
) {
    const newBook = new Book (
        name,
        author,
        genre,
        pages,
        read,
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
    const read = document.querySelector('input#book-read').value;

    addBookToLibrary(
        library,
        name,
        author,
        genre,
        pages,
        read,        
    );

    //Clear inputs
    document.querySelectorAll('input').forEach((e) => {e.value = null;});

    //Display book
    displayBook(library.slice(-1)[0]);
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

        const read = document.createElement('input');
        read.classList.add('book-read');
        read.type = 'checkbox';
        read.disabled = true;


        //Set their text
        name.textContent = book.name;
        author.textContent = book.author;
        genre.textContent = book.genre;
        pages.textContent = book.pages;
        read.checked = book.read;

        // Append to the container
        bookCard.appendChild(name);
        bookCard.appendChild(author);
        bookCard.appendChild(genre);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        

        //Create a button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        //Create and append the remove button
        const removeBookButton = document.createElement('button');
        removeBookButton.textContent = 'Remove Book';
        //Add remove book functionality, see below
        removeBookButton.addEventListener('click', removeBook)
        buttonContainer.appendChild(removeBookButton);

        //Create and append the read button
        const readBookButton = document.createElement('button');
        readBookButton.textContent = 'Read Book';
        //Add read book functionality to button
        readBookButton.addEventListener('click', readBook);
        buttonContainer.appendChild(readBookButton);

        //Append button container to card
        bookCard.appendChild(buttonContainer);

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
        removeBookFromLibrary(event.target.parentElement.parentElement.id);
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


//Read book

function readBook(event) {
    //Mark book as read through its object
    const book = library[event.parentElement.parentElement.id];
    book.read = true;
}