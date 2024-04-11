import axios from "axios"


export const paymentCreate = async (userId:number, price:number) => {
    const response = await axios.post('http://localhost:3000/payment/create',{
        userId,
        price
    })
    // console.log('response', response.data)
    return response.data.url
}