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
}

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

function displayBook(
    book,
) {
    //Create the text elements
    const bookCard = document.createElement('div.book-card');
    const name = document.createElement('p.book-name');
    const author = document.createElement('p.book-author');
    const genre = document.createElement('p.book-genre');
    const pages = document.createElement('p.book-pages');

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
    const bookRemoveButton = document.createElement('button');
    bookRemoveButton.textContent = 'Remove Book';
    bookCard.appendChild(bookRemoveButton);

    //Append the card as a child of the card-container element
    const library = document.querySelector('div.card-container');
    library.appendChild(bookCard);
}

function displayAllBooks(
    library,
) {
    
    library.forEach(displayBook);
}


const library = [];
