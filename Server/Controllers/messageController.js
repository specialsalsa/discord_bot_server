const sequelize = require('../Database/database');
const messageModel = require('../Models/Message');

const getMessageContent = (req, res) => {
    sequelize.query("SELECT id_message, content, createdAt FROM message;", {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
};

const getMessageCount = (req, res) => {
    sequelize.query("SELECT COUNT(*) AS message_count FROM message;", {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
};

const newMessage = (req, res) => {
    sequelize.query(
        'INSERT message (content, deleted, id_user, id_channel) VALUES (:message);',
        {
            replacements: {
                message: [
                    req.sanitize(req.body.content),
                    req.sanitize(req.body.deleted),
                    req.sanitize(req.body.id_user),
                    req.sanitize(req.body.id_channel)
                ]
            }
        },
        {
            model: messageModel.Message
        }
    ).then(data => {
        res.status(201).send(data);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong, try again later.");
    });
}

const selectTotalMessagesByUser = (req, res) => {
    sequelize
    .query(`SELECT 
        COUNT(*) AS total_messages, user.username
    FROM
        message
            INNER JOIN
        user ON message.id_user = user.user_id
        GROUP BY username
        ORDER BY total_messages DESC;`, {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
}

const selectTotalMessagesByUserWithLimit = (req, res) => {
    sequelize
    .query(`SELECT 
        COUNT(*) AS total_messages, user.username
    FROM
        message
            INNER JOIN
        user ON message.id_user = user.user_id
        GROUP BY username
        ORDER BY total_messages DESC
        LIMIT :limit;`,
        {
            replacements: {
                limit: parseInt(req.sanitize(req.body.limit))
            }
        }, {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
}

const selectTotalMessagesByChannel = (req, res) => {
    sequelize
    .query(`SELECT 
    COUNT(*) AS total_messages, channel.name
FROM
    message
        INNER JOIN
    channel ON message.id_channel = channel.id_channel
    GROUP BY name
    ORDER BY total_messages DESC
    LIMIT :limit;`, {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
}

const selectTotalMessagesByChannelID = (req, res) => {
    sequelize
    .query(`SELECT 
    COUNT(*) AS total_messages, channel.name
FROM
    message
        INNER JOIN
    channel ON message.id_channel = channel.id_channel
    WHERE channel.id_channel = :channel_id;`, {
        replacements: {
            channel_id: req.sanitize(req.params.channel_id)
        }
    }, {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
}

const getLastWeekMessages = (req, res) => {
    sequelize
    .query(`SELECT 
            *
            FROM
                message
            WHERE
                createdAt BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();`,  {
        model: messageModel.Message
    }).then(data => {
        res.status(200).send(data[0]);
    })
    .catch(error => {
        console.log(error)
        res.status(400).send("Something went wrong");
    });
}

module.exports = {
    getMessageCount,
    newMessage,
    selectTotalMessagesByUser,
    selectTotalMessagesByUserWithLimit,
    selectTotalMessagesByChannel,
    selectTotalMessagesByChannelID,
    getMessageContent,
    getLastWeekMessages
};