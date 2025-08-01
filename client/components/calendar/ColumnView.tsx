import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ColumnViewProps {
  onTimeSelect: (date: Date, time: string) => void;
}

const timeSlots = [
  "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00"
];

export function ColumnView({ onTimeSelect }: ColumnViewProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const selectedDate = new Date(2025, 6, 31); // July 31, 2025

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(selectedDate, time);
  };

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-heading mb-2">
          Thursday, July 31, 2025
        </h3>
        <p className="text-secondary-text text-sm">
          Select a time slot below
        </p>
      </div>

      {/* Time Slots in Column */}
      <div className="max-w-md mx-auto space-y-3">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant="outline"
            onClick={() => handleTimeSelect(time)}
            className={`w-full justify-center py-3 text-base ${
              selectedTime === time
                ? "bg-accent text-white border-accent hover:bg-accent/90"
                : "border-grey-container hover:border-accent/50 hover:bg-grey-container/50 text-body-text"
            }`}
          >
            {time}
          </Button>
        ))}
      </div>

      {/* Overlay calendar controls */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-secondary-text">
          <span>Overlay my calendar</span>
          <div className="flex gap-1">
            <button className="w-4 h-4 border border-grey-container rounded hover:border-accent/50 transition-colors"></button>
            <button className="w-4 h-4 border border-grey-container rounded hover:border-accent/50 transition-colors"></button>
            <button className="w-4 h-4 border border-grey-container rounded hover:border-accent/50 transition-colors"></button>
            <button className="w-4 h-4 border border-grey-container rounded hover:border-accent/50 transition-colors"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
