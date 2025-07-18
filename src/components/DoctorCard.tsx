
import React from 'react';
import { Star, Heart } from 'lucide-react';

interface DoctorCardProps {
  id: string;
  name: string;
  rating: number;
  specialty: string;
  price: number;
  availableToday: boolean;
  timeSlots: string[];
  image: string;
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  rating,
  specialty,
  price,
  availableToday,
  timeSlots,
  image,
  onBookAppointment
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600">{specialty}</p>
          </div>
        </div>
        <Heart className="w-5 h-5 text-gray-300" />
      </div>

      {availableToday && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">Available appointments for today</p>
          <div className="flex gap-2">
            {timeSlots.slice(0, 3).map((time, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                {time}
              </span>
            ))}
            {timeSlots.length > 3 && (
              <button
                onClick={() => onBookAppointment(id)}
                className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{price} USD</span>
        <button
          onClick={() => onBookAppointment(id)}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
        >
          Book now
        </button>
      </div>
    </div>
  );
};
