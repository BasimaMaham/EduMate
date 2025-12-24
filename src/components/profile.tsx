import { Zap, Award, BookOpen, Users, Star, Calendar, TrendingUp, Settings } from 'lucide-react';
import type { User } from '../App';

type ProfileProps = {
  currentUser: User;
  onNavigate?: (view: string) => void;
};

export function Profile({ currentUser, onNavigate }: ProfileProps) {
  const achievements = [
    { id: '1', title: '7-Day Streak', icon: '🔥', description: 'Studied for 7 consecutive days', earned: true },
    { id: '2', title: 'Helper Hero', icon: '🦸', description: 'Answered 50+ homework questions', earned: true },
    { id: '3', title: 'Study Leader', icon: '👑', description: 'Hosted 10+ study groups', earned: true },
    { id: '4', title: 'Resource Contributor', icon: '📚', description: 'Uploaded 20+ study resources', earned: false },
    { id: '5', title: 'Top Tutor', icon: '⭐', description: '5-star rating with 50+ reviews', earned: false },
    { id: '6', title: 'Community Star', icon: '🌟', description: 'Reached 1000 karma points', earned: false },
  ];

  const recentActivity = [
    { id: '1', type: 'group', description: 'Hosted Calculus II study group', time: '2 hours ago' },
    { id: '2', type: 'answer', description: 'Answered question on Binary Trees', time: '5 hours ago' },
    { id: '3', type: 'resource', description: 'Uploaded Data Structures notes', time: '1 day ago' },
    { id: '4', type: 'group', description: 'Joined Physics II study session', time: '2 days ago' },
  ];

  const stats = [
    { label: 'Study Groups Joined', value: 23, icon: Users, color: 'text-blue-600' },
    { label: 'Questions Answered', value: 56, icon: Award, color: 'text-green-600' },
    { label: 'Resources Shared', value: 12, icon: BookOpen, color: 'text-purple-600' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-amber-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-card rounded-xl border border-border p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-card-foreground mb-2">{currentUser.name}</h1>
                <p className="text-muted-foreground mb-1">{currentUser.major} • {currentUser.year}</p>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <span className="text-card-foreground">{currentUser.studyStreak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>

              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-blue-500" />
                  <span className="text-card-foreground">{currentUser.karmaPoints}</span>
                </div>
                <p className="text-sm text-muted-foreground">Karma Points</p>
              </div>

              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-card-foreground">Top 5%</span>
                </div>
                <p className="text-sm text-muted-foreground">Community Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-card-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-card-foreground mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  achievement.earned
                    ? 'bg-secondary border-border'
                    : 'bg-secondary border-border opacity-60'
                }`}
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="text-card-foreground">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Award className="w-5 h-5 text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-card-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {activity.type === 'group' && <Users className="w-5 h-5 text-primary" />}
                  {activity.type === 'answer' && <Award className="w-5 h-5 text-primary" />}
                  {activity.type === 'resource' && <BookOpen className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-card-foreground mb-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Sharing Section */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-gray-900 mb-2">Subscription Sharing</h3>
            <p className="text-sm text-gray-600 mb-4">
              Currently sharing: ChatGPT Pro • Rs. 600/month (Split 5 ways)
            </p>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Manage Subscriptions
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}