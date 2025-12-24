import { Home, Users, GraduationCap, Library, HelpCircle, BookOpen, User, Moon, Sun, Share2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/theme-context';
import type { View, User as UserType } from '../App';

type NavigationProps = {
  currentView: View;
  onViewChange: (view: View) => void;
  currentUser: UserType;
};

export function Navigation({ currentView, onViewChange, currentUser }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { id: 'feed' as View, label: 'Feed', icon: Home },
    { id: 'groups' as View, label: 'Study Groups', icon: Users },
    { id: 'tutoring' as View, label: 'Tutoring', icon: GraduationCap },
    { id: 'homework' as View, label: 'Homework Help', icon: HelpCircle },
    { id: 'resources' as View, label: 'Resources', icon: Library },
    { id: 'books' as View, label: 'Book Exchange', icon: BookOpen },
    { id: 'subscriptions' as View, label: 'Subscriptions', icon: Share2 },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo and Collapse Button */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('feed')}>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-card-foreground">EduMate</span>
                  <p className="text-xs text-muted-foreground">FCCU Community</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mx-auto cursor-pointer" onClick={() => onViewChange('feed')}>
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-border p-3 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-secondary hover:bg-accent transition-colors text-foreground"
              title={isCollapsed ? 'Toggle theme' : undefined}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Moon className="w-5 h-5 flex-shrink-0" />
              )}
              {!isCollapsed && <span className="text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>

            {/* Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-secondary hover:bg-accent transition-colors text-foreground"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5 flex-shrink-0" />
              ) : (
                <>
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </button>
            
            {/* User Profile */}
            <button 
              onClick={() => onViewChange('profile')}
              className="w-full flex items-center gap-3 hover:bg-secondary rounded-lg p-3 transition-colors"
            >
              <img 
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              {!isCollapsed && (
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm text-card-foreground truncate">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.karmaPoints} karma</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`} />
    </>
  );
}