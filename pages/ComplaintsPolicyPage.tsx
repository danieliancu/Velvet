
import React from 'react';
import PolicyPageLayout, { PolicySection } from '../components/PolicyPageLayout';

const ComplaintsPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Complaints Handling Procedure">
      <p>We investigate every complaint fairly and promptly to meet TfL requirements and maintain service quality.</p>

      <PolicySection title="1. How to Submit a Complaint">
        <p>
          Email <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a> with your booking reference, journey time, driver details, and a clear description of the issue.
        </p>
      </PolicySection>

      <PolicySection title="2. Acknowledgement & Investigation">
        <p>Complaints are acknowledged within 48 hours and investigated by reviewing booking logs, driver notes, and evidence.</p>
      </PolicySection>

      <PolicySection title="3. Response Time">
        <p>A full response is provided within 7–10 working days.</p>
      </PolicySection>

      <PolicySection title="4. Outcomes">
        <p>Outcomes may include refunds, driver retraining, warnings, suspension, or reporting to TfL.</p>
      </PolicySection>

      <PolicySection title="5. Escalation">
        <p>
          If you wish to escalate, contact TfL at <a href="mailto:tph.complaints@tfl.gov.uk" className="text-amber-400 hover:underline">tph.complaints@tfl.gov.uk</a>. Complaints are stored for 12 months.
        </p>
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default ComplaintsPolicyPage;
