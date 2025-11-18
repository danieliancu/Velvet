
import React from 'react';
import PolicyPageLayout, { PolicySection, PolicyList } from '../components/PolicyPageLayout';

const TermsOfServicePage: React.FC = () => {
  return (
    <PolicyPageLayout title="Passenger Terms & Conditions">
      <p>These Terms and Conditions apply to all passengers using the services of Velvet Drivers Limited.</p>

      <PolicySection title="1. Introduction">
        <p>All journeys must be pre-booked via Velvet Drivers Limited and are confirmed only once we issue a confirmation.</p>
      </PolicySection>

      <PolicySection title="2. Bookings">
        <PolicyList
          items={[
            'Provide accurate passenger and journey information when booking.',
            'Understand that bookings are confirmed only when Velvet Drivers Limited issues a confirmation.',
            'Pre-bookings only; no street hails are permitted.'
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Fares and Payments">
        <PolicyList
          items={[
            'Fares are quoted at booking time or calculated according to tariff.',
            'Extra charges may apply for waiting time, tolls, parking, or passenger-requested changes.',
            'Payments must be made only through approved methods; cash payments directly to drivers outside the system are not permitted.'
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Passenger Conduct">
        <PolicyList
          items={[
            'Passengers must behave safely and respectfully.',
            'Smoking, vaping, aggression, or damaging the vehicle is prohibited.',
            'Cleaning or damage fees may apply where required.'
          ]}
        />
      </PolicySection>

      <PolicySection title="5. Cancellations and No-Shows">
        <PolicyList
          items={[
            'Late cancellations or no-shows may incur charges in accordance with policy.',
            'Waiting time charges may apply if passengers delay departure.'
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Safety">
        <PolicyList
          items={[
            'Seat belts must be worn.',
            'Children must travel with the correct child restraints unless agreed otherwise in advance.'
          ]}
        />
      </PolicySection>

      <PolicySection title="7. Delays and Liability">
        <PolicyList
          items={[
            'Velvet Drivers Limited is not responsible for delays due to traffic, weather, or events outside its control.',
            'The Company is not liable for missed flights or indirect losses unless agreed in writing.'
          ]}
        />
      </PolicySection>

      <PolicySection title="8. Luggage and Property">
        <PolicyList
          items={[
            'Passengers are responsible for their belongings.',
            'Velvet Drivers Limited accepts no liability for lost or damaged property unless due to negligence.',
            'Lost property will be handled according to policy.'
          ]}
        />
      </PolicySection>

      <PolicySection title="9. Data Protection">
        <PolicyList
          items={[
            'Passenger data is processed under GDPR for booking and service delivery only.',
            'Data will not be sold or shared except where necessary for legal or service reasons.'
          ]}
        />
      </PolicySection>

      <PolicySection title="10. Complaints">
        <PolicyList
          items={[
            'Complaints should be submitted in writing to Velvet Drivers Limited.',
            'The Company will investigate fairly and promptly.'
          ]}
        />
      </PolicySection>

      <PolicySection title="11. Governing Law">
        <p>These Terms are governed by the laws of England and Wales.</p>
      </PolicySection>
    </PolicyPageLayout>
  );
};

export default TermsOfServicePage;
