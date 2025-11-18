
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const SafetyPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Passenger Safety Policy">
      <p>Velvet Drivers Limited operates under TfL licensing with zero tolerance for unsafe conduct.</p>

      <PolicySection title="1. Licensed Drivers & Vehicles">
        <PolicyList
          items={[
            'All drivers and vehicles are TfL licensed, insured, and monitored for safety and compliance.',
            'Seat belts are mandatory; drivers must encourage passengers to wear them and ensure safe seating before departure.',
            'Children must travel with appropriate child seats agreed in advance.'
          ]}
        />
      </PolicySection>

      <PolicySection title="2. Pre-Booked Journeys Only">
        <p>All journeys must be pre-booked through Velvet Drivers Limited. No direct bookings or street pickups are allowed.</p>
      </PolicySection>

      <PolicySection title="3. Journey Monitoring & Records">
        <p>All bookings are logged and securely stored, including driver allocation, dispatch times, and journey details.</p>
      </PolicySection>

      <PolicySection title="4. Professional Conduct">
        <p>Drivers must act respectfully, safely, and professionally at all times. There is zero tolerance for misconduct, discrimination, drugs, alcohol, threats, or unsafe driving.</p>
      </PolicySection>

      <PolicySection title="5. Safeguarding & Vulnerable Passengers">
        <PolicyList
          items={[
            'Enhanced care is provided for minors, elderly, disabled, or vulnerable individuals.',
            'Any concerns are escalated in line with safeguarding procedures.'
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Emergency Procedure & Lost Property">
        <PolicyList
          items={[
            'Replacement vehicles arranged where possible; emergencies handled promptly with full incident reporting.',
            'Drivers check vehicles after each journey; items are logged and stored securely for return.',
            'Passengers may email info@velvetdrivers.co.uk to report safety concerns.'
          ]}
        />
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default SafetyPolicyPage;
