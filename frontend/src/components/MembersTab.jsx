import React from 'react';
import { Plus, Edit, Trash, Trash2 } from 'lucide-react';
import Pagination from './Pagination'; // Import the component

const MembersTab = ({ 
  setShowNewMemberForm,
  currentMembers,
  toggleNewMemberStatus,
  updateMemberStatus,
  handleEditMember,
  deleteMember,
  hardDeleteMember,
  currentPage,
  totalPages,
  totalItems,
  setCurrentPage,
  nextPage,
  prevPage
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Member Management
        </h2>
        <button
          onClick={() => setShowNewMemberForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-800">
                  Member
                </th>
                <th className="text-left p-4 font-semibold text-gray-800">
                  Contact
                </th>
                <th className="text-left p-4 font-semibold text-gray-800">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-800">
                  Joined
                </th>
                <th className="text-left p-4 font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.first_name[0]}
                        {member.last_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {member.first_name} {member.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800">
                      {member.phone || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {member.address || "No address"}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          member.is_new_member
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {member.is_new_member
                          ? "New Member"
                          : "Regular Member"}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          member.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800">
                      {new Date(member.joined_date).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          toggleNewMemberStatus(
                            member.id,
                            member.is_new_member
                          )
                        }
                        className={`px-3 py-1 rounded cursor-pointer text-sm font-medium transition-colors ${
                          member.is_new_member
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {member.is_new_member
                          ? "Mark Regular"
                          : "Mark New"}
                      </button>
                      <button
                        onClick={() =>
                          updateMemberStatus(member.id, {
                            is_active: !member.is_active,
                          })
                        }
                        className={`px-3 py-1 rounded cursor-pointer text-sm font-medium transition-colors ${
                          member.is_active
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {member.is_active ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        onClick={() => handleEditMember(member)}
                        className="px-3 py-1 cursor-pointer rounded text-sm font-medium bg-green-300 text-green-800 hover:bg-green-500 transition-colors"
                        title="Edit member details "
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => deleteMember(member.id)}
                        className="px-3 py-1 cursor-pointer  rounded text-sm font-medium bg-orange-100 text-red-800 hover:bg-red-200 transition-colors"
                        title="Delete member (soft delete)"
                      >
                        <Trash size={18} />
                      </button>
                      <button
                        onClick={() => hardDeleteMember(member.id)}
                        className="px-3 py-1 cursor-pointer rounded text-sm font-medium bg-red-300 text-red-800 hover:bg-red-500 transition-colors"
                        title="Hard delete member (permanently remove)"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          onNext={nextPage}
          onPrev={prevPage}
        />
      </div>
    </div>
  );
};

export default MembersTab;