
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret';

interface JWT {
    id: string;
}

export function getUser(token: string) {
    const { id } = jwt.verify(token, JWT_SECRET) as JWT;
    return id;
}

export function getToken(id: string) {
    const user: JWT = {
        id
    };
    return jwt.sign(user, JWT_SECRET);
}