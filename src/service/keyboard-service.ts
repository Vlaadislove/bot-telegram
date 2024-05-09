import { InlineKeyboard, Keyboard } from "grammy";

export const startKeyBoard = new Keyboard()
    .text('🔌 Подключиться').row()
    .text('🔔 Проверить подписку')
    .row().text('🗂 Инструкция')
    .text('ℹ️ Всё о сервисе')
    .row().text('🎁 Пригласить друга')
    .row().text('🆘 Помощь')
    .resized()

export const connectKeyBoard = new Keyboard()
    .text('1 месяц - 140р')
    .text('3 месяца - 390р')
    .row().text('🏠 Главное меню')
    .resized()

export const connectInlineBoard = new InlineKeyboard()
    .text('🔌Подключиться', 'connect')