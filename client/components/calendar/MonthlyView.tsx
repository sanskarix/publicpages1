import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthlyViewProps {
  onTimeSelect: (date: Date, time: string) => void;
}

const timeSlots = [
  "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00"
];

export function MonthlyView({ onTimeSelect }: MonthlyViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)); // July 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(31);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const days = [];
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1)));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      setSelectedTime(time);
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
      onTimeSelect(date, time);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Calendar */}
      <div className="flex-1">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-heading">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-7 w-7 p-0 hover:bg-grey-container"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-7 w-7 p-0 hover:bg-grey-container"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-grey-container rounded-lg overflow-hidden">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="bg-white text-center py-2 text-xs font-medium text-secondary-text">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => (
            <div key={index} className="bg-white h-10">
              {day && (
                <Button
                  variant="ghost"
                  className={`w-full h-full text-sm hover:bg-grey-container ${
                    selectedDate === day 
                      ? "bg-accent text-white hover:bg-accent/90" 
                      : "text-body-text"
                  }`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time Selector - Right Side */}
      {selectedDate && (
        <div className="w-48 animate-in slide-in-from-right-8 duration-300">
          <div className="bg-white border border-grey-container rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-heading">Thu 31</h4>
              <div className="flex gap-1 text-xs text-secondary-text">
                <span>12h</span>
                <span className="bg-accent text-white px-2 py-0.5 rounded">24h</span>
              </div>
            </div>
            
            <div className="space-y-1">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className={`w-full justify-start text-xs h-8 ${
                    selectedTime === time
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "hover:bg-grey-container text-body-text"
                  }`}
                >
                  {time}
                </Button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-grey-container">
              <div className="flex items-center justify-between text-xs text-secondary-text">
                <span>Overlay my calendar</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 border border-grey-container rounded-sm hover:border-accent/50 cursor-pointer"></div>
                  <div className="w-3 h-3 border border-grey-container rounded-sm hover:border-accent/50 cursor-pointer"></div>
                  <div className="w-3 h-3 border border-grey-container rounded-sm hover:border-accent/50 cursor-pointer"></div>
                  <div className="w-3 h-3 border border-grey-container rounded-sm hover:border-accent/50 cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
