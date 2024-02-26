import {hash, compare} from 'bcrypt';

export const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 8);
    return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
}