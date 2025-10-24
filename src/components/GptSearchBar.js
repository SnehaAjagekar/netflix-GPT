import { useRef, useState,  } from "react";
import { API_OPTIONs } from "../utils/constants";
import { useDispatch} from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => { // Added movie parameter
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONs
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const userInput = searchText.current.value.trim();
    if (!userInput) return alert("Please enter a query!");

    console.log("Search text is:", userInput);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Act as a Movie Recommendation system and suggest 5 movies for: ${userInput}. Give only names, comma separated.`,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      // The Gemini API returns the text inside candidates[0].content.parts[0].text
      const output =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini.";

      console.log("Gemini Response:", output);
      setResponse(output);

      // Process the TMDB data after getting the response
      const movieNames = output.split(",").map((name) => name.trim());
      const tmdbData = await Promise.all(
        movieNames.map((movie) => searchMovieTMDB(movie))
      );
      console.log("TMDB data is: ", tmdbData);
      dispatch(addGptMovieResult({movieNames: movieNames, movieResults: tmdbData}));


    } catch (err) {
      console.error("Error calling Gemini proxy:", err);
      setResponse("Something went wrong while contacting Gemini API.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <form
        className="flex justify-center items-center bg-gradient-to-r from-red-900/70 to-red-900/70 backdrop-blur-sm rounded-lg shadow-2xl border border-purple-400/30 p-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          placeholder="What would you like to watch today?"
          className="p-4 m-1 w-80 md:w-96 bg-black/60 border border-purple-500/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-300"
        />
        <button
          className="p-4 mx-2 w-24 bg-gradient-to-r from-purple-900 to-purple-900 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 border border-purple-400/30"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;









// import { useRef, useState,  } from "react";
// import { API_OPTIONs } from "../utils/constants";
// import { useDispatch} from "react-redux";
// import { addGptMovieResult } from "../utils/gptSlice";

// const GptSearchBar = () => {
//   const searchText = useRef(null);
//   const [response, setResponse] = useState("");
//   const dispatch = useDispatch();

//   const searchMovieTMDB = async (movie) => { // Added movie parameter
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       API_OPTIONs
//     );
//     const json = await data.json();
//     return json.results;
//   };

//   const handleGptSearchClick = async () => {
//     const userInput = searchText.current.value.trim();
//     if (!userInput) return alert("Please enter a query!");

//     console.log("Search text is:", userInput);

//     try {
//       const res = await fetch("http://localhost:5000/api/gemini", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt: `Act as a Movie Recommendation system and suggest 5 movies for: ${userInput}. Give only names, comma separated.`,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Server error: ${res.status}`);
//       }

//       const data = await res.json();

//       // The Gemini API returns the text inside candidates[0].content.parts[0].text
//       const output =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "No response from Gemini.";

//       console.log("Gemini Response:", output);
//       setResponse(output);

//       // Process the TMDB data after getting the response
//       const movieNames = output.split(",").map((name) => name.trim());
//       const tmdbData = await Promise.all(
//         movieNames.map((movie) => searchMovieTMDB(movie))
//       );
//       console.log("TMDB data is: ", tmdbData);
//       dispatch(addGptMovieResult({movieNames: movieNames, movieResults: tmdbData}));


//     } catch (err) {
//       console.error("Error calling Gemini proxy:", err);
//       setResponse("Something went wrong while contacting Gemini API.");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center mt-10">
//       <form
//         className="flex justify-center items-center bg-black bg-opacity-70 rounded-md"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchText}
//           placeholder="Search for a movie..."
//           className="p-3 m-2 w-80 bg-gray-950 border border-purple-300 bg-opacity-70 text-white rounded-md"
//         />
//         <button
//           className="p-3 mr-2 w-20 border bg-red-700 text-white border-purple-300 rounded-md"
//           onClick={handleGptSearchClick}
//         >
//           Search
//         </button>
//       </form>
      
//     </div>
//   );
// };

// export default GptSearchBar;




// import { useRef } from "react";
// import { GoogleGenAI } from "@google/genai";

// const GptSearchBar = () => {
    
//     const searchText = useRef(null);
//     const handleGptSearchClick = async() => {
//         console.log("search text is: ", searchText.current.value)
//         // API call to be made
//         const ai = new GoogleGenAI({
//                 apiKey: process.env.GEMINI_API_KEY
//             });

//         const gptResults  = await ai.models.generateContent({
//             model: "gemini-2.5-flash-lite",
//             contents: "Explain how AI works in a few words",
//         });
//         console.log("gpt Results" + gptResults.text);
//     }   
    

//     return (


//     <div>
//         <form className="flex  justify-center items-center bg-black bg-opacity-70 rounded-md"
//               onSubmit={(e) => e.preventDefault()}>
//              <input 
//              ref={searchText}
//              placeholder="Search for a movie..." 
//              className="p-3 m-2 w-80   bg-gray-950 border  border-purple-300 bg-opacity-70 text-white rounded-md"/>
//              <button 
//              className="p-3 mr-2 w-20 border bg-red-700 text-white  border-purple-300 rounded-md"
//              onClick = {handleGptSearchClick}
//              >Search</button>
//         </form>
//     </div>
//  );
// }
// export default GptSearchBar;

