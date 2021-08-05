import { NextApiResponse } from "next";
import { displayFunds, setUsingUsername, User } from "../../mock/funds-db";

export const verify = (body: any, res: NextApiResponse) => {
    const TOKEN = "SafeBankingIsGoodBanking";
    if(body.token !== TOKEN){
        res.status(401);
        res.statusMessage = "Gateway not allowed to make requests";
        res.end();
        return false;
    }
    return true;
}
export const addFunds = (user: User | undefined, value: number, auth: string | undefined, res: NextApiResponse) => {
    
    if(value < 0 && user?.auth !== auth) {
        res.status(401);
        res.statusMessage = "Users can only remove their own funds";
    } else if (user) {
        setUsingUsername(user.username, {...user, funds: user.funds+value})
        res.status(200).json({fundsChanged: value});
    } else {
        res.status(404);
        res.statusMessage = "Unable to find user";
    }
    res.end();
    displayFunds();
}
