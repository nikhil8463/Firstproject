const express = require("express");

const app = require("./app")

const port = process.env.PORT||3000;

app.listen(3000,()=>console.log('serever is running'))


