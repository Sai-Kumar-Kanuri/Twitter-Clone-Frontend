import React from "react";
import LeftSideBar from "../../Component/LeftSideBar/LeftSideBar";
import RightSideBar from "../../Component/RightSideBar/RigthSideBar";
import ExploreTweets from "../../Component/ExploreTweets/ExploreTweets";
import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";

const Explore = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <>{!currentUser ? (<Signin />) : (<div className="grid grid-cols-1 md:grid-cols-4">
            <div className="px-6">
                <LeftSideBar />
            </div>
            <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                <ExploreTweets />
            </div>
            <div className="px-6">
                <RightSideBar />
            </div>
        </div>)}</>

    )
}

export default Explore;