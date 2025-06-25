import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CheckCircle, AlertCircle } from "lucide-react";

const API_BASE = "http://localhost:8000";

const SundayTab = ({ selectedDate, setSelectedDate, stats, setStats }) => {
  // Sunday-specific state
  const [sundayAttendance, setSundayAttendance] = useState(null);
  const [recentSundays, setRecentSundays] = useState([]);
  const [attendanceView, setAttendanceView] = useState('summary');
  const [loading, setLoading] = useState(false);

  // Check if a date is Sunday
  const isSunday = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() === 0; // 0 = Sunday
  };

  // Fetch Sunday attendance summary
  const fetchSundayAttendance = async (date) => {
    if (!date) return;
    
    if (!isSunday(date)) {
      setSundayAttendance(null);
      toast.error('Please select a Sunday for church service attendance');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/attendance/sunday-summary/${date}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Sunday API Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSundayAttendance(data);
      
      // Update main stats with Sunday data
      setStats(prevStats => ({
        ...prevStats,
        today_attendance: data.present_count,
        total_members: data.present_count + data.absent_count,
        attendance_percentage: data.attendance_percentage,
        selected_date_stats: {
          date: date,
          present: data.present_count,
          absent: data.absent_count,
          total: data.present_count + data.absent_count,
          percentage: data.attendance_percentage,
          is_sunday: true
        }
      }));
    } catch (error) {
      console.error('Error fetching Sunday attendance:', error);
      toast.error('Failed to fetch Sunday attendance data');
      setSundayAttendance(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch general attendance for non-Sunday dates
  const fetchGeneralAttendance = async (date) => {
    if (!date || isSunday(date)) return;

    setLoading(true);
    try {
      // Changed endpoint - use a general attendance endpoint instead of sunday-summary
      const response = await fetch(`${API_BASE}/attendance/daily-summary/${date}`);
      if (!response.ok) {
        // If daily-summary doesn't exist, try alternative endpoints
        if (response.status === 404) {
          // Try general attendance endpoint
          const altResponse = await fetch(`${API_BASE}/attendance/summary/${date}`);
          if (!altResponse.ok) {
            console.log('No attendance data available for non-Sunday date');
            // Set empty stats for non-Sunday dates
            setStats(prevStats => ({
              ...prevStats,
              selected_date_stats: {
                date: date,
                present: 0,
                absent: 0,
                total: prevStats.total_members || 0,
                percentage: 0,
                is_sunday: false,
                no_data: true
              }
            }));
            return;
          }
          const data = await altResponse.json();
          updateStatsWithData(data, date);
          return;
        }
        
        const errorText = await response.text();
        console.log('General attendance API Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      updateStatsWithData(data, date);
      
    } catch (error) {
      console.error('Error fetching daily attendance:', error);
      // Don't show error toast for non-Sunday dates, just set empty stats
      setStats(prevStats => ({
        ...prevStats,
        selected_date_stats: {
          date: date,
          present: 0,
          absent: 0,
          total: prevStats.total_members || 0,
          percentage: 0,
          is_sunday: false,
          no_data: true
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  // Helper function to update stats with data
  const updateStatsWithData = (data, date) => {
    setStats(prevStats => ({
      ...prevStats,
      today_attendance: data.present_count || 0,
      total_members: data.total_members || prevStats.total_members,
      attendance_percentage: data.attendance_percentage || 0,
      selected_date_stats: {
        date: date,
        present: data.present_count || 0,
        absent: (data.total_members || 0) - (data.present_count || 0),
        total: data.total_members || 0,
        percentage: data.attendance_percentage || 0,
        is_sunday: false
      }
    }));
  };

  // Fetch recent Sundays
  const fetchRecentSundays = async () => {
    try {
      const response = await fetch(`${API_BASE}/attendance/recent-sundays`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecentSundays(data.recent_sundays);
    } catch (error) {
      console.error('Error fetching recent Sundays:', error);
      toast.error('Failed to fetch recent Sundays');
    }
  };

  // Effect to handle date changes
  useEffect(() => {
    if (selectedDate) {
      if (isSunday(selectedDate)) {
        fetchSundayAttendance(selectedDate);
      } else {
        fetchGeneralAttendance(selectedDate);
        setSundayAttendance(null); // Clear Sunday data for non-Sunday dates
      }
    }
  }, [selectedDate]);

  // Load recent Sundays on component mount
  useEffect(() => {
    fetchRecentSundays();
  }, []);

  // Handle Sunday selection from dropdown
  const handleSundaySelect = (date) => {
    setSelectedDate(date); // This will trigger the useEffect above
  };

  // Sunday Attendance Component
  const SundayAttendanceView = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading attendance data...</span>
          </div>
        </div>
      );
    }

    if (!selectedDate) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sunday Service Attendance</h3>
          <p className="text-gray-500">Select a date to view attendance details</p>
        </div>
      );
    }

    if (!isSunday(selectedDate)) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">Non-Sunday Date Selected</h3>
          <p className="text-yellow-700">
            The selected date ({new Date(selectedDate).toLocaleDateString()}) is not a Sunday. 
            Church service attendance is typically recorded on Sundays.
          </p>
          <p className="text-yellow-600 mt-2">
            {stats.selected_date_stats?.no_data 
              ? "No attendance data available for this date." 
              : "General attendance statistics are shown in the reports above."
            } Select a Sunday for detailed service attendance.
          </p>
        </div>
      );
    }

    if (!sundayAttendance) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">No Data Available</h3>
          <p className="text-red-700">
            No attendance data found for {new Date(selectedDate).toLocaleDateString()}.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800">Service Date</h4>
            <p className="text-2xl font-bold text-blue-900">
              {new Date(sundayAttendance.service_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-blue-600">{sundayAttendance.day_name}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-800">Present</h4>
            <p className="text-2xl font-bold text-green-900">{sundayAttendance.present_count}</p>
            <p className="text-sm text-green-600">Members attended</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-800">Absent</h4>
            <p className="text-2xl font-bold text-red-900">{sundayAttendance.absent_count}</p>
            <p className="text-sm text-red-600">Members absent</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-800">Attendance Rate</h4>
            <p className="text-2xl font-bold text-purple-900">{sundayAttendance?.attendance_percentage}%</p>
            <p className="text-sm text-purple-600">Overall rate</p>
          </div>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setAttendanceView('summary')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              attendanceView === 'summary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setAttendanceView('present')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              attendanceView === 'present'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Present ({sundayAttendance.present_count})
          </button>
          <button
            onClick={() => setAttendanceView('absent')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              attendanceView === 'absent'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Absent ({sundayAttendance.absent_count})
          </button>
        </div>

        {/* Content based on view */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {attendanceView === 'summary' && (
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Service Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Recently Present ({sundayAttendance.present_count})</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sundayAttendance?.present_members.slice(0, 5).map((record) => (
                      <div key={record.id} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm">{record?.member?.first_name} {record?.member?.last_name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(record?.checked_in_at).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                    {sundayAttendance.present_count > 5 && (
                      <p className="text-sm text-gray-500 text-center">
                        +{sundayAttendance.present_count - 5} more members
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Absent ({sundayAttendance.absent_count})</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sundayAttendance.absent_members.slice(0, 5).map((member) => (
                      <div key={member.id} className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                        <AlertCircle className="text-red-500" size={16} />
                        <span className="text-sm">{member.first_name} {member.last_name}</span>
                        {member.is_new_member && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">New</span>
                        )}
                      </div>
                    ))}
                    {sundayAttendance.absent_count > 5 && (
                      <p className="text-sm text-gray-500 text-center">
                        +{sundayAttendance.absent_count - 5} more members
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {attendanceView === 'present' && (
            <div>
              <div className="p-4 bg-green-50 border-b">
                <h4 className="text-lg font-semibold text-green-800">Present Members</h4>
              </div>


              <div className="max-h-96 overflow-y-auto">
                {sundayAttendance.present_members.map((record, index) => {
                  // Debug logging
                  if (index === 0) {
                    console.log('First present member record structure:', record);
                    console.log('Record keys:', Object.keys(record));
                    if (record.member) {
                      console.log('Member object:', record.member);
                    }
                  }
                  
                  // Handle different possible data structures
                  const memberData = record.member || record;
                  const firstName = memberData?.first_name || memberData?.firstName || 'N/A';
                  const lastName = memberData?.last_name || memberData?.lastName || 'N/A';
                  const email = memberData?.email || 'No email';
                  const isNewMember = memberData?.is_new_member || memberData?.isNewMember || false;
                  const checkedInAt = record?.checked_in_at || record?.checkedInAt || new Date();

                  return (
                    <div key={record.id || index} className="flex items-center justify-between p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          {firstName[0]?.toUpperCase() || 'M'}{lastName[0]?.toUpperCase() || 'M'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {firstName} {lastName}
                          </p>
                          <p className="text-sm text-gray-600">{email}</p>
                          {isNewMember && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                              New Member
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(checkedInAt).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-gray-500">Check-in time</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
             

            </div>
          )}

          {attendanceView === 'absent' && (
            <div>
              <div className="p-4 bg-red-50 border-b">
                <h4 className="text-lg font-semibold text-red-800">Absent Members</h4>
              </div>


              <div className="max-h-96 overflow-y-auto">
                {sundayAttendance.absent_members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.first_name[0]}{member.last_name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {member.first_name} {member.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex space-x-2 mt-1">
                          {member.is_new_member && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              New Member
                            </span>
                          )}
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Absent
                          </span>
                        </div>
                      </div>
                    </div>


                    <div className="text-right">
                      <p className="text-sm text-gray-500">No attendance</p>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Sunday Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Sunday Selection</h3>
        <div className="flex items-center space-x-3 mb-4">
          <select
            value={selectedDate}
            onChange={(e) => handleSundaySelect(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a Sunday</option>
            {recentSundays.map((sunday) => (
              <option key={sunday.date} value={sunday.date}>
                {new Date(sunday.date).toLocaleDateString()} - {sunday.attendance_count} present ({sunday.percentage}%)
              </option>
            ))}
          </select>
        </div>

        {/* Recent Sundays Quick View */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {recentSundays.map((sunday) => (
            <div
              key={sunday.date}
              onClick={() => handleSundaySelect(sunday.date)}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedDate === sunday.date ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <p className="text-sm font-medium text-gray-600">
                {new Date(sunday.date).toLocaleDateString()}
              </p>
              <p className="text-xl font-bold text-gray-800">{sunday.attendance_count}</p>
              <p className="text-sm text-gray-500">
                {sunday.percentage}% attendance
              </p>
            </div>
          ))}
        </div>
      </div>

      <SundayAttendanceView />
    </div>
  );
};

export default SundayTab;