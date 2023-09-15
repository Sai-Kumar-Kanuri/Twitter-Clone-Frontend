import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/userSlice";

const EditProfile = ({ setOpen }) => {

    const baseURL = "https://twitter-backend-v0gs.onrender.com/api"
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete = async () => {
        const deleteProfile = await axios.delete(`${baseURL}/users/${currentUser._id}`);
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 cursor-pointer"
                >
                    X
                </button>
                <h2 className="font-bold text-xl">Edit Profile</h2>
                <p>Choose a new profile picture</p>
                {/* {imgUploadProgress > 0 ? (
                    "Uploading " + imgUploadProgress + "%"
                ) : (
                    <input
                        type="file"
                        className="bg-transparent border border-slate-500 rounded p-2"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                )} */}

                <p>Delete Account</p>
                <button
                    className="bg-red-500 text-white py-2 rounded-full"
                    onClick={handleDelete}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default EditProfile; 