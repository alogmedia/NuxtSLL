<template>
  <div class="vote-tracker">
    <h2>Map Voting Statistics</h2>
    <div class="total-votes">
      <h3>Total Votes of All Time</h3>
      <ul>
        <li v-for="(total, index) in totalVotes" :key="index">
          {{ total.map }}:
          <span class="votes">{{ total.totalVotes }} vote(s)</span>
        </li>
      </ul>
    </div>

    <div v-if="totalVotes.length">
      <BarChart :chartData="totalChartData" :chartOptions="chartOptions" />
    </div>
    <div v-else>
      <p>Loading chart data...</p>
    </div>
    <div class="daily-votes">
      <h3>Daily Votes</h3>
      <BarChart :chartData="dailyChartData" :chartOptions="chartOptions" />
    </div>

    <div class="weekly-votes">
      <h3>Weekly Votes</h3>
      <BarChart :chartData="weeklyChartData" :chartOptions="chartOptions" />
    </div>

    <div class="monthly-votes">
      <h3>Monthly Votes</h3>
      <BarChart :chartData="monthlyChartData" :chartOptions="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// pages/vote.vue
definePageMeta({
  middleware: "auth-password",
});

// State for map votes, historical data, and total votes
interface MapVote {
  prettyName: string;
  gameMode: string;
  votes: number;
  voters: Set<string>;
}

interface HistoryEntry {
  mapId: string;
  timeofvote: string;
  mapVotes: {
    prettyName: string;
    gameMode: string;
    votes: number;
    voters: string[];
  }[];
}

interface TotalVote {
  map: string;
  totalVotes: number;
}

const mapVotes = ref<MapVote[]>([]);
const lastUpdateTime = ref<string>("");
const currentMapId = ref<string>("");
const totalVotes = ref<TotalVote[]>([]); // Initialized as an empty array
const dailyVotes = ref<TotalVote[]>([]);
const weeklyVotes = ref<TotalVote[]>([]);
const monthlyVotes = ref<TotalVote[]>([]);

const getVoteColor = (index: number) => {
  if (index === 0) return "green";
  if (index === 1) return "yellow";
  return "red";
};

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const totalChartData = computed(() => ({
  labels: totalVotes.value.length
    ? totalVotes.value.map((vote) => vote.map)
    : ["No Data"], // Default label
  datasets: [
    {
      label: "Total Votes",
      backgroundColor: totalVotes.value.length
        ? totalVotes.value.map((_, index) => getVoteColor(index))
        : ["#d3d3d3"], // Default color
      data: totalVotes.value.length
        ? totalVotes.value.map((vote) => vote.totalVotes)
        : [0], // Default data
    },
  ],
}));

const dailyChartData = computed(() => ({
  labels: dailyVotes.value.length
    ? dailyVotes.value.map((vote) => vote.map)
    : ["No Data"],
  datasets: [
    {
      label: "Daily Votes",
      backgroundColor: dailyVotes.value.length
        ? dailyVotes.value.map((_, index) => getVoteColor(index))
        : ["#d3d3d3"],
      data: dailyVotes.value.length
        ? dailyVotes.value.map((vote) => vote.totalVotes)
        : [0],
    },
  ],
}));

const weeklyChartData = computed(() => ({
  labels: weeklyVotes.value.length
    ? weeklyVotes.value.map((vote) => vote.map)
    : ["No Data"],
  datasets: [
    {
      label: "Weekly Votes",
      backgroundColor: weeklyVotes.value.length
        ? weeklyVotes.value.map((_, index) => getVoteColor(index))
        : ["#d3d3d3"],
      data: weeklyVotes.value.length
        ? weeklyVotes.value.map((vote) => vote.totalVotes)
        : [0],
    },
  ],
}));

const monthlyChartData = computed(() => ({
  labels: monthlyVotes.value.length
    ? monthlyVotes.value.map((vote) => vote.map)
    : ["No Data"],
  datasets: [
    {
      label: "Monthly Votes",
      backgroundColor: monthlyVotes.value.length
        ? monthlyVotes.value.map((_, index) => getVoteColor(index))
        : ["#d3d3d3"],
      data: monthlyVotes.value.length
        ? monthlyVotes.value.map((vote) => vote.totalVotes)
        : [0],
    },
  ],
}));

// Calculate votes within a timeframe
const calculateVotesWithinTimeframe = (
  history: HistoryEntry[],
  now: Date,
  timeframeMs: number,
): TotalVote[] => {
  const votesMap = new Map<string, number>();

  history.forEach((entry) => {
    const entryTime = new Date(entry.timeofvote).getTime();

    // Add validation for invalid or missing dates
    if (isNaN(entryTime)) {
      console.warn(`Invalid timeofvote detected: ${entry.timeofvote}`);
      return; // Skip this entry
    }

    // Ensure mapVotes exists and is an array
    if (!entry.mapVotes || !Array.isArray(entry.mapVotes)) {
      console.warn(`Invalid or missing mapVotes in entry:`, entry);
      return; // Skip this entry
    }

    if (now.getTime() - entryTime <= timeframeMs) {
      entry.mapVotes.forEach((mapVote) => {
        votesMap.set(
          mapVote.prettyName,
          (votesMap.get(mapVote.prettyName) || 0) + mapVote.votes,
        );
      });
    }
  });

  return Array.from(votesMap.entries()).map(([map, totalVotes]) => ({
    map,
    totalVotes,
  }));
};

const mergeVotes = (existingVotes: MapVote[], newVotes: any[]): boolean => {
  let isChanged = false;

  newVotes.forEach((entry) => {
    const { pretty_name, game_mode, voters = [] } = entry.map;
    let map = existingVotes.find(
      (m) => m.prettyName === pretty_name && m.gameMode === game_mode,
    );

    if (!map) {
      map = {
        prettyName: pretty_name,
        gameMode: game_mode,
        votes: 0,
        voters: new Set<string>(),
      };
      existingVotes.push(map);
    }

    voters.forEach((voter) => {
      if (!map.voters.has(voter)) {
        map.voters.add(voter);
        map.votes += 1;
        isChanged = true;
      }
    });
  });

  return isChanged;
};

const updateVotesByTimeframe = (history: HistoryEntry[], now: Date) => {
  const timeframes = [
    { ref: dailyVotes, ms: 24 * 60 * 60 * 1000 }, // 1 day
    { ref: weeklyVotes, ms: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    { ref: monthlyVotes, ms: 30 * 24 * 60 * 60 * 1000 }, // 1 month
  ];

  timeframes.forEach(({ ref, ms }) => {
    ref.value = calculateVotesWithinTimeframe(history, now, ms);
  });
};

const loadVotesFromFile = async () => {
  try {
    const response = await fetch("/api/loadVotes", { method: "GET" });
    if (!response.ok) throw new Error("Failed to load votes");

    const data = await response.json();

    if (!data.history || !Array.isArray(data.history)) {
      console.warn("Invalid or missing history data");
      return;
    }
    if (!data.totalVotes || !Array.isArray(data.totalVotes)) {
      console.warn("Invalid or missing totalVotes data");
      totalVotes.value = [];
      return;
    }

    console.log("Loaded totalVotes:", data.totalVotes); // Debug
    totalVotes.value = data.totalVotes || [];
    updateVotesByTimeframe(data.history, new Date());
  } catch (error) {
    console.error("Error loading votes:", error);
  }
};

const saveVotesToFile = async (isNewMap = false) => {
  try {
    console.log("Saving votes to file:", mapVotes.value);

    // Convert `voters` Set back to array for JSON serialization
    const dataToSave: {
      history: HistoryEntry[];
      totalVotes: TotalVote[];
    } = {
      history: [],
      totalVotes: totalVotes.value,
    };

    if (isNewMap) {
      // Add new section if it's a new map
      dataToSave.history.push({
        mapId: currentMapId.value,
        timeofvote: new Date().toISOString(),
        mapVotes: mapVotes.value.map((map) => ({
          prettyName: map.prettyName,
          gameMode: map.gameMode,
          votes: map.votes,
          voters: Array.from(map.voters),
        })),
      });
    } else {
      // Fetch previous data from the file first to correctly append to `history`
      const response = await fetch("/api/loadVotes", { method: "GET" });
      if (!response.ok) {
        throw new Error(
          `Failed to load votes from file before saving: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Append existing history and update current
      dataToSave.history = data.history || [];
      dataToSave.history.push({
        mapId: currentMapId.value,
        timeofvote: new Date().toISOString(),
        mapVotes: mapVotes.value.map((map) => ({
          prettyName: map.prettyName,
          gameMode: map.gameMode,
          votes: map.votes,
          voters: Array.from(map.voters),
        })),
      });
    }

    console.log("Payload to be saved:", JSON.stringify(dataToSave, null, 2));

    const response = await fetch("/api/saveVotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });

    if (response.ok) {
      console.log("Votes saved successfully to file.");
    } else {
      console.error("Failed to save votes:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving votes to file:", error);
  }
};

// Fetch the current game state to determine the current map
const fetchGameState = async () => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: "/api/get_gamestate",
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch game state: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Fetched game state:", data);

    if (data.result && data.result.current_map && data.result.current_map.id) {
      const newMapId = data.result.current_map.id;

      if (newMapId !== currentMapId.value) {
        console.log("Map has changed. Creating a new record for the new map.");
        currentMapId.value = newMapId;
        saveVotesToFile(true); // Save previous data and start a new section
        mapVotes.value = []; // Reset map votes for the new map
      }
    } else {
      console.warn("Unexpected format in game state response data");
    }
  } catch (error) {
    console.error("Error fetching game state:", error);
  }
};

const fetchVotesFromAPI = async () => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint: "/api/get_votemap_status" }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch votes from API: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    if (!data.result || !Array.isArray(data.result)) {
      console.warn("Unexpected API response:", data);
      return;
    }

    const isDataChanged = mergeVotes(mapVotes.value, data.result);
    if (isDataChanged) {
      saveVotesToFile();
      updateVotesByTimeframe(data.history, new Date());
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};

onMounted(async () => {
  await loadVotesFromFile();
  await Promise.all([fetchGameState(), fetchVotesFromAPI()]);
  setInterval(fetchVotesFromAPI, 60000); // Refresh every minute
});
</script>

<style scoped lang="scss">
.vote-tracker {
  padding: 2rem;
  background-color: #1e1e2e;
  border-radius: 1rem;
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: "Roboto", sans-serif;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #ffd700;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #ffd700;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: #282a36;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .votes {
        font-weight: bold;
        color: #50fa7b;
      }
    }
  }
}

.date-votes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  > div {
    background: #1e1e2e;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.red {
  color: #fa5050;
}

.yellow {
  color: #f7fa50;
}

.green {
  color: #50fa7b;
}
</style>
