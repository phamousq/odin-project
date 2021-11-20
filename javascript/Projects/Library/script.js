// let myLibrary = [Book('test', 'quinton', 12, true)];
// // constructing with function
// function Book(title, author, pages: number, read: Boolean) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

//constructing with class
class Book {
  // title: string;
  // author: string;
  // pages: number;
  // read: Boolean;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  // books: Array<Book>;

  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  displayBooks() {
    this.books.forEach((book) => {
      console.log(book);
    });
  }
}

const library = new Library();

const showBooks = document.getElementById('show-books');

myLibrary.addBook(new Book('test', 'quinton', 12, true));
myLibrary.addBook(new Book('test', 'quinton', 12, true));
myLibrary.displayBooks();

showBooks.innerHTML = 'hi';
// document.getElementById('show-books').innerHTML = 'hi, this is a test';

let data = ["Ram", "Shyam", "Sita", "Gita"];

let list = document.getElementById("myList");

data.forEach((item) => {
  let li = document.createElement("li");
  li.innerText = item;
  list.appendChild(li);
});
