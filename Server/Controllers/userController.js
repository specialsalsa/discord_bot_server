// USER LOGIC IN THE APP SERVER

// we need to know what db we run the queries
const sequelize = require("../Database/database");
// we need to know what MODEL we relate the queries to
const userModel = require("../Models/User");

const userChannelModel = require("../Models/UserChannel");

const getUsers = (req, res) => {
    // run the query
    // handle the response from the query => data that is returned
    // handle errors
    sequelize
        .query("SELECT * FROM user WHERE kicked = 0;", {
            model: userModel.User
        })
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

const getUserByID = (req, res) => {
    sequelize
        .query("SELECT * FROM user WHERE user_id = :user_id;", {
            replacements: {
                user_id: req.sanitize(req.params.id)
            },
            model: userModel.User
        })
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

// GET USER BY USERNAME INPUT

const getUserByUsername = (req, res) => {
    sequelize
        .query("SELECT * FROM user WHERE username = :username;", {
            replacements: {
                username: req.sanitize(req.body.username)
            },
            model: userModel.User
        })
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

// ADD USER FUNCTION

const addUser = (req, res) => {
    let usernameInput = req.sanitize(req.body.username);

    sequelize
        .query(
            "INSERT INTO user (username, kicked, id_user_type) VALUES (:username, :kicked, :id_user_type);",
            {
                replacements: {
                    username: usernameInput,
                    kicked: req.sanitize(req.body.kicked),
                    id_user_type: req.sanitize(req.body.id_user_type)
                }
            },
            {
                model: userModel.User
            }
        )
        .then(data => {
            // status 201 -> CREATED SUCCESSFULLY
            res.status(201).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

// DELETE USER FUNCTION

const deleteUser = (req, res) => {
    sequelize
        .query(
            "DELETE FROM user WHERE user_id = :user_id;",
            {
                replacements: {
                    user_id: req.sanitize(req.params.id)
                }
            },
            {
                model: userModel.User
            }
        )
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

// logic delete function
const kickUser = (req, res) => {
    sequelize
        .query(
            "UPDATE user SET kicked =  WHERE user_id = :user_id;",
            {
                replacements: {
                    user_id: req.sanitize(req.params.id),
                    delete_status: req.sanitize(req.body.deleted)
                }
            },
            {
                model: userModel.User
            }
        )
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

const updateUser = (req, res) => {
    sequelize
        .query(
            "UPDATE user SET username = :username, kicked = :kicked_status WHERE user_id = :user_id;",
            {
                replacements: {
                    user_id: req.sanitize(req.params.id),
                    username: req.sanitize(req.body.username),
                    kicked_status: req.sanitize(req.body.kicked)
                }
            },
            {
                model: userModel.User
            }
        )
        .then(data => {
            // status 200 -> OK
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

const getMemberUsers = (req, res) => {
    sequelize
        .query(
            `SELECT 
    user.username, user_type.name
FROM
    user
        INNER JOIN
    user_type ON user.id_user_type = user_type.id_user_type
    WHERE user_type.name = "Member";`,
            {
                model: userModel.User
            }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong");
        });
};

const getStaffUsers = (req, res) => {
    sequelize
        .query(
            `SELECT 
    user.username, user_type.name
FROM
    user
        INNER JOIN
    user_type ON user.id_user_type = user_type.id_user_type
    WHERE user_type.name = "Staff";`,
            {
                model: userModel.User
            }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong");
        });
};

const getMessagesByUserID = (req, res) => {
    sequelize
        .query(
            `SELECT 
    message.content, user.username
FROM
    message
        INNER JOIN
    user ON message.id_user = user.user_id
    WHERE user.user_id = :user_id;`,
            {
                replacements: {
                    user_id: req.sanitize(req.params.user_id)
                }
            },

            {
                model: userModel.User
            }
        )
        .then(data => {
            res.status(200).send(data[0]);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong");
        });
};

const addUserToChannel = (objReq, callback) => {
    sequelize
        .query(
            "INSERT user_channel (id_user, id_channel) VALUES (:ids);",
            {
                replacements: {
                    ids: [objReq.body.id_user, objReq.body.id_channel]
                }
            },
            {
                model: userChannelModel.UserChannel
            }
        )
        .then(data => {
            // 1st argument -> boolean value => indicate if the function goes well or wrong
            // 2nd argument -> data from the query
            return callback(true, data);
        })
        .catch(error => {
            console.log(error);
            return callback(false, error);
        });
};

const getKickedUsers = (req, res) => {
    sequelize
        .query(
            `SELECT 
user_id, username, kicked, name AS user_type
FROM
user
    INNER JOIN
user_type ON user.id_user_type = user_type.id_user_type
WHERE
kicked = 1;`,
            {
                model: userModel.User
            }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong");
        });
};

module.exports = {
    getUsers,
    getUserByID,
    addUser,
    deleteUser,
    updateUser,
    kickUser,
    getUserByUsername,
    getMemberUsers,
    getStaffUsers,
    getMessagesByUserID,
    addUserToChannel,
    getKickedUsers
};
