import React from 'react'
import { CiHeart } from "react-icons/ci";
import VoteProgressCircle from './VoteProgressCircle';
import {useNavigate} from 'react-router-dom'

export default function MovieCard({movieId, name, vote, src }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Movie-details/${movieId}`);
  };

  return (
    <div 
    onClick={handleClick}
    className='w-[250px]  bg-white rounded-lg rounded-t-3xl m-2 shadow-lg hover:scale-105 duration-300 cursor-pointer relative'>
      <img src={`https://image.tmdb.org/t/p/w500${src}`} className='w-100 rounded-3xl rounded-b-none h-[250px] mb-6' alt="" />
      <div className='p-2 bg-gray-800 rounded-full absolute w-11 h-11 top-[235px] left-5  flex items-center justify-center '>
        <VoteProgressCircle  value={vote} />
      </div>
      <h3 className='p-2 font-bold text-sm text-slate-900'>{name}</h3>
      <div className='flex items-center justify-between p-2 pt-0 text-gray-400'>
        <p >sep 25 , 2025</p>
        <CiHeart className='text-xl' />
      </div>
    </div >
  )
}
