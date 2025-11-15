
import React from 'react';
import PolicyPageLayout, { PolicySection } from '../components/PolicyPageLayout';

const ComplaintsPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Complaints Policy">
      <p>We are committed to providing a high-quality service to all our clients. When something goes wrong, we need you to tell us about it. This will help us to improve our standards.</p>

      <PolicySection title="1. How to Submit a Complaint">
        <p>To submit a complaint, please email us at: <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a>.</p>
        <p>Please include as much detail as possible, including booking references, dates, times, and a full description of the issue.</p>
      </PolicySection>
      
      <PolicySection title="2. Our Process">
        <p>We acknowledge all complaints within 48 hours of receipt.</p>
        <p>We aim to provide a full and considered response within 7-10 working days.</p>
      </PolicySection>

      <PolicySection title="3. Escalation">
        <p>We will do our best to resolve your complaint. However, if you are not satisfied with our final response, you may escalate your complaint to Transport for London (TfL).</p>
        <p>You can contact them at: <a href="mailto:tph.complaints@tfl.gov.uk" className="text-amber-400 hover:underline">tph.complaints@tfl.gov.uk</a></p>
      </PolicySection>
      
    </PolicyPageLayout>
  );
};

export default ComplaintsPolicyPage;
