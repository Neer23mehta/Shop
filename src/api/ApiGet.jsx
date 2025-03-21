export const apiGet =async () => {
    const api = "https://www.omdbapi.com/?i=tt3896198&apikey=1c12799f&s=titanic&page=1"

    try{
        const res = await fetch(api)
        const data = await res.json()
        return(data)
    }
    catch(error){
        console.log(error)
    }
}

export const getApi = async () => {
    const api = "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"

    try {
        const res = await fetch (api)
        const data = await res.json()
        return (data)
    } catch (error) {
        console.error(error)
    }
}