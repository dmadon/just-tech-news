const User = require('./User');
const Post = require('./Post');

// CREATE ASSOCIATIONS

// create a one-to-many association where User is the "one" and Post is the "many".
// the association uses the "user_id" foreign key field from Post to join on User's primary key
User.hasMany(Post, {
    foreignKey: 'user_id'
})
// now, create the opposite many-to-one association where Post is the "many" and User is the "one".
// the associaiton uses the same field to join the two models
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {User,Post};