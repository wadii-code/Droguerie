// Sample product data
let products = [
    {
        id: 1,
        name: "Peinture acrylique blanche",
        category: "peinture",
        description: "10L - Couvrance exceptionnelle",
        price: 32.50,
        stock: 45,
        status: "active",
        image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3"
    },
    {
        id: 2,
        name: "Kit nettoyage multi-surfaces",
        category: "nettoyage",
        description: "5 produits essentiels - Écologiques",
        price: 24.90,
        stock: 32,
        status: "active",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3"
    },
    {
        id: 3,
        name: "Kit vis et chevilles",
        category: "quincaillerie",
        description: "150 pièces - Toutes dimensions",
        price: 14.99,
        stock: 78,
        status: "promo",
        image: "https://images.unsplash.com/photo-1586981953108-0c23bd5b3e0e?ixlib=rb-4.0.3"
    },
    {
        id: 4,
        name: "Perceuse-visseuse 18V",
        category: "outillage",
        description: "Marque ProTool - Batterie incluse",
        price: 89.99,
        stock: 12,
        status: "active",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3"
    },
    {
        id: 5,
        name: "Aspirateur sans sac",
        category: "nettoyage",
        description: "2000W - Filtre HEPA - Sacless",
        price: 129.00,
        stock: 8,
        status: "active",
        image: "https://images.unsplash.com/photo-1598791318878-10e4d1a6d4a4?ixlib=rb-4.0.3"
    }
];

// DOM Elements
const productsTableBody = document.getElementById('products-table-body');
const productModal = document.getElementById('product-modal');
const deleteModal = document.getElementById('delete-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
let productToDelete = null;

// Render products table
function renderProductsTable() {
    productsTableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        
    
        let statusClass = '';
        let statusText = '';
        
        switch(product.status) {
            case 'active':
                statusClass = 'bg-green-100 text-green-800';
                statusText = 'Actif';
                break;
            case 'inactive':
                statusClass = 'bg-red-100 text-red-800';
                statusText = 'Inactif';
                break;
            case 'promo':
                statusClass = 'bg-yellow-100 text-yellow-800';
                statusText = 'Promo';
                break;
        }
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-md object-cover" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${product.name}</div>
                        <div class="text-sm text-gray-500">${product.description}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 capitalize">${product.category}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${product.price.toFixed(2)}€</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${product.stock}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="edit-product text-green-600 hover:text-green-900 mr-3" data-id="${product.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-product text-red-600 hover:text-red-900" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        productsTableBody.appendChild(row);
    });
    
    
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            openEditModal(productId);
        });
    });
    
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id'));
            openDeleteModal(productId);
        });
    });
    
    
    document.getElementById('items-count').textContent = 1;
    document.getElementById('items-total').textContent = products.length;
    document.getElementById('total-products').textContent = products.length;
}

// Open modal for adding a new product
function openAddModal() {
    modalTitle.textContent = 'Ajouter un produit';
    productForm.reset();
    document.getElementById('product-id').value = '';
    productModal.style.display = 'flex';
    setTimeout(() => {
        productModal.classList.add('show');
    }, 10);
}

// Open modal for editing a product
function openEditModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        modalTitle.textContent = 'Modifier le produit';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-status').value = product.status;
        document.getElementById('product-image').value = product.image;
        productModal.style.display = 'flex';
        setTimeout(() => {
            productModal.classList.add('show');
        }, 10);
    }
}

// Open delete confirmation modal
function openDeleteModal(productId) {
    productToDelete = productId;
    deleteModal.style.display = 'flex';
    setTimeout(() => {
        deleteModal.classList.add('show');
    }, 10);
}

// Handle form submission
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        status: document.getElementById('product-status').value,
        image: document.getElementById('product-image').value
    };
    
    if (productId) {
        
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...productData });
    }
    
    renderProductsTable();
    productModal.style.display = 'none';
});

// Handle delete confirmation
document.getElementById('confirm-delete').addEventListener('click', () => {
    if (productToDelete) {
        products = products.filter(p => p.id !== productToDelete);
        renderProductsTable();
        deleteModal.style.display = 'none';
        productToDelete = null;
    }
});

// Event listeners for modal controls
document.getElementById('add-product-btn').addEventListener('click', openAddModal);
document.getElementById('close-modal').addEventListener('click', () => {
    productModal.classList.remove('show');
    setTimeout(() => {
        productModal.style.display = 'none';
    }, 300);
});
document.getElementById('cancel-form').addEventListener('click', () => {
    productModal.classList.remove('show');
    setTimeout(() => {
        productModal.style.display = 'none';
    }, 300);
});
document.getElementById('cancel-delete').addEventListener('click', () => {
    deleteModal.classList.remove('show');
    setTimeout(() => {
        deleteModal.style.display = 'none';
        productToDelete = null;
    }, 300);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('show');
        setTimeout(() => {
            productModal.style.display = 'none';
        }, 300);
    }
    if (e.target === deleteModal) {
        deleteModal.classList.remove('show');
        setTimeout(() => {
            deleteModal.style.display = 'none';
            productToDelete = null;
        }, 300);
    }
});

// Initialize the page with animations
document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('tr').forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 100 * index);
    });
    
    renderProductsTable();
    

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);
        });
    });
});