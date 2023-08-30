const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");

const cors = require("cors");
dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(cors());

app.use(express.json())

app.post("/gpt", async (req, res, next) => {
    const {
        messages,
        metadata,
        provider
    } = req.body;

    const gptRequest = {
        model: "gpt-3.5-turbo",
        messages,
    }

    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        method: "POST",
        body: JSON.stringify(gptRequest)
    })

    const gptJsonResponse = await gptResponse.json();

    if (gptJsonResponse.error) {

        res.json({
            message: "error",
            error: gptJsonResponse.error
        });
        return;
    }


    const event = {
        provider,
        log: {
            event: "conversation",
            value: [...messages, gptJsonResponse?.choices?.[0].message],
            timestamp: new Date().toISOString()
        },
        metaData: metadata,
    };

    await db.event.create(event);

    res.json({
        message: "success",
        choices: gptJsonResponse.choices
    });
});

app.post("/events", async (req, res, next) => {
    const { data } = req.body;

    const events = data.map(({ provider, event, metadata }) => ({
        provider,
        log: event,
        metaData: metadata,
    }));

    await db.event.bulkCreate(events);

    res.json({
        message: "success"
    });
});

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is running at ${process.env.PORT}`);
});