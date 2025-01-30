"use client";
import { useState, useEffect } from "react";

import { IoIosSearch, IoIosTrendingUp } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { IoFunnelOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useParams } from "next/navigation";

interface Claim {
  verificationStatus: string;
  date: string;
  text: string;
  aiAnalysis: string | null;
}

interface Influencer {
  name: string;
  description: string;
  followers: number;
  profilePic: string;
}

export default function Influencer() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  // console.log(username);
  const categories = [
    "All",
    "Nutrition",
    "Fitness",
    "Medicine",
    "Mental Health",
  ];
  const verificationStatus = [
    "All Statuses",
    "Verified",
    "Questionable",
    "Debunked",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [influencer, setInfluencer] = useState<Partial<Influencer>>();

  const [claims, setClaims] = useState<Partial<Claim>[]>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://verifyserver-dk5m.onrender.com/getInfluencerClaims?username=${username}`
        );
        setInfluencer(response?.data?.influencer);
        setClaims(response?.data?.claims.claims);
        // console.log(response);
      } catch (err: unknown) {
        setError("An error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto p-6 h-screen bg-gray-900 text-white rounded-lg shadow-lg">
      {influencer && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16  overflow-hidden relative">
            {/* <Image
              src={influencer.profilePic}
              alt="Profile Picture"
              width={64}
              height={64}
              className="object-cover"
            /> */}
            <CgProfile className="" />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">{influencer.name}</h2>
            <ul className="flex gap-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className="px-3 py-1 rounded-3xl cursor-pointer text-sm bg-gray-700"
                >
                  {category}
                </li>
              ))}
            </ul>
            <p className="text-gray-400">{influencer.description}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Trust Score"
          value="89%"
          description="Based on 127 verified claims"
          icon={IoIosTrendingUp}
        />
        <StatCard
          title="Yearly Revenue"
          value="$5.0M"
          description="Estimated earnings"
          icon={FiDollarSign}
        />
        <StatCard
          title="Products"
          value="1"
          description="Recommended Products"
          icon={LuShoppingBag}
        />
        <StatCard
          title="Followers"
          value={`${influencer ? influencer.followers : 0}`}
          description="Total following"
          icon={IoIosTrendingUp}
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center bg-gray-700 p-2 rounded">
          <IoIosSearch className="text-gray-400" />
          <input
            type="search"
            placeholder="Search Claims"
            className="bg-transparent outline-none ml-2 w-full text-sm text-white"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold">Categories</h3>
        <ul className="flex gap-2">
          {categories?.map((category) => (
            <li
              key={category}
              className={`px-3 py-1 rounded-full cursor-pointer text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <div className="flex gap-x-6 mt-4">
          <div>
            <h3 className="text-lg font-bold">Verification Status</h3>
            <ul className="flex gap-2">
              {verificationStatus?.map((status) => (
                <li
                  key={status}
                  className={`px-3 py-1 rounded-full cursor-pointer text-sm font-semibold transition ${
                    selectedStatus === status
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Sort By</h3>
            <input
              type="date"
              className="bg-gray-800 p-2 rounded-lg text-white"
            />
          </div>
        </div>

        <p className="flex mt-4 text-gray-300">
          <IoFunnelOutline /> Active Filters: {selectedCategory},{" "}
          {selectedStatus}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Showing {claims?.length} Claims</h3>
        <ul className="mt-2 space-y-4">
          {claims?.map((claim, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-green-400">
                  {claim.verificationStatus}
                </span>{" "}
                · {claim.date}
              </p>
              <p className="text-white mt-2">{claim.text}</p>
              <p className="cursor-pointer flex items-center gap-1 text-green-600">
                View Source <FaExternalLinkAlt />
              </p>
              <div className="mt-3 ps-2 gap-4 text-sm ">
                <p className="cursor-pointer flex items-center gap-1 ">
                  AI Analysis
                </p>
                <p>{claim.aiAnalysis || "AI analysis will be shown here."}</p>
                <p className="cursor-pointer text-green-600 flex items-center gap-1">
                  View Research <FaExternalLinkAlt />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 text-gray-300">
        <p className="font-semibold">{title}</p>
        <Icon className="text-green-400" />
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};
