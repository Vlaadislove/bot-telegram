import { Context } from 'grammy';
import UserSchema from '../models/user-model'


export const checkUser = async (ctx: Context) =>{
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