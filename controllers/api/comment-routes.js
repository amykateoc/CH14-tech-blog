const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id 
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// GET all comments for a post
router.get('/:post_id', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.post_id }
        });
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE a comment from a post
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }

        res.status(200).json({ message: 'Comment successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router