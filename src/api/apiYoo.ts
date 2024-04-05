import { YooCheckout, ICreatePayment, ICapturePayment } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({
    shopId: '361706',
    secretKey: 'test_LRtVZfzCDW6kMhCUJQdKikyYtwVw2rD1PUVExxuSPrE'
});



export const createPayment = async () => {

    const idempotenceKey = '12337fc4-a1f0-49db-807e-f0d67c2ed5a5'

    const createPayload: ICreatePayment = {
        amount: {
            value: '2.00',
            currency: 'RUB'
        },
        payment_method_data: {
            type: 'bank_card'
        },
        confirmation: {
            type: 'redirect',
            return_url: 'test'
        }
    };

    try {
        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        console.log(payment)
    } catch (error) {
        console.error(error);
    }
}

export const getPayment = async () => {

    const paymentId = '2da25d82-000f-5000-9000-1d962c129cf1';

    try {
        const payment = await checkout.getPayment(paymentId);
        console.log(payment)
    } catch (error) {
        console.error(error);
    }

}



export const capturePayment = async () => {

    const idempotenceKey = '12337fc4-a1f0-49db-807e-f0d67c2ed5a5'
    const paymentId = '2da25d82-000f-5000-9000-1d962c129cf1'

    const capturePayload: ICapturePayment = {
        amount: {
            value: '2.00',
            currency: 'RUB'
        }
    };
    try {
        const payment = await checkout.capturePayment(paymentId, capturePayload, idempotenceKey);
        console.log(payment)
    } catch (error) {
        console.error(error);
    }
}