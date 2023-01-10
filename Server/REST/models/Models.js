// Model
module.exports = (sequelize, DataTypes) => {
    const Models = sequelize.define('Models', {
        id_models: {
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
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Models;
};
