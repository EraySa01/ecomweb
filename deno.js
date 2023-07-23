import express from "npm:express@4.18.2";
import { load } from "https://deno.land/std@0.194.0/dotenv/mod.ts";
const env = await load({ envPath: "./config/dev.env", export: true });
console.log(env);
console.log("Welcome to Deno!");
/*
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
const cartRouter = require('./routers/cart')
*/
import { userRouter } from "./routers/user.js";
import { itemRouter } from "./routers/item.js";
import { cartRouter } from "./routers/cart.js";

//const express = require("express");
// deno-lint-ignore no-unused-vars
import connect from "./db/mongoose.js";

//import "./db/mongoose";

const port = Deno.env.get("PORT");
// call express
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(itemRouter);
app.use(cartRouter);

//listen
app.listen(port, () => {
  console.log("server listening on port " + port);
});
