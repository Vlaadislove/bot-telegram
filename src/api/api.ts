import axios from "axios"


export const paymentCreateApi = async (userId: number, price: number) => {
    try {
        const response = await axios.post('http://localhost:3000/payment/create', {
            userId,
            price
        })
        // console.log('response', response.data)
        return response.data.url
    } catch (error) {
        console.log(error)
    }

}


export const createFreeSubApi = async (userId: number) => {

    try {
        const response = await axios.post(`http://localhost:3000/payment/free-subscription`, {
            userId
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}