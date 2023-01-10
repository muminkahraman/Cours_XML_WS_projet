// Model
module.exports = (sequelize, DataTypes) => {
    const Brands = sequelize.define('Brands', {
        id_brands: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            unique: false,
            allowNull: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Brands;
};
