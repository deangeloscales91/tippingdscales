import React, { useState, useEffect } from 'react';

const defaultBusinesses = [
  { name: "Paul's Deli", category: 'Food', visits: 0, points: 0 },
  { name: 'Colonial Gifts', category: 'Shopping', visits: 0, points: 0 },
  { name: 'Busch Gardens', category: 'Attractions', visits: 0, points: 0 }
];

export default function App() {
  const [category, setCategory] = useState('All');
  const [businesses, setBusinesses] = useState([]);
  const [entry, setEntry] = useState('');
  const [guestbook, setGuestbook] = useState([]);
  const [redemptions, setRedemptions] = useState([]);

  useEffect(() => {
    const savedBusinesses = localStorage.getItem('businesses');
    const savedGuests = localStorage.getItem('guestbook');
    const savedRedemptions = localStorage.getItem('redemptions');

    setBusinesses(savedBusinesses ? JSON.parse(savedBusinesses) : defaultBusinesses);
    setGuestbook(savedGuests ? JSON.parse(savedGuests) : []);
    setRedemptions(savedRedemptions ? JSON.parse(savedRedemptions) : []);
  }, []);

  useEffect(() => {
    if (businesses.length > 0) {
      localStorage.setItem('businesses', JSON.stringify(businesses));
    }
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('guestbook', JSON.stringify(guestbook));
  }, [guestbook]);

  useEffect(() => {
    localStorage.setItem('redemptions', JSON.stringify(redemptions));
  }, [redemptions]);

  const getTier = (points) => {
    if (points >= 50) return 'Gold';
    if (points >= 25) return 'Silver';
    return 'Bronze';
  };

  const handleVisit = (index) => {
    const updated = [...businesses];
    updated[index].visits += 1;
    updated[index].points += 5;
    setBusinesses(updated);
  };

  const handleResetVisits = () => {
    const reset = businesses.map(b => ({ ...b, visits: 0, points: 0 }));
    setBusinesses(reset);
    setRedemptions([]);
    localStorage.setItem('businesses', JSON.stringify(reset));
    localStorage.setItem('redemptions', JSON.stringify([]));
  };

  const handleRedeem = (index) => {
    const updated = [...businesses];
    if (updated[index].points < 25) {
      alert("Not enough points to redeem a reward. You need at least 25.");
      return;
    }

    updated[index].points -= 25;
    setBusinesses(updated);

    const newRedemption = {
      business: updated[index].name,
      date: new Date().toLocaleString(),
      points: 25
    };

    setRedemptions([newRedemption, ...redemptions]);
    alert(`You redeemed 25 points at ${updated[index].name}! 🎉`);
  };

  const handleGuestbookSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    const newEntry = { message: entry.trim(), date: new Date().toLocaleString() };
    setGuestbook([newEntry, ...guestbook]);
    setEntry('');
  };

  const filtered
