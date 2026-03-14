const express = require("express");
const cors = require("cors");
const windRoute = require("./routes/wind");

const app = express();
app.use(cors());
app.use("/api/wind", windRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));