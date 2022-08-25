const router = require ('express').Router();
const {Post, User, Vote, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET ALL POSTS
router.get('/',(req,res) => {
    console.log('==============================');
    Post.findAll({
        // select the fields you  wish to display
        attributes:[
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)`), 'vote_count']
        ],
        // order by created_at date in order to show most recent posts first
        order:[['created_at','DESC']],
        // create a join to the user table and display the username field from it
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id','comment_text','post_id','user_id','created_at'],
            include: {
                model: User,
                attributes: ['username']
                }
            }
          ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// GET A SINGLE POST BY ID
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)`), 'vote_count']],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id','comment_text','post_id','user_id','created_at'],
            include: {
                model: User,
                attributes: ['username']
                }
            }
            
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: "There are no posts found with this id."});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE A NEW POST
router.post('/', withAuth, (req,res) => {
    // expects{title: "example title goes here",post_url: "example url goes here", user_id: <number>}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req,res) => {

    // make sure the session exists first
    if(req.session){
        // custom static method created in models/Post.js:
        // pass session id along with all destructured properties on req.body
        Post.upvote({...req.body, user_id:req.session.user_id},{Vote,Comment,User})

        .then(updatedVoteData => res.json(updatedVoteData))

        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
})

// UPDATE A POST'S TITLE
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post was found with this id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE A POST
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;