import { NextApiResponse } from 'next';
import mockDb from './db.json';

export type User = {username: string, funds: number, auth: string};
type Schema = Array<User>;
type SeachableKeys = 'username' | 'auth';

const db: Schema = mockDb;

export const getUsingUsername = (value: string): User | undefined => {
    return get('username', value)
}

export const setUsingUsername = (value: string,  user: User) => {
    set('username', value, user)
}

const get = (key: SeachableKeys, value: string): User | undefined => {
    return db.find(x => x[key] === value);
}

const set = (key: SeachableKeys, value: string, user: User) => {
    const index = db.findIndex(x => x[key] === value);
    if(index !== -1){
        db[index] = user;
    } else {
        db.push(user);
    }
}

export const displayFunds = () => {
    
    console.clear();
    console.log('All available funds:');
    db.map(x => console.log(x.username, ':', x.funds));
}


export default db;