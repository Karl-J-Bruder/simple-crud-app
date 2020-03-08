import React, { useState } from 'react';

const NewPost = ({ handleSubmit, handleChange, formState, setFormState, postList, setPostList }) => {
    // // State related to form
    // const [formState, setFormState] = useState({
    //     title: "",
    //     body: ""
    // })
    return (
        <div className="newPostForm">
            <h3>Add a New Post</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Post Title
                    <input placeholder="Title" type="text" name="title"
                        value={formState.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Post Body
                    <input placeholder="Body" type="text" name="body"
                        value={formState.body}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
};

export default NewPost;
