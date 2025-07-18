
import React, { useState } from 'react';
import { ChevronLeft, Search, Settings } from 'lucide-react';
import { DoctorCard } from '@/components/DoctorCard';
import { AppointmentCalendar } from '@/components/AppointmentCalendar';
import { AppointmentForm } from '@/components/AppointmentForm';
import { AppointmentConfirmation } from '@/components/AppointmentConfirmation';
import { UserDashboard } from '@/components/UserDashboard';

type Screen = 'doctors' | 'calendar' | 'form' | 'confirmation' | 'dashboard';

const MedicalApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('doctors');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReason, setAppointmentReason] = useState<string>('');

  const doctors = [
    {
      id: '1',
      name: 'Dr.Claire Jenkins',
      rating: 4.9,
      specialty: 'General practitioners',
      price: 80,
      availableToday: true,
      timeSlots: ['12:00 PM', '12:30 PM', '4:20 PM'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Dr. Susanne Moore',
      rating: 5.0,
      specialty: 'General practitioners',
      price: 95,
      availableToday: true,
      timeSlots: ['2:00 PM', '2:30 PM', '3:20 PM'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Dr. Aarav Patel',
      rating: 5.0,
      specialty: 'General practitioners',
      price: 100,
      availableToday: true,
      timeSlots: ['10:00 AM', '11:20 AM', '1:00 PM'],
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      rating: 4.8,
      specialty: 'General practitioners',
      price: 85,
      availableToday: true,
      timeSlots: ['9:00 AM', '10:30 AM', '2:00 PM'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedDoctor(doctor);
    setCurrentScreen('calendar');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCalendarContinue = () => {
    setCurrentScreen('form');
  };

  const handleFormSubmit = (reason: string) => {
    setAppointmentReason(reason);
    setCurrentScreen('confirmation');
  };

  const handleConfirmationDone = () => {
    setCurrentScreen('dashboard');
  };

  const renderHeader = () => {
    switch (currentScreen) {
      case 'doctors':
        return (
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <button>
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-white text-lg font-semibold">General practitioners</h1>
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white"
              />
            </div>
          </div>
        );
      case 'calendar':
      case 'form':
        return (
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentScreen(currentScreen === 'calendar' ? 'doctors' : 'calendar')}>
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-white text-lg font-semibold">Schedule Your Appointment</h1>
              <div className="w-6"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'doctors':
        return (
          <div className="p-6 space-y-4">
            {doctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        );

      case 'calendar':
        return (
          <div className="p-6">
            <AppointmentCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
              onBack={() => setCurrentScreen('doctors')}
              onContinue={handleCalendarContinue}
            />
          </div>
        );

      case 'form':
        return (
          <div className="p-6">
            <AppointmentForm
              doctorName={selectedDoctor?.name || ''}
              doctorImage={selectedDoctor?.image || ''}
              appointmentTime="12:30 PM"
              onBack={() => setCurrentScreen('calendar')}
              onSubmit={handleFormSubmit}
            />
          </div>
        );

      case 'confirmation':
        return (
          <div className="p-6">
            <AppointmentConfirmation
              doctorName={selectedDoctor?.name || ''}
              doctorImage={selectedDoctor?.image || ''}
              appointmentTime="12:30 PM"
              appointmentDate="30 May at 12:30"
              onDone={handleConfirmationDone}
            />
          </div>
        );

      case 'dashboard':
        return (
          <div className="p-6">
            <UserDashboard
              userName="John"
              userImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              consultations={doctors.map(doc => ({
                ...doc,
                time: '2:00 PM',
                date: '11.05.25'
              }))}
              onBookAppointment={handleBookAppointment}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

export default MedicalApp;
