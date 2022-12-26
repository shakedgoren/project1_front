const MY_SERVER = "https://project1-cw51.onrender.com"

// ------Books------

const displayBooks = async () => {
    const res = await axios.get(MY_SERVER + "/Books")
    books_display.innerHTML = res.data.map(book => `<br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">Book name:${book.book_name}</h5>
    <p class="card-text">Book ID:${book.id}<br>Author:${book.author}<br>Published:${book.published_year}<br>Book type:${book.book_type}</p>
    <button class="btn btn-warning btn-lg" onclick='updateBook(${book.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteBook(${book.id})">Delete</button>
    </div></div>`).join("")
    console.log("display all")
}

const addBook = async () => {
    await axios.post(MY_SERVER + "/Books", { book_name: book_name.value, author: author.value, published_year: published_year.value, book_type: book_type.value }).then((res) => console.log(res.data))
}

const deleteBook = async (id) => {
    await axios.delete(MY_SERVER + "/Books/" + id).then((res) => console.log(res.data))
}

const updateBook = async (id) => {
    const res = await axios.put(MY_SERVER + "/Books/" + id, { book_name: book_name.value, author: author.value, published_year: published_year.value, book_type: book_type.value })
    console.log(res)
}

const searchBook = async () => {
    const res = await axios.get(MY_SERVER + "/Books")
    searchbook.innerHTML = res.data.filter(x => x.book_name.toLowerCase().includes(book_search.value.toLowerCase())).map(book =>
        `<option>
        ${book.book_name}</option>
        </p>`).join("")
}

const showBook = async () => {
    const res = await axios.get(MY_SERVER + "/Books")
    books_display.innerHTML = res.data.filter(book => book.book_name.includes(book_search.value)).map(book =>      
        `<br><div class="card w-25">
        <div class="card-body">
        <h5 class="card-title">Book name:${book.book_name}</h5>
        <p class="card-text">Book ID:${book.id}<br>Author:${book.author}<br>Published:${book.published_year}<br>Book type:${book.book_type}</p>
        <button class="btn btn-warning btn-lg" onclick='updateBook(${book.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteBook(${book.id})">Delete</button>
        </div></div>`).join("")
}
