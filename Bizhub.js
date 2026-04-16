const itemTable = document.getElementById("items-table-body");

// Load items from localStorage
let items = JSON.parse(localStorage.getItem("items")) || [];
let selectedItemIndex = null;

// Save to localStorage
function saveToStorage() {
    localStorage.setItem("items", JSON.stringify(items));
};

// Load items to table
function loadItems() {
    itemTable.innerHTML = "";

    items.forEach((item, index) => {
        itemTable.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
};

// Open form (Add)
function openForm() {
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-quantity").value = "";
    document.getElementById("item-description").value = "";

    document.getElementById("form-title").innerText = "Add Item";
    document.getElementById("item-form").style.display = "block";

    selectedItemIndex = null;
};

document.getElementById("addItemBtn").onclick = openForm;

// Edit item
function editItem(index) {
    let item = items[index];

    document.getElementById("item-name").value = item.name;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-quantity").value = item.quantity;
    document.getElementById("item-description").value = item.description;

    document.getElementById("form-title").innerText = "Edit Item";
    document.getElementById("item-form").style.display = "block";

    selectedItemIndex = index;
};

// Save item (Add or Edit)
function saveItem() {
    let name = document.getElementById("item-name").value;
    let price = document.getElementById("item-price").value;
    let quantity = document.getElementById("item-quantity").value;
    let description = document.getElementById("item-description").value;

    let newItem = { name, price, quantity, description };

    if (selectedItemIndex === null) {
        items.push(newItem); // Add
    } else {
        items[selectedItemIndex] = newItem; // Update
    }

    saveToStorage();
    loadItems();
    closeForm();
};

// Delete item
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        items.splice(index, 1);
        saveToStorage();
        loadItems();
    }
};

// Close form
function closeForm() {
    document.getElementById("item-form").style.display = "none";
    selectedItemIndex = null;
};

// Load items on page load
loadItems();
