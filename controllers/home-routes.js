const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
           return res.redirect('/login')
        }
        const postData = await Post.findAll({
            where: {
               user_id: req.session.user_id
           },
           
            attributes: [
                'id',
                'title',
                'body',
            ]
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'body'
            ],
            include: [
               { model: Comment}
            ]
        });

        const post = postData.get({ plain: true });
        console.log(post)
        res.render('viewPost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    console.log('login is working')
    res.render('login');
});




module.exports = router;