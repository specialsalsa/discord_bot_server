// CONFIG LOGIC

// we need to know what db we run the queries
const sequelize = require("../Database/database");
const { ServerConfig } = require("../Models/ServerConfig");

// we need to know what MODEL we relate the queries to

// gets server config for selected server by id
const getConfig = (req, res) => {
    sequelize
        .query("SELECT * FROM server_config WHERE server_id = :server_id", {
            replacements: {
                server_id: req.sanitize(req.params.server_id)
            },
            model: ServerConfig
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

// sets server config
const setConfig = (req, res) => {
    sequelize
        .query(
            "UPDATE server_config SET command_prefix = :command_prefix WHERE server_id = 1;",
            {
                replacements: {
                    command_prefix: req.sanitize(req.body.command_prefix)
                }
            },
            {
                model: ServerConfig
            }
        )
        .then(data => {
            res.status(201).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send("Something went wrong, try again later.");
        });
};

module.exports = {
    getConfig,
    setConfig
};
