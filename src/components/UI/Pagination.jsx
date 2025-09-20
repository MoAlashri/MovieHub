import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6 mb-5">
      <button className="px-3 text-2xl py-1 rounded-md bg-gray-200 hover:bg-gray-300">
        <MdOutlineKeyboardArrowLeft />
      </button>
      <button className="px-3 py-1 rounded-md bg-yellow-400 text-white font-bold">
        1
      </button>
      <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
        2
      </button>
      <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
        3
      </button>
      <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
        4
      </button>
      <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
        5
      </button>

      <span className="px-2">...</span>

      <button className="px-3 py-1  text-2xl rounded-md bg-gray-200 hover:bg-gray-300">
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
}
