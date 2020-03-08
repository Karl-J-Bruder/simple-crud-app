import React from 'react';


const Post = ({ postItem, handleSubmitEdit, handleEditFormChange, handleEdit, handleDelete, editFormState, setEditFormState }) => {
    return (
        <div>
            {postItem ? (
                <div className="post">
                    <div>
                        {postItem.title && <p><b>Title:</b> {postItem.title}</p>}
                        {postItem.body && <p><b>Body:</b> {postItem.body}</p>}
                        {postItem && postItem.isEditing ?
                            (
                                <div>
                                    This is an edit form div
                            <form onSubmit={handleSubmitEdit}>
                                        <label>
                                            Post Title
                                    <input placeholder="Title" type="text" name="title"
                                                value={editFormState.title}
                                                onChange={handleEditFormChange}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Post Body
                                    <input placeholder="Body" type="text" name="body"
                                                value={editFormState.body}
                                                onChange={handleEditFormChange}
                                                required
                                            />
                                        </label>
                                    </form>
                                    <button onClick={() => handleSubmitEdit(postItem.id)}>Submit Changes</button>
                                </div>
                            )
                            :
                            (null)
                        }
                    </div>
                    <div>
                        <button onClick={() => handleEdit(postItem.id)}>Edit</button>
                        <button onClick={() => handleDelete(postItem.id)}>Delete</button>
                    </div>
                </div>
            )
                :
                (null)
            }
        </div>
    )
};

export default Post;