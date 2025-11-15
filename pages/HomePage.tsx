import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { Car, Briefcase, ShieldCheck, Star } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-black/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 hover:border-amber-400/50 transition-all duration-300 ease-in-out">
    <div className="flex items-center gap-4 mb-3">
      <div className="text-amber-400">{icon}</div>
      <h3 className="text-xl font-semibold font-display tracking-wide">{title}</h3>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageShell
      decorations={
        <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vh] bg-red-900/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      }
      mainClassName="flex flex-col items-center justify-center gap-20 pt-32 pb-16"
    >
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-shadow-lg">
          The Finest Drivers in Town
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Experience unparalleled luxury and professionalism. Your journey, our passion.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/client/login')}
            className="w-full sm:w-48 px-8 py-3 text-lg font-semibold bg-transparent border-2 border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          >
            Client
          </button>
          <button
            onClick={() => navigate('/driver/login')}
            className="w-full sm:w-48 px-8 py-3 text-lg font-semibold bg-white/10 border-2 border-white/50 text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Driver
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={<Car size={28} />} title="Luxury Fleet">
            Travel in style with our premium selection of high-end vehicles, ensuring comfort and elegance for every trip.
          </FeatureCard>
          <FeatureCard icon={<Briefcase size={28} />} title="Professional Drivers">
            Our chauffeurs are highly trained, vetted, and committed to providing a discreet and professional service.
          </FeatureCard>
          <FeatureCard icon={<ShieldCheck size={28} />} title="Safety & Reliability">
            Your safety is our priority. We guarantee timely arrivals and a secure journey from start to finish.
          </FeatureCard>
          <FeatureCard icon={<Star size={28} />} title="Bespoke Service">
            Tailored experiences to meet your specific needs, whether for business, leisure, or special occasions.
          </FeatureCard>
        </div>
      </div>
    </PageShell>
  );
};

export default HomePage;
