import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Video, Plus, Filter, Search, Map } from 'lucide-react';
import type { User, StudyGroup } from '../App';
import { JoinStudySession } from './join-study-session';
import { StudyGroupMap } from './study-group-map';
import { LocationPicker } from './location-picker';

type StudyGroupsProps = {
  currentUser: User;
};

export function StudyGroups({ currentUser }: StudyGroupsProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState<'all' | 'in-person' | 'online'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const mockGroups: StudyGroup[] = [
    {
      id: '1',
      title: 'Calculus II Problem Solving',
      subject: 'Mathematics',
      description: 'Working through problem sets from Chapter 5-7. Bring your questions!',
      host: {
        id: '2',
        name: 'Sarah Ahmed',
        email: 'sarah@formanite.fccollege.edu.pk',
        major: 'Mathematics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        karmaPoints: 312,
        studyStreak: 8,
      },
      participants: [],
      maxParticipants: 6,
      type: 'in-person',
      privacy: 'public',
      location: 'Main Library, 2nd Floor, Study Room B',
      coordinates: { lat: 31.5204, lng: 74.3587 },
      dateTime: 'Today, 4:00 PM',
      duration: '2 hours',
      tags: ['Calculus', 'Problem Solving', 'Math'],
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      description: 'Reviewing reaction mechanisms and synthesis pathways for the upcoming exam.',
      host: {
        id: '3',
        name: 'Hassan Ali',
        email: 'hassan@formanite.fccollege.edu.pk',
        major: 'Chemistry',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        karmaPoints: 456,
        studyStreak: 15,
      },
      participants: [],
      maxParticipants: 8,
      type: 'online',
      privacy: 'public',
      dateTime: 'Today, 6:00 PM',
      duration: '1.5 hours',
      tags: ['Chemistry', 'Exam Prep', 'Reactions'],
    },
    {
      id: '3',
      title: 'Microeconomics Discussion',
      subject: 'Economics',
      description: 'Discussing supply & demand curves, market equilibrium, and elasticity concepts.',
      host: {
        id: '4',
        name: 'Fatima Khan',
        email: 'fatima@formanite.fccollege.edu.pk',
        major: 'Economics',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        karmaPoints: 523,
        studyStreak: 21,
      },
      participants: [],
      maxParticipants: 5,
      type: 'in-person',
      privacy: 'public',
      location: 'Student Center, Room 205',
      dateTime: 'Tomorrow, 2:00 PM',
      duration: '2 hours',
      tags: ['Economics', 'Discussion', 'Theory'],
    },
    {
      id: '4',
      title: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      description: 'Practicing coding problems on trees, graphs, and dynamic programming.',
      host: {
        id: '5',
        name: 'Ali Raza',
        email: 'ali@formanite.fccollege.edu.pk',
        major: 'Computer Science',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        karmaPoints: 892,
        studyStreak: 45,
      },
      participants: [],
      maxParticipants: 10,
      type: 'online',
      privacy: 'public',
      dateTime: 'Tomorrow, 7:00 PM',
      duration: '3 hours',
      tags: ['CS', 'Algorithms', 'Coding'],
    },
  ];

  const filteredGroups = mockGroups.filter(group => {
    const matchesType = filterType === 'all' || group.type === filterType;
    const matchesSearch = searchQuery === '' ||
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (group.location && group.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  // If a group is selected, show the join session page
  if (selectedGroup) {
    return (
      <JoinStudySession 
        session={selectedGroup}
        currentUser={currentUser}
        onBack={() => setSelectedGroup(null)}
        onLeave={() => setSelectedGroup(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-card-foreground mb-2">Study Groups</h1>
        <p className="text-muted-foreground">Find or create study sessions with your peers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'browse'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Find Groups
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'create'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Create Group
        </button>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Filters and Search */}
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by subject, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterType === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground border border-border hover:border-primary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('in-person')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    filterType === 'in-person'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground border border-border hover:border-primary'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  In-Person
                </button>
                <button
                  onClick={() => setFilterType('online')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    filterType === 'online'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground border border-border hover:border-primary'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Online
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground border border-border hover:border-primary transition-colors flex items-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  {viewMode === 'list' ? 'Map View' : 'List View'}
                </button>
              </div>
            </div>
          </div>

          {/* Map View Placeholder */}
          {viewMode === 'map' && (
            <div className="mb-6">
              <StudyGroupMap groups={filteredGroups} onGroupSelect={setSelectedGroup} />
            </div>
          )}

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                          {group.subject}
                        </span>
                        {group.type === 'online' ? (
                          <span className="px-2 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded text-sm flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            Online
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            In-Person
                          </span>
                        )}
                      </div>
                      <h3 className="text-card-foreground mb-2">{group.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                    <img 
                      src={group.host.avatar}
                      alt={group.host.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-card-foreground">{group.host.name}</p>
                      <p className="text-xs text-muted-foreground">{group.host.major} • {group.host.year}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{group.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{group.duration}</span>
                    </div>
                    {group.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{group.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{group.participants.length} / {group.maxParticipants} participants</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-muted-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setSelectedGroup(group)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Create Group Form */
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-card-foreground mb-6">Create Study Group</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-card-foreground mb-2">Group Title</label>
                <input
                  type="text"
                  placeholder="e.g., Calculus II Problem Solving"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Subject</label>
                <select className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                  <option>Select subject</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Economics</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Description</label>
                <textarea
                  placeholder="Describe what your group will study and what topics you'll cover..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Session Type</label>
                  <select className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                    <option>In-Person</option>
                    <option>Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Privacy</label>
                  <select className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                    <option>Public</option>
                    <option>Invite-Only</option>
                    <option>Friends-Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Location (for in-person)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Main Library, 2nd Floor, Study Room B"
                    value={selectedLocation ? `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` : ''}
                    readOnly
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Pick on Map
                  </button>
                </div>
                {selectedLocation && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Location selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 2 hours"
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Max Participants</label>
                <input
                  type="number"
                  placeholder="e.g., 6"
                  min="2"
                  max="20"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="e.g., calculus, problem-solving, math..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Create Study Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <LocationPicker
          onLocationSelect={(lat, lng) => setSelectedLocation({ lat, lng })}
          selectedLocation={selectedLocation || undefined}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  );
}