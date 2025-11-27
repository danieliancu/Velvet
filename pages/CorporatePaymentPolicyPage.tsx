import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const CorporatePaymentPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Corporate Payment Policy (14 Days)">
      <PolicySection title="Accepted Payments">
        <PolicyList
          items={[
            'Bank transfer, card, online link, or driver (pre-booked only).',
            'Monthly consolidated invoices are available.',
          ]}
        />
      </PolicySection>

      <PolicySection title="Booking & Invoicing">
        <PolicyList
          items={[
            'Each trip must remain individually pre-booked.',
            'Itemised invoices include passenger, date, pickup, destination, and fare.',
          ]}
        />
      </PolicySection>

      <PolicySection title="Payment Terms">
        <PolicyList
          items={[
            'Payment due within 14 days.',
            'Late fees may apply.',
            'Drivers must report all funds immediately.',
            'Records are stored for 12 months.',
          ]}
        />
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default CorporatePaymentPolicyPage;
