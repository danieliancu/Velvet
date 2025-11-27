import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const CorporatePoliciesPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Corporate Policies">
      <PolicySection title="Corporate Account Terms">
        <PolicyList
          items={[
            'Accounts available to registered businesses.',
            'All journeys must be pre-booked.',
            'Fares set by operator; extras may apply.',
            'Cancellations subject to the Cancellation & Refund Policy.',
            'Operator not liable for delays outside control.',
            'Data processed under GDPR.',
          ]}
        />
      </PolicySection>

      <PolicySection title="Corporate Payment Policy (14 Days)">
        <PolicyList
          items={[
            'Accepted payments: bank transfer, card, online link, or driver (pre-booked only).',
            'Monthly consolidated invoices available.',
            'Each trip must remain individually pre-booked.',
            'Itemised invoices include passenger, date, pickup, destination, and fare.',
            'Payment due within 14 days; late fees may apply.',
            'Drivers must report all funds immediately.',
            'Records stored for 12 months.',
          ]}
        />
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default CorporatePoliciesPage;
