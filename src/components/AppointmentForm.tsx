
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface AppointmentFormProps {
  doctorName: string;
  doctorImage: string;
  appointmentTime: string;
  onBack: () => void;
  onSubmit: (reason: string) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctorName,
  doctorImage,
  appointmentTime,
  onBack,
  onSubmit
}) => {
  const [reason, setReason] = useState('I have been experiencing persistent headaches for several days, and they do not improve with over-the-counter pain relievers.');

  return (
    <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white text-lg font-semibold">Schedule Your Appointment</h2>
      </div>

      <div className="bg-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-600 text-sm mb-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">i</span>
          </div>
          <span>If you do not attend the consultation, it will be cancelled 10 minutes after it starts, and no refund will be provided.</span>
        </div>
      </div>

      <div className="bg-blue-500 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={doctorImage}
            alt={doctorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{doctorName}</h3>
            <p className="text-blue-200 text-sm">General practitioners</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-white font-semibold">{appointmentTime}</p>
            <p className="text-blue-200 text-sm">30.05.25</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-3">Describe a reason for visit</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-lg resize-none"
          rows={4}
          placeholder="Describe your symptoms or reason for the visit..."
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold">80,00 USD</span>
        <span className="text-sm text-gray-500">12:30 PM, 09.05.25</span>
      </div>

      <button
        onClick={() => onSubmit(reason)}
        className="w-full py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
      >
        Book now
      </button>
    </div>
  );
};
