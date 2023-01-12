// Model
module.exports = (sequelize, DataTypes) => {
    const Purshase = sequelize.define('Purshase', {
        id_purshase: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            unique: false,
            allowNull: false
        },
        id_brand: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        id_users: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        id_vehicle: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Purshase;
};
