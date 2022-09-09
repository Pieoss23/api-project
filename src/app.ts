import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (request, response) => {
    response.send("This is a space facts to API");
});
export default app;
