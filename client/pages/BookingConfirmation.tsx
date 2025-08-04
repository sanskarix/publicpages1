import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Clock, MapPin, ArrowLeft, Users, Mail } from "lucide-react";

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
          <h1 className="text-2xl font-bold text-heading mb-4">
            Invalid confirmation link
          </h1>
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
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-body-text" />
          </Link>
          <span className="text-sm text-secondary-text">Back to bookings</span>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-white/20 backdrop-blur-sm">
          {/* Success Icon with animated background */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
              <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-in zoom-in-95 duration-700 delay-300">
                <Check className="w-12 h-12 text-green-600 animate-in zoom-in-50 duration-500 delay-500" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-heading mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              You're all set!
            </h1>

            <p className="text-body-text text-lg leading-relaxed max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-300">
              Your meeting has been scheduled and calendar invites have been sent to all participants.
            </p>
          </div>

          {/* Meeting Details Card */}
          <div className="bg-gradient-to-br from-grey-container/30 to-grey-container/10 rounded-2xl p-8 mb-8 animate-in slide-in-from-bottom-8 duration-500 delay-400">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Meeting Title */}
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-secondary-text mb-2 uppercase tracking-wide">
                  Meeting
                </h3>
                <p className="font-semibold text-heading text-lg mb-1">
                  {eventType.title}
                </p>
                <p className="text-sm text-body-text">
                  with Sanskar Yadav
                </p>
              </div>

              {/* Time */}
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-secondary-text mb-2 uppercase tracking-wide">
                  Time
                </h3>
                <p className="font-semibold text-heading text-lg mb-1">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric"
                  })}
                </p>
                <p className="text-sm text-body-text">
                  {timeParam} - {endTime} IST
                </p>
              </div>

              {/* Location */}
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-secondary-text mb-2 uppercase tracking-wide">
                  Location
                </h3>
                <p className="font-semibold text-heading text-lg mb-1">
                  Google Meet
                </p>
                <p className="text-sm text-body-text">
                  Link in email
                </p>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="mb-8 animate-in slide-in-from-bottom-8 duration-500 delay-500">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-secondary-text" />
              <h3 className="text-lg font-semibold text-heading">Participants</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-accent/5 rounded-xl p-4">
                <div className="w-12 h-12 bg-accent text-white rounded-xl flex items-center justify-center text-lg font-bold">
                  S
                </div>
                <div>
                  <p className="font-medium text-heading">Sanskar Yadav</p>
                  <p className="text-sm text-secondary-text">sanskar@gmail.com</p>
                  <span className="text-xs text-accent font-medium">Host</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-grey-container/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-secondary text-body-text rounded-xl flex items-center justify-center text-lg font-bold">
                  {nameParam.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-heading">{nameParam}</p>
                  <p className="text-sm text-secondary-text">{emailParam}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Integration */}
          <div className="text-center mb-8 animate-in slide-in-from-bottom-8 duration-500 delay-600">
            <h4 className="text-lg font-semibold text-heading mb-4">Add to your calendar</h4>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="border-grey-container hover:bg-grey-container hover:border-accent transition-all duration-200 p-4"
                title="Google Calendar"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="#4285F4"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-grey-container hover:bg-grey-container hover:border-accent transition-all duration-200 p-4"
                title="Apple Calendar"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#000"/>
                </svg>
                Apple
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-grey-container hover:bg-grey-container hover:border-accent transition-all duration-200 p-4"
                title="Outlook"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2zm8 2v4H9v-4h6z" fill="#0078D4"/>
                </svg>
                Outlook
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 animate-in slide-in-from-bottom-8 duration-500 delay-700">
            <Button variant="outline" className="flex-1 border-grey-container hover:bg-grey-container py-3">
              Reschedule Meeting
            </Button>
            <Button variant="outline" className="flex-1 border-grey-container hover:bg-grey-container text-destructive hover:text-destructive py-3">
              Cancel Meeting
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-accent font-medium">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">O</span>
            </div>
            OneHash
          </div>
        </div>
      </div>
    </div>
  );
}
