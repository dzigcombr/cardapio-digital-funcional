
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppointmentCalendarProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBack,
  onContinue
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025

  const timeSlots = [
    '12:00 PM', '12:30 PM', '4:20 PM', '5:30 PM',
    '5:40 PM', '5:50 PM', '6:00 PM', '6:30 PM',
    '6:40 PM', '6:50 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '9:40 PM'
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white text-lg font-semibold">Schedule Your Appointment</h2>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map(day => (
            <div key={`empty-${day}`} className="p-2"></div>
          ))}
          {days.map(day => (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
              className={`p-2 text-center rounded-lg transition-colors ${
                selectedDate?.getDate() === day
                  ? 'bg-blue-500 text-white'
                  : day === 30
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Time</h4>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                selectedTime === time || time === '12:30 PM'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">80,00 USD</span>
        <span className="text-sm text-gray-500">12:30 PM, 09.05.25</span>
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
      >
        Book now
      </button>
    </div>
  );
};
