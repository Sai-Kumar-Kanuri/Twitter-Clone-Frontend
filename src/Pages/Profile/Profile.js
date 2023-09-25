import React, { useEffect, useState } from "react";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import RightSideBar from "../../Component/RightSideBar/RigthSideBar";
import EditProfile from "../../Component/EditProfile/EditProfile";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { following } from "../../Redux/userSlice";
import Tweet from "../../Component/Tweet/Tweet";

const Profile = () => {
    const [userTweets, setUserTweets] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const { id } = useParams();

    const baseURL = "https://twitter-backend-v0gs.onrender.com/api"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTweets = await axios.get(`${baseURL}/tweets/user/all/${id}`);
                const userProfile = await axios.get(`${baseURL}/users/find/${id}`);

                setUserTweets(userTweets.data);
                setUserProfile(userProfile.data);
            } catch (err) {
                console.log("Err", err);
            }
        };
        fetchData();
    }, [currentUser, id])



    const handleFollow = async () => {
        const jwtToken = localStorage.getItem('accessToken');
        if (!currentUser.following.includes(id)) {
            // const jwtToken = document.cookie;
            // console.log(jwtToken);



            try {
                const follow = await axios.put(`${baseURL}/users/follow/${id}`, {
                    id: currentUser._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the "Authorization" header
                    },
                });
                dispatch(following(id));
            } catch (err) {
                console.log("error", err);
            }
        } else {
            try {
                const unfollow = await axios.put(`${baseURL}/users/unfollow/${id}`, {
                    id: currentUser._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the "Authorization" header
                    },
                });

                dispatch(following(id));
            } catch (err) {
                console.log("error", err);
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="px-6">
                    <LeftSideBar />
                </div>
                {/* <div className="col-span-2 border-x-2 border-t-slate-800 px-6"></div>
            <img src="" alt=""></img> */}


                <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                    <div className="flex justify-between items-center">
                        {/* <img
                        src={userProfile?.profilePicture}
                        alt="Profile Picture"
                        className="w-12 h-12 rounded-full"
                    /> */}
                        {currentUser._id === id ? (
                            <button
                                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                                onClick={() => setOpen(true)}
                            >
                                Edit Profile
                            </button>
                        ) : currentUser.following.includes(id) ? (
                            <button
                                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                                onClick={handleFollow}
                            >
                                Following
                            </button>
                        ) : (
                            <button
                                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                                onClick={handleFollow}
                            >
                                Follow
                            </button>
                        )}
                    </div>
                    <div className="mt-6">
                        {userTweets &&
                            userTweets.map((tweet) => {
                                return (
                                    <div className="p-2" key={tweet._id}>
                                        <Tweet tweet={tweet} setData={setUserTweets} />
                                    </div>
                                );
                            })}
                    </div>
                </div>



                <div className="px-6">
                    <RightSideBar />
                </div>
            </div>

            {console.log(open)}
            {open && <EditProfile setOpen={setOpen} />}
        </>

    )
}

export default Profile;