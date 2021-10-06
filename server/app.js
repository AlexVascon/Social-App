require("dotenv").config();
var createError = require('http-errors');
require("./db/index");
const express = require("express");
const isLoggedIn = require('./middleware/isLoggedIn');


const app = express();
require("./config/index")(app);

// 👇 Start handling routes here
// const allRoutes = require("./routes");
// app.use("/", allRoutes);       // <== UPDATE

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const postRouter = require('./routes/post.routes');
app.use('/post' ,postRouter);

const profileRouter = require('./routes/profile.routes');
app.use('/profile', isLoggedIn,profileRouter);

const usersRouter = require('./routes/users.routes');
app.use('/users', usersRouter);

const messageRouter = require('./routes/message.routes');
app.use('/messages', messageRouter);

const commentRouter = require('./routes/comment.routes');
app.use('/comments', commentRouter);

const followRoutes = require('./routes/followers.routes');
app.use('/follow', followRoutes);

const conversationRoutes = require('./routes/conversation.routes');
app.use('/conversations', conversationRoutes);

// require("./error-handling")(app);
app.use(function (req, res, next) {
    next(createError(404));
  });

module.exports = app;