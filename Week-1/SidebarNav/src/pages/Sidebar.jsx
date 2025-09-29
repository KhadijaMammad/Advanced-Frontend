import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Search, 
  Heart, 
  Bookmark, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  FileText,
  Image,
  Music,
  Video,
  Download,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: null,
      color: 'text-blue-500'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      badge: null,
      color: 'text-purple-500'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      badge: '12',
      color: 'text-green-500'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: '3',
      color: 'text-red-500'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      badge: null,
      color: 'text-orange-500'
    }
  ];

  const secondaryItems = [
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      color: 'text-indigo-500'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      color: 'text-gray-500'
    },
    {
      id: 'media',
      label: 'Media',
      icon: Image,
      color: 'text-pink-500'
    },
    {
      id: 'music',
      label: 'Music',
      icon: Music,
      color: 'text-cyan-500'
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-4' : ''}`}>
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">AppName</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">v2.0.1</p>
            </div>
          )}
        </div>
        
        {/* Desktop collapse button */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 py-2">
              Main Menu
            </p>
          )}
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color} transition-colors`} />
                  {item.badge && !isCollapsed && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-8 space-y-1">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 py-2">
              Tools
            </p>
          )}
          
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
              >
                <Icon className={`w-4 h-4 ${item.color} transition-colors`} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile & Settings */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <button
            onClick={() => handleItemClick('settings')}
            className={`
              w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
              ${activeItem === 'settings' 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
              }
              ${isCollapsed ? 'justify-center px-2' : ''}
            `}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </button>
          
          <button className={`
            w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
            ${isCollapsed ? 'justify-center px-2' : ''}
          `}>
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ease-in-out shadow-xl md:shadow-none
        ${isCollapsed ? 'w-20' : 'w-80'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;