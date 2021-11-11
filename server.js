const express = require("express");
const cors = require("cors");
const SparkPost = require("sparkpost");
const app = express();

app.use(cors());

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50kb" }));

require("dotenv").config();

const sparkpost = new SparkPost(process.env.SPARKPOST_API_KEY);

app.post("/sendmail", (req, res, next) => {
    //destruct body
    const { name, email, subject, message } = req.body;
    console.log(req.body);

    sparkpost.transmissions
        .send({
            content: {
                from: "contact@mail.abusayeed.me",
                subject: subject,
                html: `<html><body><h1>Mail From ${name} </h1<p>${message}</p></body></html>`,
            },
            recipients: [{ address: "sayeedmondal1412@gmail.com" }],
        })
        .then((data) => {
            console.log("Woohoo! You just sent your first mailing!");
            console.log(data);
        })
        .catch((err) => {
            console.log("Whoops! Something went wrong");
            console.log(err);
        });

    return res.json({ success: "Mail sent" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started");
});
