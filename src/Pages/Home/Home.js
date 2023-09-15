import React from "react";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import RightSideBar from "../../Component/RightSideBar/RigthSideBar";
import MainTweet from "../../Component/MainTweet/MainTweet";
import Signin from "../Signin/Signin"

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { currentUser } = useSelector((state) => state.user);

    console.log("user", currentUser);

    return (
        <>{
            !currentUser ? (<Signin />) : (<div className="grid grid-cols-1 md:grid-cols-4">
                <div className="px-6">
                    <LeftSideBar />
                </div>
                <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                    <MainTweet />
                </div>
                <div className="px-6">
                    <RightSideBar />
                </div>
            </div>)
        }</>

    )
}

export default Home;