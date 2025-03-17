import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/slices/userSlice";

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/user/otherusers', { withCredentials: true });
                dispatch(setOtherUser(res.data.users));
            } catch (error) {
                console.error("Error fetching other users:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    return { loading, error };
};

export default useGetOtherUsers;
