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

function getBookIndexByID(id) {
    return library.findIndex(element => element.id === id);
}

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
    const read = document.querySelector('input#book-read').checked;

    //Check for blank fields and alert user, otherwise add to library
    if (name === '' || author === '' || genre === '' || pages === '') {
        addErrorMessage('You must enter all fields.')    ;
    } else {
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

        //Remove error message if it exists
        const errorMessage = document.querySelector('.error-message');
        if ( errorMessage != null) {
            errorMessage.remove();
        }

    }
});




//Displaying books
function displayBook(
    book,
) {
    if (book.displaying === false) {
        //Create the text elements including their labels
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('uuid', book.id);

        const name = document.createElement('p');
        name.classList.add('book-name');
        const nameLabel = document.createElement('p');
        nameLabel.classList.add('card-label');

        const author = document.createElement('p');
        author.classList.add('book-author');
        const authorLabel = document.createElement('p');
        authorLabel.classList.add('card-label');
        
        const genre = document.createElement('p');
        genre.classList.add('book-genre');
        const genreLabel = document.createElement('p');
        genreLabel.classList.add('card-label');
        
        const pages = document.createElement('p');
        pages.classList.add('book-pages');
        const pagesLabel = document.createElement('p');
        pagesLabel.classList.add('card-label');

        const read = document.createElement('input');
        read.classList.add('book-read');
        read.type = 'checkbox';
        read.disabled = true;
        const readLabel = document.createElement('p');
        readLabel.classList.add('card-label');



        //Set their text
        nameLabel.textContent = 'Name:';
        name.textContent = book.name;

        authorLabel.textContent = 'Author:';
        author.textContent = book.author;

        genreLabel.textContent = 'Genre:';
        genre.textContent = book.genre;

        pagesLabel.textContent = 'Pages:';
        pages.textContent = book.pages;

        readLabel.textContent = 'Read:';
        read.checked = book.read;

        // Append to the container
        bookCard.appendChild(nameLabel);
        bookCard.appendChild(name);
        bookCard.appendChild(authorLabel);
        bookCard.appendChild(author);
        bookCard.appendChild(genreLabel);
        bookCard.appendChild(genre);
        bookCard.appendChild(pagesLabel);
        bookCard.appendChild(pages);
        bookCard.appendChild(readLabel);
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
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read';
        //Add read book functionality to button
        toggleReadButton.addEventListener('click', toggleRead);
        buttonContainer.appendChild(toggleReadButton);

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
    const bookIndex = getBookIndexByID(id);
    if (bookIndex >= 0) {
        library.splice(bookIndex, 1);
    };
}

function removeBook(event) {
        //Remove the book from the library using the id of the bookCard (the same as the book's ID)
        removeBookFromLibrary(event.target.parentElement.parentElement.getAttribute('uuid'));
        //Remove the book from the display
        event.target.parentElement.parentElement.remove();
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

function toggleRead(event) {
    //Mark book as read through its object
    const bookID = event.target.parentElement.parentElement.getAttribute('uuid');
    const readCheckbox = document.querySelector(`.book-card[uuid="${bookID}"] input.book-read`);
    const book = library[getBookIndexByID(bookID)];
    if (book.read === true) {
        book.read = false;
        readCheckbox.checked = false;
    } else {
        book.read = true;
        readCheckbox.checked = true;
    }
}

//Add Error Message
function addErrorMessage (message) {
    //Only add if an error message doesn't already exist
    if (document.querySelector('.error-message') === null) {
        //Set error message
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;

        //Append to title container
        const titleContainer = document.querySelector('.title-container');
        titleContainer.appendChild(errorMessage);
    }
}