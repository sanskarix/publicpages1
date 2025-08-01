import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, MapPin, Calendar, Check } from "lucide-react";

const eventTypes = {
  "product-hunt-chats": {
    title: "Product Hunt Chats",
    description: "The essence of Product Hunt reflects in communities. Select a time suitable for you, and let's talk products!",
    duration: "15m"
  },
  "interviews": {
    title: "Interviews", 
    description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    duration: "30m"
  },
  "product-demo": {
    title: "Product Demo",
    description: "Product innovation in action! Reserve a time for a personalized demo of our next-gen scheduler.",
    duration: "30m"
  },
  "everything-else": {
    title: "Everything Else",
    description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 😊",
    duration: "15m"
  },
  "recurring-event": {
    title: "Recurring Event",
    description: "Testing out the Recurring Meetup",
    duration: "15m"
  }
};

export default function BookingForm() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    agreeToTerms: false
  });
  const [guests, setGuests] = useState<string[]>([]);
  const [showGuestForm, setShowGuestForm] = useState(false);

  const eventType = eventId ? eventTypes[eventId as keyof typeof eventTypes] : null;
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");
  
  const selectedDate = dateParam ? new Date(dateParam) : null;

  if (!eventType || !selectedDate || !timeParam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-heading mb-4">Invalid booking link</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to profile
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.agreeToTerms) {
      // Navigate to confirmation page
      window.location.href = `/book/${eventId}/confirmed?date=${selectedDate.toISOString()}&time=${timeParam}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to={`/book/${eventId}`} 
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
              <h1 className="text-xl font-semibold text-heading">Sanskar Yadav</h1>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Event & Time Details */}
          <div className="lg:col-span-4 animate-in slide-in-from-left-8 duration-500">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-container sticky top-8">
              <h2 className="text-xl font-semibold text-heading mb-3">
                {eventType.title}
              </h2>
              
              <p className="text-body-text text-sm mb-6 leading-relaxed">
                {eventType.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-secondary-text flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">{eventType.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-0.5 text-secondary-text flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">
                      {selectedDate.toLocaleDateString("en-US", { 
                        weekday: "long", 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </p>
                    <p className="text-sm text-secondary-text">
                      {timeParam} - {/* Calculate end time */}
                      {(() => {
                        const [hours, minutes] = timeParam.split(':').map(Number);
                        const duration = parseInt(eventType.duration);
                        const endTime = new Date();
                        endTime.setHours(hours, minutes + duration);
                        return endTime.toTimeString().slice(0, 5);
                      })()} ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-secondary-text flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">Google Meet</p>
                    <p className="text-sm text-secondary-text">
                      A link will be provided upon confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Booking Form */}
          <div className="lg:col-span-8 animate-in slide-in-from-right-8 duration-500 delay-200">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-container">
              <h3 className="text-xl font-semibold text-heading mb-6">
                Enter Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-heading">
                      Your name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Sanskar Yadav"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-grey-container focus:border-accent focus:ring-accent"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-heading">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sanskar.yadav@onehash.ai"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-grey-container focus:border-accent focus:ring-accent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-heading">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <select className="border border-grey-container rounded-md px-3 py-2 text-sm bg-white">
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <Input
                      id="phone"
                      placeholder=""
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="flex-1 border-grey-container focus:border-accent focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-heading">
                    Additional notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Please share anything that will help prepare for our meeting."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="border-grey-container focus:border-accent focus:ring-accent min-h-[100px]"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary-text text-sm">Add guests</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                        className="w-4 h-4 text-accent border-grey-container rounded focus:ring-accent"
                        required
                      />
                    </div>
                    <Label htmlFor="terms" className="text-sm text-secondary-text leading-relaxed">
                      By proceeding, you agree to our{" "}
                      <button type="button" className="text-accent hover:underline">
                        Terms
                      </button>{" "}
                      and{" "}
                      <button type="button" className="text-accent hover:underline">
                        Privacy Policy
                      </button>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex-1 border-grey-container text-body-text hover:bg-grey-container"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formData.name || !formData.email || !formData.agreeToTerms}
                    className="flex-1 bg-accent hover:bg-accent/90 text-white disabled:bg-grey-container disabled:text-secondary-text"
                  >
                    Confirm
                  </Button>
                </div>
              </form>
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
