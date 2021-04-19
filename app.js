let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype = {
    info: function () {
        return `${this.title}, ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
    }
}

// class Book {
//     constructor(title, author, pages, read) {
//         this.title = title
//         this.author = author
//         this.pages = pages
//         this.read = read
//     }

//     info() {
//         return `${this.title}, ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
//     }
// }

function addBookToLibrary(book) {
    myLibrary.push(book)
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
// const venmurasu = new Book('Venmurasu', 'Jeyamohan', 22400, true)
// const chronicle = new Book('A Chronicle of Ancient Sunlight', 'Henry Williamson', 6062, false)

// addBookToLibrary(theHobbit)
// addBookToLibrary(venmurasu)
// addBookToLibrary(chronicle)

//--------------

const container = document.querySelector('.container')
const table = document.querySelector('table')
const addBook = document.querySelector('.addBookButton')
const main = document.querySelector('.main')
const submit = document.querySelector('.submit')
const formContainer = document.querySelector('.form-container')
const author = document.querySelector('#author')
const title = document.querySelector('#title')
const pages = document.querySelector('#pages')
const isRead = document.querySelector('#isRead')
let index = 0

function createTable() {
    const table = document.createElement('table')

    const row = document.createElement('tr')

    const bookName = document.createElement('th')
    bookName.textContent = "Book"
    row.appendChild(bookName)

    const authorName = document.createElement('th')
    authorName.textContent = "Author"
    row.appendChild(authorName)


    table.appendChild(row)

    document.body.appendChild(table)
    console.log(document.body)

}

function createRow(book) {
    const row = document.createElement('tr')
    row.dataset.index = index
    const bookInfo = book.info().split(',')
    bookInfo.forEach(info => {
        const rowInfo = document.createElement('td')
        rowInfo.textContent = info
        row.appendChild(rowInfo)
    })

    const button = document.createElement('button')
    button.textContent = 'button'
    button.dataset.index = index
    button.classList.add('delete')
    row.appendChild(button)

    index++
    return row
}

function createBook() {
    const book = new Book(title.value, author.value, pages.value, isRead.checked)
    return book
}

myLibrary.forEach(book => {
    table.appendChild(createRow(book))
})

addBook.addEventListener('click', e => {
    formContainer.classList.toggle('hidden')
})

submit.addEventListener('click', e => {
    // main.classList.toggle('hidden')
    // form.classList.toggle('hidden')
    table.appendChild(createRow(createBook()))
    author.value = ""
    title.value = ""
    pages.value = ""
    isRead.checked = false
    formContainer.classList.toggle('hidden')
})

const buttons = document.querySelectorAll('.delete')

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const buttonIndex = e.target.dataset.index
        myLibrary.splice(buttonIndex, 1)

        while(table.firstChild) {
            table.removeChild(table.firstChild)
        }

        myLibrary.forEach(book => {
            table.appendChild(createRow(book))
        })

    })
})

// createTable()

// finish createTable refactor
// finish delete button and read toggle
