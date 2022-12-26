const MY_SERVER = "https://project1-cw51.onrender.com"

// ------Loans------

const displayLoans = async (returned) => {
    const res = await axios.get(MY_SERVER + "/Loans")
    Loans_display.innerHTML = `<br>
    <table class="table table-dark table-striped" id="Loans_display2">
    <thead>
    <tr>
      <th scope="col">Customer Name</th>
      <th scope="col">Book Name</th>
      <th scope="col">Loan date</th>
      <th scope="col">Return date</th>
      <th scope="col">Status</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>`
    Loans_display2.innerHTML += res.data.filter(loan => loan.returned == false).map(loan => `
        <tr>
        <td>${loan.cusname}</td>
         <td>${loan.bookname}</td>
         <td>${loan.start}</td>
          <td>${loan.end}</td>
          <td><button class="btn btn-secondary btn-sm" onclick='updateStatus(${loan.loanid})'>book on loan - click to return</button></td>
          <td><button class="btn btn-warning" onclick='updateLoan(${loan.loanid})'>Update</button></td>
          <td><button class="btn btn-danger" onclick="deleteLoan(${loan.loanid})">Delete</button></td>
        </tr> 
        </table>`).join("")
    Loans_display2.innerHTML += res.data.filter(loan => loan.returned == true).map(loan => `
        <tr>
          <td>${loan.cusname}</td>
          <td>${loan.bookname}</td>
          <td>${loan.start}</td>
          <td>${loan.end}</td>
          <td><button class="btn btn-success btn-sm">returend!</button></td>
          <td><button class="btn btn-warning" onclick='updateLoan(${loan.loanid})'>Update</button></td>
          <td><button class="btn btn-danger" onclick="deleteLoan(${loan.loanid})">Delete</button></td>
        </tr> 
        </table>`).join("")
}

const getCusName = async () => {
    const res = await axios.get(MY_SERVER + "/Customers")
    .then((res) => cusID.innerHTML += res.data.filter(cus=>cus.cstatus == true).map(cus =>`<option value=${cus.id}>${cus.customers_name}</option>`).join(""))
}
getCusName()

const getBookName = async () => {
    await axios.get(MY_SERVER + "/Books").then((res) => bookId.innerHTML += res.data.filter(book=>book.bstatus == true).map(book => `<option value='${book.id} , ${book.book_type}'>${book.book_name}</option>`).join(""))
}
getBookName()

let booktype = []
const newList=(x)=>{
    booktype = x.split(",")
    console.log(booktype)
    return booktype
}

const dateLoans = (book_type) => {
    const date = new Date(String(loanT.value))
    if (book_type == 1) {
        date.setDate(date.getDate() + 10)
    }
    if (book_type == 2) {
        date.setDate(date.getDate() + 5)
    }
    if (book_type == 3) {
        date.setDate(date.getDate() + 2)
    }
    let days = date.getDate()
    let month = date.getMonth() + 1
    let years = date.getFullYear()
    const newdate = `${years}-${month}-${days}`
    return newdate
}

const addLoan = async () => {
  console.log(parseInt(bookId.value[0]))
    await axios.post(MY_SERVER + "/Loans", { "Customers_id": cusID.value, "Books_id":booktype[0], "start": loanT.value, "end": dateLoans(booktype[1]) })
}

const deleteLoan = async (id) => {
    await axios.delete(MY_SERVER + "/Loans/" + id).then((res) => console.log(res.data))
}

const updateLoan = async (id) => {
    const res = await axios.put(MY_SERVER + "/Loans/" + id, { "Customers_id": cusID.value, "Books_id": bookId.value[0], "start": loanT.value, "end": dateLoans(bookId.value[2]) })
}

const lateLoans = async () => {
    const res = await axios.get(MY_SERVER + "/Loans")
    Loans_display.innerHTML = `<br>
        <table class="table table-dark table-striped" id="Loans_display2">
        <thead>
        <tr>
          <th scope="col">Customer Name</th>
          <th scope="col">Book Name</th>
          <th scope="col">Loan date</th>
          <th scope="col">Return date</th>
          <th scope="col">Status</th>
          <th scope="col">Update</th>
          <th scope="col">Delete</th>
        </tr>
        </thead>`
    Loans_display2.innerHTML += res.data.filter(loan => loan.returned == false && loanDateLate(loan.end) > 0).map(loan => `
    <tr>
    <td>${loan.cusname}</td>
     <td>${loan.bookname}</td>
     <td>${loan.start}</td>
      <td>${loan.end}</td>
      <td><button class="btn btn-secondary btn-sm" onclick='updateStatus(${loan.loanid})'>book on loan - click to return</button></td>
      <td><button class="btn btn-warning" onclick='updateLoan(${loan.loanid})'>Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteLoan(${loan.loanid})">Delete</button></td>
    </tr> 
    </table>`).join("")
}

const updateStatus = async (id) => {
    const res = await axios.put(MY_SERVER + "/Loans/returend/" + id, { returned: true })
}

const loanDateLate=(end)=>{
    var date1= new Date(end)
    var date2= new Date()
    var time_difference=date2.getTime()-date1.getTime()
    var days_difference=time_difference/(1000*3600*24)
    return days_difference
}

