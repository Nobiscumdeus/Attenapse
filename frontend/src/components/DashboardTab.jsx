import React from 'react';
import { Users, UserPlus, CheckCircle, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';

const DashboardTab = ({ stats, attendance }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h2>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={stats.total_members || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="New Members"
          value={stats.new_members || 0}
          icon={UserPlus}
          color="green"
        />
        <StatCard
          title="Recorded Attendance"
          value={stats.today_attendance || 0}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendance_percentage || 0}%`}
          icon={BarChart3}
          color="orange"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {attendance.slice(0, 5).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-medium text-gray-800">
                  {record.member.first_name} {record.member.last_name}
                </span>
                {record.member.is_new_member && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {new Date(record.checked_in_at).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {attendance.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No attendance marked today
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;