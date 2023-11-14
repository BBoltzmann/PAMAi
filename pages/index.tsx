import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nubytes Admin for Lawyers</title>
        <meta name="description" content="Admin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-sans bg-gray-100 text-gray-800 mx-3 md:mx-24 mt-10 ">
        <div className="container mx-auto p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Energy Profile Questionnaire
          </h1>

          <form id="questionnaireForm" className="mb-8">
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
      </div>

      {/* <div
        id="profileChart"
        className="chart-container mx-auto p-8 bg-white rounded shadow-md"
      ></div> */}
    </>
  );
}
