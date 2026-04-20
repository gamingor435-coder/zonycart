"use client";
import { useState } from 'react';
import { client } from '@/sanity/lib/client'; // Sanity client import kiya

export default function ProductReviews({ productId }: { productId: string }) {
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return alert("Please fill all fields");

    setIsSubmitting(true);

    try {
      // Sanity Studio mein data bhejte waqt ye format zaroori hai
      await client.create({
        _type: 'review',
        product: {
          _type: 'reference',
          _ref: productId, // Kis product ka review hai
        },
        userName: newName,
        rating: newRating,
        comment: newComment,
      });

      alert("Review Sanity Studio mein bhej diya gaya!");
      setNewName('');
      setNewComment('');
      setNewRating(5);
    } catch (err) {
      console.error("Sanity Error:", err);
      alert("Error: Token ya permissions ka masla ho sakta hai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Customer Reviews</h2>

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>Write a Review</h4>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input 
            type="text" placeholder="Your Name" value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <select 
            value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <textarea 
          placeholder="Share your experience..." value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', height: '80px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? '#ccc' : '#131921', 
            color: '#fff', padding: '10px 20px', border: 'none', 
            borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer' 
          }}
        >
          {isSubmitting ? 'Sending...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}