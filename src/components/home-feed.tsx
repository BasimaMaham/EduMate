import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, Users, Zap, TrendingUp, Image, Video } from 'lucide-react';
import type { User } from '../App';

type Post = {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  type: 'post' | 'study-session' | 'achievement';
};

type Comment = {
  id: string;
  author: User;
  content: string;
  timestamp: string;
};

type HomeFeedProps = {
  currentUser: User;
};

export function HomeFeed({ currentUser }: HomeFeedProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        id: '2',
        name: 'Sarah Ahmed',
        email: 'sarah@formanite.fccollege.edu.pk',
        major: 'Biology',
        year: 'Senior',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        karmaPoints: 312,
        studyStreak: 8,
      },
      content: 'Just finished an amazing study session on Organic Chemistry! Special thanks to everyone who joined. The problem-solving approach really helped clarify complex mechanisms. 🧪✨',
      imageUrl: 'https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHN0dWRlbnRzJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjQwNTM2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '2 hours ago',
      likes: 24,
      comments: [],
      type: 'post',
    },
    {
      id: '2',
      author: {
        id: '3',
        name: 'Hassan Ali',
        email: 'hassan@formanite.fccollege.edu.pk',
        major: 'Physics',
        year: 'Sophomore',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        karmaPoints: 456,
        studyStreak: 15,
      },
      content: '📚 Study Hack: Use the Pomodoro Technique with your study buddies! We\'ve been doing 25-min focused sessions with 5-min breaks and productivity has skyrocketed. Anyone want to join our next session?',
      timestamp: '5 hours ago',
      likes: 42,
      comments: [],
      type: 'post',
    },
    {
      id: '3',
      author: {
        id: '4',
        name: 'Fatima Khan',
        email: 'fatima@formanite.fccollege.edu.pk',
        major: 'Economics',
        year: 'Junior',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        karmaPoints: 523,
        studyStreak: 21,
      },
      content: '🎉 Achievement Unlocked: 21-day study streak! Thanks to this amazing community for keeping me motivated. Let\'s keep the momentum going!',
      timestamp: '1 day ago',
      likes: 67,
      comments: [],
      type: 'achievement',
    },
  ]);
  
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  // Persist liked posts to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('edumate_likes');
    if (saved) {
      setLikedPosts(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edumate_likes', JSON.stringify([...likedPosts]));
  }, [likedPosts]);

  const handleCreatePost = () => {
    if (postContent.trim() === '') return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content: postContent,
      imageUrl: postImage || undefined,
      timestamp: 'just now',
      likes: 0,
      comments: [],
      type: 'post',
    };
    
    setPosts([newPost, ...posts]);
    setPostContent('');
    setPostImage(null);
  };

  const handleLikePost = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
    
    // Update post likes count
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, likes: newLiked.has(postId) ? p.likes + 1 : p.likes - 1 }
        : p
    ));
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    setPosts(posts.map(p => 
      p.id === postId 
        ? {
            ...p,
            comments: [
              ...p.comments,
              {
                id: Date.now().toString(),
                author: currentUser,
                content: text,
                timestamp: 'just now',
              }
            ]
          }
        : p
    ));
    
    setCommentText({ ...commentText, [postId]: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <span className="text-sm text-muted-foreground">Current</span>
          </div>
          <p className="text-card-foreground">{currentUser.studyStreak} days</p>
          <p className="text-sm text-muted-foreground">Study Streak</p>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-card-foreground">{currentUser.karmaPoints} points</p>
          <p className="text-sm text-muted-foreground">Karma Score</p>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-500" />
            <span className="text-sm text-muted-foreground">This week</span>
          </div>
          <p className="text-card-foreground">8 sessions</p>
          <p className="text-sm text-muted-foreground">Study Groups</p>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-card rounded-xl p-6 border border-border mb-6">
        <div className="flex gap-4">
          <img 
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your study experience, tips, or achievements..."
              className="w-full p-4 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground"
              rows={3}
            />
            {postImage && (
              <div className="mt-3 relative">
                <img src={postImage} alt="Preview" className="max-h-64 rounded-lg object-cover" />
                <button
                  onClick={() => setPostImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <label className="cursor-pointer p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <label className="cursor-pointer p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={postContent.trim() === ''}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Study Sessions */}
      <div className="bg-primary/10 rounded-xl p-6 border border-primary/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-card-foreground">Active Study Sessions Nearby</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-card-foreground">Calculus II Study Group</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Main Library, 2nd Floor
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Starting in 15 min
                  </span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-card-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.major} • {post.timestamp}</p>
                </div>
                {post.type === 'achievement' && (
                  <div className="px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-full text-sm flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Achievement
                  </div>
                )}
              </div>

              <p className="text-foreground mb-4">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.imageUrl && (
              <img 
                src={post.imageUrl}
                alt="Post"
                className="w-full h-80 object-cover"
              />
            )}

            {/* Post Actions */}
            <div className="p-6 pt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border mb-4">
                <button 
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.has(post.id)
                      ? 'text-red-500'
                      : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-red-500' : ''}`} />
                  <span>Like</span>
                </button>
                <button 
                  onClick={() => setExpandedComments(prev => {
                    const next = new Set(prev);
                    if (next.has(post.id)) next.delete(post.id);
                    else next.add(post.id);
                    return next;
                  })}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              {expandedComments.has(post.id) && (
                <div className="border-t border-border pt-4 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img 
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        <p className="text-sm text-foreground mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment Input */}
                  <div className="flex gap-3 mt-4">
                    <img 
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText[post.id]?.trim()}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}