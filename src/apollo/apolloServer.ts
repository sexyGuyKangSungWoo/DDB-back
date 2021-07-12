
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { AuthChecker, buildSchema } from 'type-graphql';
import { getUser } from '../auth/userToken';
import UserResolver from './resolvers/UserResolver';

export interface ApolloContext {
    user?: string;
}

const authChecker: AuthChecker<ApolloContext> = (
    { root, args, context: { user }, info },
    roles
) => {
    if(roles.length === 0) {
        return user !== undefined;
    }
    return false;
};

function context({ req }: ExpressContext): ApolloContext {
    const token = req.headers.authorization || '';

    try {
        const user = getUser(token);
        return { user };
    } catch(e) {
        return {};
    }
};

export async function getApolloServer() {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver
            ],
            authChecker
        }),
        context
    });

    return apolloServer;
}