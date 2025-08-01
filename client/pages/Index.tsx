import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

const eventTypes = [
  {
    id: "product-hunt-chats",
    title: "Product Hunt Chats",
    description: "The essence of Product Hunt reflects in communities. Select a time suitable for you, and let's talk products!",
    duration: "15m",
    color: "bg-green-100 text-green-700"
  },
  {
    id: "interviews", 
    title: "Interviews",
    description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    duration: "30m",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "product-demo",
    title: "Product Demo",
    description: "Product innovation in action! Reserve a time for a personalized demo of our next-gen scheduler.",
    duration: "30m", 
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "everything-else",
    title: "Everything Else",
    description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 😊",
    duration: "15m",
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: "recurring-event", 
    title: "Recurring Event",
    description: "Testing out the Recurring Meetup",
    duration: "15m",
    color: "bg-pink-100 text-pink-700",
    recurring: true
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in-50 duration-700">
          <div className="relative inline-block mb-6 animate-in zoom-in-50 duration-500 delay-200">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Sanskar Yadav"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          <h1 className="text-3xl font-bold text-heading mb-3 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            Sanskar Yadav
          </h1>

          <p className="text-secondary-text text-lg mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-400">
            Head of Growth @OneHash | Building the craziest tools on the internet 🚀
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-grey-container flex-1 max-w-24"></div>
            <div className="mx-4 text-secondary-text text-sm">Choose a meeting type</div>
            <div className="h-px bg-grey-container flex-1 max-w-24"></div>
          </div>
        </div>

        {/* Event Types */}
        <div className="space-y-3">
          {eventTypes.map((eventType, index) => (
            <Link
              key={eventType.id}
              to={`/book/${eventType.id}`}
              className="block group animate-in slide-in-from-bottom-8 duration-500"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="bg-white rounded-lg p-4 shadow-sm border border-grey-container hover:shadow-md transition-all duration-200 hover:border-accent/20 group-hover:scale-[1.01] hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-heading">
                        {eventType.title}
                      </h3>
                      {eventType.recurring && (
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                          Repeats up to 12 times
                        </span>
                      )}
                    </div>

                    <p className="text-body-text text-sm mb-3 leading-relaxed">
                      {eventType.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-secondary-text text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{eventType.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Google Meet</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <div className={`w-3 h-3 rounded-full ${eventType.color.split(' ')[0]}`}></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
