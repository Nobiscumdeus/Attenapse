import React from 'react';
import SundayTab from './SundayTab'; // Import the component

const ReportsTab = ({ 
  selectedDate, 
  setSelectedDate, 
  stats, 
  setStats 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Attendance Reports
        </h2>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {selectedDate && (
            <span className="text-sm text-gray-600">
              {new Date(selectedDate).getDay() === 0
                ? "🟢 Sunday"
                : "🔵 Weekday"}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedDate ? "Selected Date Summary" : "Today's Summary"}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Present</span>
              <span className="font-semibold text-green-600">
                {stats.selected_date_stats?.present ||
                  stats.today_attendance ||
                  0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold">
                {stats.selected_date_stats?.total ||
                  stats.total_members ||
                  0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rate</span>
              <span
                className={`font-semibold ${
                  (stats.selected_date_stats?.percentage ||
                    stats.attendance_percentage ||
                    0) >= 75
                    ? "text-green-600"
                    : (stats.selected_date_stats?.percentage ||
                        stats.attendance_percentage ||
                        0) >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {stats.selected_date_stats?.percentage ||
                  stats.attendance_percentage ||
                  0}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Member Categories
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">New Members</span>
              <span className="font-semibold">
                {stats.new_members || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Regular Members</span>
              <span className="font-semibold">
                {(stats.total_members || 0) - (stats.new_members || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Active</span>
              <span className="font-semibold">
                {stats.total_members || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Date Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Day Type</span>
              <span className="font-semibold">
                {selectedDate
                  ? new Date(selectedDate).getDay() === 0
                    ? "Sunday Service"
                    : "Regular Day"
                  : new Date().getDay() === 0
                  ? "Sunday Service"
                  : "Regular Day"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Present</span>
              <span className="font-semibold text-green-600">
                {stats.selected_date_stats?.present ||
                  stats.today_attendance ||
                  0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Absent</span>
              <span className="font-semibold text-red-600">
                {stats.selected_date_stats?.absent ||
                  (stats.total_members || 0) -
                    (stats.today_attendance || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span
                className={`font-semibold px-2 py-1 rounded-full text-xs ${
                  (stats.selected_date_stats?.percentage ||
                    stats.attendance_percentage ||
                    0) >= 75
                    ? "bg-green-100 text-green-800"
                    : (stats.selected_date_stats?.percentage ||
                        stats.attendance_percentage ||
                        0) >= 50
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {(stats.selected_date_stats?.percentage ||
                  stats.attendance_percentage ||
                  0) >= 75
                  ? "Excellent"
                  : (stats.selected_date_stats?.percentage ||
                      stats.attendance_percentage ||
                      0) >= 50
                  ? "Good"
                  : "Needs Attention"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Date-specific Information Panel */}
      {selectedDate && (
        <div
          className={`rounded-xl shadow-lg p-6 ${
            new Date(selectedDate).getDay() === 0
              ? "bg-blue-50 border border-blue-200"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              new Date(selectedDate).getDay() === 0
                ? "text-blue-800"
                : "text-gray-800"
            }`}
          >
            Selected Date: {new Date(selectedDate).toLocaleDateString()}(
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
            )
          </h3>
          <p
            className={`text-sm ${
              new Date(selectedDate).getDay() === 0
                ? "text-blue-700"
                : "text-gray-700"
            }`}
          >
            {new Date(selectedDate).getDay() === 0
              ? "This is a Sunday - Church service attendance data is available below."
              : "This is a weekday - General attendance statistics are shown. For detailed service attendance, please select a Sunday."}
          </p>
          {stats.selected_date_stats?.error && (
            <p className="text-red-600 text-sm mt-2">
              ⚠️ No attendance data found for this date.
            </p>
          )}
        </div>
      )}

      {/* Enhanced Attendance History Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Attendance History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Date
                </th>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Day
                </th>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Present
                </th>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Total
                </th>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Rate
                </th>
                <th className="text-left p-3 font-semibold text-gray-800">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Current/Selected Date Row */}
              <tr
                className={`border-b border-gray-100 ${
                  selectedDate ? "bg-blue-50" : "bg-green-50"
                }`}
              >
                <td className="p-3 font-medium">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                  {selectedDate && (
                    <span className="ml-2 text-xs text-blue-600">
                      (Selected)
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                      })
                    : new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  {stats.selected_date_stats?.present ||
                    stats.today_attendance ||
                    0}
                </td>
                <td className="p-3">
                  {stats.selected_date_stats?.total ||
                    stats.total_members ||
                    0}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (stats.selected_date_stats?.percentage ||
                        stats.attendance_percentage ||
                        0) >= 75
                        ? "bg-green-100 text-green-800"
                        : (stats.selected_date_stats?.percentage ||
                            stats.attendance_percentage ||
                            0) >= 50
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stats.selected_date_stats?.percentage ||
                      stats.attendance_percentage ||
                      0}
                    %
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (
                        selectedDate
                          ? new Date(selectedDate).getDay() === 0
                          : new Date().getDay() === 0
                      )
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {(
                      selectedDate
                        ? new Date(selectedDate).getDay() === 0
                        : new Date().getDay() === 0
                    )
                      ? "Sunday Service"
                      : "Regular Day"}
                  </span>
                </td>
              </tr>

              {/* Sample historical data - replace with actual data from your API */}
              <tr className="border-b border-gray-100">
                <td className="p-3">
                  {new Date(
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">Sunday</td>
                <td className="p-3 text-green-600 font-semibold">45</td>
                <td className="p-3">60</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    75%
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Sunday Service
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <td className="p-3">
                  {new Date(
                    Date.now() - 14 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="p-3">Sunday</td>
                <td className="p-3 text-green-600 font-semibold">42</td>
                <td className="p-3">60</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    70%
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Sunday Service
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sunday Service Details Component */}
      <SundayTab
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        stats={stats}
        setStats={setStats}
      />
    </div>
  );
};

export default ReportsTab;