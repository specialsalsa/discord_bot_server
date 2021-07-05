const express = require("express");
// creation of the router object
const router = express.Router();

// import the functions from the Controllers
const userController = require("../Controllers/userController");
const ChannelFile = require("../Models/Channel");
const UserChannelFile = require("../Models/UserChannel");
const MessageFile = require("../Models/Message");

const ServerMovementFile = require("../Models/ServerMovement");
const ServerMuteFile = require("../Models/ServerMute");
const ServerShareFile = require("../Models/ServerShare");
const messageController = require("../Controllers/messageController");
const configController = require("../Controllers/configController");

// grab the router
// set a METHOD to it
// GET
// POST (add)
// PUT (update all)
// PATCH (update 1 or 2 fields only)
// DELETE (deletes)

// get server config
router.get("/config/:server_id", configController.getConfig);

// update server config
router.put("/config/:server_id", configController.setConfig);

router.get("/users", userController.getUsers);

//...4000/users/4
router.get("/users/:id", userController.getUserByID);

//add user route
router.post("/users", userController.addUser);

// delete user - data is gone forever
router.delete("/users/:user_id", userController.deleteUser);

// "logic" delete user - data is gone forever
// on/off thing
router.patch("/users/:id", userController.kickUser);

// update user
router.put("/users/:id", userController.updateUser);

// get user by username
router.get("/user", userController.getUserByUsername);

// get users who are members
router.get("/users-member", userController.getMemberUsers);

// get users who are staff
router.get("/users-staff", userController.getStaffUsers);

// get users who have been kicked
router.get("/users-kicked", userController.getKickedUsers);

// get message count
router.get("/message-count", messageController.getMessageCount);
router.get("/user-messages/:user_id", userController.getMessagesByUserID);

router.post("/user-channel", (req, res) => {
    userController.addUserToChannel(req, (status, result) => {
        // result = [1, 2]
        if (status == true) {
            res.status(201).send({
                id_user: result[0],
                id_channel: result[1]
            });
        } else {
            res.status(400).send("ERROR");
        }
    });
});

router.get("/messages-by-user", messageController.selectTotalMessagesByUser);

router.get(
    "/messages-by-user-limit",
    messageController.selectTotalMessagesByUserWithLimit
);

router.get(
    "/messages-by-channel",
    messageController.selectTotalMessagesByChannel
);

router.get(
    "/messages-by/channel/:channel_id",
    messageController.selectTotalMessagesByChannelID
);

router.get("/messages", messageController.getMessageContent);

router.get("/last-week-messages", messageController.getLastWeekMessages);

router.post("/message", messageController.newMessage);

module.exports = router;
