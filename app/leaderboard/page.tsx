"use client";
import { JSX, useEffect, useState } from "react";
import { GoPeople } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { IoIosTrendingUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";

interface userData {
  name: string;
  trustScore: string;
  category: string;
  followers: string;
  username: string;
  claimStats: {
    verified: string;
  };
}

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userData, setUserData] = useState<Partial<userData[]>>([]);
  const router = useRouter();
  const user = {
    activeInfluencers: 1234,
    claimsVerified: 25431,
    averageTrustScore: "85.7%",
  };

  const categories = [
    "All",
    "Nutrition",
    "Fitness",
    "Medicine",
    "Mental Health",
  ];

  const handleNavigate = (username: string | undefined) => {
    router.push(`/influencer/${username}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://verifyserver-dk5m.onrender.com/getInfluencers`
        );
        setUserData(response.data.data);
        // console.log(response);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  // const usersData = [
  //   {
  //     name: "Dr. Peter Attia",
  //     category: "Medicine",
  //     trustScore: "94%",
  //     followers: 1_234_355,
  //     verifiedClaims: 203,
  //   },
  //   {
  //     name: "Andrew Huberman",
  //     category: "Neuroscience",
  //     trustScore: "92%",
  //     followers: 2_100_500,
  //     verifiedClaims: 180,
  //   },
  //   {
  //     name: "Dr. Rhonda Patrick",
  //     category: "Nutrition",
  //     trustScore: "96%",
  //     followers: 1_870_300,
  //     verifiedClaims: 220,
  //   },
  // ];

  return (
    <section className="p-6 bg-[#121826] text-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gradient-to-r from-[#477c73] to-[#34548e]">
          Influencer Trust Leaderboard
        </h1>
        <p className="text-gray-400 text-sm">
          Real-time rankings of health influencers based on scientific accuracy,
          credibility, and transparency. Updated daily using AI-powered
          analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={<GoPeople />}
          value={user.activeInfluencers}
          label="Active Influencers"
        />
        <StatCard
          icon={<FiCheckCircle />}
          value={user.claimsVerified}
          label="Claims Verified"
        />
        <StatCard
          icon={<FaRegChartBar />}
          value={user.averageTrustScore}
          label="Average Trust Score"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* Categories */}
        <div className="flex space-x-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <button className="flex items-center gap-x-2 bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600">
          <BiSortAlt2 />
          Highest First
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-600">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              {[
                "RANK",
                "INFLUENCER",
                "CATEGORY",
                "TRUST SCORE",
                "TREND",
                "FOLLOWERS",
                "VERIFIED CLAIMS",
              ].map((header, index) => (
                <th key={index} className="px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index: number) => (
              <tr
                key={index}
                onClick={() => handleNavigate(data?.username)}
                className="border-b border-gray-600 hover:bg-gray-800"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{data?.name}</td>
                <td className="px-4 py-2">{data?.category}</td>
                <td className="px-4 py-2">{data?.trustScore}</td>
                <td className="px-4 py-2 text-green-400">
                  <IoIosTrendingUp />
                </td>
                <td className="px-4 py-2">{data?.followers}</td>
                <td className="px-4 py-2">{data?.claimStats?.verified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: JSX.Element;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-x-4 bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="text-3xl text-green-400">{icon}</div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </div>
  );
}
