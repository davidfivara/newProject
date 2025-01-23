// Navigation between Registration and Login
document.getElementById("to-login").addEventListener("click", () => {
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
});

document.getElementById("to-register").addEventListener("click", () => {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");
});

// Registration
document.getElementById("register-button").addEventListener("click", () => {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        alert("Registration successful! Please log in.");
        document.getElementById("register-section").classList.add("hidden");
        document.getElementById("login-section").classList.remove("hidden");
    } else {
        alert("Please fill in all fields.");
    }
});

// Login
document.getElementById("login-button").addEventListener("click", () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("Login successful!");
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("dashboard-container").classList.remove("hidden");
    } else {
        alert("Invalid username or password.");
    }
});

// Inventory Management
const productList = JSON.parse(localStorage.getItem("products")) || [];

document.getElementById("add-product").addEventListener("click", () => {
    const name = document.getElementById("product-name").value;
    const id = document.getElementById("product-id").value;
    const price = document.getElementById("price").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const quantity = document.getElementById("quantity").value;

    if (name && id && price && expiryDate && quantity) {
        const product = { name, id, price, expiryDate, quantity };
        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList));
        updateProductList();
        document.getElementById("product-form").reset();
        alert("Product added successfully!");
    } else {
        alert("Please fill in all fields.");
    }
});

function updateProductList() {
    const productListContainer = document.getElementById("product-list");
    productListContainer.innerHTML = "";
    productList.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} (ID: ${product.id}) - $${product.price}, Expires: ${product.expiryDate}, Quantity: ${product.quantity}`;
        productListContainer.appendChild(listItem);
    });
}

// Logout
document.getElementById("logout-button").addEventListener("click", () => {
    document.getElementById("dashboard-container").classList.add("hidden");
    document.getElementById("auth-container").classList.remove("hidden");
});

// Initialize product list on page load
updateProductList();
