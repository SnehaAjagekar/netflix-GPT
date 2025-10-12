const GptSearchBar = () => {
    return (
    <div>
        <form className="flex  justify-center items-center bg-black bg-opacity-70 rounded-md">
             <input placeholder="Search for a movie..." className="p-3 m-2 w-80   bg-gray-950 border  border-purple-300 bg-opacity-70 text-white rounded-md"/>
             <button className="p-3 mr-2 w-20 border bg-red-700 text-white  border-purple-300 rounded-md">Search</button>
        </form>
    </div>
);
};
export default GptSearchBar;

