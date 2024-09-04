import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { getStats } from "../services/ApiHandler";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register the missing PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register the missing PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #1a1a1a;
  color: #ff6b6b;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
`;

const TitleStyled = styled.h2`
  text-align: center;
  color: #ff6b6b;
  width: 100%;
`;

const ChartContainer = styled.div`
  width: 300px;
  height: 250px;
  margin: 1rem;
`;

const Stats: React.FC<{ dependency: Boolean }> = ({ dependency }) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [dependency]);

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  const genreData = {
    labels: stats.songsByGenre.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Genre",
        data: stats.songsByGenre.map((item: any) => item.count),
        backgroundColor: ["#ff6b6b", "#ff8787", "#ffc9c9", "#ffebeb"],
      },
    ],
  };

  const artistData = {
    labels: stats.songsByArtist.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Artist",
        data: stats.songsByArtist.map((item: any) => item.count),
        backgroundColor: ["#6bc2ff", "#87a6ff", "#c9d4ff", "#ebe9ff"],
      },
    ],
  };

  const albumData = {
    labels: stats.songsByAlbum.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Album",
        data: stats.songsByAlbum.map((item: any) => item.count),
        backgroundColor: ["#6bffb8", "#87ffc9", "#c9ffeb", "#ebfff8"],
      },
    ],
  };

  const totalData = {
    labels: ["Total Songs", "Total Artists", "Total Albums", "Total Genres"],
    datasets: [
      {
        label: "Overall Totals",
        data: [stats.totalSongs, stats.totalArtists, stats.totalAlbums, stats.totalGenres],
        backgroundColor: ["#ff6b6b", "#ff8787", "#ffc9c9", "#ffebeb"],
      },
    ],
  };

  return (
    <StatsContainer>
      <TitleStyled>Music Stats</TitleStyled>
    
      <ChartContainer>
        <Doughnut data={totalData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Line data={genreData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Pie data={artistData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Bar data={albumData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>
    </StatsContainer>
  );
};

export default Stats;
