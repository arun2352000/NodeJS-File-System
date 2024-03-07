import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";

const app = express();
const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`app is running in the port: ${PORT}`);
// });
app.get("/", (req, res) => {
  let today = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
  res
    .status(200)
    .json({ message: "hai this is  Arunachalam ", timestamp: `${today}` });
});
app.get("/write", (req, res) => {
  let today = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
  console.log(("today", today));
  const filePath = `Timestamp/${today}.txt`;
  fs.writeFileSync(filePath, `${today}`, "utf8");
  res.status(200).json({ message: "hai data writen" });
  //   let data = fs.readFileSync(filePath, "utf8");
  //     res.status(200), send(data);
});

app.get("/read", (req, res) => {
  const filePath = "Timestamp";
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("error on reading files");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === '.txt');
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => {
  console.log(`app is running in the port: ${PORT}`);
});

