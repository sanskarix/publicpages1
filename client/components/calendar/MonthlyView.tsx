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
  
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-heading">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0 hover:bg-grey-container"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0 hover:bg-grey-container"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div key={day} className="text-center py-2 text-xs font-medium text-secondary-text">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
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

      {/* Time Slots */}
      {selectedDate && (
        <div className="border-t border-grey-container pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-heading">
              Thursday, July {selectedDate}, 2025
            </h4>
            <div className="flex gap-2 text-sm text-secondary-text">
              <span>Overlay my calendar</span>
              <div className="flex gap-1">
                <button className="w-4 h-4 border border-grey-container rounded"></button>
                <button className="w-4 h-4 border border-grey-container rounded"></button>
                <button className="w-4 h-4 border border-grey-container rounded"></button>
                <button className="w-4 h-4 border border-grey-container rounded"></button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant="outline"
                size="sm"
                onClick={() => handleTimeSelect(time)}
                className={`transition-all duration-200 ${
                  selectedTime === time
                    ? "bg-accent text-white border-accent hover:bg-accent/90 animate-pulse"
                    : "border-grey-container hover:border-accent/50 hover:bg-grey-container/50 hover:scale-105"
                }`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
