const Book = (title, author, pages: number, read: Boolean) => {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  const readStatus = (read) => {
    if (read) {
      return 'not read yet';
    }
    return 'read';
  };

  const info = () => {
    console.log(`${title} by ${author}, ${pages} pages, ${readStatus(read)}`);
  };
};
