const {Model, DataTypes} = require ('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init(
    // 1. COLUMN DEFINITIONS SECTION
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true            
        },
        comment_text:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'post',
                key: 'id'
            }
        }
    },
    // 2. TABLE CONFIGURATION OPTIONS SECTION
    {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'comment'
    }
);









module.exports = Comment;