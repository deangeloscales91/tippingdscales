import React, { useState } from 'react';

const sampleBusinesses = [
  { name: 'Paul\'s Deli', category: 'Restaurant' },
  { name: 'Colonial Gifts', category: 'Shop' },
  { name: 'Busch Gardens', category: 'Attraction' },
];

export default function App() {
  const [category, setCategory] = useState('All');
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [entry, setEntry] = useState({ name: '', comment: '', photo: '' });

  const filtered = category === 'All'
    ? sampleBusinesses
    : sampleBusinesses.filter(b => b
