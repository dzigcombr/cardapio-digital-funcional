
import React from 'react';
import { Star } from 'lucide-react';

interface UserDashboardProps {
  userName: string;
  userImage: string;
  consultations: Array<{
    id: string;
    doctorName: string;
    doctorImage: string;
    specialty: string;
    time: string;
    date: string;
    price: number;
    rating: number;
    availableToday: boolean;
    timeSlots: string[];
  }>;
  onBookAppointment: (doctorId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  userName,
  userImage,
  consultations,
  onBookAppointment
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hello, {userName}</h1>
          <p className="text-gray-600">How do you feel today?</p>
        </div>
        <img
          src={userImage}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Consultations</h2>
          <button className="text-blue-500">→</button>
        </div>

        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={consultation.doctorImage}
                    alt={consultation.doctorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{consultation.doctorName}</h3>
                    <p className="text-sm text-gray-600">{consultation.specialty}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{consultation.time}</span>
              </div>

              {consultation.availableToday && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Available appointments for today</p>
                  <div className="flex gap-2">
                    {consultation.timeSlots.slice(0, 3).map((time, index) => (
                      <span key={index} className="px-3 py-1 bg-white rounded-lg text-sm border">
                        {time}
                      </span>
                    ))}
                    <button
                      onClick={() => onBookAppointment(consultation.id)}
                      className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{consultation.price} USD</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{consultation.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
