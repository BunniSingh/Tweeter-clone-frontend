import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/slices/userSlice";

const useGetUserProfile = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; 

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/user/profiledetails/${id}`, { withCredentials: true });
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, dispatch]);

    return { loading, error };
};

export default useGetUserProfile;
