import { Context, InlineKeyboard } from "grammy"
import { bot, MyContext } from "../index"
import * as settings from "../settings"
import { getConfig } from "./other-service"



export const instructionsCQ = async (ctx: MyContext) => {
    const deviseKeyboard = new InlineKeyboard()
        .text('📱IOS', 'instructions-iphone').text('🤖Android', 'instructions-android')
        .row().text('🖥 Windows', "instructions-windows").text('💻 MacOS', 'instructions-macOC')
    if (!ctx.callbackQuery) return
    await ctx.callbackQuery.message?.editText('Выберите для какого устройства вы хотите настроить VPN?', {
        reply_markup: deviseKeyboard
    })
    await ctx.answerCallbackQuery()
}
export const instructionsIphoneCQ = async (ctx: MyContext) => {
    const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-iphone')
    if (!ctx.callbackQuery) return
    await ctx.callbackQuery.message?.editText('<b>Шаг 1.</b> Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆',{
        parse_mode:"HTML"
    })
    await ctx.reply('<b>Шаг 2.</b> Установите приложение v2RayTun из AppStore 👉 https://apps.apple.com/ru/app/v2raytun/id6476628951', {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply('<b>Шаг 3.</b> В приложении v2RayTun на главном экране нажать на + в правом верхнем углу, затем на "Добавить из буфера обмена"/"Import config from clipboard"',{
        parse_mode:"HTML"
    })
    await ctx.reply('<b>Шаг 4.</b> Нажмите  на большую кнопку на главном экране!',{
        parse_mode:"HTML"
    })
    await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройкеVPN', {
        reply_markup: deviseKeyboard,
        parse_mode: 'HTML'
    })
    await ctx.answerCallbackQuery()
}
export const instructionsAndroidCQ = async (ctx: MyContext) => {
    // const deviseKeyboard = new InlineKeyboard().text('Посмотреть видео инструкцию', 'video-android')
    if (!ctx.callbackQuery) return
    await ctx.callbackQuery.message?.editText('<b>Шаг 1.</b> Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆',{
        parse_mode:"HTML"
    })
    await ctx.reply(`
<b>Шаг 2.</b> Установи приложение v2ray из GooglePlay https://play.google.com/store/apps/details?id=com.v2raytun.android

<i>Если у тебя нет Google Play Store на телефоне, то напиши мне ${settings.SUPPORT_NAME}</i>
`, {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply('<b>Шаг 3.</b> Открой установленное приложение, нажми на ➕ в верхней части экрана и выбери "Импорт профиля из буфера обмена',{
        parse_mode:"HTML"
    })
    await ctx.reply('<b>Шаг 4.</b> Нажми на импортированный туннель, а затем на кнопку ☑ в нижнем правом углу',{
        parse_mode:"HTML"
    })
    await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    await ctx.answerCallbackQuery()
    // await ctx.reply('Еще проще после прочтения посмотреть ВИДЕО интсрукцию по включению VPN', {
    //     reply_markup: deviseKeyboard
    // })
}
export const instructionsWindowsCQ = async (ctx: MyContext) => {
    const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-windows')
    if (!ctx.callbackQuery) return
    await ctx.callbackQuery.message?.editText('<b>Шаг 1.</b> Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆', {
        parse_mode: 'HTML'
    })
    await ctx.reply(`<b>Шаг 2.</b> Установите приложение Nekoray на компьтер по этой ссылке 👇

https://github.com/MatsuriDayo/nekoray/releases/download/3.26/nekoray-3.26-2023-12-09-windows64.zip

<b>ВНИМАНИЕ:</b> Перешлите сообщение или просто ссылку выше👆 на компьютер, потому что после нажатия на ссылку сразу начнётся скачивание программы.`, {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply(`<b>Шаг 3.</b> Настройка займет 5 минут! Сссылка на инструкцию которая откроется прямо в телеграме-браузере 👇

https://telegra.ph/1-Ustanovka-i-nastrojka-Nekoray-10-11`, {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true }

    })
    await ctx.reply('Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройке VPN нажав на кнопку ниже!', {
        reply_markup: deviseKeyboard,
        parse_mode: 'HTML'
    })
    await ctx.answerCallbackQuery()
}
export const instructionsMacOcCQ = async (ctx: MyContext) => {
    // const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-iphone')
    if (!ctx.callbackQuery) return
    await ctx.callbackQuery.message?.editText('<b>Шаг 1.</b> Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆',{
        parse_mode:"HTML"
    })
    await ctx.reply('<b>Шаг 2.</b> Установите приложение FoXray из AppStore 👉 https://apps.apple.com/ru/app/foxray/id6448898396?platform=mac', {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply('<b>Шаг 3.</b> Откройте приложение и нажмите на иконку 📋и разрешите вставку из приложения Telegram',{
        parse_mode:"HTML"
    })
    await ctx.reply('<b>Шаг 4.</b> Нажмите на ▷ напротив появившегося тунеля для VPN',{
        parse_mode:"HTML"
    })
    await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    // await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройкеVPN', {
    //     reply_markup: deviseKeyboard,
    //     parse_mode: 'HTML'
    // })
    await ctx.answerCallbackQuery()
}
export const videoIphoneCQ = async (ctx: Context) => {
    await ctx.deleteMessage()
    await ctx.replyWithVideo(settings.VIDEO_INSTRUCRION_IPHONE)
    await ctx.answerCallbackQuery()
}
export const videoIWindowsCQ = async (ctx: Context) => {
    await ctx.deleteMessage()
    await ctx.replyWithVideo(settings.VIDEO_INSTRUCRION_WINDOWS)
    await ctx.answerCallbackQuery()
}
export const openConfigCQ = async (ctx: Context) => {
    const oneMonthInlineBoard = new InlineKeyboard().text('🗂 Инструкция', `instructions`)
    const config = await getConfig(ctx.update.callback_query?.from.id as number)
    if (config) {
        await ctx.deleteMessage()
        await ctx.reply(`<code>${config}</code>`, {
            parse_mode: 'HTML'
        })
        await ctx.reply('Это ваш конфиг ⬆ для VPN, скопируйте его(через долгое нажатие или просто нажмите на сообщение)  и нажмите на кнопку 🗂<b>Инструкция</b>, выберите ваше устройство и подключайтесь к нам!', {
            reply_markup: oneMonthInlineBoard,
            parse_mode: 'HTML'
        })
    } else {
        await ctx.deleteMessage()
        await ctx.reply('Конфиг не найден!')
    }

    await ctx.answerCallbackQuery()
}
// export const videoIAndroidCQ = async (ctx: Context) => {
//     // await ctx.deleteMessage()
//     // await ctx.replyWithVideo(settings.VIDEO_INSTRUCRION_IPHONE)
//     // await ctx.answerCallbackQuery()
// }


