const usersDB = {
    users: require('../model/User.json'),
    setUsers: function (data) { this.users = data }
}


module.exports = { handleLogin };