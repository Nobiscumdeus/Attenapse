import React from 'react';
import { Search, CheckCircle } from 'lucide-react';

const AttendanceTab = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredMembers, 
  isMarked, 
  markAttendance, 
  loading 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Mark Attendance
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Youth Members
          </h3>
          <p className="text-gray-600 text-sm">
            Click to mark attendance for today's service
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredMembers.map((member) => {
            const marked = isMarked(member.id);
            return (
              <div
                key={member.id}
                className={`flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  marked ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      marked ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {member.first_name[0]}
                    {member.last_name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {member.first_name} {member.last_name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {member.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {member.is_new_member && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          New Member
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => markAttendance(member.id)}
                  disabled={marked || loading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    marked
                      ? "bg-green-100 text-green-800 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {marked ? (
                    <span className="flex items-center space-x-1">
                      <CheckCircle size={16} />
                      <span>Present</span>
                    </span>
                  ) : (
                    "Mark Present"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;