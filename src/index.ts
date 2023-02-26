import express from "express";
import { config } from "dotenv";
import ChatBot from "sydney-ai";
import "express-async-errors";

config();

const chatBot = new ChatBot(process.env.BINGTOKEN || "wrong");

(async () => {
  try {
    const app = express();
    app.use(express.json());

    app.post(`/api/ask`, async (req, res) => {
      const reply = await chatBot.ask(
        req.body.question,
        req.body.conversationId
      );
      res.send({reply: reply});
    });

    app.post(`/api/askStream`, async (req, res) => {
      try {
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        res.on("close", () => {
          res.end();
        });

        await chatBot.askStream(
          (d) => {
            res.write(`data: ${JSON.stringify({ reply: d })}\n\n`);
          },
          req.body.question,
          req.body.conversationId
        );
      } catch (err) {
        console.error(err);
      } finally {
        res.end();
      }
    });

    app.listen(3000, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.error(err);
  }
})();
