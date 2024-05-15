
import { Bot, Context, GrammyError, HttpError, InlineKeyboard, Keyboard } from 'grammy'
import { hydrate, HydrateFlavor } from '@grammyjs/hydrate';
import * as settings from "./settings"
import mongoose from 'mongoose';
import { callbackQueryConnect, commandBuy, commandStart,
 hearsAboutService, hearsAndroid, hearsCheckSubscription, hearsCreatePay, hearsHelp,
 hearsInstructions, hearsInviteFriend, hearsIphone, hearsMainMenu } from './service/command-service';
import { getConfig } from './service/other-service';

type MyContext = HydrateFlavor<Context>
export const bot = new Bot<MyContext>(settings.BOT_TOKEN)
bot.use(hydrate())

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Перезапустить бота'
    },
    {
        command: 'help',
        description: 'Получить помощь'
    },
    {
        command: 'buy',
        description: 'Продлить/купить подписку'
    },
])

bot.command('start', async (ctx: Context) => {
    await commandStart(ctx)
})
bot.command('buy', async (ctx: Context) => {
    await commandBuy(ctx)
})
bot.command('help', async (ctx: Context) => {
    await hearsHelp(ctx)
})


bot.hears('🏠 Главное меню', async (ctx) => {
    await hearsMainMenu(ctx)
})

bot.hears('🔔 Проверить подписку', async (ctx) => {
    await hearsCheckSubscription(ctx)
})

bot.hears('🆘 Помощь', async (ctx) => {
    await hearsHelp(ctx)
})
bot.hears('🎁 Пригласить друга', async (ctx) => {
    await hearsInviteFriend(ctx)
})
bot.hears('ℹ️ Всё о сервисе', async (ctx) => {
    await hearsAboutService(ctx)
})
bot.hears('🗂 Инструкция', async (ctx) => {
    await hearsInstructions(ctx)
})

bot.hears('🔌 Подключиться', async (ctx) => {
    await commandBuy(ctx)
})

bot.hears('1 месяц - 140р', async (ctx) => {
    await hearsCreatePay(ctx, 140)
})

bot.hears('3 месяца - 390р', async (ctx) => {
    await hearsCreatePay(ctx, 390)
})
bot.hears('📱IOS', async (ctx) => {
    await hearsIphone(ctx)
})
bot.hears('🤖Android', async (ctx) => {
    await hearsAndroid(ctx)
})


bot.callbackQuery('connect', async (ctx) => {
    await callbackQueryConnect(ctx)
})

bot.callbackQuery('instructions', async (ctx) => {
    const deviseKeyboard = new InlineKeyboard().text('📱IOS', 'instructions-iphone').text('🤖Android', 'instructions-android')
    await ctx.callbackQuery.message?.editText('Выберите для какого устройства вы хотите настроить VPN?', {
        reply_markup: deviseKeyboard
    })
    await ctx.answerCallbackQuery()
})
bot.callbackQuery('instructions-iphone', async (ctx) => {
    const deviseKeyboard = new InlineKeyboard().text('📹 Посмотреть видео инструкцию', 'video-iphone')
    await ctx.callbackQuery.message?.editText('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
    await ctx.reply('Шаг 2. Установите приложение FoXray из AppStore 👉 https://apps.apple.com/ru/app/foxray/id6448898396', {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply('Шаг 3. Откройте приложение и нажмите на иконку 📋и разрешите вставку из приложения Telegram')
    await ctx.reply('Шаг 4. Нажмите на ▷ напротив появившегося тунеля для VPN')
    await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    await ctx.reply('Еще проще после прочтения посмотреть <b><u>ВИДЕО</u></b> интсрукцию по настройкеVPN', {
        reply_markup: deviseKeyboard,
        parse_mode: 'HTML'
    })
    await ctx.answerCallbackQuery()
})
bot.callbackQuery('instructions-android', async (ctx) => {
    // const deviseKeyboard = new InlineKeyboard().text('Посмотреть видео инструкцию', 'video-android')
    await ctx.callbackQuery.message?.editText('Шаг 1. Скопируйте через долгое нажатие или просто нажмите на сообщение выше 👆')
    await ctx.reply(`
    Шаг 2. Установи приложение v2rayNG из GooglePlay https://play.google.com/store/apps/details?id=com.v2ray.ang

<i>Если у тебя нет Google Play Store на телефоне, то напиши мне @vlad_is_loovee</i>
    `, {
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true }
    })
    await ctx.reply('Шаг 3. Открой установленное приложение, нажми на ➕ в верхней части экрана и выбери "Импорт профиля из буфера обмена')
    await ctx.reply('Шаг 4. Нажми на импортированный туннель, а затем на кнопку ☑ в нижнем правом углу')
    await ctx.reply('🎉VPN настроен и готов к использованию. Спасибо что выбрали <b>VPNinja</b> ❤️', {
        parse_mode: 'HTML'
    })
    await ctx.answerCallbackQuery()
    // await ctx.reply('Еще проще после прочтения посмотреть ВИДЕО интсрукцию по включению VPN', {
    //     reply_markup: deviseKeyboard
    // })
})
bot.callbackQuery('video-iphone', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.replyWithVideo('BAACAgIAAxkBAAIW8mY757iZUjhk4klzIrghQ_FXQ3z-AAKzTQACmt7gSa3vctwskkuKNQQ')
    await ctx.answerCallbackQuery()
})
bot.callbackQuery('open-config', async (ctx) => {
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
})
// bot.callbackQuery('video-android', async (ctx) => {
//     await ctx.deleteMessage()
//     await ctx.replyWithPhoto('AgACAgIAAxkBAAINmmYn5IpYoHE42RlkVJme3cS2_mwTAALW3jEb7jhASZc0brbm5AGiAQADAgADcwADNAQ') // тут будет видео
// })


// bot.on('message', async (ctx) => {
// // await ctx.replyWithVideo('BAACAgIAAxkBAAIW8mY757iZUjhk4klzIrghQ_FXQ3z-AAKzTQACmt7gSa3vctwskkuKNQQ')
// console.log(ctx.message)
// })


bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`); const e = err.error;
    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
    } else {
        console.error('Unknown error:', e);
    }
});


async function start() {
    try {
        await mongoose.connect(settings.DB_URL).then(() => console.log('Mongoose подключен к базе данных.'))
        bot.start()
        console.log('Bot launched successfully')
    } catch (error) {
        console.log(error);
    }
}
start()

