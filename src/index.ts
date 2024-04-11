import { Bot, Context, InlineKeyboard, Keyboard } from 'grammy'
import * as settings from "./settings"
import mongoose from 'mongoose';
import { checkUser } from './service/start-service';
import { connectInlineBoard, connectKeyBoard, startKeyBoard } from './service/keyboard-service';
import { paymentCreate } from './api/api';


export const bot = new Bot(settings.BOT_TOKEN)

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
    await checkUser(ctx)
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

❗Вам предоставляется бесплатных 3 дня что бы опробовать VPN, нажмите <b>🔌 Подключится</b> и следуйте инструкции!

Узнай больше в разделе <b>ℹ️ Всё о сервисе</b>
`, {
        reply_markup: connectInlineBoard,
        parse_mode: "HTML"
    })
})

bot.hears('🏠 Главное меню', async (ctx) => {
    await ctx.reply('Главное меню', {
        reply_markup: startKeyBoard,
    })
})

bot.hears('🆘 Помощь', async (ctx) => {
    await ctx.reply('Оплатите!fdgdfgdf', {
        // reply_markup: inlineKeyboard
    })
})

bot.hears('🔌 Подключиться', async (ctx) => {
    await ctx.reply(`Для подключения:

1.Выбери необходимый тариф
2.Внеси платеж
3.И получи ключ с простой инструкций для своего устройства 😉`, {
        reply_markup: connectKeyBoard
    })
})



bot.hears('1 месяц - 140р', async (ctx) => {
    const url = await paymentCreate(ctx.message?.from.id as number, 140)
    console.log(url)
    const oneMonthInlineBoard = new InlineKeyboard().url('💳  Оплатить 140р', `${url}`)
    await ctx.reply('Нажми на кнопку: "Оплатить", оплати 140₽   и возвращайся в бота за  VPN😉', {
        reply_markup: oneMonthInlineBoard
    })
})


bot.hears('3 месяца - 390р', async (ctx) => {
    const treeMonthInlineBoard = new InlineKeyboard()
        .url('💳  Оплатить 390р', 'https://www.testlink.com')
    await ctx.reply('Нажми на кнопку: "Оплатить", оплати 390₽   и возвращайся в бота за  VPN😉', {
        reply_markup: treeMonthInlineBoard
    })
})

bot.hears('Хочу впн', async (ctx) => {
    await ctx.reply('Вот ваш vpn конфиг для FoXray')

})






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

