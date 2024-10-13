import dotenv from 'dotenv'
dotenv.config()


export const BOT_TOKEN = process.env.BOT_TOKEN || ' '

export const DB_URL = process.env.DB_URL || ''
export const SERVER_URL = process.env.SERVER_URL || ''

export const FREE_DAY = process.env.FREE_DAY || ''
export const DAY_FOR_INVITE = process.env.DAY_FOR_INVITE|| ''

export const SUPPORT_NAME = process.env.SUPPORT_NAME || ''
export const NAME_TG_BOT = process.env.NAME_TG_BOT || ''

export const VIDEO_INSTRUCRION_IPHONE = process.env.VIDEO_INSTRUCRION_IPHONE || ''
export const VIDEO_INSTRUCRION_WINDOWS = process.env.VIDEO_INSTRUCRION_WINDOWS || ''
export const PHOTO_SPEED_INTERNET = process.env.PHOTO_SPEED_INTERNET || ''



export const ADMIN_ID = Number(process.env.ADMIN_ID) || 0





