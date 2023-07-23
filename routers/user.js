//const express = require('express')
//const User = require('../models/user')
import "https://deno.land/x/this@0.160.1/mod.ts";
import express from "npm:express@4.18.2";
import { User } from "../models/User.js";
import { Auth } from "../middleware/auth.js";

const userRouter = new express.Router();

//signup
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout
userRouter.post("/users/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//Logout All
userRouter.post("/users/logoutAll", Auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
export { userRouter };
//module.exports = userRouter;
