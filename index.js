const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = openai.listEngines();

const port = process.env.PORT || 3000;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chatgpt-quoctang.netlify.app/");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With",
    "Content-Type"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 10,
    temperature: 0,
  });
  if (response.data.choices) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  // console.log(`Server started on port ${port}`);
});
