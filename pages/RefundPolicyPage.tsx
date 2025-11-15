
import React from 'react';
import PolicyPageLayout, { PolicySection } from '../components/PolicyPageLayout';

const RefundPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Refund & Cancellation Policy">
      
      <PolicySection title="1. Cancellation">
        <p>We offer free cancellation for all bookings up to 1 hour before the scheduled pickup time.</p>
        <p>Late cancellations (within 1 hour of pickup) or no-shows may incur charges, which could be up to the full fare of the journey.</p>
      </PolicySection>
      
      <PolicySection title="2. Refunds">
        <p>Refunds for prepaid journeys that are cancelled in accordance with our policy are issued within 5-7 business days.</p>
        <p>The refund will be processed back to the original method of payment.</p>
      </PolicySection>

      <PolicySection title="3. Disputes">
        <p>If you have any questions or wish to dispute a charge, please contact our support team at <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a>.</p>
      </PolicySection>
      
    </PolicyPageLayout>
  );
};

export default RefundPolicyPage;
