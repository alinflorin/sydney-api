import express from "express";
import { config } from 'dotenv';

config();

(async () => {
  try {
    const app = express();
    app.use(express.json());
    

    app.post(`/api/chat`, async (req, res) => {
      try {
        // TODO
        res.send('test');
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
