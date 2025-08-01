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
      <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-body-text" />
          </Link>
          <span className="text-sm text-secondary-text">Back to bookings</span>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-container text-center animate-in zoom-in-50 duration-500">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 animate-in zoom-in-95 duration-700 delay-300">
            <Check className="w-8 h-8 text-green-600 animate-in zoom-in-50 duration-500 delay-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-heading mb-4">
            This meeting is scheduled
          </h1>
          
          <p className="text-body-text mb-8 leading-relaxed">
            We sent an email with a calendar invitation with the details to everyone.
          </p>

          {/* Meeting Details */}
          <div className="space-y-6 text-left bg-grey-container/30 rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-secondary-text">What</div>
              <div className="flex-1">
                <p className="font-medium text-heading">
                  {eventType.title} between Sanskar Yadav and {nameParam}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-secondary-text">When</div>
              <div className="flex-1">
                <p className="font-medium text-heading">
                  {selectedDate.toLocaleDateString("en-US", { 
                    weekday: "long", 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </p>
                <p className="text-sm text-secondary-text">
                  {timeParam} - {endTime} (India Standard Time)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-secondary-text">Who</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">Sanskar Yadav</p>
                    <p className="text-xs text-secondary-text">sanskar@gmail.com</p>
                  </div>
                  <span className="text-xs text-secondary-text ml-auto">Host</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-secondary text-body-text rounded-full flex items-center justify-center text-xs font-bold">
                    {nameParam.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">{nameParam}</p>
                    <p className="text-xs text-secondary-text">{emailParam}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 text-sm font-medium text-secondary-text">Where</div>
              <div className="flex-1">
                <p className="font-medium text-heading flex items-center gap-2">
                  Google Meet 
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.5c0-2 4-3 6-3s6 1 6 3V18z"/>
                  </svg>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <p className="text-sm text-secondary-text">
              Need to make a change?{" "}
              <button className="text-accent hover:underline">Reschedule</button>
              {" "}or{" "}
              <button className="text-accent hover:underline">Cancel</button>
            </p>

            {/* Calendar Integration */}
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" className="border-grey-container hover:bg-grey-container">
                <Calendar className="w-4 h-4 mr-2" />
                Add to calendar
              </Button>
              <Button variant="outline" size="sm" className="border-grey-container hover:bg-grey-container">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                G
              </Button>
              <Button variant="outline" size="sm" className="border-grey-container hover:bg-grey-container">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                O
              </Button>
              <Button variant="outline" size="sm" className="border-grey-container hover:bg-grey-container">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Y
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
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
