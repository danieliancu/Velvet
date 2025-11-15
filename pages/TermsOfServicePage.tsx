
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const TermsOfServicePage: React.FC = () => {
  return (
    <PolicyPageLayout title="Terms of Service">
      <p>By using our website and booking services, you agree to these Terms.</p>
      
      <PolicySection title="1. Booking Process">
        <p>All bookings are placed through the online booking form. Bookings are submitted online.</p>
        <p className="font-bold">A booking is NOT confirmed until Velvet Drivers Limited contacts you via phone to confirm.</p>
      </PolicySection>
      
      <PolicySection title="2. Driver Arrival">
        <p>The assigned driver will send you an SMS when arriving.</p>
      </PolicySection>
      
      <PolicySection title="3. Payments">
        <p>We accept card, cash, bank transfer, invoice and corporate billing.</p>
      </PolicySection>
      
      <PolicySection title="4. Cancellation">
        <p>Free cancellation up to 1 hour before pickup. Late cancellations may incur a fee.</p>
      </PolicySection>
      
      <PolicySection title="5. Passenger Responsibilities">
        <PolicyList items={[
            "Provide accurate information and comply with PHV rules.",
            "Ensure you are available at the pickup point."
        ]} />
      </PolicySection>
      
      <PolicySection title="6. Operator Safety Responsibilities">
        <p>Velvet Drivers Limited has the following responsibilities:</p>
        <PolicyList items={[
            "We dispatch and allocate only TfL-licensed PHV drivers and vehicles.",
            "We ensure booking records are kept for 12 months as required."
        ]} />
      </PolicySection>
      
      <PolicySection title="7. Complaints">
        <p>For any complaints, please contact us at: <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a></p>
      </PolicySection>

    </PolicyPageLayout>
  );
};

export default TermsOfServicePage;
