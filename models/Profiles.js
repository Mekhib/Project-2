module.exports = function(sequelize, DataTypes) {
    var Profiles = sequelize.define("profiles", {
        Username: DataTypes.STRING,
        Password: DataTypes.STRING,
        profile_Picture: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        mid_intial: DataTypes.STRING,
        email: DataTypes.STRING,
        website: DataTypes.STRING,
        age: DataTypes.INTEGER,
        birthday: DataTypes.STRING,
        company: DataTypes.STRING,
        phone_number: DataTypes.INTEGER,
        phone_number2: DataTypes.INTEGER,
        phone_number3: DataTypes.INTEGER,
        emergency_contacts: DataTypes.INTEGER,
        notes: DataTypes.STRING,
        instagram: DataTypes.STRING,
        facebook: DataTypes.STRING,
        Linkedin: DataTypes.STRING,
    });
    return Profiles;
};