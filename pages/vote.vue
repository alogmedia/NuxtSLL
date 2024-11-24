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
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
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
const totalVotes = ref<TotalVote[]>([]);
const dailyVotes = ref<TotalVote[]>([]);
const weeklyVotes = ref<TotalVote[]>([]);
const monthlyVotes = ref<TotalVote[]>([]);

// Computed properties to sort daily, weekly, and monthly votes
const sortedDailyVotes = computed(() => {
  return [...dailyVotes.value].sort((a, b) => b.totalVotes - a.totalVotes);
});

const sortedWeeklyVotes = computed(() => {
  return [...weeklyVotes.value].sort((a, b) => b.totalVotes - a.totalVotes);
});

const sortedMonthlyVotes = computed(() => {
  return [...monthlyVotes.value].sort((a, b) => b.totalVotes - a.totalVotes);
});

// Function to determine vote color based on rank
const getVoteColor = (index: number, length: number) => {
  if (index === 0) return "green";
  if (index === 1) return "yellow";
  return "red";
};

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const chartData = computed(() => ({
  labels: totalVotes.value.map((vote) => vote.map), // X-axis labels from map names
  datasets: [
    {
      label: "Total Votes",
      backgroundColor: totalVotes.value.map((_, index) =>
        getVoteColor(index, totalVotes.value.length),
      ), // Dynamic colors for bars
      data: totalVotes.value.map((vote) => vote.totalVotes), // Y-axis data
    },
  ],
}));

const loadVotesFromFile = async () => {
  try {
    const response = await fetch("/api/loadVotes", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to load votes from file: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Loaded data from file:", data);

    // Ensure data.history is an array and has valid entries
    if (
      data.history &&
      Array.isArray(data.history) &&
      data.history.length > 0
    ) {
      const latestHistory = data.history[data.history.length - 1];

      // Validate that mapVotes exists and is an array
      if (latestHistory && Array.isArray(latestHistory.mapVotes)) {
        mapVotes.value = latestHistory.mapVotes.map((map: any) => ({
          ...map,
          voters: new Set(map.voters || []), // Ensure voters is always a Set
        }));
        lastUpdateTime.value = latestHistory.timeofvote || "";
        currentMapId.value = latestHistory.mapId || "";
      } else {
        console.warn("Unexpected format in latestHistory or missing mapVotes");
        mapVotes.value = [];
      }
    } else {
      console.warn(
        "Unexpected format in local file data - history is missing or empty",
      );
      mapVotes.value = [];
    }

    // Ensure data.totalVotes is an array
    if (data.totalVotes && Array.isArray(data.totalVotes)) {
      totalVotes.value = data.totalVotes;
    } else {
      console.warn(
        "Unexpected format in local file data - totalVotes is missing or not an array",
      );
      totalVotes.value = [];
    }

    // Calculate daily, weekly, and monthly votes if the history is valid
    if (data.history && Array.isArray(data.history)) {
      const now = new Date();
      const dayInMs = 24 * 60 * 60 * 1000;
      const weekInMs = 7 * dayInMs;
      const monthInMs = 30 * dayInMs;

      dailyVotes.value = calculateVotesWithinTimeframe(
        data.history,
        now,
        dayInMs,
      );
      weeklyVotes.value = calculateVotesWithinTimeframe(
        data.history,
        now,
        weekInMs,
      );
      monthlyVotes.value = calculateVotesWithinTimeframe(
        data.history,
        now,
        monthInMs,
      );
    }
  } catch (error) {
    console.error("Error loading data from file:", error);
  }
};

const calculateVotesWithinTimeframe = (
  history: HistoryEntry[],
  now: Date,
  timeframeMs: number,
): TotalVote[] => {
  const votesMap = new Map<string, Set<string>>();

  history.forEach((entry) => {
    const entryTime = new Date(entry.timeofvote).getTime();

    if (now.getTime() - entryTime <= timeframeMs) {
      entry.mapVotes.forEach((mapVote) => {
        if (!votesMap.has(mapVote.prettyName)) {
          votesMap.set(mapVote.prettyName, new Set());
        }
        mapVote.voters?.forEach((voter) =>
          votesMap.get(mapVote.prettyName)?.add(voter),
        );
      });
    }
  });

  return Array.from(votesMap.entries()).map(([map, voters]) => ({
    map,
    totalVotes: voters.size,
  }));
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

// Fetch new votes from the API (proxy endpoint)
const fetchVotesFromAPI = async () => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: "/api/get_votemap_status",
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch votes from API: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Fetched data from API:", data);

    if (data.result && Array.isArray(data.result)) {
      let isDataChanged = false;

      // Merge new votes with existing votes
      data.result.forEach((entry: any) => {
        const mapId = entry.map.id;
        const prettyName = entry.map.pretty_name;
        const gameMode = entry.map.game_mode;
        const voters = entry.voters || [];

        // Find the corresponding map in the current votes
        let map = mapVotes.value.find(
          (m) => m.prettyName === prettyName && m.gameMode === gameMode,
        );

        if (!map) {
          // If the map is not found, add it to the votes
          map = {
            prettyName,
            gameMode,
            votes: 0,
            voters: new Set<string>(),
          };
          mapVotes.value.push(map);
        }

        // Add new voters to the existing map
        voters.forEach((voter: string) => {
          if (!map!.voters.has(voter)) {
            map!.voters.add(voter);
            map!.votes += 1;
            isDataChanged = true;

            // Update total votes
            let totalVote = totalVotes.value.find((t) => t.map === prettyName);
            if (totalVote) {
              totalVote.totalVotes += 1;
            } else {
              totalVotes.value.push({ map: prettyName, totalVotes: 1 });
            }
          }
        });
      });

      if (isDataChanged) {
        console.log("New votes data detected. Updating...");
        saveVotesToFile(); // Save updated votes

        // Update daily, weekly, and monthly votes immediately after fetching new votes
        const now = new Date();
        const dayInMs = 24 * 60 * 60 * 1000;
        const weekInMs = 7 * dayInMs;
        const monthInMs = 30 * dayInMs;

        dailyVotes.value = calculateVotesWithinTimeframe(
          data.history,
          now,
          dayInMs,
        );
        weeklyVotes.value = calculateVotesWithinTimeframe(
          data.history,
          now,
          weekInMs,
        );
        monthlyVotes.value = calculateVotesWithinTimeframe(
          data.history,
          now,
          monthInMs,
        );
      } else {
        console.log("No new changes in vote data.");
      }
    } else {
      console.warn("Unexpected format in API response data");
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};

onMounted(() => {
  loadVotesFromFile().then(() => {
    fetchGameState().then(() => {
      fetchVotesFromAPI(); // Initial load
      setInterval(() => {
        fetchVotesFromAPI(); // Refresh votes every 5 minutes
      }, 60000);
    });
  });
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
