import type { NextApiRequest, NextApiResponse } from "next";
import { getBasicAuth, pipeRequest } from "./utils";
import { HEADERS } from "./constants";

const getAvailableFunds = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const auth = getBasicAuth(req);
    await pipeRequest(res, auth, (token: string) => {
        const body = JSON.stringify({username: req.query.username, auth, token});
        return fetch('http://localhost:3005/api/getAvailableFunds', { method: 'POST', body, headers: HEADERS })
    });
};

export default getAvailableFunds;
