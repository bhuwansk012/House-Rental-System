import React from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";
const UserList = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      address: "456 Oak Ave, Somewhere, USA",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine St, Elsewhere, USA",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 5,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 6,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 7,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 8,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 9,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 10,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 11,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 12,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 13,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    },
     {
      id: 14,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 15,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 16,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 17,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 18,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }, {
      id: 19,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "111-222-3333",
      address: "321 Elm St, Nowhere, USA",
    }
  ];

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-900  text-center ">Tenants List</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white  rounded-full text-sm">
          <thead>
            <tr className="bg-purple-700 text-white rounded-t-full">
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Phone</th>
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Address</th>
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={` border-gray-200 ${user.id % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>
                <td className="py-2 px-4  rounded-2">{user.name}</td>
                <td className="py-2 px-4  rounded-2">{user.email}</td>
                <td className="py-2 px-4  rounded-2">{user.phone}</td>
                <td className="py-2 px-4  rounded-2">{user.address}</td>
                <td className="py-2 px-4 rounded-2">
                  <button className="text-gray-600 hov er:text-blue-800 mr-3 cursor-pointer">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer">
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