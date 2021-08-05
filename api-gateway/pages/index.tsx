import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

type User = { name: string; auth: string };
const USERS: Array<User> = [
    { name: "Romeo", auth: "VXNlcjE6UGFzc3dvcmQ=" },
    { name: "Juliet", auth: "T3RoZXJVc2VyOlBhc3N3b3Jk" },
];

const Home = () => {
    const [selectedUser, setSelectedUser] = useState({
        index: 0,
        user: USERS[0],
    });
    const user = () => selectedUser.user;
    const getHeader = () => ({
        headers: { authorization: `Basic ${user().auth}` },
    });

    const notify = async (res: Response) => {
        if (res.ok) {
            const data = await res.json();
            alert(JSON.stringify(data));
        } else {
            alert(res.statusText);
        }
    };

    const getAvailableFunds = async () => {
        const res = await fetch(
            `/api/getAvailableFunds?username=${user().name}`,
            getHeader()
        );
        notify(res);
    };

    const incrementFunds = async () => {
        const res = await fetch(
            `/api/incrementFunds?username=${user().name}`,
            getHeader()
        );
    };

    const decrementFunds = async () => {
        const res = await fetch(
            `/api/decrementFunds?username=${user().name}`,
            getHeader()
        );
    };

    const switchUser = () => {
        const index = selectedUser.index === 0 ? 1 : 0;
        setSelectedUser({ index, user: USERS[index] });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Mircoservice demo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Mircoservice demo</h1>
                <p>Logged in as {user().name}</p>

                <div className={styles.grid}>
                    <div onClick={incrementFunds} className={styles.card}>
                        <h2>Increment funds &uarr;</h2>
                    </div>

                    <div onClick={decrementFunds} className={styles.card}>
                        <h2>Decrement funds &darr;</h2>
                    </div>

                    <div onClick={getAvailableFunds} className={styles.card}>
                        <h2>Get available funds $</h2>
                    </div>

                    <div onClick={switchUser} className={styles.card}>
                        <h2>Switch user &#x21c4;</h2>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Home;
