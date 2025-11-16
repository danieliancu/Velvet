
import React, { useState } from 'react';
import DashboardInput from '../../components/DashboardInput';
import DashboardSelect from '../../components/DashboardSelect';
import { Star } from 'lucide-react';
import type { Journey } from '../../types';
import { useAlert } from '../../components/AlertProvider';

interface ClientReviewProps {
  isGuest?: boolean;
  completedJourneys?: Journey[];
}

const ClientReview: React.FC<ClientReviewProps> = ({ isGuest = false, completedJourneys = [] }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { showAlert } = useAlert();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert(`Thank you for your ${rating}-star review!`);
    // Here you would typically handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isGuest ? (
        <DashboardInput id="booking-ref-review" label="Booking Reference or Date of Journey" type="text" required />
      ) : (
        <DashboardSelect id="booking-ref-review" label="Your Bookings" required>
          <option value="" disabled className="bg-gray-900 text-white">Select a completed journey to review</option>
          {completedJourneys.map(journey => (
            <option key={journey.id} value={journey.id} className="bg-gray-900 text-white">
              {journey.date} - {journey.pickup} to {journey.destination.split(',')[0]}
            </option>
          ))}
        </DashboardSelect>
      )}
      
      <div>
        <label className="block text-xs font-semibold text-amber-200/70 uppercase tracking-wider mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer transition-colors ${
                (hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-600'
              }`}
              fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-details" className="block text-xs font-semibold text-amber-200/70 uppercase tracking-wider mb-2">
          Review
        </label>
        <textarea
          id="review-details"
          rows={5}
          className="w-full bg-gray-900 border border-amber-900/60 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Share your experience..."
        />
      </div>
      <div className="pt-2 flex justify-start">
        <button type="submit" className="px-10 py-2.5 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ClientReview;
