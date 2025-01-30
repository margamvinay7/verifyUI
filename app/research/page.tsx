"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import axios from "axios"; // Import axios

export default function Research() {
  // Default journal list
  const defaultJournals = [
    "Pubmed Central",
    "Nature",
    "Science",
    "Cell",
    "The Lancet",
    "New England Journal of Medicine",
    "JAMA Network",
  ];

  // State for selected journals
  const [selectedJournals, setSelectedJournals] = useState<string[]>([""]);
  const [journals, setJournals] = useState(defaultJournals);
  const [newJournal, setNewJournal] = useState("");
  const [timeRange, setTimeRange] = useState("Last Month"); // State for time range
  const [influencerName, setInfluencerName] = useState(""); // State for influencer name
  const [claims, setClaims] = useState(50); // State for claims per influencer
  const [products, setProducts] = useState(10); // State for products per influencer
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(false); // State for revenue analysis
  const [verifyWithJournals, setVerifyWithJournals] = useState(false); // State for scientific journals
  const [notes, setNotes] = useState("");

  // Toggle journal selection
  const toggleJournalSelection = (journal: string) => {
    setSelectedJournals((prev) =>
      prev.includes(journal)
        ? prev.filter((j: string) => j !== journal)
        : [...prev, journal]
    );
  };

  // Handle adding a new journal
  const addJournal = () => {
    if (newJournal.trim() && !journals.includes(newJournal.trim())) {
      setJournals([...journals, newJournal.trim()]);
      setNewJournal(""); // Reset input field
    }
  };

  // Handle form submission to backend
  const handleSubmit = async () => {
    const requestData = {
      journals: selectedJournals,
      timeRange,
      username: influencerName,
      claimLimit: claims,
      products,
      includeRevenueAnalysis,
      verifyWithJournals,
      notes,
    };

    // console.log("req", requestData);
    try {
      const response = await axios.post(
        "https://verifyserver-dk5m.onrender.com/research/createResearch",
        requestData
      );
      // console.log("Research data sent successfully:", response.data);
    } catch (error) {
      // console.error("Error sending research data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <FaArrowLeft className="cursor-pointer text-gray-400 hover:text-white" />
        <p className="text-lg font-semibold">Back to Dashboard</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Research Tasks</h2>

      <div className="p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <MdOutlineSettings className="text-xl" />
          <h3 className="text-lg font-semibold">Research Configuration</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="font-semibold">Specific Influencer</h4>
            <p className="text-gray-400 text-sm">
              Research a known health influencer by name
            </p>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="font-semibold">Discover New</h4>
            <p className="text-gray-400 text-sm">
              Find and analyze new health influencers
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Time Range</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <button
                  className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                  onClick={() => setTimeRange("Last Week")}
                >
                  Last Week
                </button>
                <button
                  className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                  onClick={() => setTimeRange("Last Month")}
                >
                  Last Month
                </button>
                <button
                  className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                  onClick={() => setTimeRange("Last Year")}
                >
                  Last Year
                </button>
                <button
                  className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                  onClick={() => setTimeRange("All Time")}
                >
                  All Time
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Influencer Name</h4>
              <div className="flex items-center bg-gray-700 p-2 rounded">
                <IoIosSearch className="text-gray-400" />
                <input
                  type="search"
                  placeholder="Enter influencer name"
                  className="bg-transparent outline-none ml-2 w-full text-sm"
                  value={influencerName}
                  onChange={(e) => setInfluencerName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Claims to Analyze Per Influencer
              </h4>
              <input
                type="number"
                value={claims}
                onChange={(e) => setClaims(parseInt(e.target.value))}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
              <p className="text-xs text-gray-400">
                Recommended: 50-100 claims for comprehensive analysis
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">
                Products to Find Per Influencer
              </h4>
              <input
                type="number"
                value={products}
                onChange={(e) => setProducts(parseInt(e.target.value))}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
            </div>

            <div className="mb-4 flex items-center justify-between bg-gray-700 p-3 rounded">
              <div>
                <h4 className="font-semibold">Include Revenue Analysis</h4>
                <p className="text-xs text-gray-400">
                  Analyze monetization methods and estimate earnings
                </p>
              </div>
              <Switch
                checked={includeRevenueAnalysis}
                onCheckedChange={setIncludeRevenueAnalysis}
              />
            </div>

            <div className="mb-4 flex items-center justify-between bg-gray-700 p-3 rounded">
              <div>
                <h4 className="font-semibold">
                  Verify with Scientific Journals
                </h4>
                <p className="text-xs text-gray-400">
                  Cross-reference claims with scientific literature
                </p>
              </div>
              <Switch
                checked={verifyWithJournals}
                onCheckedChange={setVerifyWithJournals}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Scientific Journals</h3>
          <button
            onClick={() =>
              setSelectedJournals(selectedJournals?.length ? [] : journals)
            }
            className="text-sm text-blue-400 hover:underline"
          >
            {selectedJournals.length ? "Deselect All" : "Select All"}
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-2">
          {journals.map((journal, index) => (
            <li key={index} className="flex items-center gap-2">
              <button
                className={`w-5 h-5 rounded-full border ${
                  selectedJournals.includes(journal)
                    ? "bg-blue-500"
                    : "bg-gray-600"
                }`}
                onClick={() => toggleJournalSelection(journal)}
              />
              {journal}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add new journal"
            value={newJournal}
            onChange={(e) => setNewJournal(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
          <button
            onClick={addJournal}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Notes for Research Assistant</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any specific instructions or focus areas"
          className="w-full p-2 bg-gray-800 rounded text-white"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 px-6 py-2 rounded hover:bg-green-600"
        >
          Start Research
        </button>
      </div>
    </div>
  );
}
