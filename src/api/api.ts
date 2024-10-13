import axios from "axios"
import * as settings from "../settings"

export const paymentCreateApi = async (userId: number, price: number) => {
    try {
        const response = await axios.post(`http://${settings.SERVER_URL}/payment/create-payment`, {
            userId,
            price
        })
        return response.data.url
    } catch (error) {
        console.log(error)
    }

}


export const createFreeSubApi = async (userId: number) => {
    try {
        const response = await axios.post(`http://${settings.SERVER_URL}/payment/free-subscription`, {
            userId
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}