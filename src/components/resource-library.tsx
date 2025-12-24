import { useState } from 'react';
import { FileText, Download, Upload, Search, Star, Eye, ThumbsUp } from 'lucide-react';
import type { User } from '../App';

type Resource = {
  id: string;
  title: string;
  type: 'notes' | 'slides' | 'summary' | 'past-paper';
  subject: string;
  course: string;
  uploader: User;
  uploadDate: string;
  downloads: number;
  rating: number;
  fileSize: string;
  tags: string[];
};

type ResourceLibraryProps = {
  currentUser: User;
};

export function ResourceLibrary({ currentUser }: ResourceLibraryProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Calculus II - Complete Chapter 5 Notes',
      type: 'notes',
      subject: 'Mathematics',
      course: 'Calculus II',
      uploader: {
        id: '6',
        name: 'Ayesha Malik',
        email: 'ayesha@formanite.fccollege.edu.pk',
        major: 'Mathematics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        karmaPoints: 1024,
        studyStreak: 62,
      },
      uploadDate: '2 days ago',
      downloads: 143,
      rating: 4.8,
      fileSize: '2.4 MB',
      tags: ['Integration', 'Series', 'Sequences'],
    },
    {
      id: '2',
      title: 'Data Structures Midterm Summary',
      type: 'summary',
      subject: 'Computer Science',
      course: 'Data Structures',
      uploader: {
        id: '5',
        name: 'Ali Raza',
        email: 'ali@formanite.fccollege.edu.pk',
        major: 'Computer Science',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        karmaPoints: 892,
        studyStreak: 45,
      },
      uploadDate: '1 week ago',
      downloads: 287,
      rating: 4.9,
      fileSize: '1.8 MB',
      tags: ['Trees', 'Graphs', 'Hash Tables'],
    },
    {
      id: '3',
      title: 'Organic Chemistry Lecture Slides - Reactions',
      type: 'slides',
      subject: 'Chemistry',
      course: 'Organic Chemistry',
      uploader: {
        id: '8',
        name: 'Zara Hassan',
        email: 'zara@formanite.fccollege.edu.pk',
        major: 'Chemistry',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        karmaPoints: 445,
        studyStreak: 18,
      },
      uploadDate: '3 days ago',
      downloads: 92,
      rating: 4.7,
      fileSize: '5.2 MB',
      tags: ['Reactions', 'Mechanisms', 'Synthesis'],
    },
    {
      id: '4',
      title: 'Physics II Final Exam - Past Paper 2024',
      type: 'past-paper',
      subject: 'Physics',
      course: 'Physics II',
      uploader: {
        id: '7',
        name: 'Usman Ahmed',
        email: 'usman@formanite.fccollege.edu.pk',
        major: 'Physics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        karmaPoints: 678,
        studyStreak: 31,
      },
      uploadDate: '5 days ago',
      downloads: 201,
      rating: 5.0,
      fileSize: '0.9 MB',
      tags: ['Electromagnetism', 'Optics', 'Practice'],
    },
  ];

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || resource.type === filterType.toLowerCase().replace(' ', '-');
    const matchesSubject = filterSubject === 'all' || resource.subject === filterSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'notes':
        return 'bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500';
      case 'slides':
        return 'bg-purple-500/10 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500';
      case 'summary':
        return 'bg-green-500/10 dark:bg-green-500/10 text-green-600 dark:text-green-500';
      case 'past-paper':
        return 'bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500';
    }
  };

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'notes':
        return 'Notes';
      case 'slides':
        return 'Slides';
      case 'summary':
        return 'Summary';
      case 'past-paper':
        return 'Past Paper';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-card-foreground mb-2">Resource Library</h1>
          <p className="text-muted-foreground">Share and access study materials</p>
        </div>
        <button
          onClick={() => setActiveTab('upload')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Upload Resource
        </button>
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
          Browse Resources
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'upload'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Upload Resource
        </button>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Search and Filters */}
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title, course, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex gap-2">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                  <option value="all">All Types</option>
                  <option value="notes">Notes</option>
                  <option value="slides">Slides</option>
                  <option value="summary">Summaries</option>
                  <option value="past-paper">Past Papers</option>
                </select>
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                  <option value="all">All Subjects</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(resource.type)}`}>
                      {getTypeLabel(resource.type)}
                    </span>
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>

                  {/* Title and Course */}
                  <h3 className="text-card-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.course}</p>

                  {/* Uploader */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                    <img 
                      src={resource.uploader.avatar}
                      alt={resource.uploader.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-card-foreground">{resource.uploader.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.uploadDate}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{resource.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-muted-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-secondary text-foreground border border-border rounded-lg hover:bg-accent transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Upload Resource Form */
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-card-foreground mb-6">Upload Study Resource</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-card-foreground mb-2">Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g., Calculus II Chapter 5 Notes"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Resource Type</label>
                  <select className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground">
                    <option>Select type</option>
                    <option>Notes</option>
                    <option>Lecture Slides</option>
                    <option>Study Guide</option>
                    <option>Past Paper</option>
                  </select>
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g., Calculus II"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Description</label>
                <textarea
                  placeholder="Brief description of what this resource covers..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="e.g., integration, series, sequences..."
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Upload File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-secondary/50">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF, DOCX, PPTX (max 50MB)</p>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Upload Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}