const express = require("express");
const db = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());