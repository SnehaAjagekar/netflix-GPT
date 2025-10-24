import { BACKGROUND_IMG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return(
        <div className="overflow-x-hidden">
        <div className="fixed -z-10 w-full h-full">
                <img className="w-full h-full object-cover" src={BACKGROUND_IMG_URL}      
                    alt="backgroundImg"/>
            </div>

        <div className="relative pt-[10%] w-full">
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
        </div>
    )
}
export default GptSearch;