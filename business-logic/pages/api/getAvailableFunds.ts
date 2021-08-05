import type { NextApiRequest, NextApiResponse } from "next";
import { getUsingUsername } from "../../mock/funds-db";
import { verify } from "./utils";

type FundsResponse = {funds: number};

const getAvailableFunds = (req: NextApiRequest, res: NextApiResponse<FundsResponse>) => {
    const body = req.body;
    if(!verify(body, res)){
        return
    };
    const user = getUsingUsername(body.username);
    if(user?.auth !== body.auth) {
        res.status(401);
        res.statusMessage = "Users can only see their own funds";
    }
    else if (user) {
        res.status(200).json({ funds: user.funds });
    } else {
        res.status(404);
        res.statusMessage = "Unable to find user";
    }
    res.end();
};

export default getAvailableFunds;
