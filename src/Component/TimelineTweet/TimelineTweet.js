import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const TimelineTweet = () => {
    const [timeLine, setTimeLine] = useState(null);

    const { currentUser } = useSelector((state) => {
        // console.log(state);
        return state.user;
    });

    // console.log(currentUser);

    const baseURL = "https://twitter-backend-v0gs.onrender.com/api"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timelineTweets = await axios.get(
                    `${baseURL}/tweets/timeline/${currentUser._id}`
                );

                // console.log("timeline Tweets", timelineTweets);

                setTimeLine(timelineTweets.data);
            } catch (err) {
                console.log("error", err);
            }
        };

        fetchData();
    }, [currentUser._id]);

    // console.log("Timeline", timeLine);
    return (
        <div className="mt-6">
            {timeLine &&
                timeLine.map((tweet) => {
                    return (
                        <div key={tweet._id} className="p-2">
                            <Tweet tweet={tweet} setData={setTimeLine} />
                        </div>
                    );
                })}
        </div>
        // { timeLine }
    );
};

export default TimelineTweet;