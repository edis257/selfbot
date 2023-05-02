//SHIT
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const user_id = process.env.USER_ID;
const { Client } = require("discord.js-selfbot-v13");
const { Configuration, OpenAIApi } = require("openai");
const client = new Client({
    checkUpdate: false,
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//CODE STARTS HERE
client.on("ready", async () => {
    console.log(`${client.user.username} is ready!`);
});



client.on("messageCreate", async (message) => {

    // If the message author's ID is the target user ID, do nothing and return
    if (message.author.id === user_id) {
        return;
    }

    const prompt = message.content;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
    });

    const reply = completion.data.choices[0].message.content;

    message.channel.send(reply);
});

client.login(token);
