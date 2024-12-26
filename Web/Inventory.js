const inventory = [
    {
        id: "1",
        name: "Widget A",
        quantity: 92,
        reorderPoint: 20,
        location: "Warehouse A",
        supplier: "Supplier X",
        lastRestocked: "2024-07-15",
        status: "In Stock"
    },
    {
        id: "2",
        name: "Widget B",
        quantity: 10,
        reorderPoint: 15,
        location: "Warehouse B",
        supplier: "Supplier Y",
        lastRestocked: "2024-04-12",
        status: "In Stock"
    },
    {
        id: "3",
        name: "Widget C",
        quantity: 0,
        reorderPoint: 10,
        location: "Warehouse C",
        supplier: "Supplier Z",
        lastRestocked: "2024-02-27",
        status: "Reorder"
    }
];

function renderTable() {
    const tableBody = document.querySelector('#inventoryTable tbody');
    tableBody.innerHTML = '';
    inventory.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.reorderPoint}</td>
                <td>${item.location}</td>
                <td>${item.supplier}</td>
                <td>${item.lastRestocked}</td>
                <td><span class="badge ${item.status === 'In Stock' ? 'badge-instock' : 'badge-reorder'}">${item.status}</span></td>
                <td>
                    <button class="btn btn-outline" onclick="changeQuantity('${item.id}', 1)">+</button>
                    <button class="btn btn-outline" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <button class="btn btn-outline" onclick="restock('${item.id}')">Restock</button>
                    <button class="btn btn-outline" onclick="showDetails('${item.id}')">Details</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function changeQuantity(id, change) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        item.status = item.quantity <= item.reorderPoint ? "Reorder" : "In Stock";
        renderTable();
    }
}

function restock(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.quantity += 50;
        item.lastRestocked = new Date().toISOString().split('T')[0];
        item.status = "In Stock";
        renderTable();
        showToast("Item Restocked! 50 units have been added to inventory");
    }
}

function showDetails(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        const dialog = document.getElementById('itemDialog');
        const dialogTitle = document.getElementById('dialogTitle');
        const dialogContent = document.getElementById('dialogContent');
        
        dialogTitle.textContent = `${item.name} Details`;
        dialogContent.innerHTML = `
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Reorder Point:</strong> ${item.reorderPoint}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Supplier:</strong> ${item.supplier}</p>
            <p><strong>Last Restocked:</strong> ${item.lastRestocked}</p>
            <p><strong>Status:</strong> <span class="badge ${item.status === 'In Stock' ? 'badge-instock' : 'badge-reorder'}">${item.status}</span></p>
        `;
        
        dialog.style.display = 'block';
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

window.onclick = function(event) {
    const dialog = document.getElementById('itemDialog');
    if (event.target === dialog || event.target.className === 'close') {
        dialog.style.display = 'none';
    }
}

renderTable();
