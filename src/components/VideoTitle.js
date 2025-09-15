import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle= ({title,overview}) => {
    return(
        <div className=" w-screen aspect-video pt-36 px-12  absolute text-white bg-gradient-to-r  from-black">
            <h1 className="font-bold text-4xl pt-24 ">{title}</h1>
            <p className="text-lg w-1/4 pt-4" >{overview}</p>
            <div className="flex gap-2 pt-4">
            {/* Play Button */}
            <button className="flex items-center gap-2 bg-white text-black border-black h-8 px-4 rounded-md hover:bg-opacity-80">
                <FaPlay size={18} />
                Play
            </button>

            {/* More Info Button */}
            <button className="flex items-center gap-2 bg-gray-500 bg-opacity-55 text-white h-8 px-4 rounded-md hover:bg-opacity-20">
                <AiOutlineInfoCircle size={20} />
                More Info
            </button>
            </div>



        </div>
    )
}
export default VideoTitle;
