
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const SafetyPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Passenger Safety Policy">
      <p>Your safety is our highest priority. Velvet Drivers Limited is committed to providing a secure and reliable service. We ensure the following standards are met for every journey.</p>
      
      <PolicySection title="1. Licensed Drivers & Vehicles">
        <PolicyList items={[
          "All drivers are licensed by Transport for London (TfL). This includes a full DBS background check.",
          "All vehicles are PHV-licensed and undergo regular roadworthiness inspections (MOT)."
        ]} />
      </PolicySection>
      
      <PolicySection title="2. Pre-Booked Journeys Only">
        <p>We only accept pre-booked journeys through our official platform. Our drivers are not permitted to accept street hails. This ensures that every journey is logged and tracked.</p>
      </PolicySection>

      <PolicySection title="3. Secure Records">
        <p>All booking records are securely maintained in compliance with TfL and data protection regulations. This includes passenger, journey, and driver details.</p>
      </PolicySection>

      <PolicySection title="4. Professional Conduct">
        <p>Our drivers are expected to maintain the highest standards of professionalism, ensuring a comfortable and safe environment for all passengers.</p>
      </PolicySection>
      
    </PolicyPageLayout>
  );
};

export default SafetyPolicyPage;
