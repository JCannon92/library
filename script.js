const library = [];

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

