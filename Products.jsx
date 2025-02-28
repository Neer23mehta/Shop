export const getproductdetails = async ({params}) => {
    const id = params.productid;

    const Api = `https://fakestoreapi.com/products/${id}`

    try {
        const res = await fetch (Api)
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error.message)
    }
}
export const getcartdetails = async () => {
    // const id = params.cart;

    const Api = "https://fakestoreapi.com/products/"
     
    try {
        const res = await fetch (Api)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const getbuydetails = async ({params}) => {
    const id = params.cartid

    const Api = `https://fakestoreapi.com/products/${id}`

    try{
        const res = await fetch(Api)
        const data =  await res.json()
        return data
    }
    catch(error){
        console.log(error)
    }

}
export const getbuysdetail =  async ({params}) => {
    const id = params.productid

    const Api =  `https://fakestoreapi.com/products/${id}`

    try{
        const res =  await fetch(Api)
        const data = await res.json()
        return data
    }
    catch (error){
        console.log(error)
    }
}

export const getorderdetail =  async ({params}) => {
    const id = params.productid

    const Api =  `https://fakestoreapi.com/products/${id}`

    try{
        const res =  await fetch(Api)
        const data = await res.json()
        return data
    }
    catch (error){
        console.log(error)
    }
}
