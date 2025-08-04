import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Users,
  ArrowLeftFromLine,
} from "lucide-react";

const steelBlue = "text-blue-700";
const steelBlueBg = "bg-blue-100";

const eventTypes = {
  "product-hunt-chats": { title: "Product Hunt Chats", duration: "15m" },
  interviews: { title: "Interviews", duration: "30m" },
  "product-demo": { title: "Product Demo", duration: "30m" },
  "everything-else": { title: "Everything Else", duration: "15m" },
  "recurring-event": { title: "Recurring Event", duration: "15m" },
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
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Invalid confirmation link
          </h1>
          <Link
            to="/"
            className="inline-block px-5 py-2 bg-blue-700 text-white font-medium rounded-md shadow-sm hover:bg-blue-800 transition"
          >
            Return to profile
          </Link>
        </div>
      </div>
    );
  }

  const endTime = (() => {
    const [hours, minutes] = timeParam.split(":").map(Number);
    const duration = parseInt(eventType.duration);
    const endTime = new Date(selectedDate);
    endTime.setHours(hours, minutes + duration);
    return endTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/"
            className="p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
            aria-label="Back to bookings"
            title="Back to bookings"
          >
            <ArrowLeftFromLine className={`w-5 h-5 ${steelBlue}`} />
          </Link>
          <span className={`text-xs font-medium ${steelBlue} uppercase tracking-wide`}>
            Back to bookings
          </span>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl p-8 shadow border border-gray-100">
          {/* Checkmark Icon */}
          <div className="text-center mb-8">
            <div className="relative flex items-center justify-center mb-5">
              <div className={`relative w-14 h-14 ${steelBlueBg} rounded-full flex items-center justify-center shadow-sm`}>
                <Check className={`w-8 h-8 ${steelBlue}`} />
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Meeting Scheduled!
            </h1>
            <p className="text-sm text-gray-600">
              We have sent calendar invites to all the participants.
            </p>
          </div>

          {/* Meeting Details Vertical Stack */}
          <div className="flex flex-col gap-4 mb-8">
            <MeetingItem
              icon={
                <Calendar className={`w-5 h-5 ${steelBlue}`} />
              }
              label="Meeting"
              labelClass={steelBlue}
              primary={eventType.title}
              secondary="with Sanskar Yadav"
            />
            <MeetingItem
              icon={
                <Clock className={`w-5 h-5 ${steelBlue}`} />
              }
              label="Time"
              labelClass={steelBlue}
              primary={selectedDate.toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric"
              })}
              secondary={`${timeParam} - ${endTime} IST`}
            />
            <MeetingItem
              icon={
                <MapPin className={`w-5 h-5 ${steelBlue}`} />
              }
              label="Location"
              labelClass={steelBlue}
              primary="Google Meet"
              secondary="Link in email"
            />
          </div>

          {/* Participants */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className={`w-5 h-5 ${steelBlue}`} />
              <h3 className="text-base font-semibold text-gray-900">Participants</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Participant
                initial="S"
                name="Sanskar Yadav"
                email="sanskar@gmail.com"
                host
                accent={steelBlueBg + " " + steelBlue}
              />
              <Participant
                initial={nameParam.charAt(0).toUpperCase()}
                name={nameParam}
                email={emailParam}
                accent="bg-gray-200 text-gray-700"
              />
            </div>
          </section>

          {/* Calendar Links */}
          <section className="text-center mb-6">
            <h4 className={`text-sm font-semibold text-gray-900 mb-3`}>
              Add to your calendar
            </h4>
            <div className="flex justify-center gap-3 flex-wrap">
              {["Google", "Apple", "Outlook"].map((name) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  className={`${steelBlue} border-gray-200 hover:bg-blue-50 p-2 rounded font-medium text-xs`}
                >
                  {name}
                </Button>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              className={`flex-1 border-gray-200 hover:bg-blue-50 py-2 rounded font-medium text-xs ${steelBlue}`}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-200 text-red-500 hover:bg-red-50 py-2 rounded font-medium text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className={`text-center mt-12 ${steelBlue} text-xs font-medium`}>
          <div className="inline-flex items-center gap-2">
            <div className={`w-6 h-6 ${steelBlue} bg-blue-100 rounded flex items-center justify-center text-white font-bold text-[15px]`}>
              O
            </div>
            OneHash
          </div>
        </footer>
      </div>
    </div>
  );
}

// Helper component for meeting item rows
function MeetingItem({ icon, label, primary, secondary, labelClass }: { icon: React.ReactNode, label: string, primary: string, secondary?: string, labelClass?: string }) {
  return (
    <div className="flex items-center gap-4 p-0">
      <div className={`w-10 h-10 flex items-center justify-center rounded ${steelBlueBg}`}>{icon}</div>
      <div>
        <div className={`text-xs font-medium uppercase ${labelClass}`}>{label}</div>
        <div className="text-sm font-semibold text-gray-900">{primary}</div>
        {secondary && <div className="text-xs text-gray-500">{secondary}</div>}
      </div>
    </div>
  );
}

// Helper component for participants
function Participant({ initial, name, email, host, accent }: { initial: string, name: string, email: string, host?: boolean, accent: string }) {
  return (
    <div className={`flex items-center gap-3 bg-gray-50 rounded p-3`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-base select-none ${accent}`}>
        {initial}
      </div>
      <div>
        <div className="font-medium text-gray-900 text-sm">{name}</div>
        <div className="text-xs text-gray-500">{email}</div>
        {host && (
          <span className="text-[10px] ml-1 px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium uppercase">
            Host
          </span>
        )}
      </div>
    </div>
  );
}