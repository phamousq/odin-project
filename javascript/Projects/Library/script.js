// ! Book Class: represents a Book
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// ! Library Class: object holding all of the books
class Library {
  static displayBooks() {
    const books = Store.getBooks()
    books.forEach((book) => this.addNewBook(book))
  }

  static removeBook = (el) => {
    if(el.classList.contains('delete')){
      el.parentElement.remove()
    }
  }

  static addNewBook = (book) => {
    // this.books.push(book) // this will make duplicates 
    let list = document.getElementById("books-list");
    let bookCard = document.createElement("div")
      bookCard.className = 'book-card'
      bookCard.innerHTML = `<h3 style="font-weight:900">${book.title}</h3>
                            <ul>
                              <li>by ${book.author}</li>
                              <li>${book.pages} pages</li>
                              <li>
                                <a href='#'>${book.read ? 'read' : 'unread'}</a>
                              </li>
                            </ul>
                            <button href="#" class="delete" id='delete-button'>X</button>`
      list.appendChild(bookCard)
  }

  static clearFields = () => {
    document.querySelector('#bookTitle').value = ''
    document.querySelector('#bookAuthor').value = ''
    document.querySelector('#bookPages').value = ''
    document.querySelector('#bookRead').value = ''
  }
}

// UI Class: Handle UI tasks
class UI {
  openForm = () => {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open-button").style.display = 'none'
  }
  closeForm = () => {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("open-button").style.display = 'block'
  }
}

// Store Class: handle storage
class Store {
  static getBooks() {
    let books
    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static addBook(book){
    const books = Store.getBooks()
    books.push(book)
   localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(title){
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if(book.title === title) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }

  static toggleRead(bookTitle) {
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if(book.title === title) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

// Event: Display book
document.addEventListener('DOMContentLoaded', Library.displayBooks()) 

// event: add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()
  // get form values
  const title = document.getElementById('bookTitle').value
  const author = document.getElementById('bookAuthor').value
  const pages = document.getElementById('bookPages').value
  const isRead = document.getElementById('bookRead').checked 

  // instantiate Book
  const book = new Book(title, author, pages, isRead)

  // add book to library
  Library.addNewBook(book)

  // add book to store
  Store.addBook(book)

  // clear fields
  Library.clearFields()
})

// Event: Remove Book
document.querySelector('#delete-button').addEventListener('click', (e) => {
  // remove book from UI
  Library.removeBook(e.target)

  // remove book from store
  Store.removeBook(e.target.parentElement.getElementsByTagName('h3')[0].innerText) // todo current method finds the name and passes that to be removed 
})