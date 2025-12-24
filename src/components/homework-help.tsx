import { useState, useEffect } from 'react';
import { Star, DollarSign, Calendar, Search, Filter, CheckCircle, ThumbsUp, MessageCircle, Award, Plus } from 'lucide-react';
import type { User, Question } from '../App';

type HomeworkHelpProps = {
  currentUser: User;
};

export function HomeworkHelp({ currentUser }: HomeworkHelpProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'ask'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [upvotedQuestions, setUpvotedQuestions] = useState<Set<string>>(new Set());
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});

  // Persist upvotes to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('edumate_upvotes');
    if (saved) {
      setUpvotedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edumate_upvotes', JSON.stringify([...upvotedQuestions]));
  }, [upvotedQuestions]);

  const mockQuestions: Question[] = [
    {
      id: '1',
      author: {
        id: '9',
        name: 'Bilal Ahmed',
        email: 'bilal@formanite.fccollege.edu.pk',
        major: 'Computer Science',
        year: 'Sophomore',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
        karmaPoints: 124,
        studyStreak: 5,
      },
      title: 'Help with Recursion in Binary Trees',
      content: 'I\'m struggling to understand how to implement a recursive function to find the height of a binary tree. Can someone explain the logic step by step?',
      subject: 'Computer Science',
      tags: ['Recursion', 'Data Structures', 'Trees'],
      timestamp: '30 minutes ago',
      answers: [
        {
          id: 'a1',
          author: {
            id: '5',
            name: 'Ali Raza',
            email: 'ali@formanite.fccollege.edu.pk',
            major: 'Computer Science',
            year: 'Senior',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            karmaPoints: 892,
            studyStreak: 45,
          },
          content: 'Great question! The key insight is that the height of a tree is 1 + max(left subtree height, right subtree height). The base case is when you hit null (return -1) or a leaf (return 0). Think of it as asking each node "how tall are you?" and the node asks its children the same question.',
          timestamp: '15 minutes ago',
          upvotes: 5,
          isAccepted: true,
        },
      ],
      upvotes: 8,
      isPaid: false,
    },
    {
      id: '2',
      author: {
        id: '10',
        name: 'Sana Ali',
        email: 'sana@formanite.fccollege.edu.pk',
        major: 'Mathematics',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        karmaPoints: 267,
        studyStreak: 12,
      },
      title: 'Limits and Continuity Problem',
      content: 'How do I prove that lim(x→0) (sin x)/x = 1 using squeeze theorem? I understand the concept but struggling with the setup.',
      subject: 'Mathematics',
      tags: ['Calculus', 'Limits', 'Proofs'],
      timestamp: '1 hour ago',
      answers: [],
      upvotes: 3,
      isPaid: false,
    },
    {
      id: '3',
      author: {
        id: '11',
        name: 'Omar Hassan',
        email: 'omar@formanite.fccollege.edu.pk',
        major: 'Physics',
        year: 'Sophomore',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        karmaPoints: 89,
        studyStreak: 3,
      },
      title: 'Electric Field Due to Continuous Charge Distribution',
      content: 'Need help setting up the integral for finding electric field at a point due to a uniformly charged ring. What are the symmetry considerations?',
      subject: 'Physics',
      tags: ['Electromagnetism', 'Integration', 'Electric Fields'],
      timestamp: '2 hours ago',
      answers: [],
      upvotes: 2,
      isPaid: true,
      bounty: 50,
    },
  ];

  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch = searchQuery === '' ||
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = filterSubject === 'all' || question.subject === filterSubject;
    
    return matchesSearch && matchesSubject;
  });

  const handleUpvoteQuestion = (questionId: string) => {
    const newUpvoted = new Set(upvotedQuestions);
    if (newUpvoted.has(questionId)) {
      newUpvoted.delete(questionId);
    } else {
      newUpvoted.add(questionId);
    }
    setUpvotedQuestions(newUpvoted);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-card-foreground mb-2">Homework Help</h1>
          <p className="text-muted-foreground">Get help from peers and earn karma points</p>
        </div>
        <button
          onClick={() => setActiveTab('ask')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ask Question
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
          Browse Questions
        </button>
        <button
          onClick={() => setActiveTab('ask')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'ask'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-card-foreground'
          }`}
        >
          Ask Question
        </button>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Search */}
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions by title, subject, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                <option value="all">All Subjects</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Question Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={question.author.avatar}
                      alt={question.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-card-foreground">{question.title}</h3>
                        {question.isPaid && question.bounty && (
                          <span className="px-2 py-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500 rounded text-xs flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Rs. {question.bounty}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{question.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{question.author.name}</span>
                        <span>•</span>
                        <span>{question.timestamp}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                          {question.subject}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <button 
                      onClick={() => handleUpvoteQuestion(question.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        upvotedQuestions.has(question.id)
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <ThumbsUp className={`w-5 h-5 ${upvotedQuestions.has(question.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">{upvotedQuestions.has(question.id) ? question.upvotes + 1 : question.upvotes} upvotes</span>
                    </button>
                    <button 
                      onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{question.answers.length} answers</span>
                    </button>
                    {question.answers.some(a => a.isAccepted) && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <Award className="w-5 h-5" />
                        <span>Solved</span>
                      </div>
                    )}
                    <button 
                      onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                      className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      {expandedQuestion === question.id ? 'Hide Answers' : 'Answer'}
                    </button>
                  </div>

                  {/* Answers Section */}
                  {expandedQuestion === question.id && (
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      {question.answers.length > 0 && (
                        <>
                          <h4 className="font-semibold text-card-foreground">Answers ({question.answers.length})</h4>
                          {question.answers.map((answer) => (
                            <div key={answer.id} className={`p-4 rounded-lg border ${answer.isAccepted ? 'bg-green-500/10 border-green-500/30' : 'bg-secondary border-border'}`}>
                              <div className="flex items-start gap-3 mb-3">
                                <img 
                                  src={answer.author.avatar}
                                  alt={answer.author.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-card-foreground text-sm">{answer.author.name}</p>
                                  <p className="text-xs text-muted-foreground">{answer.timestamp}</p>
                                </div>
                                {answer.isAccepted && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded text-xs font-medium flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    Accepted
                                  </span>
                                )}
                              </div>
                              <p className="text-card-foreground text-sm">{answer.content}</p>
                              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                <button className="hover:text-primary transition-colors flex items-center gap-1">
                                  <ThumbsUp className="w-4 h-4" />
                                  {answer.upvotes}
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      {/* Post Answer Input */}
                      <div className="pt-4 border-t border-border">
                        <h5 className="font-medium text-card-foreground mb-3 text-sm">Post Your Answer</h5>
                        <div className="flex gap-3">
                          <img 
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 space-y-2">
                            <textarea
                              placeholder="Share your solution..."
                              value={answerText[question.id] || ''}
                              onChange={(e) => setAnswerText({ ...answerText, [question.id]: e.target.value })}
                              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                              rows={3}
                            />
                            <button
                              onClick={() => {
                                if (answerText[question.id]?.trim()) {
                                  // In a real app, this would update the mockQuestions array
                                  // For now, just clear the input
                                  setAnswerText({ ...answerText, [question.id]: '' });
                                  alert('Answer posted! (This is a demo - answers are not persisted)');
                                }
                              }}
                              disabled={!answerText[question.id]?.trim()}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Post Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Karma Info */}
          <div className="mt-8 bg-amber-500/10 dark:bg-amber-500/10 rounded-xl p-6 border border-amber-500/20 dark:border-amber-500/30">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="text-card-foreground mb-2">Earn Karma Points</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Help your peers by answering questions and earn karma points! The more helpful your answers, the more karma you earn. Top contributors get special badges and recognition.
                </p>
                <div className="flex items-center gap-4 text-sm text-card-foreground">
                  <span>• +10 karma per helpful answer</span>
                  <span>• +25 karma for accepted answers</span>
                  <span>• +50 karma for detailed explanations</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Ask Question Form */
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-card-foreground mb-6">Ask Your Question</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-card-foreground mb-2">Question Title</label>
              <input
                type="text"
                placeholder="e.g., How to solve quadratic equations using completing the square?"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm text-card-foreground mb-2">Subject</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground">
                <option>Select a subject</option>
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
              <label className="block text-sm text-card-foreground mb-2">Detailed Question</label>
              <textarea
                placeholder="Provide as much detail as possible. Include what you've tried and where you're stuck..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-input text-foreground placeholder:text-muted-foreground"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm text-card-foreground mb-2">Tags</label>
              <input
                type="text"
                placeholder="e.g., calculus, derivatives, chain-rule..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-500/10 dark:bg-amber-500/10 rounded-lg border border-amber-500/20 dark:border-amber-500/30">
              <input type="checkbox" id="paid" className="w-4 h-4" />
              <label htmlFor="paid" className="text-sm text-card-foreground">
                Offer a bounty for detailed help (optional)
              </label>
            </div>

            <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Post Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
