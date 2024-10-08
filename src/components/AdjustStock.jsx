import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdjustStock = () => {
    const [inventories, setInventories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const inventoryResponse = await axios.get('http://localhost:5201/api/inventory');
                setInventories(inventoryResponse.data);

                // Fetch product names after fetching inventories
                const productResponse = await axios.get('http://localhost:5201/api/products');
                setProducts(productResponse.data);
            } catch (err) {
                console.error('Error fetching inventories:', err);
                setError('Error fetching inventories');
            }
        };

        fetchInventories();
    }, []);

    // Create a map for product names
    const productMap = {};
    products.forEach(product => {
        productMap[product.productId] = {

            name:product.name,
            imageUrls: product.imageUrls,

        } ;
    });

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Inventory Details</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {inventories.length === 0 ? (
                <div className="alert alert-warning">No inventory records found.</div>
            ) : (
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Product Name</th>
                            <th>Product URL</th>
                            <th>Stock Level</th>
                            <th>Low Stock Threshold</th>
                            <th>Is Low Stock</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((inventory) => {
                            const product = productMap[inventory.productId] || { name: 'Unknown Product', url: '#' };
                            return (
                                <tr key={inventory.inventoryId}>
                                    <td>{product.name}</td>
                                    <td>
                                    {product.imageUrls && product.imageUrls.length > 0 ? (
                                        <img
                                            src={product.imageUrls[0]} // Display the first image URL
                                            alt={product.name}
                                            style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                               
                                    <td>{inventory.stockLevel}</td>
                                    <td>{inventory.lowStockThreshold}</td>
                                    <td>{inventory.isLowStock ? 'Yes' : 'No'}</td>
                                    <td>{new Date(inventory.lastUpdated).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdjustStock;
