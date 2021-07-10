(function () {
  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
    info() {
      return `${this.title}, ${this.author}, ${this.pages} pages, ${
        this.read ? "read" : "not read yet"
      }`;
    }
  }

  const chronicle = Book(
    "A Chronicle of Ancient Sunlight",
    "Henry Williamson",
    6062,
    false
  );
  const theHobbit = Book("The Hobbit", "J.R.R. Tolkien", 295, false);
  const venmurasu = Book("Venmurasu", "Jeyamohan", 22400, true);

  var library = {
    collection: [chronicle, theHobbit, venmurasu],
    init: function () {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },
    addBook: function (book) {
      this.collection.push(book);
    },
    deleteBook: function (index) {
      this.collection.splice(index, 1);
    },
    changeReadStatus: function (index) {
      if (this.collection[index].read) {
        this.collection[index].read = false;
      } else {
        this.collection[index].read = true;
      }
    },
    cacheDom: function () {
      this.el = document.querySelector(".library");
      this.addBookButton = this.el.querySelector(".addBookButton");
      this.table = this.el.querySelector(".table");
      this.tableBody = this.el.querySelector("tbody");

      this.form = document.querySelector(".form-container");
      this.titleInput = document.querySelector("#title");
      this.authorInput = document.querySelector("#author");
      this.pagesInput = document.querySelector("#pages");
      this.readInput = document.querySelector("#isRead");
      this.submitButton = document.querySelector(".submit");
    },
    createDeleteButton: function (index) {
      const deleteTd = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.deleteBook(index);
        this.render();
      });
      deleteTd.append(deleteButton);
      return deleteTd;
    },
    createChangeReadButton: function (index) {
      const readTd = document.createElement("td");
      const readButton = document.createElement("button");
      readButton.textContent = "Change Read Status";
      readButton.addEventListener("click", () => {
        this.changeReadStatus(index);
        this.render();
      });
      readTd.append(readButton);
      return readTd;
    },
    render: function () {
      this.tableBody.textContent = "";

      this.collection.forEach((book, index) => {
        const row = document.createElement("tr");
        Object.keys(book).forEach((prop) => {
          let newTd = document.createElement("td");
          newTd.textContent = book[prop];
          if (prop === "read") {
            newTd.textContent = book[prop] ? "Read" : "Not Read";
          }
          row.append(newTd);
        });

        row.append(this.createDeleteButton(index));
        row.append(this.createChangeReadButton(index));
        this.tableBody.append(row);
      });
    },
    toggleHiddenItems: function () {
      this.table.classList.toggle("hidden");
      this.form.classList.toggle("hidden");
      this.addBookButton.classList.toggle("hidden");
    },
    bindEvents: function () {
      this.addBookButton.addEventListener(
        "click",
        this.toggleHiddenItems.bind(this)
      );
      this.submitButton.addEventListener(
        "click",
        this.toggleHiddenItems.bind(this)
      );
      this.submitButton.addEventListener("click", () => {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
        const pages = this.pagesInput.value;
        const isRead = this.readInput.checked;
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.pagesInput.value = "";
        this.readInput.checked = false;
        this.addBook(new Book(title, author, pages, isRead));
        this.render();
      });
    },
  };

  library.init();
})();
