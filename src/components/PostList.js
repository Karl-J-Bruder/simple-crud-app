import React, { useState, useEffect } from 'react';
import Post from './Post';


const PostList = ({ postList, handleSubmitEdit, handleEditFormChange, handleEdit, handleDelete, editFormState, setEditFormState }) => {
    return (
        <div className="postList">
            <h3>Post List</h3>
            <div>
                {postList && postList.map((postItem, index) => (
                    <Post postItem={postItem} key={index}
                        handleSubmitEdit={handleSubmitEdit} handleEditFormChange={handleEditFormChange}
                        handleEdit={handleEdit} handleDelete={handleDelete}
                        editFormState={editFormState} setEditFormState={setEditFormState}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostList;