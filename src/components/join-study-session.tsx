import React from 'react';
import { MapPin, Clock, Users, Calendar, MessageCircle, Phone, Video } from 'lucide-react';
import type { User, StudyGroup } from '../App';

type JoinStudySessionProps = {
  session: StudyGroup;
  currentUser: User;
  onBack: () => void;
  onLeave: () => void;
};

export function JoinStudySession({ session, currentUser, onBack, onLeave }: JoinStudySessionProps) {
  const [hasJoined, setHasJoined] = React.useState(false);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>

        {/* Session Header */}
        <div className="bg-card rounded-xl border border-border p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-card-foreground mb-2">{session.title}</h1>
              <p className="text-muted-foreground">{session.description}</p>
            </div>
            <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
              {session.type === 'in-person' ? '📍 In-Person' : '💻 Online'}
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-card-foreground">{session.dateTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-card-foreground">{session.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="text-card-foreground">{session.participants.length}/{session.maxParticipants}</p>
              </div>
            </div>
            {session.type === 'in-person' && session.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-card-foreground text-sm">{session.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Host Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-card-foreground mb-4">Host</h2>
              <div className="flex items-center gap-4">
                <img
                  src={session.host.avatar}
                  alt={session.host.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-card-foreground font-medium">{session.host.name}</p>
                  <p className="text-sm text-muted-foreground">{session.host.major} • {session.host.year}</p>
                  <p className="text-sm text-muted-foreground">📊 {session.host.karmaPoints} karma points</p>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-card-foreground mb-4">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {session.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-card-foreground mb-4">
                Participants ({session.participants.length})
              </h2>
              {session.participants.length > 0 ? (
                <div className="space-y-3">
                  {session.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-card-foreground text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.major}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No participants yet. Be the first to join!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Button */}
            {!hasJoined ? (
              <button
                onClick={() => setHasJoined(true)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Join Session
              </button>
            ) : (
              <button
                onClick={() => {
                  setHasJoined(false);
                  onLeave();
                }}
                className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Leave Session
              </button>
            )}

            {/* Contact Options */}
            {hasJoined && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-card-foreground mb-4">Connect</h3>
                <div className="space-y-3">
                  {session.type === 'online' && (
                    <>
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                        <Video className="w-4 h-4" />
                        <span className="text-sm">Join Video Call</span>
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Join Voice Call</span>
                      </button>
                    </>
                  )}
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Chat with Group</span>
                  </button>
                </div>
              </div>
            )}

            {/* Session Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-card-foreground mb-4">About</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Subject</p>
                  <p className="text-card-foreground">{session.subject}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Privacy</p>
                  <p className="text-card-foreground capitalize">{session.privacy}</p>
                </div>
                {session.type === 'in-person' && session.location && (
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="text-card-foreground">{session.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
