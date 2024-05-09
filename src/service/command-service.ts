import { Context, InlineKeyboard, Keyboard } from "grammy"
import { connectInlineBoard, connectKeyBoard, startKeyBoard } from "./keyboard-service"
import { checkFreeSub, checkPayment, checkTimeSubscribe, checkUser, getConfig, getSubscription, simulateAsyncOperation } from "./other-service"
import { paymentCreateApi } from "../api/api"


export const commandStart = async (ctx: Context) => {
    await checkUser(ctx)
    await ctx.reply(`Привет ${ctx.message?.from.first_name}!`, {
        reply_markup: startKeyBoard
    })
    await ctx.reply(`<b>VPNinja</b>  — предоставит вам доступ в Интернет без ограничений.

<i>Преобретая подписку вы получаете:</i>

🚀 Высокую скорость и стабильное подключение
🏴‍☠️ Доступ к любым ресурсам
🥸 Полную анонимность
🔐 Устойчивость к блокировкам
💳 Оплата в рублях

❗Вам предоставляется бесплатных <b>2</b> дня что бы попробовать наш VPN, нажмите <b>🔌 Подключится</b> и следуйте инструкции!

Узнай больше в разделе <b>ℹ️ Всё о сервисе</b>
`, {
        reply_markup: connectInlineBoard,
        parse_mode: "HTML"
    })
}
export const commandBuy = async (ctx: Context) => {
    const data = await checkFreeSub(ctx.message?.from.id as number)
    if (data) {
        await ctx.reply(`Для подключения:

<b>1.</b> Выбери необходимый тариф
<b>2.</b> Внеси платеж
<b>3.</b> И получи ключ с простой инструкций для своего устройства для <b>Iphone/Android</b> 😉`, {
            reply_markup: connectKeyBoard,
            parse_mode: 'HTML'
        })
    }
}
export const hearsMainMenu = async (ctx: Context) => {
    await ctx.reply(`Привет ${ctx.message?.from.first_name}!`, {
        reply_markup: startKeyBoard
    })
    await ctx.reply(`<b>VPNinja</b>  — предоставит вам доступ в Интернет без ограничений.

Преобретая подписку вы получаете:
    
🚀 Высокую скорость и стабильное подключение
🏴‍☠️ Доступ к любым ресурсам
🥸 Полную анонимность
🔐 Устойчивость к блокировкам
💳 Оплата в рублях
    
❗Вам предоставляется бесплатных <b>2</b> дня что бы попробовать наш VPN, нажмите <b>🔌 Подключится</b> и следуйте инструкции!
    
Узнай больше в разделе <b>ℹ️ Всё о сервисе</b>
    `, {
        reply_markup: connectInlineBoard,
        parse_mode: "HTML"
    })
}
export const hearsCheckSubscription = async (ctx: Context) => {
    const checkSubscriptionInlineBoard = new InlineKeyboard().text('👀 Посмотреть конфиг с инструкцией', 'open-config')
    const data = await checkTimeSubscribe(ctx.message?.from.id as number)
    if (data) {
        await ctx.reply(`${data.message}`, {
            parse_mode: 'HTML'
        })
        if (data.config) await ctx.reply('Если вы потеряли конфиг от вашего VPN Нажмите на кнопку ниже!', {
            reply_markup: checkSubscriptionInlineBoard
        })
    } else {
        await ctx.reply(`Что то пошло не так`)
    }

}
export const hearsCreatePay = async (ctx: Context, price: number) => {
    const payment = await checkPayment(ctx.message?.from.id as number)
    if (!payment) {
        await ctx.reply('Нельзя создать больше 2 счетов на оплату в час!')
        return
    }
    const url = await paymentCreateApi(ctx.message?.from.id as number, price)
    console.log(url)
    const oneMonthInlineBoard = new InlineKeyboard().url(`💳  Оплатить ${price}р`, `${url}`)
    const mainMenuKeyboard = new Keyboard().text('🏠 Главное меню').resized()
    await ctx.reply(`Также вы можете перевести по номеру телефона, Тинькофф/Сбербанк или СБП написав мне @vlad_is_loovee`, {
        reply_markup: mainMenuKeyboard
    })
    await ctx.reply(`Нажми на кнопку: "Оплатить", оплати ${price}₽   и возвращайся в бота за  VPN😉`, {
        reply_markup: oneMonthInlineBoard
    })

}
export const hearsHelp = async (ctx: Context) => {
    await ctx.reply('С предложениями об улучшении функционала и по другим вопросам, пишите нам в поддержку @vlad_is_loovee')
}
export const hearsInviteFriend = async (ctx: Context) => {
    await ctx.reply('Перешли сообщение ниже ⬇ своему другу и после того как он оплатит подписку вы получите <b>7</b> дней в подарок! ✳<i><u>ваша подписка продлится <b>ТОЛЬКО</b> при наличии у вас действующей подписки(даже бесплатной)</u></i>', {
        parse_mode: 'HTML'
    })
    await ctx.reply(`Переходи в <b>VPNinja</b>  👉 https://t.me/vpn_test_vlad_bot?start=${ctx.message?.from.id}

    Xray Proxy от <b>VPNinja</b> — твой проводник в Интернет без ограничений.
    
    🏴‍☠️ Доступ к любым соц. сетям
    🥷 Устойчивость к блокировкам
    🥸 Полную анонимность
    💳 Оплата в рублях`, {
        parse_mode: 'HTML',
        // link_preview_options: {is_disabled: true}
    })
}
export const hearsAboutService = async (ctx: Context) => {
    const aboutServiceKeyBoard = new Keyboard()
        .text('🔌 Подключиться')
        .row().text('🎁 Пригласить друга')
        .row().text('🏠 Главное меню')
        .resized()
    await ctx.replyWithPhoto('AgACAgIAAxkBAAIYsGY895n15RXUGMGoshjRxR18UZuMAALD4DEboPjpSTgXtf-IN1HzAQADAgADeAADNQQ', {
        reply_markup: aboutServiceKeyBoard
    })
    await simulateAsyncOperation(1000)
    await ctx.reply(`
🌐Добро пожаловать в  <b>VPNinja</b>, наш сервис представляет собой VPN телеграм бот, который\
 маршрутизирует весь трафик через современный сервер в Нидерландах.\
 Вся передача данных защищена сквозным шифрованием, и мы не собираем и не храним никакую личную информацию. Мы предлагаем постоянный IP-адрес,\
что снижает риск блокировки аккаунтов из-за частой смены IP.

✈️В прикреплённых фото выше результат Speedtest c включенным VPN(скорость интернета без VPN - 100Mbit/s) как видно по фото потеря скорости минимальна!

🎁Так же можно получить 7 дней к подписки за каждого приглашенного друга, если он оплатит себе подписку вы получите <b>7</b> дней в подарок!\
✳<i><u>ваша подписка продлится <b>ТОЛЬКО</b> при наличии у вас действующей подписки(даже бесплатной)</u></i>

⚡<u>Мы предоставляем 2 дня бесплатного пользования, чтобы ты мог оценить все преимущества\
нашего сервиса перед обычными VPN из AppStore или Google Play</u>.
Для подключения достаточно нажать кнопку <b>🔌 Подключится</b> и следовать инструкции.`, {
        parse_mode: 'HTML',
    })
}
export const hearsInstructions = async (ctx: Context) => {
    const sub = await getSubscription(ctx.message?.from.id as number)
    if (sub) {
        const deviseKeyBoard = new Keyboard().text('📱IOS').text('🤖Android').row().text('🏠 Главное меню').resized()
        await ctx.reply('Выберите устройство на котором будете использовать VPN', {
            parse_mode: "HTML",
            reply_markup: deviseKeyBoard
        })
    } else {
        await ctx.reply('У вас нет подписки или она истекла. Нажмите кнопку <b>🔌 Подключится</b> что бы приобрести подписку!', {
            parse_mode: "HTML"
        })
    }
}
export const hearsIphone = async (ctx: Context) => {
    const sub = await getSubscription(ctx.message?.from.id as number)
    if (sub) {
        const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-iphone')
        const mainMenuKeyboard = new Keyboard().text('🏠 Главное меню').resized()
        const config = await getConfig(ctx.message?.from.id as number)
        await ctx.reply(`<code>${config}</code>`, {
            parse_mode: 'HTML'
        })
        await ctx.reply('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
        await ctx.reply('Шаг 2. Установите приложение FoXray из AppStore 👉 https://apps.apple.com/ru/app/foxray/id6448898396', {
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true }
        })
        await ctx.reply('Шаг 3. Откройте приложение и нажмите на иконку 📋и разрешите вставку из приложения Telegram')
        await ctx.reply('Шаг 4. Нажмите на ▷ напротив появившегося тунеля для VPN')
        await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
            parse_mode: 'HTML',
            reply_markup: mainMenuKeyboard
        })
        await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройкеVPN', {
            reply_markup: deviseKeyboard,
            parse_mode: 'HTML'
        })
    } else {
        await ctx.reply('У вас нет подписки или она истекла. Нажмите кнопку <b>🔌 Подключится</b> что бы приобрести подписку!', {
            parse_mode: "HTML"
        })
    }
}
export const hearsAndroid = async (ctx: Context) => {
    const sub = await getSubscription(ctx.message?.from.id as number)
    if (sub) {
        const mainMenuKeyboard = new Keyboard().text('🏠 Главное меню').resized()
        const config = await getConfig(ctx.message?.from.id as number)
        await ctx.reply(`<code>${config}</code>`, {
            parse_mode: 'HTML'
        })
        await ctx.reply('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
        await ctx.reply(`
    Шаг 2. Установи приложение v2rayNG из GooglePlay https://play.google.com/store/apps/details?id=com.v2ray.ang

<i>Если у тебя нет Google Play Store на телефоне, то напиши мне @vlad_is_loove</i>
    `, {
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true }
        })
        await ctx.reply('Шаг 3. Открой установленное приложение, нажми на ➕ в верхней части экрана и выбери "Импорт профиля из буфера обмена')
        await ctx.reply('Шаг 4. Нажми на импортированный туннель, а затем на кнопку ☑ в нижнем правом углу')
        await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
            parse_mode: 'HTML',
            reply_markup: mainMenuKeyboard
        })
    } else {
        await ctx.reply('У вас нет подписки или она истекла. Нажмите кнопку <b>🔌 Подключится</b> что бы приобрести подписку!', {
            parse_mode: "HTML"
        })
    }
}
export const callbackQueryConnect = async (ctx: Context) => {
    const data = await checkFreeSub(ctx.update.callback_query?.from.id as number)

    if (data) {
        await ctx.reply(`Для подключения:

<b>1.</b> Выбери необходимый тариф
<b>2.</b> Внеси платеж
<b>3.</b> И получи ключ с простой инструкций для своего устройства для <b>Iphone/Android</b> 😉`, {
            reply_markup: connectKeyBoard,
            parse_mode: 'HTML'
        })
    }
    await ctx.answerCallbackQuery()
}

// export const callbackQueryInstructions = async (ctx: Context) => {
//     const deviseKeyboard = new InlineKeyboard().text('📱IOS', 'instructions-iphone').text('🤖Android', 'instructions-android')
//     await ctx.callbackQuery.message?.editText('Выберите для какого устройства вы хотите настроить VPN?', {
//         reply_markup: deviseKeyboard
//     })
//     await ctx.answerCallbackQuery()
// }
// export const callbackQueryInstructionsIphone = async (ctx: Context) => {
//     const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-iphone')
//     await ctx.callbackQuery.message?.editText('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
//     await ctx.reply('Шаг 2. Установите приложение FoXray из AppStore 👉 https://apps.apple.com/ru/app/foxray/id6448898396', {
//         parse_mode: 'HTML',
//         link_preview_options: { is_disabled: true }
//     })
//     await ctx.reply('Шаг 3. Откройте приложение и нажмите на иконку 📋и разрешите вставку из приложения Telegram')
//     await ctx.reply('Шаг 4. Нажмите на ▷ напротив появившегося тунеля для VPN')
//     await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
//         parse_mode: 'HTML'
//     })
//     await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройкеVPN', {
//         reply_markup: deviseKeyboard,
//         parse_mode: 'HTML'
//     })
//     await ctx.answerCallbackQuery()
// }
// export const callbackQueryInstructionsAndroid = async (ctx: Context) => {
//     // const deviseKeyboard = new InlineKeyboard().text('Посмотреть видео инструкцию', 'video-android')
//     await ctx.callbackQuery.message?.editText('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
//     await ctx.reply(`
// Шаг 2. Установи приложение v2rayNG из GooglePlay https://play.google.com/store/apps/details?id=com.v2ray.ang

// <i>Если у тебя нет Google Play Store на телефоне, то напиши мне @vlad_is_loove</i>
// `, {
//         parse_mode: 'HTML',
//         link_preview_options: { is_disabled: true }
//     })
//     await ctx.reply('Шаг 3. Открой установленное приложение, нажми на ➕ в верхней части экрана и выбери "Импорт профиля из буфера обмена')
//     await ctx.reply('Шаг 4. Нажми на импортированный туннель, а затем на кнопку ☑ в нижнем правом углу')
//     await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
//         parse_mode: 'HTML'
//     })
//     await ctx.answerCallbackQuery()
//     // await ctx.reply('Еще проще после прочтения посмотреть ВИДЕО интсрукцию по включению VPN', {
//     //     reply_markup: deviseKeyboard
//     // })
// }
// export const callbackQueryOpenConfig = async (ctx: Context) => {
//     const oneMonthInlineBoard = new InlineKeyboard().text('🗂 Инструкция', `instructions`)
//     const config = await getConfig(ctx.update.callback_query?.from.id as number)
//     if (config) {
//         await ctx.deleteMessage()
//         await ctx.reply(`<code>${config}</code>`, {
//             parse_mode: 'HTML'
//         })
//         await ctx.reply('Это ваш конфиг ⬆ для VPN, скопируйте его(через долгое нажатие или просто нажмите на сообщение)  и нажмите на кнопку 🗂<b>Инструкция</b>, выберите ваше устройство и подключайтесь к нам!', {
//             reply_markup: oneMonthInlineBoard,
//             parse_mode: 'HTML'
//         })
//     } else {
//         await ctx.deleteMessage()
//         await ctx.reply('Конфиг не найден!')
//     }

//     await ctx.answerCallbackQuery()
// }



