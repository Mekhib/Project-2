module.exports = function request(sequelize, DataTypes) {
    var request = sequelize.define("request", {
        requester: DataTypes.INTEGER,
        recipient: DataTypes.INTEGER,
    })
    return request
}