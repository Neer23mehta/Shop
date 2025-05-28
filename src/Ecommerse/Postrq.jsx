import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Infinitequeries from './Infinitequeries';

const Postrq = () => {
  const [datas, setDatas] = useState("");
  const { neerid } = useParams();  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['neers', neerid],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4001/users/${neerid}`);
      return res.data;
    },
    enabled: !!neerid, 
    staleTime: 10000,
  });

//   const fetchIds = async ({neersId}) => {
//     try {
//         const res = await axios.get(`http://localhost:4001/users/${neersId}`)
//         setDatas(res.data)
//     } catch (error) {
//         console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchIds();
//   },[])

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error ).message}</p>;

  console.log("neers", datas);
  console.log("neerId:", neerid);

  return (
    <div>
      <h2>Postrq</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>
       */}
       <div>
        <Infinitequeries/>
       </div>
    </div>
  );
};

export default Postrq;
