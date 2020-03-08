import React, { useState, useEffect } from 'react';
import NewPost from '../NewPost';
import PostList from './PostList';


const MainPage = () => {
    //=============================================================================//
    //    State
    //=============================================================================//
    // State related to fetching
    const url = "https://jsonplaceholder.typicode.com/posts";
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false);

    // State related to form
    const [formState, setFormState] = useState({
        title: "",
        body: ""
    })

    // State related to editing
    const [isEditing, setIsEditing] = useState(false);
    const [editFormState, setEditFormState] = useState({
        title: "",
        body: ""
    })

    //=============================================================================//
    //   END State
    //=============================================================================//

    //=============================================================================//
    //    Edit post form
    //=============================================================================//
    // Change handler for edit form state
    const handleEditFormChange = (e) => {
        setEditFormState({
            ...editFormState, [e.target.name]: e.target.value
        })
    }

    // Handler for editing
    const handleEdit = (id) => {
        setIsEditing(true)
        let listWithoutPost = postList.filter(post => post.id !== id);
        let postForEditing = postList.find(post => post.id === id);

        postForEditing = {
            userId: postForEditing.userId,
            id: postForEditing.id,
            title: postForEditing.title,
            body: postForEditing.body,
            isEditing: true
        };
        let newPostList = [...listWithoutPost, postForEditing];
        setPostList(
            newPostList.sort(function (a, b) {
                return a.id - b.id
            })
        )
    }

    const handleSubmitEdit = (id) => {
        let listWithoutPost = postList.filter(post => post.id !== id);
        let postForEditing = postList.find(post => post.id === id);
        postForEditing = {
            userId: postForEditing.userId,
            id: postForEditing.id,
            title: editFormState.title ? editFormState.title : "<empty>",
            body: editFormState.body ? editFormState.body : "<empty>",
            isEditing: false
        };
        let newPostList = [...listWithoutPost, postForEditing];
        setPostList(
            newPostList.sort(function (a, b) {
                return a.id - b.id
            })
        )
    }

    //=============================================================================//
    //    END Edit post form
    //=============================================================================//


    //=============================================================================//
    //    New post form
    //=============================================================================//
    const handleChange = (e) => {
        setFormState({
            ...formState, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPostList([
            ...postList,
            {
                userId: 1,
                id: 999,
                title: formState.title,
                body: formState.body
            }
        ])
        setFormState({
            title: "",
            body: ""
        })
    }


    //=============================================================================//
    //   END new post form
    //=============================================================================//

    //=============================================================================//
    //    Post delete handler
    //=============================================================================//
    const handleDelete = (id) => {
        const filteredPostList = postList.filter(post => post.id !== id);
        setPostList(filteredPostList);
    }
    //=============================================================================//
    //    END Post delete handler
    //=============================================================================//

    //=============================================================================//
    //   Data Fecthing
    //=============================================================================//
    function handleErrors(response) {
        if (!response.ok) {
            setIsError(true);
            throw new Error(response.status);
        };
        return response;
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(jsonData => {
                setPostList(jsonData);
                setIsLoading(false);
                setIsError(false)
            })
            .catch(error => {
                setIsLoading(false)
                setIsError(true)
                console.log("ERROR: ", error)
            })
    }, []);
    //=============================================================================//
    //   END Data Fecthing
    //=============================================================================//

    return (
        <div>
            {isError === true ?
                (<h1>There was an error</h1>)
                :
                (
                    <div>
                        {isLoading ? (<div>Loading...</div>) :
                            (<div>
                                <h1>Test App</h1>
                                <NewPost
                                    handleSubmit={handleSubmit} handleChange={handleChange}
                                    formState={formState} setFormState={setFormState}
                                    postList={postList} setPostList={setPostList}
                                />
                                <div>
                                    {isLoading ? (<p>Loading...</p>) : (
                                        <PostList
                                            postList={postList} handleSubmitEdit={handleSubmitEdit}
                                            handleEditFormChange={handleEditFormChange} handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            editFormState={editFormState} setEditFormState={setEditFormState}
                                        />
                                    )}
                                </div>
                            </div>)}
                    </div>
                )
            }
        </div>
    )
}

export default MainPage;