import React, { useState } from "react";

const TimeDifferenceCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateTimeDifference = () => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setErrorMessage("Please enter valid start and end times.");
      return;
    }

    if (end < start) {
      setErrorMessage("End time cannot be earlier than start time.");
      return;
    }

    if (start.getHours() < 18) {
      const endBefore6 = new Date(start);
      endBefore6.setHours(18, 0, 0, 0);

      const differenceBefore6 = Math.abs(
        endBefore6.getTime() - start.getTime()
      );
      const hoursBefore6 = Math.floor(differenceBefore6 / (1000 * 60 * 60));
      const minutesBefore6 = Math.floor(
        (differenceBefore6 % (1000 * 60 * 60)) / (1000 * 60)
      );

      const endAfter6 = new Date(start);
      endAfter6.setHours(18, 0, 0, 0);

      const differenceAfter6 = Math.abs(end.getTime() - endAfter6.getTime());
      const hoursAfter6 = Math.floor(differenceAfter6 / (1000 * 60 * 60));
      const minutesAfter6 = Math.floor(
        (differenceAfter6 % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeDifference(
        `From ${startTime} to 18:00: ${hoursBefore6} hours and ${minutesBefore6} minutes\nFrom 18:00 to ${endTime}: ${hoursAfter6} hours and ${minutesAfter6} minutes`
      );
    } else {
      const difference = Math.abs(end.getTime() - start.getTime());
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setTimeDifference(`${hours} hours and ${minutes} minutes`);
    }

    setErrorMessage("");
  };

  return (
    <div>
      <h2>Time Difference Calculator</h2>
      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br />
      <label>End Time:</label>
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br />
      <button onClick={calculateTimeDifference}>Calculate Difference</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {timeDifference && <p>Time difference: {timeDifference}</p>}
    </div>
  );
};

export default TimeDifferenceCalculator;
