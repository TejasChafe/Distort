import commentModel from '../models/commentModel.js';

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find({}).populate('user', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export const createComment = async (req, res) => {
  const { text } = req.body;
  try {
    const newComment = await commentModel.create({
      text: text,
      user: req.user.id,
    });
    const populated = await newComment.populate('user', 'name');
    console.log(populated)
    res.status(201).json({success:true, comment:populated});
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
};

export const updateComment = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  try {
    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ success:false, message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ success:false, message: 'Unauthorized users cannot comment' });
    if (!req.user || req.user._id.toString() !== comment.user.toString()) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }    

    comment.text = text;
    await comment.save();
    res.status(200).json({success:true, message:'Comment updated successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment' });
    console.log(err)
  }
};