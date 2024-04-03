import { Bot, Context, InlineKeyboard, Keyboard } from 'grammy'
import * as settings from "./settings"
import { addClient, login } from './api/api';
import mongoose from 'mongoose';
import { checkUser } from './service/start-service';
import { buyBoard, connectBoard, oneMonthBoard, startKeyBoard, treeMonthBoard } from './service/keuboard-service';


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
    await ctx.reply(`<b>Miracle VPN</b>  — предоставит вам доступ в Интернет без ограничений.

Преобретая подписку вы получаете:

🚀 Высокую скорость и стабильное подключение

🏴‍☠️ Доступ к любым ресурсам

🥸 Полную анонимность

🔐 Устойчивость к блокировкам

💳 Оплата в рублях

❗Вам предоставляется бесплатных 3 дня что бы опробовать VPN, нажмите <b>Подключится</b> и следуйте инструкции!
`, {
        reply_markup: startKeyBoard,
        parse_mode: "HTML"
    })
    // console.log('Context', ctx.message?.from)
})

bot.hears('Главное меню', async (ctx) => {
    await ctx.reply('Главное меню', {
        reply_markup: startKeyBoard
    })
})

bot.hears('🆘 Помощь', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
        .url('Оплатить 150р', 'https://www.nu.nl/')
        .text('Проверить оплату', 'Не оплачено')

    await ctx.reply('Оплатите!fdgdfgdf', {
        reply_markup: inlineKeyboard
    })

})

bot.hears('Подключиться', async (ctx) => {
    await ctx.reply('Подключится', {
        reply_markup: connectBoard
    })
})
bot.hears('Купить/продлить подписку', async (ctx) => {
    await ctx.reply(`Для подключения:

    1.Выбери необходимый тариф
    2.Внеси платеж
    3.И получи ключ с простой инструкций для своего устройства 😉`,
        {
            reply_markup: buyBoard
        })
    // await addClient(ctx.from?.id as number)
})
bot.hears('1 месяц - 140р', async (ctx) => {
    await ctx.reply('Нажми на кнопку: "Оплатить", оплати 140₽   и возвращайся в бота за  VPN😉', {
        reply_markup: oneMonthBoard
    })
    // await addClient(ctx.from?.id as number)
})
bot.hears('3 месяца - 390р', async (ctx) => {
    await ctx.reply('Нажми на кнопку: "Оплатить", оплати 390₽   и возвращайся в бота за  VPN😉', {
        reply_markup: treeMonthBoard
    })
    // await addClient(ctx.from?.id as number)
})




async function start() {
    try {
        await mongoose.connect(settings.DB_URL).then(() => console.log('Mongoose подключен к базе данных.'))
        bot.start()
        console.log('Bot launched successfully')
        login()
    } catch (error) {
        console.log(error);
    }
}

start()

