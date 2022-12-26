const MY_SERVER = "https://project1-cw51.onrender.com"

// ------Customers------

const displayCustomers = async () => {
    const res = await axios.get(MY_SERVER + "/Customers")
    Customers_display.innerHTML = res.data.map(cus => `
    <br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">Customer name:${cus.customers_name}</h5>
    <p class="card-text">Customer ID:${cus.id}<br>Age:${cus.age}<br>City:${cus.city}</p>
    <button class="btn btn-warning btn-lg" onclick='updateCustomer(${cus.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteCustomer(${cus.id})">Delete</button></div></div>`).join("")
}

const addCustomer = async () => {
    await axios.post(MY_SERVER + "/Customers", { customers_name: customer_name.value, age: age.value, city: city.value }).then((res) => console.log(res.data))
    displayCustomers()
}

const deleteCustomer = async (id) => {
    await axios.delete(MY_SERVER + "/Customers/" + id).then((res) => console.log(res.data))
    displayCustomers()
}

const updateCustomer = async (id) => {
    const res = await axios.put(MY_SERVER + "/Customers/" + id, { customers_name: customer_name.value, age: age.value, city: city.value })
    console.log(res)
    displayCustomers()
}

const searchCustomer = async () => {
    const res = await axios.get(MY_SERVER + "/Customers")
    searchcus.innerHTML = res.data.filter(x=>x.customers_name.toLowerCase().includes(customer_search.value.toLowerCase())).map(cus =>
        `<option>${cus.customers_name}</option></p>`).join("")
}

const showCustomer = async () => {
    const res = await axios.get(MY_SERVER + "/Customers")
    Customers_display.innerHTML = res.data.filter(cus =>cus.customers_name.includes(customer_search.value)).map(cus=> `
    <br><div class="card w-25">
    <div class="card-body">
    <h5 class="card-title">Customer name:${cus.customers_name}</h5>
    <p class="card-text">Customer ID:${cus.id}<br>Age:${cus.age}<br>City:${cus.city}</p>
    <button class="btn btn-warning btn-lg" onclick='updateCustomer(${cus.id})'>Update</button> <button class="btn btn-danger btn-lg" onclick="deleteCustomer(${cus.id})">Delete</button></div></div>`).join("")
}
