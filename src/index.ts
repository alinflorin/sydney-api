import express from "express";
import { config } from "dotenv";
import ChatBot from "sydney-ai";

config();

const chatBot = new ChatBot(process.env.BINGTOKEN || "wrong");

(async () => {
  try {
    const app = express();
    app.use(express.json());

    app.post(`/api/chat/ask`, async (req, res) => {
      try {
        const response = await chatBot.ask(
          req.body.question,
          req.body.conversationId || undefined
        );

        res.send({
          reply: response,
          conversationId: req.body.conversationId,
        });
      } catch (err) {
        res.status(500).send("Error!");
        console.error(err);
      }
    });

    app.listen(3000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.error(err);
  }
})();
