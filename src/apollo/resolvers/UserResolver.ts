
import { Mutation, Query, Resolver, Arg, ID, Authorized, Ctx } from 'type-graphql';
import { User } from '../../entities/User';
import bcrypt from 'bcrypt';
import { ApolloContext } from '../apolloServer';
import { getToken } from '../../auth/userToken';

@Resolver()
export default class UserResolver {
    @Query(() => User)
    async User(
        @Arg('id') id: string
    ) {
        return await User.findOne({ id });
    }
    @Authorized()
    @Query(() => User)
    async currentUser(
        @Ctx() ctx: ApolloContext
    ) {
        return await User.findOne({ id: ctx.user });
    }

    @Mutation(() => User, { nullable: true })
    async register(
        @Arg('id') id: string,
        @Arg('password') password: string,
        @Arg('nickname') nickname: string
    ) {
        if(await User.findOne({ id })) return null;

        const userO = new User();
        userO.id = id;
        userO.password = await bcrypt.hash(password, await bcrypt.genSalt());
        userO.nickname = nickname;
        await userO.save();

        return userO;
    }
    @Query(() => String, { nullable: true })
    async login(
        @Arg('id') id: string,
        @Arg('password') password: string
    ) {
        const user = await User.findOne({ id });
        
        if(!user)
            return null;

        if(await bcrypt.compare(password, user.password)) {
            return getToken(id);
        } else {
            return null;
        }
    }
}