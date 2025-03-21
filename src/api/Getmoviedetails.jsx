export const getMovieDetails =async ({params}) => {
    console.log(params);
    const id = params.movieID;
    const api = `https://www.omdbapi.com/?i=${id}&apikey=1c12799f`

    try{
        const res = await fetch(api)
        const data = await res.json()
        return(data)
    }
    catch(error){
        console.log(error)
    }
}