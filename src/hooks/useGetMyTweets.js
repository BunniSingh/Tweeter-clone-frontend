import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllTweets } from "../redux/slices/tweetSlice";

const useGetMyTweets = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/tweet/getalltweets', { withCredentials: true });
                dispatch(setAllTweets(res.data.result));
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

export default useGetMyTweets;
