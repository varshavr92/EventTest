import React, { useState, useEffect } from 'react';
import { Search, Sparkles, MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { eventsAPI } from '../services/api';

/**
 * EventRecommender Component
 * Allows users to search for events and get personalized recommendations
 * based on their search history using embedding-based similarity
 */
const EventRecommender = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Fetch recommendations on component mount
  useEffect(() => {
    if (userId) {
      fetchRecommendations();
      fetchSearchHistory();
    }
  }, [userId]);

  /**
   * Send search query to backend
   * Backend generates embedding and saves search with userId
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Searching for:', searchQuery);

      // POST search to backend
      const response = await fetch('http://localhost:5000/api/recommendations/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          query: searchQuery
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save search');
      }

      const data = await response.json();
      console.log('✅ Search saved with embedding');

      // Clear input
      setSearchQuery('');

      // Fetch updated recommendations
      await fetchRecommendations();
      await fetchSearchHistory();
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to process search');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch personalized recommendations from backend
   */
  const fetchRecommendations = async () => {
    try {
      setSearched(true);

      const response = await fetch(`http://localhost:5000/api/recommendations/${userId}?limit=10`);

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();

      // Backend may return either an array of events or an object { success, recommendations }
      if (Array.isArray(data)) {
        setRecommendations(data || []);
        console.log(`📊 Got ${data.length} recommendations (array response)`);
      } else if (data && data.success) {
        setRecommendations(data.recommendations || []);
        console.log(`📊 Got ${data.recommendations?.length || 0} recommendations (success object)`);
      } else if (data && data.recommendations) {
        // handle cases where backend returns { recommendations: [...] }
        setRecommendations(data.recommendations || []);
        console.log(`📊 Got ${data.recommendations.length} recommendations (recommendations field)`);
      } else {
        setError(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Fetch recommendations error:', err);
      setError(err.message || 'Failed to fetch recommendations');
    }
  };

  /**
   * Fetch user's search history (optional - for display)
   */
  const fetchSearchHistory = async () => {
    try {
      // This would need a backend endpoint to fetch user search history
      // For now, we'll skip this
    } catch (err) {
      console.error('Fetch search history error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-400" size={32} />
            <h1 className="text-4xl font-bold text-white">
              Event Recommender
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Search for events and get personalized recommendations based on your interests
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for events (e.g., 'music concert', 'tech conference')..."
                className="w-full px-6 py-4 bg-gray-800 text-white border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
              <Search className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex gap-3 items-start">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200">{error}</p>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {searched ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles size={28} className="text-blue-400" />
              {recommendations.length > 0
                ? `Recommended Events (${recommendations.length})`
                : 'No Recommendations Yet'}
            </h2>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    similarity={event.similarityScore}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
                <p className="text-gray-400 mb-4">
                  Start searching for events to get personalized recommendations!
                </p>
                <p className="text-gray-500 text-sm">
                  Each search helps us understand your interests better
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

/**
 * EventCard Component
 * Displays individual event with similarity score
 */
const EventCard = ({ event, similarity }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const similarityPercent = Math.round((similarity || 0) * 100);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition group">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="h-48 bg-gray-700 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      )}

      {/* Similarity Badge */}
      {similarity && (
        <div className="absolute top-4 right-4 bg-blue-500/90 px-3 py-1 rounded-full text-white text-sm font-semibold">
          {similarityPercent}% Match
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Category Badge */}
        <div className="mb-4 flex gap-2">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6 text-gray-300 text-sm">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-400" />
            <span>{formattedDate}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" />
            <span className="truncate">{event.venue}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-blue-400" />
            <span>₹{event.ticketPrice}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventRecommender;
