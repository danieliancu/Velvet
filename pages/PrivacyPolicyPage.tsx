
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyPageLayout title="Privacy Policy">
      <p className="text-lg text-gray-200">Velvet Drivers Limited is committed to protecting your privacy and complying with UK GDPR and the Data Protection Act 2018.</p>
      <p>This Privacy Policy explains how we collect, use, store, share and protect your personal data when you visit velvetdrivers.co.uk, velvetdrivers.com or use our services.</p>

      <PolicySection title="1. Who We Are">
        <p>Velvet Drivers Limited</p>
        <p>19 Pinewood Avenue, Uxbridge UB8 3LW</p>
        <p>Email: <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a></p>
        <p>Data Controller: Velvet Drivers Limited</p>
      </PolicySection>

      <PolicySection title="2. Data We Collect">
        <p>We collect the following information:</p>
        <PolicyList items={[
          "Passenger name, email, phone number.",
          "Pickup and drop-off locations, journey details.",
          "Payment details and communication history.",
          "Device information, IP address, cookies and browser data.",
          "Driver data for vetting and allocation purposes."
        ]} />
      </PolicySection>

      <PolicySection title="3. How We Use Your Data">
        <p>We use your data for the following purposes:</p>
        <PolicyList items={[
          "To process booking requests submitted online.",
          "To call passengers to confirm bookings (TfL requirement).",
          "To assign licensed drivers.",
          "To send driver arrival SMS messages.",
          "To maintain booking records for 12 months (required by TfL).",
          "To comply with legal and regulatory obligations.",
          "To contact you regarding your journey or our services."
        ]} />
      </PolicySection>
      
      <PolicySection title="4. Sharing Your Data">
        <p>We share relevant booking data only with:</p>
        <PolicyList items={[
          "The assigned driver.",
          "TfL (upon request).",
          "Law enforcement when required.",
          "Payment processors.",
          "IT system providers.",
        ]} />
        <p className="font-bold">We do NOT sell your data.</p>
      </PolicySection>
      
      <PolicySection title="5. Data Retention">
        <p>We retain booking records for at least 12 months as required by TfL regulations.</p>
      </PolicySection>
      
      <PolicySection title="6. Your Rights">
        <p>You may request access, correction, deletion, restriction or portability of your personal data.</p>
        <p>To exercise your rights, please contact us at: <a href="mailto:info@velvetdrivers.co.uk" className="text-amber-400 hover:underline">info@velvetdrivers.co.uk</a></p>
      </PolicySection>

    </PolicyPageLayout>
  );
};

export default PrivacyPolicyPage;
