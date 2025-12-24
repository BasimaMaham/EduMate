import { useState } from 'react';
import { Users, CreditCard, Plus, Check, X, AlertCircle } from 'lucide-react';
import type { User } from '../App';

type Subscription = {
  id: string;
  name: string;
  totalCost: number;
  maxMembers: number;
  currentMembers: Member[];
  billingDate: string;
  status: 'active' | 'pending' | 'incomplete';
};

type Member = {
  user: User;
  paymentStatus: 'paid' | 'pending' | 'failed';
  joinedDate: string;
};

type SubscriptionSharingProps = {
  currentUser: User;
};

export function SubscriptionSharing({ currentUser }: SubscriptionSharingProps) {
  const [activeTab, setActiveTab] = useState<'my-groups' | 'join'>('my-groups');

  const mockSubscriptions: Subscription[] = [
    {
      id: '1',
      name: 'ChatGPT Pro',
      totalCost: 3000,
      maxMembers: 5,
      currentMembers: [
        {
          user: currentUser,
          paymentStatus: 'paid',
          joinedDate: '2024-01-15',
        },
        {
          user: {
            id: '2',
            name: 'Sarah Ahmed',
            email: 'sarah@formanite.fccollege.edu.pk',
            major: 'Biology',
            year: 'Senior',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
            karmaPoints: 312,
            studyStreak: 8,
          },
          paymentStatus: 'paid',
          joinedDate: '2024-01-15',
        },
        {
          user: {
            id: '3',
            name: 'Hassan Ali',
            email: 'hassan@formanite.fccollege.edu.pk',
            major: 'Physics',
            year: 'Sophomore',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            karmaPoints: 456,
            studyStreak: 15,
          },
          paymentStatus: 'paid',
          joinedDate: '2024-01-18',
        },
        {
          user: {
            id: '4',
            name: 'Fatima Khan',
            email: 'fatima@formanite.fccollege.edu.pk',
            major: 'Economics',
            year: 'Junior',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
            karmaPoints: 523,
            studyStreak: 21,
          },
          paymentStatus: 'paid',
          joinedDate: '2024-01-20',
        },
        {
          user: {
            id: '5',
            name: 'Ali Raza',
            email: 'ali@formanite.fccollege.edu.pk',
            major: 'Computer Science',
            year: 'Senior',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            karmaPoints: 892,
            studyStreak: 45,
          },
          paymentStatus: 'pending',
          joinedDate: '2024-02-01',
        },
      ],
      billingDate: '15th of each month',
      status: 'active',
    },
    {
      id: '2',
      name: 'Grammarly Premium',
      totalCost: 1500,
      maxMembers: 4,
      currentMembers: [
        {
          user: currentUser,
          paymentStatus: 'paid',
          joinedDate: '2024-02-01',
        },
        {
          user: {
            id: '6',
            name: 'Ayesha Malik',
            email: 'ayesha@formanite.fccollege.edu.pk',
            major: 'Mathematics',
            year: 'Senior',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
            karmaPoints: 1024,
            studyStreak: 62,
          },
          paymentStatus: 'paid',
          joinedDate: '2024-02-01',
        },
      ],
      billingDate: '1st of each month',
      status: 'incomplete',
    },
  ];

  const availableSubscriptions = [
    { id: '3', name: 'Canva Pro', cost: 600, maxMembers: 5, spotsLeft: 2 },
    { id: '4', name: 'Notion Plus', cost: 800, maxMembers: 6, spotsLeft: 1 },
    { id: '5', name: 'Adobe Creative Cloud', cost: 950, maxMembers: 4, spotsLeft: 3 },
    { id: '6', name: 'Coursera Plus', cost: 750, maxMembers: 3, spotsLeft: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-card-foreground mb-2">Subscription Sharing</h1>
          <p className="text-muted-foreground">Split costs with fellow students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          Create New Group
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-card-foreground mb-1">How it works</p>
          <p className="text-sm text-muted-foreground">
            Join subscription groups to share costs. Automatic monthly payments are handled securely. 
            If a member's payment fails, they have a 3-day grace period before being replaced.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('my-groups')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'my-groups'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Groups
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'join'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Join Group
        </button>
      </div>

      {activeTab === 'my-groups' ? (
        <div className="space-y-6">
          {mockSubscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-card-foreground mb-2">{subscription.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Rs. {subscription.totalCost}/month</span>
                      <span>•</span>
                      <span>Your share: Rs. {Math.round(subscription.totalCost / subscription.maxMembers)}</span>
                      <span>•</span>
                      <span>Billing: {subscription.billingDate}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    subscription.status === 'active' 
                      ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500'
                      : subscription.status === 'pending'
                      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500'
                      : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500'
                  }`}>
                    {subscription.status === 'active' ? 'Active' : 
                     subscription.status === 'pending' ? 'Pending' : 'Incomplete'}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Group Status</span>
                    <span className="text-card-foreground">
                      {subscription.currentMembers.length} / {subscription.maxMembers} members
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(subscription.currentMembers.length / subscription.maxMembers) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="p-6">
                <h4 className="text-card-foreground mb-4">Members</h4>
                <div className="space-y-3">
                  {subscription.currentMembers.map((member) => (
                    <div key={member.user.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.user.avatar}
                          alt={member.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm text-card-foreground">
                            {member.user.name}
                            {member.user.id === currentUser.id && ' (You)'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(member.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-card-foreground">
                          Rs. {Math.round(subscription.totalCost / subscription.maxMembers)}
                        </span>
                        {member.paymentStatus === 'paid' ? (
                          <div className="w-6 h-6 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                          </div>
                        ) : member.paymentStatus === 'pending' ? (
                          <div className="w-6 h-6 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-red-600 dark:text-red-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Empty Slots */}
                  {Array.from({ length: subscription.maxMembers - subscription.currentMembers.length }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="flex items-center justify-between p-3 bg-secondary rounded-lg border-2 border-dashed border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">Waiting for member...</p>
                      </div>
                      <button className="text-sm text-primary hover:underline">
                        Invite
                      </button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-accent transition-colors">
                    Manage Payment
                  </button>
                  <button className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-accent transition-colors">
                    Leave Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableSubscriptions.map((sub) => (
            <div key={sub.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-card-foreground">{sub.name}</h3>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="text-card-foreground">Rs. {sub.cost}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Share</span>
                  <span className="text-card-foreground">Rs. {Math.round(sub.cost / sub.maxMembers)}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Group Size</span>
                  <span className="text-card-foreground">{sub.maxMembers} members</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spots Left</span>
                  <span className="text-primary">{sub.spotsLeft} available</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
