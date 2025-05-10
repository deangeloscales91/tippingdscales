
import React, { useState } from 'react';

const sampleBusinesses = [
  { name: "Paul's Deli", category: "Restaurant" },
  { name: "Colonial Gifts", category: "Shop" },
  { name: "Busch Gardens", category: "Attraction" },
];

export default function App() {
  const [category, setCategory] = useState('All');
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [entry, setEntry] = useState({ name: '', comment: '', photo: '' });

  const filtered = category === 'All'
    ? sampleBusinesses
    : sampleBusinesses.filter(b => b.category === category);

  const submitGuestbook = (e) => {
    e.preventDefault();
    if (entry.name && entry.comment) {
      setGuestbookEntries([entry, ...guestbookEntries]);
      setEntry({ name: '', comment: '', photo: '' });
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>TippingDSCales: Keys to the City</h1>

      {/* Business Filter */}
      <section>
        <h2>Explore Businesses</h2>
        <div>
          {['All', 'Restaurant', 'Shop', 'Attraction'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ marginRight: '1rem' }}>
              {cat}
            </button>
          ))}
        </div>
        <ul>
          {filtered.map((biz, i) => (
            <li key={i}>{biz.name} – <i>{biz.category}</i></li>
          ))}
        </ul>
      </section>

      {/* Loyalty Rewards */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Loyalty Rewards</h2>
        <p>🎉 Earn points for visiting businesses! Redeem for merch and discounts.</p>
        <p>Your current level: <strong>Bronze</strong> (0 pts)</p>
      </section>

      {/* Guestbook */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Community Guestbook</h2>
        <form onSubmit={submitGuestbook}>
          <input
            placeholder="Your Name"
            value={entry.name}
            onChange={e => setEntry({ ...entry, name: e.target.value })}
            required
          />
          <br />
          <textarea
            placeholder="Leave a comment..."
            value={entry.comment}
            onChange={e => setEntry({ ...entry, comment: e.target.value })}
            required
          />
          <br />
          <input
            placeholder="Optional photo URL"
            value={entry.photo}
            onChange={e => setEntry({ ...entry, photo: e.target.value })}
          />
          <br />
          <button type="submit">Post</button>
        </form>
        <ul>
          {guestbookEntries.map((e, i) => (
            <li key={i}>
              <strong>{e.name}</strong>: {e.comment}
              {e.photo && <div><img src={e.photo} alt="guest" width="100" /></div>}
            </li>
          ))}
        </ul>
      </section>

      {/* Ad Submission */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Promote With Us</h2>
        <form>
          <input placeholder="Business Name" required /><br />
          <input placeholder="Contact Email" required /><br />
          <input placeholder="Logo or Ad Image URL" /><br />
          <textarea placeholder="Ad details or special message"></textarea><br />
          <button>Submit Ad Details</button>
        </form>
        <br />
        <button>Buy Website Ad Space</button>
        <button>Buy Card Ad Space</button>
      </section>

      {/* Discounts */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Exclusive Discounts</h2>
        <p>Use your souvenir card to unlock 10–25% off local favorites.</p>
      </section>
    </div>
  );
}
