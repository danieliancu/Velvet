import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import { useAlert } from '../components/AlertProvider';

const steps = ['Account information', 'Your details', 'Your car', 'Bank details'];

const fileFields = Object.freeze({
  yourDetails: [
    { id: 'pcoLicenseDoc', label: 'PCO Licence' },
    { id: 'drivingLicenseFront', label: 'Driving License front' },
    { id: 'drivingLicenseBack', label: 'Driving License back' }
  ],
  carDetails: [
    { id: 'motDoc', label: 'MOT' },
    { id: 'insuranceDoc', label: 'Insurance' },
    { id: 'phvDoc', label: 'PHV Car License' },
    { id: 'logbookDoc', label: 'Logbook V5' }
  ]
} as const);

const DriverSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleFieldChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === 'file'
          ? event.target.files?.[0]?.name ?? ''
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < steps.length) {
      setStep((prev) => prev + 1);
      return;
    }

    showAlert('Application submitted for review. You will be notified via email.');
    navigate('/driver/login');
  };

  const renderYourDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Your details</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input
            id="drivingLicenseNumber"
            label="Driving License No"
            type="text"
            value={formData.drivingLicenseNumber ?? ''}
            onChange={handleFieldChange('drivingLicenseNumber')}
          />
          <Input
            id="pcoLicenseNumber"
            label="PCO Licence No"
            type="text"
            value={formData.pcoLicenseNumber ?? ''}
            onChange={handleFieldChange('pcoLicenseNumber')}
          />
          <Input
            id="pcoExpiry"
            label="PCO Expiry"
            type="date"
            value={formData.pcoExpiry ?? ''}
            onChange={handleFieldChange('pcoExpiry')}
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-400">Upload documents</p>
        <div className="space-y-4">
          {fileFields.yourDetails.map((field) => (
            <div key={field.id} className="space-y-1">
              <p className="text-sm text-gray-300">{field.label}</p>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-400 cursor-pointer"
                >
                  <span>Choose file</span>
                  <span className="text-xs text-gray-200">
                    {formData[field.id] ? 'Ready' : 'Tap to upload'}
                  </span>
                </label>
                <input
                  id={field.id}
                  type="file"
                  className="sr-only"
                  onChange={handleFieldChange(field.id)}
                />
                {formData[field.id] && (
                  <span className="text-xs text-gray-400 truncate">{formData[field.id]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCarDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Your car details</h3>
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <Input
              id="vehicleReg"
              label="Vehicle Reg (VRM)"
              type="text"
              value={formData.vehicleReg ?? ''}
              onChange={handleFieldChange('vehicleReg')}
            />
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-md shadow-md shadow-amber-400/40"
            >
              Find
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Link to DVLA API to find Make and Model.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="make"
              label="Make"
              type="text"
              value={formData.make ?? ''}
              onChange={handleFieldChange('make')}
            />
            <Input
              id="model"
              label="Model"
              type="text"
              value={formData.model ?? ''}
              onChange={handleFieldChange('model')}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-400">Upload documents</p>
        <div className="space-y-4">
          {fileFields.carDetails.map((field) => (
            <div key={field.id} className="space-y-1">
              <p className="text-sm text-gray-300">{field.label}</p>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-400 cursor-pointer"
                >
                  <span>Choose file</span>
                  <span className="text-xs text-gray-200">
                    {formData[field.id] ? 'Ready' : 'Tap to upload'}
                  </span>
                </label>
                <input
                  id={field.id}
                  type="file"
                  className="sr-only"
                  onChange={handleFieldChange(field.id)}
                />
                {formData[field.id] && (
                  <span className="text-xs text-gray-400 truncate">{formData[field.id]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="First Name"
              type="text"
              required
              value={formData.firstName ?? ''}
              onChange={handleFieldChange('firstName')}
            />
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              required
              value={formData.lastName ?? ''}
              onChange={handleFieldChange('lastName')}
            />
          </div>
          <Input
            id="email"
            label="Email Address"
            type="email"
            required
            value={formData.email ?? ''}
            onChange={handleFieldChange('email')}
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            required
            value={formData.phone ?? ''}
            onChange={handleFieldChange('phone')}
          />
          <Input
            id="password"
            label="Create Password"
            type="password"
            required
            value={formData.password ?? ''}
            onChange={handleFieldChange('password')}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword ?? ''}
            onChange={handleFieldChange('confirmPassword')}
          />
          <Input
            id="dvlaCode"
            label="DVLA Check Code"
            type="text"
            required
            value={formData.dvlaCode ?? ''}
            onChange={handleFieldChange('dvlaCode')}
          />
          <p className="text-xs text-gray-500 -mt-4 pb-2">
            Generate a code from the official DVLA website to share your driving licence information.
          </p>
        </>
      );
    }

    if (step === 2) {
      return renderYourDetails();
    }

    if (step === 3) {
      return renderCarDetails();
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Your bank details</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input
            id="bankName"
            label="Bank Name"
            type="text"
            value={formData.bankName ?? ''}
            onChange={handleFieldChange('bankName')}
          />
          <Input
            id="accountName"
            label="Account Name"
            type="text"
            value={formData.accountName ?? ''}
            onChange={handleFieldChange('accountName')}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="sortCode"
              label="Sort Code"
              type="text"
              value={formData.sortCode ?? ''}
              onChange={handleFieldChange('sortCode')}
            />
            <Input
              id="accountNumber"
              label="Account Number"
              type="text"
              value={formData.accountNumber ?? ''}
              onChange={handleFieldChange('accountNumber')}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <FormLayout title="Driver Application">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
            Step {step} of {steps.length}: {steps[step - 1]}
          </p>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>
        {renderStepContent()}
        <div className="flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            type="submit"
            className="px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          >
            {step === steps.length ? 'Submit' : 'Continue'}
          </button>
        </div>
        {step === 1 && (
          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/driver/login" className="font-medium text-amber-400 hover:underline">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </FormLayout>
  );
};

export default DriverSignUpPage;
