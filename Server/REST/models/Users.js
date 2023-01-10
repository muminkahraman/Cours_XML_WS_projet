// Model
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
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            unique: false
        },
        mail_address: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Users;
};
