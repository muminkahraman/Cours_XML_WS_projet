// Model
// Imports
const bcrypt = require('bcrypt');

// Functions
function hashPassword(user, options) {
    const SALT_FACTOR = 8;
    if(!user.changed('password')) {
        return;
    }
    return bcrypt.genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hash(user.password, salt, null))
    .then(hash => {
        user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id_users: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(250),
            unique: false,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(250),
            unique: false,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.STRING("50"),
            defaultValue: DataTypes.NOW,
            allowNull: true,
            unique: false
        },
        mail_address: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: false
        },
        /*We store the token inside the database in a hash format in order to create
        a token white list*/
        token: {
            type: DataTypes.TEXT('long'),
            unique: false
        }
    }, {
        hooks: {
            //Before creating the user, we hash the password
            beforeCreate: hashPassword,
            //Before updating the user, we hash the password
            beforeUpdate: hashPassword
        }
    })

    Users.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    }

    return Users;
};
