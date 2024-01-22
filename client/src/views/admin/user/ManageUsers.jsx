import { apiGetAllUsers } from 'apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const fetchUsers = async (params) => {
      const response = await apiGetAllUsers(params);
      if (response.success) setResponse(response);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="h-[75px] flex items-center text-3xl font-bold px-4 ">
        <span>Manage User</span>
      </h1>
      <div className="px-4">
        <table className="table-auto mb-1.5 text-left w-full px-4">
          <thead className="font-bold bg-gray-700 text-[13px]  text-white">
            <tr className="border border-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created at</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {response?.users?.map((e, index) => (
              <tr key={e._id} className="border border-gray-500">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{e.email}</td>
                <td className="py-2 px-4">{`${e.firstName} ${e.lastName}`}</td>
                <td className="py-2 px-4">{e.mobile}</td>
                <td className="py-2 px-4">{e.role}</td>
                <td className="py-2 px-4">
                  {e.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-2 px-4">
                  {moment(e.createdAt).format('DD/MM/YYYY')}
                </td>
                <td className="py-2 px-4">
                  <span className="px-2 text-orange-500 hover:underline cursor-pointer">
                    Edit
                  </span>
                  <span className="px-2 text-orange-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
