const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model{}

Post.init(
    // 1. COLUMN DEFINITIONS SECTION
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_url:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        // FOREIGN KEY THAT REFERENCES THE USER ID FROM THE 'user' MODEL. NOTE THAT THE 'model' ATTRUBUTE IS THE 'modelName' ATTRUBUTE FROM THE 'User' CLASS.
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
        // NOTE THAT THERE ARE TWO COLUMNS THAT SEQUELIZE WILL AUTOMATICALLY GENERATE FOR US UNLESS WE EXPLICITLY TELL IT NOT TO.
        // THEY ARE "created_at" and "updated_at" AND VALUES WILL POPULATE WITH TIMESTAMP INFORMATION.
        
    }, // end of column definitions section

    // 2. TABLE CONFIGURATION OPTIONS SECTION:
    {sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }// end of table configuration options section
);

module.exports = Post;