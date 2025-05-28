import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const Postqc = () => {
  const { data, isError, isLoading, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('http://localhost:4001/users'),
    staleTime: 30000, // 30 seconds
    // refetchInterval: 1000
    refetchIntervalInBackground: true,
  });

  console.log(isLoading,isFetching)
  console.log("ids",data)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-blue-600">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User List</h1>
      <div className="max-w-3xl mx-auto grid gap-6">
        {data?.data.map((item, index) => (
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
    </div>
  );
};

export default Postqc;
