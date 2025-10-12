import { BACKGROUND_IMG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return(
        <>
        <div className="absolute" >
            <img className="h-screen w-screen -cover" src ={BACKGROUND_IMG_URL} alt="logo" />
        </div>

        <div className="relative flex flex-col justify-center items-center pt-20">
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
        </>
    )
}
export default GptSearch;