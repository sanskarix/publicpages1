import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { MonthlyView } from "@/components/calendar/MonthlyView";
import { WeeklyView } from "@/components/calendar/WeeklyView";

type ViewType = "monthly" | "weekly";

const eventTypes = {
  "product-hunt-chats": {
    title: "Product Hunt Chats",
    description:
      "The essence of Product Hunt reflects in communities. Select a time suitable for you, and let's talk products!",
    duration: "15m",
    color: "bg-green-100 text-green-700",
  },
  interviews: {
    title: "Interviews",
    description:
      "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    duration: "30m",
    color: "bg-blue-100 text-blue-700",
  },
  "product-demo": {
    title: "Product Demo",
    description:
      "Product innovation in action! Reserve a time for a personalized demo of our next-gen scheduler.",
    duration: "30m",
    color: "bg-purple-100 text-purple-700",
  },
  "everything-else": {
    title: "Everything Else",
    description:
      "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 😊",
    duration: "15m",
    color: "bg-orange-100 text-orange-700",
  },
  "recurring-event": {
    title: "Recurring Event",
    description: "Testing out the Recurring Meetup",
    duration: "15m",
    color: "bg-pink-100 text-pink-700",
  },
};

export default function BookingCalendar() {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedView, setSelectedView] = useState<ViewType>("monthly");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("15m");

  const eventType = eventId
    ? eventTypes[eventId as keyof typeof eventTypes]
    : null;

  if (!eventType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-heading mb-4">
            Event not found
          </h1>
          <Link to="/" className="text-accent hover:underline">
            Return to profile
          </Link>
        </div>
      </div>
    );
  }

  const handleTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleBookingConfirm = () => {
    if (selectedDate && selectedTime && eventId) {
      window.location.href = `/book/${eventId}/form?date=${selectedDate.toISOString()}&time=${selectedTime}`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-6 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-body-text" />
            </Link>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="Sanskar Yadav"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-semibold text-heading">
                  Sanskar Yadav
                </h1>
              </div>
            </div>
          </div>
          <div className="flex gap-1 bg-grey-container rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedView("monthly")}
              className={
                selectedView === "monthly"
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "text-secondary-text hover:text-body-text"
              }
            >
              Monthly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedView("weekly")}
              className={
                selectedView === "weekly"
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "text-secondary-text hover:text-body-text"
              }
            >
              Weekly
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-container sticky top-8">
              <h2 className="text-xl font-semibold text-heading mb-3">
                {eventType.title}
              </h2>
              <p className="text-body-text text-sm mb-6 leading-relaxed">
                {eventType.description}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-secondary-text mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["15m", "30m", "45m", "60m"].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          selectedDuration === duration
                            ? "bg-accent text-white"
                            : "bg-grey-container text-body-text hover:bg-grey-container/80"
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-secondary-text">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Google Meet</span>
                </div>
                <div className="flex items-center gap-3 text-secondary-text">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">AeroKokata</span>
                </div>
              </div>
              {selectedDate && selectedTime && (
                <div className="mt-6 pt-6 border-t border-grey-container">
                  <h3 className="font-medium text-heading mb-3">
                    Selected Time
                  </h3>
                  <div className="bg-grey-container rounded-lg p-3 mb-0">
                    <p className="text-sm text-body-text">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm font-medium text-heading">
                      {selectedTime}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 relative">
            <div className="bg-white rounded-lg shadow-sm border border-grey-container">
              <div className="p-4">
                {selectedView === "monthly" && (
                  <MonthlyView
                    onTimeSelect={handleTimeSelect}
                    onConfirm={handleBookingConfirm}
                  />
                )}
                {selectedView === "weekly" && (
                  <WeeklyView
                    onTimeSelect={handleTimeSelect}
                    onConfirm={handleBookingConfirm}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-accent font-medium">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">O</span>
            </div>
            OneHash
          </div>
        </div>
      </div>
    </div>
  );
}
