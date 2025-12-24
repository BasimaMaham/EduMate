import { useState } from 'react';
import { Star, DollarSign, Calendar, Search, Filter, CheckCircle } from 'lucide-react';
import type { User, TutorListing } from '../App';

type TutoringHubProps = {
  currentUser: User;
};

export function TutoringHub({ currentUser }: TutoringHubProps) {
  const [activeTab, setActiveTab] = useState<'find' | 'offer'>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const mockTutors: TutorListing[] = [
    {
      id: '1',
      tutor: {
        id: '5',
        name: 'Ali Raza',
        email: 'ali@formanite.fccollege.edu.pk',
        major: 'Computer Science',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        karmaPoints: 892,
        studyStreak: 45,
      },
      subjects: ['Data Structures', 'Algorithms', 'Python', 'Java'],
      hourlyRate: 0,
      rating: 4.9,
      reviewCount: 28,
      availability: ['Mon 4-6pm', 'Wed 5-7pm', 'Fri 3-5pm'],
      description: 'Senior CS student with strong background in programming and algorithms. Helped 50+ students improve their coding skills.',
      verified: true,
    },
    {
      id: '2',
      tutor: {
        id: '6',
        name: 'Ayesha Malik',
        email: 'ayesha@formanite.fccollege.edu.pk',
        major: 'Mathematics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        karmaPoints: 1024,
        studyStreak: 62,
      },
      subjects: ['Calculus', 'Linear Algebra', 'Differential Equations'],
      hourlyRate: 500,
      rating: 5.0,
      reviewCount: 42,
      availability: ['Tue 3-6pm', 'Thu 4-7pm', 'Sat 10am-2pm'],
      description: 'Passionate about making math accessible. Specialized in breaking down complex concepts into simple steps.',
      verified: true,
    },
    {
      id: '3',
      tutor: {
        id: '7',
        name: 'Usman Ahmed',
        email: 'usman@formanite.fccollege.edu.pk',
        major: 'Physics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        karmaPoints: 678,
        studyStreak: 31,
      },
      subjects: ['Physics I & II', 'Mechanics', 'Electromagnetism'],
      hourlyRate: 0,
      rating: 4.8,
      reviewCount: 19,
      availability: ['Mon 6-8pm', 'Thu 5-7pm'],
      description: 'Love helping students understand physics concepts through real-world examples and problem-solving.',
      verified: false,
    },
    {
      id: '4',
      tutor: {
        id: '8',
        name: 'Zara Hassan',
        email: 'zara@formanite.fccollege.edu.pk',
        major: 'Chemistry',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        karmaPoints: 445,
        studyStreak: 18,
      },
      subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Lab Techniques'],
      hourlyRate: 400,
      rating: 4.7,
      reviewCount: 15,
      availability: ['Wed 3-6pm', 'Fri 4-6pm'],
      description: 'Chemistry tutor with focus on reaction mechanisms and lab work. Patient and thorough explanations.',
      verified: true,
    },
  ];

  const filteredTutors = mockTutors.filter((listing) => {
    const matchesSearch = searchQuery === '' ||
      listing.tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || listing.subjects.some(s => s.toLowerCase().includes(filterSubject.toLowerCase()));
    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-card-foreground mb-2">Tutoring Hub</h1>
        <p className="text-muted-foreground">Connect with peer tutors or offer your expertise</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('find')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'find'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Find Tutor
        </button>
        <button
          onClick={() => setActiveTab('offer')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'offer'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Offer Tutoring
        </button>
      </div>

      {activeTab === 'find' ? (
        <>
          {/* Search and Filter */}
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by subject or tutor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-secondary text-foreground border border-border rounded-lg hover:border-primary transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                  <option value="all">All Subjects</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTutors.map((listing) => (
              <div key={listing.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4 pb-4 border-b border-border">
                    <img 
                      src={listing.tutor.avatar}
                      alt={listing.tutor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-card-foreground">{listing.tutor.name}</h3>
                        {listing.verified && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {listing.tutor.major} • {listing.tutor.year}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm text-card-foreground">{listing.rating}</span>
                          <span className="text-sm text-muted-foreground">({listing.reviewCount})</span>
                        </div>
                        {listing.hourlyRate === 0 ? (
                          <span className="px-2 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 rounded text-sm">
                            Free
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 text-primary">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm">Rs. {listing.hourlyRate}/hr</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>

                  {/* Subjects */}
                  <div className="mb-4">
                    <h4 className="text-sm text-card-foreground mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {listing.subjects.map((subject) => (
                        <span key={subject} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Availability</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {listing.availability.map((slot, idx) => (
                        <span key={idx} className="px-2 py-1 bg-secondary text-muted-foreground rounded text-xs">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Book Session
                    </button>
                    <button className="px-4 py-2 bg-secondary text-foreground border border-border rounded-lg hover:bg-accent transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Offer Tutoring Form */
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-card-foreground mb-6">Create Your Tutor Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-card-foreground mb-2">Subjects You Can Teach</label>
                <input
                  type="text"
                  placeholder="e.g., Calculus, Physics, Programming..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Separate multiple subjects with commas</p>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Hourly Rate (Rs.)</label>
                <input
                  type="number"
                  placeholder="Enter 0 for free tutoring"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">About Your Tutoring</label>
                <textarea
                  placeholder="Tell students about your teaching style, experience, and what makes you a great tutor..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Availability</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="e.g., Mon 4-6pm"
                    className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="e.g., Wed 5-7pm"
                    className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button className="mt-2 text-sm text-primary hover:underline">+ Add more slots</button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <label className="text-sm text-muted-foreground">
                  I agree to the tutor guidelines and commit to providing quality help
                </label>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Create Tutor Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}