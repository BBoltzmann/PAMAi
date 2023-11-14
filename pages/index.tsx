import Head from "next/head";
import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function Home() {

  const [profileName, setProfileName] = useState<string>("");
  const [data, setData] = useState<
    Array<{ hour: string; load: number; generation: number; rateClass: string }>
  >([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedProfile = determineProfile(formData);
    setProfileName(selectedProfile);
    displayProfileChart(selectedProfile);
  };

  const determineProfile = (formData: FormData) => {
    const energyGeneration = parseFloat(
      formData.get("energyGeneration") as string
    );
    const peakUsage = formData.get("peakUsage") as string;

    if (energyGeneration > 5) {
      return "Eco Warriors";
    } else if (peakUsage === "night") {
      return "Night Owls";
    } else {
      return "Sunrise Savers"; // Default profile
    }
  };

  const displayProfileChart = (profileName: string) => {
    const chartData = generateChartData();
    setData(chartData);
  };

  const generateChartData = () => {
    const chartData: Array<{
      hour: string;
      load: number;
      generation: number;
      rateClass: string;
    }> = [];
    let totalGeneration = 0;

    for (let hour = 0; hour < 24; hour++) {
      const loadHeight = Math.random() * 100;
      const generationHeight = Math.random() * 100;
      totalGeneration += generationHeight;

      const rateClass = determineRateClass(
        generationHeight,
        totalGeneration / 24
      );

      chartData.push({
        hour: `${hour}:00`,
        load: loadHeight,
        generation: generationHeight,
        rateClass: rateClass,
      });
    }

    return chartData;
  };

  const determineRateClass = (
    generationHeight: number,
    averageGeneration: number
  ) => {
    if (generationHeight < averageGeneration * 0.5) {
      return "more-expensive-line";
    } else if (generationHeight > averageGeneration * 1.3) {
      return "less-expensive-line";
    } else {
      return "normal-rate-line";
    }
  };

  return (
    <>
      <Head>
        <title>Pamai</title>
        <meta name="description" content="Admin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-sans bg-gray-100 text-gray-800 mx-3 md:mx-24 mt-10 ">
        <div className="container mx-auto p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Energy Profile Questionnaire
          </h1>

          <form id="questionnaireForm" className="mb-8" onSubmit={handleSubmit}>
            <label htmlFor="peakUsage" className="block mb-2">
              Peak Energy Usage Times:
            </label>
            <select
              name="peakUsage"
              id="peakUsage"
              className="w-full p-2 border rounded mb-2"
              required
            >
              <option value="">Select...</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>

            <label htmlFor="consumptionHabits" className="block mb-2">
              Energy Consumption Habits:
            </label>
            <select
              name="consumptionHabits"
              id="consumptionHabits"
              className="w-full p-2 border rounded mb-2"
              required
            >
              <option value="">Select...</option>
              <option value="consistent">Consistent throughout the day</option>
              <option value="varies">Varies significantly</option>
              <option value="daylight">Mostly during daylight hours</option>
              <option value="nondaylight">
                Mostly during non-daylight hours
              </option>
            </select>

            <label htmlFor="energyGeneration" className="block mb-2">
              How much average energy do you generate daily (in kWh)?
            </label>
            <input
              type="number"
              id="energyGeneration"
              name="energyGeneration"
              className="w-full p-2 border rounded mb-2"
              placeholder="Average daily generation in kWh"
              required
            />

            <label htmlFor="energyConservation" className="block mb-2">
              Do you employ any energy efficiency or conservation measures?
            </label>
            <input
              type="text"
              id="energyConservation"
              name="energyConservation"
              className="w-full p-2 border rounded mb-2"
              placeholder="e.g., LED lighting, energy-efficient appliances"
              required
            ></input>

            <label htmlFor="pricingReaction" className="block mb-2">
              How likely are you to adjust your energy usage based on changes in
              energy rates?
            </label>
            <select
              name="pricingReaction"
              id="pricingReaction"
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select...</option>
              <option value="veryLikely">Very likely</option>
              <option value="somewhatLikely">Somewhat likely</option>
              <option value="unlikely">Unlikely</option>
              <option value="notAtAll">Not at all</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-full rounded cursor-pointer transition duration-300 hover:bg-blue-700 mt-5"
            >
              Submit
            </button>
          </form>
        </div>

        {/* <div
          id="profileChart"
          className="chart-container mx-auto p-8 bg-white rounded shadow-md"
        >
          {profileName && (
            <BarChart
              width={800}
              height={400}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="load" fill="#8884d8" />
              <Bar dataKey="generation" fill="#82ca9d" />
            </BarChart>
          )}
        </div> */}

        <div
          id="profileChart"
          className="chart-container mx-auto p-8 bg-white rounded shadow-md"
        >
          {profileName && (
            <div className="text-center">
              <p className="text-xl font-bold mt-4">Your Energy Profile:</p>
              <p className="text-2xl text-green-600">{profileName}</p>
            </div>
          )}

          {profileName && (
               <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={800}
              height={400}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="load"
                stroke="#8884d8"
                name="Load"
              />
              <Line
                type="monotone"
                dataKey="generation"
                stroke="#82ca9d"
                name="Generation"
              />
              </LineChart>
              </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* <div
        id="profileChart"
        className="chart-container mx-auto p-8 bg-white rounded shadow-md"
      ></div> */}
    </>
  );
}
