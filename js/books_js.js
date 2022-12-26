const MY_SERVER = "https://project1-cw51.onrender.com"

// ------Books------

let bvalue = null

const displayBooks = async () => {
    const res = await axios.get(MY_SERVER + "/Books")
    books_display.innerHTML = res.data.filter(book=>book.bstatus == true).map(book => `<br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">Book name:${book.book_name}</h5>
    <p class="card-text">Book ID:${book.id}<br>Author:${book.author}<br>Published:${book.published_year}<br>Book type:${book.book_type}</p>
    <button class="btn btn-warning btn-lg" onclick='updateBook(${book.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteBook(${book.id},${book.bstatus})">disable</button>
    </div></div>`).join("")
}

const displayDbooks = async () =>{
    const res = await axios.get(MY_SERVER + "/Books")
    books_display.innerHTML = res.data.filter(book=>book.bstatus == false).map(book => `<br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">ID : ${book.id} ; Book name:${book.book_name}</h5><button class="btn btn-secondary btn-s" onclick="deleteBook(${book.id},${book.bstatus})">book disable - click to unable him</button>
    </div></div>`).join("")
}

const addBook = async () => {
    await axios.post(MY_SERVER + "/Books", { book_name: book_name.value, author: author.value, published_year: published_year.value, book_type: book_type.value }).then((res) => console.log(res.data))
}

const deleteBook = async (id,x) => {
    bvalue = x
    if (bvalue == true){
        const res = await axios.put(MY_SERVER + "/Books/returend/" + id, { bstatus: false })
        console.log("book disabled")
    }
    else{
        const res = await axios.put(MY_SERVER + "/Books/returend/" + id, { bstatus: true })
        console.log("book unabled")
    }
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
    books_display.innerHTML = res.data.filter(book => book.book_name.includes(book_search.value) && book.bstatus == true).map(book => `<br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">Book name:${book.book_name}</h5>
    <p class="card-text">Book ID:${book.id}<br>Author:${book.author}<br>Published:${book.published_year}<br>Book type:${book.book_type}</p>
    <button class="btn btn-warning btn-lg" onclick='updateBook(${book.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteBook(${book.id},${book.bstatus})">disable</button>
    </div></div>`).join("")
    books_display.innerHTML += res.data.filter(book => book.book_name.includes(book_search.value) && book.bstatus == false).map(book => `<br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">ID : ${book.id} ; Book name:${book.book_name}</h5><button class="btn btn-secondary btn-s" onclick="deleteBook(${book.id},${book.bstatus})">book disable - click to unable him</button>
    </div></div>`).join("")
}
