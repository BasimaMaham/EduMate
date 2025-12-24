import { useState } from 'react';
import { Search, Plus, DollarSign, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Book } from '../App';

type BookExchangeProps = {
  currentUser: User;
};

export function BookExchange({ currentUser }: BookExchangeProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell'>('browse');
  const [filter, setFilter] = useState<'all' | 'buying' | 'wishlist'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');

  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Introduction to Algorithms (4th Edition)',
      author: 'Cormen, Leiserson, Rivest, Stein',
      subject: 'Computer Science',
      condition: 'Good',
      price: 650,
      seller: {
        id: '5',
        name: 'Ali Raza',
        email: 'ali@formanite.fccollege.edu.pk',
        major: 'Computer Science',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        karmaPoints: 892,
        studyStreak: 45,
      },
      imageUrl: 'https://images.unsplash.com/photo-1758685733395-dba201403b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMG5vdGVib29rJTIwZGVza3xlbnwxfHx8fDE3NjQwNTM2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Well-maintained textbook. No highlighting or writing inside. Perfect for CS students.',
    },
    {
      id: '2',
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      subject: 'Mathematics',
      condition: 'Excellent',
      price: 900,
      seller: {
        id: '6',
        name: 'Ayesha Malik',
        email: 'ayesha@formanite.fccollege.edu.pk',
        major: 'Mathematics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        karmaPoints: 1024,
        studyStreak: 62,
      },
      imageUrl: 'https://images.unsplash.com/photo-1758685733395-dba201403b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMG5vdGVib29rJTIwZGVza3xlbnwxfHx8fDE3NjQwNTM2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Like new condition. Used for one semester only. Includes all original inserts.',
    },
    {
      id: '3',
      title: 'Organic Chemistry (12th Edition)',
      author: 'Paula Yurkanis Bruice',
      subject: 'Chemistry',
      condition: 'Fair',
      price: 350,
      seller: {
        id: '8',
        name: 'Zara Hassan',
        email: 'zara@formanite.fccollege.edu.pk',
        major: 'Chemistry',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        karmaPoints: 445,
        studyStreak: 18,
      },
      imageUrl: 'https://images.unsplash.com/photo-1758685733395-dba201403b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMG5vdGVib29rJTIwZGVza3xlbnwxfHx8fDE3NjQwNTM2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Some highlighting and notes. Cover has minor wear. Content is complete and readable.',
    },
    {
      id: '4',
      title: 'University Physics with Modern Physics',
      author: 'Young & Freedman',
      subject: 'Physics',
      condition: 'Good',
      price: 700,
      seller: {
        id: '7',
        name: 'Usman Ahmed',
        email: 'usman@formanite.fccollege.edu.pk',
        major: 'Physics',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        karmaPoints: 678,
        studyStreak: 31,
      },
      imageUrl: 'https://images.unsplash.com/photo-1758685733395-dba201403b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMG5vdGVib29rJTIwZGVza3xlbnwxfHx8fDE3NjQwNTM2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Great condition. Minimal wear. Some pencil marks that can be erased.',
    },
  ];

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch = searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || book.subject === filterSubject;
    const matchesCondition = filterCondition === 'all' || book.condition === filterCondition;
    
    return matchesSearch && matchesSubject && matchesCondition;
  });

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'bg-green-500/10 dark:bg-green-500/10 text-green-600 dark:text-green-500';
      case 'good':
        return 'bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500';
      case 'fair':
        return 'bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-card-foreground mb-2">Book Exchange</h1>
          <p className="text-muted-foreground">Buy and sell second-hand textbooks</p>
        </div>
        <button
          onClick={() => setActiveTab('sell')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          List Book
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'browse'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          Browse Books
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'sell'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          Sell Book
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
                  placeholder="Search by title, author, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="flex gap-2">
                <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                  <option value="all">All Subjects</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                </select>
                <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)} className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                  <option value="all">All Conditions</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                {/* Book Image */}
                <div className="h-48 bg-secondary rounded-t-xl overflow-hidden">
                  <ImageWithFallback 
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  {/* Title and Author */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-card-foreground line-clamp-2">{book.title}</h3>
                      <button className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        {book.subject}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getConditionColor(book.condition)}`}>
                        {book.condition}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1 mb-4">
                    <DollarSign className="w-5 h-5 text-card-foreground" />
                    <span className="text-card-foreground">Rs. {book.price.toLocaleString()}</span>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                    <img 
                      src={book.seller.avatar}
                      alt={book.seller.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-card-foreground">{book.seller.name}</p>
                      <p className="text-xs text-muted-foreground">{book.seller.major}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{book.description}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Contact Seller
                    </button>
                    <button className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg hover:bg-secondary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist Section */}
          <div className="mt-8 bg-primary/10 rounded-xl p-6 border border-primary/20">
            <h3 className="text-card-foreground mb-3">Looking for a specific book?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add it to your wishlist and get notified when someone lists it for sale!
            </p>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </>
      ) : (
        /* Sell Book Form */
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-card-foreground mb-6">List Your Book for Sale</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-card-foreground mb-2">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g., Introduction to Algorithms"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Author(s)</label>
                <input
                  type="text"
                  placeholder="e.g., Cormen, Leiserson, Rivest, Stein"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Subject</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                    <option>Select subject</option>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Economics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-card-foreground mb-2">Condition</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                    <option>Select condition</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Price (Rs.)</label>
                <input
                  type="number"
                  placeholder="e.g., 3500"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Description</label>
                <textarea
                  placeholder="Describe the book's condition, any markings, included materials, etc..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-input text-foreground placeholder:text-muted-foreground"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm text-card-foreground mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Click to upload book photos</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG (max 10MB each)</p>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                List Book for Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}