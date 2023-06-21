const router = require('express').Router();
const { Post, Comment } = require('../../models');

// CREATE new post
router.post('/', async (req, res) => {
    console.log("i'm working!!")
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post by ID
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'body'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text'],
                },
            ],
        });

        const post = postData.get({ plain: true });
        res.render('viewPost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;