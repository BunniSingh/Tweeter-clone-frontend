import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllTweets } from "../redux/slices/tweetSlice";

const useGetMyTweets = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {refresh} = useSelector(store => store.tweet);

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
    }, [dispatch, refresh]);

    return { loading, error };
};

export default useGetMyTweets;
