require('dotenv').config();
const express = require('express')
const app = express();
const userrouter = require('./router/userrouter');
const connectdb = require("./utils/db")
const jobservice = require("./router/jobservice")
const cors = require('cors');
const jobapply = require('./router/jobapplication')


const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", userrouter);
app.use("/api/hr", jobservice);
app.use("/api/job", jobapply);

connectdb().then(() => {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});