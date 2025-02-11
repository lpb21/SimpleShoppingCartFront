import React, { useState } from 'react';
import '../BestCombination.css';

//* Dataset de productos
const dataset = [
    { id: 1, name: "Producto 1", price: 60 },
    { id: 2, name: "Producto 2", price: 100 },
    { id: 3, name: "Producto 3", price: 120 },
    { id: 4, name: "Producto 4", price: 70 }
];

//* Función para encontrar la mejor combinación de productos
const findBestCombination = (dataset, budget) => {
    const n = dataset.length;
    const dp = Array(n + 1).fill(0).map(() => Array(budget + 1).fill(0));
    const keep = Array(n + 1).fill(0).map(() => Array(budget + 1).fill(false));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= budget; w++) {
            if (dataset[i - 1].price <= w) {
                if (dataset[i - 1].price + dp[i - 1][w - dataset[i - 1].price] > dp[i - 1][w]) {
                    dp[i][w] = dataset[i - 1].price + dp[i - 1][w - dataset[i - 1].price];
                    keep[i][w] = true;
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let w = budget;
    const selecteddataset = [];
    for (let i = n; i > 0; i--) {
        if (keep[i][w]) {
            selecteddataset.push(dataset[i - 1]);
            w -= dataset[i - 1].price;
        }
    }

    return selecteddataset;
};

const BestCombination = () => {
    const [budget, setBudget] = useState('');
    const [bestCombination, setBestCombination] = useState([]);

     //* Maneja la búsqueda de la mejor combinación de productos
    const handleFindCombination = () => {
        const budgetValue = parseInt(budget, 10);
        if (!isNaN(budgetValue)) {
            const combination = findBestCombination(dataset, budgetValue);
            setBestCombination(combination);
        }
    };

    //* Maneja la limpieza del presupuesto y la combinación de productos
    const handleClear = () => {
        setBudget('');
        setBestCombination([]);
    };

    return (
        <div>
            <h2>Encuentra la Mejor Combinación de Productos</h2>
            <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ingresa tu presupuesto"
            />
            <button onClick={handleFindCombination}>Buscar</button>
            <button onClick={handleClear}>Limpiar</button>
            {bestCombination.length > 0 && (
                <div>
                <h3>Mejor Combinación</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestCombination.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total: ${bestCombination.reduce((sum, product) => sum + product.price, 0)}</p>
            </div>
            )}
        </div>
    );
};

export default BestCombination;
