import type { NextApiRequest, NextApiResponse } from "next";
import { displayFunds, getUsingUsername, setUsingUsername } from "../../mock/funds-db";
import { addFunds, verify } from "./utils";

const incrementFunds = (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    if(!verify(body, res)){
        return
    };
    const user = getUsingUsername(body.username);
    
    addFunds(user, 1, body.auth, res);
};

export default incrementFunds;
