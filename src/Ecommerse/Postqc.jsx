import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

const fetchUsers = async ({signal}) => {
  const res = await axios.get('http://localhost:4001/users',{signal});
  return res.data;
};

const Postqc = () => {
  const [filter, setFilter] = useState('');
  const queryClient = useQueryClient();
  const querysClient = new QueryClient();
  
  const { data, isError, isLoading, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchUsers,
    staleTime: 3000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  // Filter locally
  const filteredData = data?.filter((user) => {
    const fullName = `${user.firstname} ${user.middlename} ${user.lastname}`.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTerm = filter.toLowerCase();
    return fullName.includes(searchTerm) || username.includes(searchTerm);
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">User List</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-lg font-semibold text-blue-600">Loading users...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-lg font-semibold text-red-500">
            Error: {error.message}
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto grid gap-6">
          {filteredData?.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {item.firstname} {item.middlename} {item.lastname}
              </h2>
              <p className="text-gray-600 mt-2">📱 {item.mobilenumber}</p>
              <p className="text-gray-600">👤 {item.username}</p>
              <NavLink to={`/neer/${item.id}`}>View More</NavLink>
            </div>
          ))}
        </div>
      )}

      {isFetching && !isLoading && (
        <p className="text-center text-sm text-gray-500 mt-4">Refreshing data...</p>
      )}
    </div>
  );
};

export default Postqc;
