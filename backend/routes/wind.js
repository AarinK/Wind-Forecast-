const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser"); 
const router = express.Router();

// Helper function to load CSVs
const loadCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

// GET /api/wind?horizon=4
router.get("/", async (req, res) => {
  try {
    // Read horizon from query parameter; default = 4 hours
    const horizon = Number(req.query.horizon) || 4;

    const actuals = await loadCSV(path.join(__dirname, "../datasets/wind_actuals_jan2024.csv"));
    const forecasts = await loadCSV(path.join(__dirname, "../datasets/wind_forecasts_jan2024.csv"));

    // Merge actuals & forecasts by startTime
  const merged = actuals.map((a) => {
  // find all forecasts for this startTime
  const forecastsForTime = forecasts.filter((f) => f.startTime === a.startTime);

  if (forecastsForTime.length === 0) {
    return {
      startTime: a.startTime,
      actualGeneration: Number(a.generation),
      forecastGeneration: null,
      forecastPublishTime: null,
    };
  }

  // sort by publishTime descending
  const sorted = forecastsForTime.sort(
    (x, y) => new Date(y.publishTime) - new Date(x.publishTime)
  );

  // pick first forecast that meets horizon, else pick latest available
  const forecast =
    sorted.find(
      (f) =>
        (new Date(a.startTime) - new Date(f.publishTime)) / (1000 * 60 * 60) >= horizon
    ) || sorted[0];

  return {
    startTime: a.startTime,
    actualGeneration: Number(a.generation),
    forecastGeneration: forecast ? Number(forecast.generation) : null,
    forecastPublishTime: forecast ? forecast.publishTime : null,
  };
});

    res.json(merged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

module.exports = router;