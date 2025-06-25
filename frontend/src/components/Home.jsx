//.................................. Imports .....................................
import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Calendar,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Settings,
  Edit,
  Trash,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditMemberModal from "./EditModal";
import SundayTab from "./SundayTab";
const API_BASE = "http://localhost:8000";
import NewMemberForm from "./NewMemberForm";
import StatCard from "./StatCard";
import TabButton from "./TabButton";
import Pagination from "./Pagination";
import usePagination from "../CustomHooks/usePagination";
import DashboardTab from "./DashboardTab";
import ReportsTab from "./ReportsTab";
import AttendanceTab from "./AttendanceTab";
import MembersTab from "./MembersTab";

const ChurchAttendanceSystem = () => {
  console.log("Component is rendering!"); // Add this line
  //............................ State Variables....................................
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewMemberForm, setShowNewMemberForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  //....................................... Use Effects .....................................
  useEffect(() => {
    fetchMembers();
    fetchStats();
    fetchAttendance();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    resetPage();
  }, [searchTerm]);

  //......................................Function to handle member editing ...............
  // 2. Fix the handleEditMember function
  const handleEditMember = (member) => {
    setEditingMember(member);
    setShowEditModal(true);
  };

  // 3. Function to Update member
  const handleUpdateMember = async (updatedData) => {
    try {
      const response = await fetch(`${API_BASE}/members/${updatedData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Try to read as text first
        try {
          // If it might be JSON
          const jsonError = JSON.parse(errorData);
          throw new Error(
            jsonError.detail || jsonError.message || "Update failed"
          );
        } catch {
          // If not JSON
          throw new Error(errorData || "Update failed");
        }
      }

      // Check if response has content
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 0) {
        const updatedMember = await response.json();
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          )
        );
      } else {
        // If no content, just update the local state with what we sent
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === updatedData.id
              ? { ...member, ...updatedData }
              : member
          )
        );
      }

      setShowEditModal(false);
      setEditingMember(null);
      toast.success("Member updated successfully!");
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error(
        error.message || "Failed to update member, please try again later"
      );
    }
  };

  // 4. Add error handling to fetch functions
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API_BASE}/members/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMembers(data);
      console.log("Fetched members:", data.length); // Debug log
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to fetch members. Please try again later.");
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${API_BASE}/attendance/today`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAttendance(data);
      console.log("Fetched attendance:", data.length); // Debug log
    } catch (error) {
      console.error("Failed to fetch attendance", error);
      toast.error("Failed to fetch attendance. Please try again later.");
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats/summary`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data);
      console.log("Fetched stats:", data); // Debug log
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to fetch statistics.");
    }
  };

  const markAttendance = async (memberId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/attendance/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_id: memberId,
          service_date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Only fetch attendance and stats, don't fetch members again
        await fetchAttendance();
        await fetchStats();
        toast.success("Attendance marked successfully!");
      } else {
        const error = await response.json();
        toast.error(error.detail || "Failed to mark attendance");
      }
    } catch (error) {
      toast.error("Failed to mark attendance. Please try again later");
      console.error("Error marking attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNewMemberStatus = async (memberId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}/members/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_new_member: !currentStatus,
        }),
      });

      if (response.ok) {
        fetchMembers();
        fetchStats();
      }
    } catch (error) {
      toast.error("Failed to update member status. Please try again later.");
      console.error("Error updating member status:", error);
    }
  };

  //..........................Function to add a new member ...............................
  const addNewMember = async (memberData) => {
    try {
      const response = await fetch(`${API_BASE}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });
      if (response.ok) {
        await fetchMembers();
        await fetchStats();
        setShowNewMemberForm(false);
        toast.success("Member added successfully!");
      } else {
        const errorData = await response.json();
        console.error(errorData.detail);
        toast.error("Failed to add member, please try again r");
      }
    } catch (error) {
      toast.error(`Failed to add new member`, error);

      console.error(error);
    }
  };

  //............................Function to deactivate member ..................................
  const deleteMember = async (memberId) => {
    if (
      !confirm(
        "Are you sure you want to deactivate this member? This will mark them as inactive."
      )
    )
      return;

    try {
      // Use soft delete (regular delete endpoint) instead of hard delete
      const response = await fetch(`${API_BASE}/members/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMembers();
        await fetchStats();
        toast.success("Member deactivated successfully");
      } else {
        toast.error("Failed to deactivate member. Please try again");
      }
    } catch (error) {
      toast.error("Failed to deactivate member");
      console.error("Failed to delete member", error);
    }
  };

  //Function to permamently delete user
  const hardDeleteMember = async (memberId) => {
    if (
      !confirm(
        "⚠️ WARNING: Are you sure you want to PERMANENTLY DELETE this member? This action cannot be undone and will remove all their data including attendance records."
      )
    )
      return;

    //Double confirmation for hard delete

    if (
      !confirm(
        "This is your final warning. Clicking OK will PERMANENTLY DELETE this member and ALL associated data. This cannot be reversed. Are you absolutely sure?"
      )
    )
      return;

    try {
      const response = await fetch(`${API_BASE}/members/${memberId}/hard`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMembers();
        await fetchStats();
        toast.success("Member permamnently deleted ");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error(errorData.detail);
        toast.error("Failed to delete member,please try again");
      }
    } catch (error) {
      toast.error("Failed to delete member");
      console.error("Failed to hard delete member ", error);
    }
  };

  //........................................Function to Update member status..........................
  const updateMemberStatus = async (memberId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/members/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        fetchMembers();
        fetchStats();
        toast.success("Member updated successfully");
      } else {
        toast.error("Failed to update member ");
      }
    } catch (error) {
      toast.error("Failed to update member");
      console.error("Error updating member: ", error);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      `${member.first_name} ${member.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentItems: currentMembers,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    nextPage,
    prevPage,
    resetPage,
  } = usePagination(filteredMembers, 10);

  const isMarked = (memberId) => {
    return attendance.some((record) => record.member_id === memberId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Youth Attendance
                </h1>
                <p className="text-gray-600 text-sm">
                  Church Management System
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Today's Date</p>
              <p className="font-semibold text-gray-800">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-2 space-y-2 flex-wrap ">
            <TabButton
              id="dashboard"
              label="Dashboard"
              icon={BarChart3}
              isActive={activeTab === "dashboard"}
              onClick={setActiveTab}
            />
            <TabButton
              id="attendance"
              label="Mark Attendance"
              icon={CheckCircle}
              isActive={activeTab === "attendance"}
              onClick={setActiveTab}
            />
            <TabButton
              id="members"
              label="Members"
              icon={Users}
              isActive={activeTab === "members"}
              onClick={setActiveTab}
            />
            <TabButton
              id="reports"
              label="Reports"
              icon={Calendar}
              isActive={activeTab === "reports"}
              onClick={setActiveTab}
            />
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab == "dashboard" && (
          <DashboardTab stats={stats} attendance={attendance} />
        )}

        {activeTab === "attendance" && (
          <AttendanceTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredMembers={filteredMembers}
            isMarked={isMarked}
            markAttendance={markAttendance}
            loading={loading}
          />
        )}

        {activeTab === "members" && (
          <MembersTab
            setShowNewMemberForm={setShowNewMemberForm}
            currentMembers={currentMembers}
            toggleNewMemberStatus={toggleNewMemberStatus}
            updateMemberStatus={updateMemberStatus}
            handleEditMember={handleEditMember}
            deleteMember={deleteMember}
            hardDeleteMember={hardDeleteMember}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            setCurrentPage={setCurrentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            // Pagination removed - now imported directly
          />
        )}

        {activeTab === "reports" && (
          <ReportsTab
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            stats={stats}
            setStats={setStats}
            // SundayTab removed - now imported directly
          />
        )}
      </main>

      {/* ................................... New Member Form Modal........................ */}
      {showNewMemberForm && (
        <NewMemberForm
          onSubmit={addNewMember}
          onCancel={() => setShowNewMemberForm(false)}
        />
      )}

      {/* ......................................Edit member modal form .......................*/}

      {showEditModal && editingMember && (
        <EditMemberModal
          member={editingMember}
          onSubmit={handleUpdateMember}
          onCancel={() => {
            setShowEditModal(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
};

export default ChurchAttendanceSystem;
