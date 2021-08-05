import type { NextApiRequest, NextApiResponse } from "next";
import { getBasicAuth, pipeRequest } from "./utils";
import { HEADERS } from "./constants";

const incrementFunds = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const auth = getBasicAuth(req);
    await pipeRequest(res, auth, (token: string) => {
        const body = JSON.stringify({username: req.query.username, token});
        return fetch('http://localhost:3005/api/incrementFunds', { method: 'POST', body, headers: HEADERS })
    }, false);
};

export default incrementFunds;
