import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [postsPerPage, setpostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                "http://jsonplaceholder.typicode.com/posts"
            );
            setPosts(res.data);
            setLoading(false);
            console.log(res.data);
        };

        fetchPosts();
    }, []);

    // Get current posts
    const indexOfLastPost = current * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrent(pageNumber);

    return (
        <div className="container mt-5">
            <p className="text-primary mb-3">My Blog</p>
            <Posts posts={currentPosts} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
};

export default App;
