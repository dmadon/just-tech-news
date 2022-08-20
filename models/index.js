const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// CREATE ASSOCIATIONS

// create a one-to-many association where User is the "one" and Post is the "many".
// the association uses the "user_id" foreign key field from Post to join on User's primary key
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// now, create the opposite many-to-one association where Post is the "many" and User is the "one".
// the associaiton uses the same field to join the two models
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post,{
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User,{
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User,{
    foreignKey: 'user_id'
});

Vote.belongsTo(Post,{
    foreignKey: 'post_id'
});

User.hasMany(Vote,{
    foreignKey: 'user_id'
});

Post.hasMany(Vote,{
    foreignKey: 'post_id'
});

Comment.belongsTo(User,{
    foreignKey: 'user_id'
});

Comment.belongsTo(Post,{
    foreignKey: 'post_id'
});

User.hasMany(Comment,{
    foreignKey: 'user_id'
});

Post.hasMany(Comment,{
    foreignKey: 'post_id'
});

module.exports = {User,Post,Vote,Comment};