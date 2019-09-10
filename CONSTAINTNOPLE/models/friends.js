module.exports = function table(sequelize, DataTypes) {
    var friends = sequelize.define("friends", {
        friend1: DataTypes.INTEGER,
        friend2: DataTypes.INTEGER,
    })
    return friends
}