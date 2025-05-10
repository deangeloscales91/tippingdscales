import React, { useState } from 'react';

const sampleBusinesses = [
  { name: "Paul's Deli", category: 'Food' },
  { name: 'Colonial Gifts', category: 'Shopping' },
  { name: 'Busch Gardens', category: 'Attractions' }
];

export default function App() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All'
    ? sampleBusinesses
    : sampleBusinesses.filter(b => b.category === category);

  return (
    <div>
      <h1>Business Directory</h1>
      <div>
        <label>Filter by Category: </label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Attractions">Attractions</option>
        </select>
      </div>
      <ul>
        {filtered.map((b, i) => (
          <li key={i}>{b.name} - {b.category}</li>
        ))}
      </ul>
    </div>
  );
}
