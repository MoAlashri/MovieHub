import { IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <header className='flex items-center justify-between py-4 bg-yellow-300 px-8  m-2  rounded'>
      <h1 className=' text-xl font-extrabold '>Movie App</h1>
      <ul className='flex items-center gap-3 text-lg font-semibold'>
        <li className='flex items-center   gap-1'>
          Eng <IoIosArrowDown />
        </li >
        <li className='flex items-center gap-1 content-center '>
          <FaHeart className='text-red-500 text-xl' /> Watchlist
        </li>
      </ul>
    </header>
  )
}
