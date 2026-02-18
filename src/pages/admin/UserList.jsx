import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {getPublicData} from '../../service/publicService';

const UserList = () => {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getPublicData();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


   

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-900 text-center">
        Tenants List
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className='py-3 px-6 text-left'>ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={user.id % 2 === 0 ? "bg-gray-300" : "bg-white"}>
                <td className='py-2 px-4'>{user.id}</td>
                <td className="py-2 px-4">{user.fullName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-6">
                  <button className="text-gray-600 hover:text-blue-800 mr-3 cusrsor-pointer">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer" onClick={() => deletingUser(user.id)}>
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default UserList
