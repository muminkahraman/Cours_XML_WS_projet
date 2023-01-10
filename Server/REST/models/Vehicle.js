// Model
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        id_vehicle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date_of_immat: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false
        },
        immatriculation: {
            type: DataTypes.STRING(10),
            unique: false,
            allowNull: false
        },
        modelid: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Vehicle;
};
