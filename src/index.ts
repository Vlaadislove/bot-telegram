import { Bot, Context, GrammyError, HttpError, InlineKeyboard, Keyboard } from 'grammy'
import { hydrate, HydrateFlavor } from '@grammyjs/hydrate';
import * as settings from "./settings"
import mongoose from 'mongoose';
import {
    callbackQueryConnect, commandBuy, commandStart,
    hearsAboutService, hearsAndroid, hearsCheckSubscription, hearsCreatePay, hearsHelp,
    hearsInstructions, hearsInviteFriend, hearsIphone, hearsMacOC, hearsMainMenu,
    hearsWindows
} from './service/command-service';
import { instructionsAndroidCQ, instructionsCQ, instructionsIphoneCQ, instructionsMacOcCQ, instructionsWindowsCQ, openConfigCQ, videoIphoneCQ, videoIWindowsCQ } from './service/callbackQuery-service';


export type MyContext = HydrateFlavor<Context>
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

bot.hears('🔌 Подключиться / Оплатить', async (ctx) => {
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
bot.hears('🤖 Android', async (ctx) => {
    await hearsAndroid(ctx)
})
bot.hears('🖥 Windows', async (ctx) => {
    await hearsWindows(ctx)
})
bot.hears('💻 MacOS', async (ctx) => {
    await hearsMacOC(ctx)
})


//callbackQury
bot.callbackQuery('connect', async (ctx) => {
    await callbackQueryConnect(ctx)
})

bot.callbackQuery('instructions', async (ctx) => {
    await instructionsCQ(ctx)
})
bot.callbackQuery('instructions-iphone', async (ctx) => {
    await instructionsIphoneCQ(ctx)
})

bot.callbackQuery('instructions-windows', async (ctx) => {
    await instructionsWindowsCQ(ctx)
})
bot.callbackQuery('instructions-macOC', async (ctx) => {
    await instructionsMacOcCQ(ctx)
})

bot.callbackQuery('instructions-android', async (ctx) => {
    await instructionsAndroidCQ(ctx)
})

bot.callbackQuery('open-config', async (ctx) => {
    await openConfigCQ(ctx)
})
bot.callbackQuery('video-iphone', async (ctx) => {
    await videoIphoneCQ(ctx)
})

bot.callbackQuery('video-windows', async (ctx) => {
    await videoIWindowsCQ(ctx)
})
// bot.callbackQuery('video-android', async (ctx) => {

// })

bot.on('message:media', async (ctx) => {
    if (ctx.from.id === settings.ADMIN_ID) {
        if (ctx.message && ctx.message.photo && ctx.message.photo[0]) {
            console.log('photo', ctx.message.photo[0].file_id)
            await ctx.reply(`photo: ${ctx.message.photo[0].file_id}`)
        } else if (ctx.message.video?.file_id) {
            console.log('video', ctx.message.video.file_id)
            await ctx.reply(`video: ${ctx.message.video.file_id}`)
        }
    } else {

        await ctx.reply('Кажется, я не знаю эту команду. Введите /start, чтобы попасть в главное меню.')
        bot.api.sendMessage(settings.ADMIN_ID, `
Message from user: Попытка отправить видео или фото

ID: ${ctx.from.id},
First_name: ${ctx.from.first_name},
Last_name: ${ctx.from.last_name},
Username: @${ctx.from.username},
`)
    }
})

bot.on('message', async (ctx) => {
    await ctx.reply('Кажется, я не знаю эту команду. Введите /start, чтобы попасть в главное меню.')
    bot.api.sendMessage(settings.ADMIN_ID, `
Message from user: ${ctx.message.text}

ID: ${ctx.from.id},
First_name: ${ctx.from.first_name},
Last_name: ${ctx.from.last_name},
Username: @${ctx.from.username},
`)
})

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

