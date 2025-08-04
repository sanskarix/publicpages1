import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

const eventTypes = {
  "product-hunt-chats": {
    title: "Product Hunt Chats",
    duration: "15m"
  },
  "interviews": {
    title: "Interviews",
    duration: "30m"
  },
  "product-demo": {
    title: "Product Demo",
    duration: "30m"
  },
  "everything-else": {
    title: "Everything Else",
    duration: "15m"
  },
  "recurring-event": {
    title: "Recurring Event",
    duration: "15m"
  }
};

export default function BookingConfirmation() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();

  const eventType = eventId ? eventTypes[eventId as keyof typeof eventTypes] : null;
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");
  const nameParam = searchParams.get("name");
  const emailParam = searchParams.get("email");

  const selectedDate = dateParam ? new Date(dateParam) : null;

  if (!eventType || !selectedDate || !timeParam || !nameParam || !emailParam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-heading mb-4">Invalid confirmation link</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to profile
          </Link>
        </div>
      </div>
    );
  }

  const endTime = (() => {
    const [hours, minutes] = timeParam.split(':').map(Number);
    const duration = parseInt(eventType.duration);
    const endTime = new Date();
    endTime.setHours(hours, minutes + duration);
    return endTime.toTimeString().slice(0, 5);
  })();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-grey-container/50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-body-text" />
          </Link>
          <span className="text-sm text-secondary-text">Back to bookings</span>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl p-10 shadow-xl border border-grey-container text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-8 animate-in zoom-in-95 duration-700 delay-300">
            <Check className="w-10 h-10 text-green-600 animate-in zoom-in-50 duration-500 delay-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-heading mb-4">
            Meeting Scheduled!
          </h1>

          <p className="text-body-text mb-10 leading-relaxed text-lg">
            A calendar invite has been sent to all participants.
          </p>

          {/* Meeting Details */}
          <div className="space-y-6 text-left bg-gradient-to-br from-grey-container/30 to-grey-container/10 rounded-xl p-6 mb-8">
            {/* Meeting Title */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-secondary-text mb-1">Meeting Title</h3>
                <p className="font-semibold text-heading text-lg">
                  {eventType.title}
                </p>
                <p className="text-sm text-body-text mt-1">
                  with Sanskar Yadav and {nameParam}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-secondary-text mb-1">Time</h3>
                <p className="font-semibold text-heading">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
                <p className="text-sm text-body-text">
                  {timeParam} - {endTime} (India Standard Time)
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-secondary-text mb-1">Location</h3>
                <p className="font-semibold text-heading flex items-center gap-2">
                  Google Meet
                </p>
                <p className="text-sm text-body-text">
                  Meeting link will be shared via email
                </p>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-secondary-text mb-3 text-left">Participants</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-grey-container/30 rounded-lg p-3">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  S
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-heading">Sanskar Yadav</p>
                  <p className="text-xs text-secondary-text">sanskar@gmail.com</p>
                </div>
                <span className="text-xs text-accent font-medium">Host</span>
              </div>
              <div className="flex items-center gap-3 bg-grey-container/30 rounded-lg p-3">
                <div className="w-8 h-8 bg-secondary text-body-text rounded-full flex items-center justify-center text-sm font-bold">
                  {nameParam.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-heading">{nameParam}</p>
                  <p className="text-xs text-secondary-text">{emailParam}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-heading text-left">Add to Calendar</h4>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-grey-container hover:bg-grey-container p-3 h-auto"
                  title="Google Calendar"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="#4285F4"/>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-grey-container hover:bg-grey-container p-3 h-auto"
                  title="Apple Calendar"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#000"/>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-grey-container hover:bg-grey-container p-3 h-auto"
                  title="Outlook"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 9v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2zm8 2v4H9v-4h6z" fill="#0078D4"/>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-grey-container hover:bg-grey-container">
                Reschedule
              </Button>
              <Button variant="outline" className="flex-1 border-grey-container hover:bg-grey-container text-destructive hover:text-destructive">
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
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
