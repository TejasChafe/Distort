import { useEffect, useState } from 'react';
import { useAuth } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Comments = () => {
  const { backendUrl, token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/comments`, {
        headers: { token },
      });
      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [backendUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/comments`,
        { text: newComment },
        { headers: { token } }
      );

      if (data.success) {
        setNewComment('');
        fetchComments();
        toast.success('Comment added');
      } else {
        toast.error(data.message || 'Failed to add comment');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/comments/${commentId}`,
        { headers: { token } }
      );
      if (data.success) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast.success('Comment deleted');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedText(currentText);
  };

  const handleUpdate = async (commentId) => {
    if (!editedText.trim()) return;

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/comments/${commentId}`,
        { text: editedText },
        { headers: { token } }
      );

      if (data.success) {
        setEditingCommentId(null);
        setEditedText('');
        fetchComments();
        toast.success('Comment updated');
      } else {
        toast.error(data.message || 'Failed to update comment');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred');
    }
  };

  return (
    <div className="max-h-[32rem] overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      )}

      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {comment.user?.name || 'Anonymous'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>

            {editingCommentId === comment._id ? (
              <>
                <textarea
                  className="w-full p-2 mb-2 rounded border dark:bg-gray-600 dark:text-white"
                  rows={2}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className="text-xs text-green-500 hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedText('');
                    }}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                {user && user._id === comment.user?._id && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(comment._id, comment.text)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;