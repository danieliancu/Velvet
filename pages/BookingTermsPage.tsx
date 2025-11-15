
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const BookingTermsPage: React.FC = () => {
  return (
    <PolicyPageLayout title="TfL Booking Terms">
      <p>These terms are in compliance with Transport for London (TfL) regulations for Private Hire Vehicle (PHV) operators.</p>
      
      <PolicySection title="1. Booking Confirmation">
        <p className="font-bold">A booking is only confirmed once Velvet Drivers Limited calls you to confirm after receiving your online request.</p>
        <p>This is a mandatory step to ensure all journey details are correct and comply with regulations.</p>
      </PolicySection>

      <PolicySection title="2. Record Keeping">
        <p>We record and maintain the following booking information for a minimum of 12 months, as required by TfL:</p>
        <PolicyList items={[
          "Passenger name and contact details.",
          "Pickup and destination addresses.",
          "Date and time of the booking.",
          "Driver's name, vehicle details, and contact information.",
          "Confirmation details."
        ]} />
        <p>This information is stored securely and is only shared in accordance with our Privacy Policy and legal requirements.</p>
      </PolicySection>
      
    </PolicyPageLayout>
  );
};

export default BookingTermsPage;
