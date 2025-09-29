import React from 'react';
import { BarChart3, Users, ShoppingCart, DollarSign } from 'lucide-react';
import Sidebar from './Sidebar';

const SidebarDemo = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Total Revenue',
                value: '$45,231.89',
                change: '+20.1%',
                icon: DollarSign,
                color: 'text-green-500',
                bgColor: 'bg-green-50 dark:bg-green-900/20'
              },
              {
                title: 'Active Users',
                value: '2,350',
                change: '+180.1%',
                icon: Users,
                color: 'text-blue-500',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20'
              },
              {
                title: 'Sales',
                value: '+12,234',
                change: '+19%',
                icon: ShoppingCart,
                color: 'text-purple-500',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20'
              },
              {
                title: 'Performance',
                value: '+573',
                change: '+201%',
                icon: BarChart3,
                color: 'text-orange-500',
                bgColor: 'bg-orange-50 dark:bg-orange-900/20'
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Placeholder */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Analytics Overview
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Chart would go here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', time: '2 minutes ago', color: 'bg-green-500' },
                  { action: 'Payment received', time: '5 minutes ago', color: 'bg-blue-500' },
                  { action: 'New order placed', time: '10 minutes ago', color: 'bg-purple-500' },
                  { action: 'System backup completed', time: '1 hour ago', color: 'bg-gray-500' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo;