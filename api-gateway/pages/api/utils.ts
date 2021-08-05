import { NextApiRequest, NextApiResponse } from "next";
import { TOKEN } from "./constants";

export const getBasicAuth = (req: NextApiRequest): string | undefined => {
    const auth = req.headers.authorization?.split(" ");
    if (auth?.[0] === "Basic" && auth?.length === 2) {
        return auth[1];
    }
};

export const pipeRequest = async (
    res: NextApiResponse,
    auth: string | undefined,
    fetchFn: (token: string) => Promise<Response>,
    withResponse = true,
) => {
    if (auth) {
        const request = await fetchFn(TOKEN);
        res.status(request.status);
        if (request.ok && withResponse) {
            const awaited = await request.json();
            res.json(awaited);
        } else if (!request.ok) {
            res.statusMessage = request.statusText;
        }
    } else {
        res.status(401);
        res.statusMessage = "Missing basic authorization";
    }
    res.end();
};
