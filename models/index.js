const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

// Gift belongs to one receiver
Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Receiver has many gifts
Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCADE' });

// User has many receivers
Comment.belongsTo(User, { foreignKey: "user_id", onDelete: 'CASCADE' });


module.exports = { User, Post, Comment }