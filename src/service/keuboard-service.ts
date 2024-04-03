import { InlineKeyboard, Keyboard } from "grammy";

export const startKeyBoard = new Keyboard()
    .text('Подключиться').row()
    .text('Проверить подписку')
    .row().text('ℹ️ Всё о сервисе')
    .row().text('Пригласить друга')
    .row().text('🆘 Помощь')
    .resized()


export const connectBoard = new Keyboard()
    .text('Купить/продлить подписку')
    .row().text('Главное меню')
    .resized()

export const buyBoard = new Keyboard()
    .text('1 месяц - 140р')
    .text('3 месяца - 390р')
    .row().text('Главное меню')
    .resized()

export const oneMonthBoard = new InlineKeyboard()
    .url('Оплатить 140р', 'https://www.testlink.com')
    .text('Проверить оплату', 'Не оплачено')

export const treeMonthBoard = new InlineKeyboard()
    .url('Оплатить 390р', 'https://www.testlink.com')
    .text('Проверить оплату', 'Не оплачено')