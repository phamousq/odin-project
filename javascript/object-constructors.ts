function Book(title, author, pages: number, read: Boolean) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.infoProto = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? 'read' : 'not yet read'
  }`;
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.infoProto());
