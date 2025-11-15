
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const DriverHubPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Driver Hub">
      <p>This section outlines the key agreements and policies for self-employed drivers working with Velvet Drivers Limited.</p>

      <PolicySection title="Driver Agreement">
        <p>This agreement outlines terms for self-employed drivers working with Velvet Drivers Limited.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">1. Status</h3>
        <p>The Driver is a self-employed subcontractor.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">2. Requirements</h3>
        <p>The Driver must hold a valid PHV licence, vehicle licence, insurance and MOT.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">3. Conduct</h3>
        <p>Drivers must maintain professionalism, arrive on time, assist with luggage, and comply with TfL rules.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">4. Payments</h3>
        <p>Payment structure will be agreed mutually.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">5. Termination</h3>
        <p>Either party may terminate at any time with reasonable notice.</p>
      </PolicySection>
      
      <div className="my-8 border-t border-amber-400/20"></div>

      <PolicySection title="Data Processing Agreement">
        <p>This agreement governs how drivers handle passenger personal data.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">1. Purpose</h3>
        <p>Drivers receive passenger data only for completing journeys assigned by Velvet Drivers Limited.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">2. Data Usage Rules</h3>
        <PolicyList items={[
          "Data must ONLY be used for the booking.",
          "Data must NOT be stored, copied or shared.",
          "Data must be deleted immediately after the journey."
        ]} />
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">3. Security</h3>
        <p>Drivers must keep all information confidential.</p>
        <h3 className="text-xl font-display font-semibold text-amber-300 mt-4">4. Breach</h3>
        <p>Drivers must report suspected data breaches to <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a> immediately.</p>
      </PolicySection>
      
    </PolicyPageLayout>
  );
};

export default DriverHubPage;
