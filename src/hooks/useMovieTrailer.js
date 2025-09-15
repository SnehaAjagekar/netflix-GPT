
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONs } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    
    const getMovieVideos = async () => {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, 
                API_OPTIONs
            );
            const json = await data.json();
            
            // Filter to find the trailer (usually type "Trailer")
            const trailer = json.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            
            // Fallback to first video if no trailer found
            dispatch(addTrailerVideo(trailer || json.results[0]));
        } catch (error) {
            console.error("Error fetching movie videos:", error);
        }
    };
    
    useEffect(() => {
        if (movieId) {
            getMovieVideos();
        }
    }, [movieId]); // Add movieId as dependency
}

export default useMovieTrailer;











// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addTrailerVideo } from "../utils/movieSlice";
// import { API_OPTIONs } from "../utils/constants";

// const useMovieTrailer = (movieId) => {
//      const dispatch = useDispatch();
//     const getMovieVideos = async () => {
//         const data = await fetch(
//             "https://api.themoviedb.org/3/movie/"
//             + movieId+
//             "/videos?language=en-US", API_OPTIONs)
//         const json = await data.json();
//         console.log("json",json);

//         const trailer = json.results[0];
//         console.log("trailer",trailer)
//         dispatch(addTrailerVideo(trailer))
//     };
//     useEffect(() => {
//         getMovieVideos();
//     }, []);
    
// }

// export default useMovieTrailer;