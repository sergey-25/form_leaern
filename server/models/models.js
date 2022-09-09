const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING, allowNull: false},
    recipient: {type: DataTypes.STRING, allowNull: false}
});

const Details = sequelize.define('details', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING, allowNull: false},
    full_name: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING, allowNull: false},
    term: {type: DataTypes.DATE, allowNull: false},
    priority: {type: DataTypes.STRING, unique: true, allowNull: false},
    status: {type: DataTypes.STRING, unique: true, allowNull: false},
    status_comment: {type: DataTypes.STRING, allowNull: false}
});
const Categories = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});
const CategoryTypes = sequelize.define('category_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});


User.hasMany(Orders)
Orders.belongsTo(User)
Orders.hasMany(Details, {as: 'details'})
Details.belongsTo(Orders)
Details.belongsToMany(Categories, {through: CategoryTypes})
Categories.belongsToMany(Details, {through: CategoryTypes})

module.exports = {
    User, Orders, Details, Categories, CategoryTypes
};



