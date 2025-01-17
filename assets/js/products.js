async function fetchAllProducts() {
    try {
        const response = await fetch('http://localhost:7000/products/getAllProduct', { method: 'GET' });
        const data = await response.json();

        if (data.success) {
            const productsContainer = document.getElementById('productsContainer');
            productsContainer.innerHTML = ''; // Clearing any existing content

            // Create the table structure once
            const tableHTML = `
                <table id="productsTable">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="productsTableBody"></tbody>
                </table>
            `;
            productsContainer.innerHTML = tableHTML;

            const productsTableBody = document.getElementById('productsTableBody');

            // Append each product as a table row
            data.data.forEach(product => {
                const productRow = `
                    <tr>
                        <td><img src="/uploads/${product.image}" alt="${product.name}" width=30px height=30px /></td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.desc}</td>
                        <td>$${product.price}</td>
                        <td>${product.sizes.join(', ')}</td>
                        <td>
                            <a href="/products/updateProductPage/${product._id}">Update</a>
                            <a href="/products/deleteProduct/${product._id}">Delete</a>
                        </td>
                    </tr>
                `;
                productsTableBody.innerHTML += productRow;
            });
        } else {
            console.log('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the fetch function when the page loads
document.addEventListener('DOMContentLoaded', fetchAllProducts);