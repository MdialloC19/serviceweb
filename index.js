const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./src/routes/index.routes");

// Middleware pour servir les fichiers statiques
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/database/db");
const app = express();

connectDB().catch(console.dir);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
// app.use(authenticateToken);
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Node.js, Express and Socket.io API",
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4200;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
