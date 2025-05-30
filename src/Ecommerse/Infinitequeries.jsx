import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const LIMIT = 5;

const Infinitequeries = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['new'], 
    queryFn: async ({pageParam}) => {
      const res = await axios.get(`http://localhost:4001/new?_start=${pageParam}&_limit=${LIMIT}`)
      return res.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    
  });

  const mutation = useMutation({
    mutationFn: async ({post}) => {
      const res = await axios.post('http://localhost:4001/new',post)
      return res.data
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries('new',(oldQueryData)=>{
        return {
            ...oldQueryData,
            data: [...oldQueryData.data, {...newData.data, id:oldQueryData.data.length+1}]
        }
      });
      setName('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`http://localhost:4001/new/${id}`)
      return res.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries(['new']);
        // setName(prev => prev.id !== id);
    }
  })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Infinite "New" Items</h1>

      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            mutation.mutate({ name });
          }}
          className="flex gap-2 items-center"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new item name"
            className="border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        </form>
      </div>

      {data.pages.map((page, i) => (
        <div key={i}>
          {page.map((item) => (
            <div
              key={item.id}
              className="mb-2 p-2 border border-gray-300 rounded"
            >
              <p>ID: {item.id}</p>
              <p>Name: {item.name}</p>
              <button onClick={() => deleteMutation.mutate(item.id)} className='text-red-500'>Delete-List</button>
            </div>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'No More Items'}
        </button>
      </div>
    </div>
  );
};

export default Infinitequeries;
