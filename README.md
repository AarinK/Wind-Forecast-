# UK Wind Forecast Dashboard

This project provides a **dashboard to monitor wind power generation forecasts in the UK**. It includes both a **backend** to serve actual and forecasted data, and a **React frontend** to visualize the results.

---

## Project Structure

```
wind-forecast-app/
├── backend/    # Node.js backend
├── frontend/   # React.js frontend
├── analysis/   # Jupyter notebooks and CSV datasets
├── README.md
├── .gitignore
```

### Backend

- Built with **Node.js** and **Express**.
- Serves a REST API at `/api/wind`.
- Reads CSV files from `analysis/` folder for actuals and forecasts.
- Configurable via `.env` (optional: API keys, PORT).
- Example endpoint:  
  ```
  GET /api/wind?horizon=4
  ```

### Frontend

- Built with **React.js** (Tailwind CSS optional).
- Dashboard displays:
  - Actual vs forecasted wind power (MW)
  - Forecast horizon slider
  - Date range picker
  - MAE (Mean Absolute Error)
  - Dark/light mode toggle
  - Mobile-responsive chart using **Recharts**

### Analysis

- Jupyter notebooks for exploratory data analysis.
- CSV files:
  - `wind_actuals_jan2024.csv`
  - `wind_forecasts_jan2024.csv`
  - `wind_analysis_ready_filtered.csv`
- Requirements in `requirements.txt` (pandas, matplotlib, numpy, seaborn)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/AarinK/wind-forecast-app.git
cd wind-forecast-app
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Option 1: Run separately

**Backend:**

```bash
cd backend
node server.js
```

**Frontend:**

```bash
cd frontend
npm run dev
```

### Option 2: Run both with a single command

1. Install `concurrently` in the root folder:

```bash
npm install --save-dev concurrently
```

2. Add scripts to the root `package.json`:

```json
"scripts": {
  "start:backend": "node backend/server.js",
  "start:frontend": "npm run dev --prefix frontend",
  "start:all": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
}
```

3. Run both servers:

```bash
npm run start:all
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Features

- Actual vs forecasted wind power visualization
- Configurable forecast horizon (0-48h)
- MAE (Mean Absolute Error) calculation
- Dark/light mode with smooth transitions
- Mobile-responsive charts
- Date range filtering

---

## Notes

- Missing forecasts are ignored in the chart
- Forecasts are selected based on the latest publish time **at least `horizon` hours before the target time**
- The dashboard works on both desktop and mobile
- MAE calculation ignores missing values to prevent `NaN`

---

## License

MIT License

