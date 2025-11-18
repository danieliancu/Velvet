import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const LostPropertyPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Lost Property Policy">
      <p>This policy explains how Velvet Drivers Limited handles lost property in line with TfL expectations.</p>

      <PolicySection title="1. Driver Responsibilities">
        <PolicyList
          items={[
            'Drivers must check their vehicles at the end of every journey and report found items to Velvet Drivers Limited immediately.',
            'All items are logged with date, time, vehicle, and item description and stored securely for up to 12 months.'
          ]}
        />
      </PolicySection>

      <PolicySection title="2. Passenger Collection">
        <PolicyList
          items={[
            'Passengers must present ID and accurately describe the item to collect it.',
            'Unclaimed valuables may be handed to the police after the retention period.'
          ]}
        />
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default LostPropertyPolicyPage;
