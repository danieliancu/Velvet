
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const BookingTermsPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Booking & Dispatch Policy">
      <p>All bookings and dispatch activities are managed by Velvet Drivers Limited in line with TfL requirements.</p>

      <PolicySection title="1. Bookings">
        <PolicyList
          items={[
            'Bookings are accepted via phone, website, or email.',
            'All bookings must contain passenger details, pickup time, location, destination, fare estimate, and special requirements.',
            'All journeys must be pre-booked; drivers must not accept street hails.'
          ]}
        />
      </PolicySection>

      <PolicySection title="2. Dispatch & Records">
        <PolicyList
          items={[
            'All journeys are logged with driver allocation, dispatch time, start time, and end time.',
            'Drivers must NOT accept bookings directly or subcontract journeys.',
            'Booking and journey data is stored securely for 12 months for TfL inspection.'
          ]}
        />
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default BookingTermsPage;
