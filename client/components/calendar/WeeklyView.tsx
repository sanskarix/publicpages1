import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface WeeklyViewProps {
  onTimeSelect: (date: Date, time: string) => void;
  onConfirm: () => void;
}

const timeSlots = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export function WeeklyView({ onTimeSelect, onConfirm }: WeeklyViewProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getWeekDays = (startDate: Date) => {
    const days = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newWeek);
    setSelectedSlot(null);
  };

  const formatWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${start.getFullYear()}`;
    }
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    onTimeSelect(date, time);
  };

  const isSlotSelected = (date: Date, time: string) => {
    return (
      selectedSlot?.date.toDateString() === date.toDateString() &&
      selectedSlot?.time === time
    );
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setCurrentWeek(newDate);
    setShowDatePicker(false);
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 text-lg font-medium text-heading hover:text-accent transition-colors"
          >
            {formatWeekRange()}
            <Calendar className="w-4 h-4" />
          </button>
          {showDatePicker && (
            <input
              type="date"
              onChange={handleDateChange}
              className="absolute top-8 left-0 border border-grey-container rounded-md px-2 py-1 text-sm bg-white shadow-lg z-10"
              defaultValue={currentWeek.toISOString().split("T")[0]}
            />
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("prev")}
            className="h-7 w-7 p-0 hover:bg-grey-container"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek("next")}
            className="h-7 w-7 p-0 hover:bg-grey-container"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="border border-grey-container rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 border-b border-grey-container bg-grey-container/20">
          <div className="p-2 text-xs font-medium text-secondary-text"></div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="p-2 text-center border-l border-grey-container"
            >
              <div className="text-xs font-medium text-secondary-text">
                {dayNames[index]}
              </div>
              <div className="text-xs text-body-text mt-1">
                {day.getDate().toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="grid grid-cols-8 border-b border-grey-container last:border-b-0"
            >
              <div className="p-2 text-xs text-secondary-text bg-grey-container/10 border-r border-grey-container">
                {time}
              </div>
              {weekDays.map((day, dayIndex) => (
                <div
                  key={`${day.toDateString()}-${time}`}
                  className="border-l border-grey-container relative h-10"
                >
                  <Button
                    variant="ghost"
                    className={`w-full h-full rounded-none text-xs transition-colors ${
                      isSlotSelected(day, time)
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "hover:bg-accent/10 text-transparent hover:text-body-text"
                    }`}
                    onClick={() => handleTimeSlotClick(day, time)}
                  >
                    {isSlotSelected(day, time) ? time : ""}
                  </Button>
                  {dayIndex === 4 && time === "15:00" && (
                    <div className="absolute inset-0 bg-gray-100 border-l-2 border-gray-300 flex items-center px-2 pointer-events-none">
                      <div className="text-xs text-gray-500 truncate">Busy</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {selectedSlot && (
        <div className="mt-4 animate-in slide-in-from-top-8 duration-500">
          <Button
            onClick={onConfirm}
            className="w-full bg-accent hover:bg-accent/90 text-white"
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
}
