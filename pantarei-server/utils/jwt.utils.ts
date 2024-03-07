import {sign, verify} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = (id: string) => {
    let JWT = sign({id}, JWT_SECRET, {
        expiresIn: '1h',
    });
    return JWT;
}

export const verifyToken = async (token: string) => {
    try {
        const decodedJWT = verify(token, JWT_SECRET);
        return decodedJWT;
    } catch (error) {
        return false;
    }
};
