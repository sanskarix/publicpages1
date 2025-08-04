import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthlyViewProps {
  onTimeSelect: (date: Date, time: string) => void;
  onConfirm: () => void;
}

const timeSlots12h = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
];

export function MonthlyView({ onTimeSelect, onConfirm }: MonthlyViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.getDate());
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
      ),
    );
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
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        selectedDate,
      );
      onTimeSelect(date, time);
    }
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-heading">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="h-7 w-7 p-0 hover:bg-grey-container"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="h-7 w-7 p-0 hover:bg-grey-container"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-container rounded-lg overflow-hidden">
          {dayNames.map((day) => (
            <div
              key={day}
              className="bg-white text-center py-2 text-xs font-medium text-secondary-text"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="bg-white h-10">
              {day && (
                <Button
                  variant="ghost"
                  className={`w-full h-full text-sm hover:bg-grey-container transition-colors ${
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
      <div className="w-48 animate-in slide-in-from-right-8 duration-300">
        <div className="bg-white border border-grey-container rounded-lg p-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-heading">
              {selectedDate
                ? `${dayNames[new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).getDay()]} ${selectedDate}`
                : "Select a date"}
            </h4>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1 animate-in fade-in-50 duration-300">
            {timeSlots12h.map((time, index) => (
              <Button
                key={time}
                variant="ghost"
                size="sm"
                onClick={() => handleTimeSelect(time)}
                className={`w-full justify-start text-xs h-8 transition-all duration-200 animate-in slide-in-from-right-4 ${
                  selectedTime === time
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "hover:bg-grey-container text-body-text"
                }`}
                style={{ animationDelay: `${index * 20}ms` }}
              >
                {time}
              </Button>
            ))}
          </div>
          {selectedTime && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <div className="border-t border-grey-container my-2"></div>
              <Button
                onClick={onConfirm}
                className="w-full bg-accent hover:bg-accent/90 text-white mt-2"
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
