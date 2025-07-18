
import React from 'react';

interface AppointmentConfirmationProps {
  doctorName: string;
  doctorImage: string;
  appointmentTime: string;
  appointmentDate: string;
  onDone: () => void;
}

export const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  doctorName,
  doctorImage,
  appointmentTime,
  appointmentDate,
  onDone
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Appointment is Confirmed!</h2>
        <p className="text-gray-600">
          Your booking has been successfully confirmed. Dr.Claire Jenkins look forward to seeing you on {appointmentDate} at {appointmentTime}.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <img
            src={doctorImage}
            alt={doctorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{doctorName}</h3>
            <p className="text-sm text-gray-600">General practitioners</p>
            <p className="text-sm text-gray-600 mt-1">Available appointments for today</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-white rounded-lg text-sm border">12:00 PM</span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">12:30 PM</span>
              <span className="px-3 py-1 bg-white rounded-lg text-sm border">4:20 PM</span>
              <button className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                →
              </button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">80 USD</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
      >
        Done
      </button>
    </div>
  );
};
