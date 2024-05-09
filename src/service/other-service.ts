import SubscriptionFreeSchema from './../models/free-subscription-model';
import PaymentSchema from './../models/payment-model';
import { Context } from 'grammy';
import UserSchema from '../models/user-model'
import { createFreeSubApi } from '../api/api';
import SubscriptionSchema from '../models/subscription-model';


export const checkUser = async (ctx: Context) => {
    const user = await UserSchema.findOne({ userId: ctx.message?.from.id })

    if (!user) {
        const inviteText = ctx.message?.text as string

        function invite(inviteText: string) {
            if (!/^\/start\s+\d+$/.test(inviteText)) {
                return null;
            }
            const numberString = inviteText.split(" ")[1];
            const numberValue = parseInt(numberString, 10);
            return numberValue
        }


        const user = new UserSchema({
            userId: ctx.message?.from.id,
            inviteId: invite(inviteText),
            username: ctx.message?.from.username,
            first_name: ctx.message?.from.first_name,
            last_name: ctx.message?.from.last_name
        })
        await user.save()
    }
}

export const checkFreeSub = async (userId: number) => {

    const user = await UserSchema.findOne({ userId })
    return user?.useFreeSub ? true : await createFreeSubApi(userId).then(data => {
        if (!data.status) {
            return true
        }
        return false;
    });
}

export const checkPayment = async (userId: number) => {
    const payment = await PaymentSchema.find({ userId, status: 'pending' })
    if (payment.length >= 2) return false
    else return true
}

export const checkTimeSubscribe = async (userId: number) => {
    try {
        const subscriptionFree = await SubscriptionFreeSchema.findOne({ userId, statusSub: true })
        const subscription = await SubscriptionSchema.findOne({ userId, statusSub: true })

        if (subscription) {
            const message = differenceTime(subscription.subExpire)
            return { config: subscription.config, message }
        } else if (subscriptionFree) {
            const message = differenceTime(subscriptionFree.subExpire)
            return { config: subscriptionFree.config, message }
        } else {
            return { message: 'Подписка не найдена!' }
        }
    } catch (error) {
        console.log(error)
    }
}

const differenceTime = (expireDate: Date) => {
    const currentDate = new Date()
    const difference = expireDate.getTime() - currentDate.getTime()

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const daysString = days + " " + pluralize(days, ["день", "дня", "дней"]);
    const hoursString = hours + " " + pluralize(hours, ["час", "часа", "часов"]);

    if (difference < 3600000) {
        return "Подписка закончится в течение часа!"
    } else {
        return `Подписка закончится через: <b>${daysString}</b> и <b>${hoursString}</b>`
    }
}

export const getConfig = async (userId: number) => {
    const subscriptionFree = await SubscriptionFreeSchema.findOne({ userId, statusSub: true })
    const subscription = await SubscriptionSchema.findOne({ userId, statusSub: true })

    if (subscriptionFree) return subscriptionFree.config
    else if (subscription) {
        return subscription.config
    }
}

export const getSubscription = async (userId: number) => {
    const subscriptionFree = await SubscriptionFreeSchema.findOne({ userId, statusSub: true })
    const subscription = await SubscriptionSchema.findOne({ userId, statusSub: true })

    if (subscriptionFree || subscription) return true
    else return false

}


const pluralize = (number: number, forms: string[]) => {
    let formIndex;
    if (number % 10 === 1 && number % 100 !== 11) {
        formIndex = 0;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        formIndex = 1;
    } else {
        formIndex = 2;
    }
    return forms[formIndex];
};

export function simulateAsyncOperation(ms: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Результат асинхронной операции");
        }, ms);
    });
}