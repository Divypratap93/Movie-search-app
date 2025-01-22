export default function Popup({selectCard, selectedMovie}){

   

    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={()=>selectCard()}>
          <div className="bg-emerald-950 rounded-lg shadow-lg w-6/12 h-5/6 flex flex-col gap-2 px-16 pb-16 ">
                <button
                  onClick={()=>selectCard()}
                  className=" mr-0 mt-4 text-white rounded-full hover:font-extrabold  w-6 place-self-end font-bold"
                >
                  X
                </button>
          <img 
          className="w-full h-64 object-contain object-top"
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${selectedMovie.poster_path}`}></img>
            
                <h2 className="text-xl font-semibold mb-4 text-white">{selectedMovie.title}</h2>
                <p className="text-slate-400 font-REGULAR">RELEASE DATE: {selectedMovie.release_date}</p>
                <p className="text-sm font-semibold text-yellow-400">RATING: ⭐{selectedMovie.vote_average}</p>
                <p className="text-white overflow-y-auto max-h-60 ">{selectedMovie.overview}</p>
            
          </div>
        </div>
        </>
    )
}