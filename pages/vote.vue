<template>
  <div class="vote-tracker">
    <h2>Map Voting Statistics</h2>
    <div class="all-votes">
      <div class="first-votes">
        <ul v-if="totalVotes.length">
          <li v-for="(total, index) in totalVotes" :key="index">
            {{ total.map }}:
            <span class="votes">{{ total.totalVotes }} vote(s)</span>
          </li>
        </ul>
        <div v-else>
          <div class="space-y-2">
            <!-- Skeleton Items -->
            <div
              v-for="index in 10"
              :key="index"
              class="flex justify-between items-center p-2 bg-gray-800 rounded"
            >
              <!-- Skeleton for map name -->
              <div class="h-4 w-3/4 bg-gray-600 rounded"></div>
              <!-- Skeleton for vote count -->
              <div class="h-4 w-1/5 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
        <div class="total-votes" v-if="totalVotes.length">
          <LazyBar
            :chartData="totalChartData"
            :index="'name'"
            :categories="['total']"
            :yFormatter="(tick) => `${tick} votes`"
          />
        </div>
        <div v-else>
          <div class="flex flex-col space-y-4">
            <!-- Skeleton Chart -->
            <div class="flex items-end space-x-4 h-[350px]">
              <!-- Skeleton Bars -->
              <div class="h-[80%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[60%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[40%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[70%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[50%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[80%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[60%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[40%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[70%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[50%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[40%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[70%] w-[40px] bg-gray-600 rounded-t"></div>
              <div class="h-[50%] w-[40px] bg-gray-600 rounded-t"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// pages/vote.vue
definePageMeta({
  middleware: "auth-password",
});

// State for map votes, total votes, and current map
interface MapVote {
  prettyName: string;
  gameMode: string;
  votes: number;
  voters: Set<string>;
}

interface TotalVote {
  map: string;
  totalVotes: number;
}

interface CurrentMap {
  id: string;
  prettyName: string;
  gameMode: string;
  votes: MapVote[];
}

const currentMap = ref<CurrentMap>({
  id: "",
  prettyName: "",
  gameMode: "",
  votes: [],
});

const totalVotes = ref<TotalVote[]>([]);

// Chart data for visualization
const totalChartData = computed(() =>
  totalVotes.value.map((vote) => ({
    name: vote.map, // X-axis value
    total: vote.totalVotes, // Bar height
  })),
);

const getVoteColor = (index: number) => {
  if (index === 0) return "green";
  if (index === 1) return "yellow";
  return "red";
};

// Load votes from local file
const loadVotesFromFile = async () => {
  try {
    const response = await fetch("/api/loadVotes", { method: "GET" });
    if (!response.ok) {
      throw new Error(
        `Failed to load votes: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Loaded data from file:", data);

    // Validate totalVotes
    if (data.totalVotes && Array.isArray(data.totalVotes)) {
      totalVotes.value = data.totalVotes;
    } else {
      console.warn("Invalid format for totalVotes in local data.");
      totalVotes.value = [];
    }
  } catch (error) {
    console.error("Error loading votes from file:", error);
  }
};

const saveVotesToFile = async () => {
  try {
    console.log("Saving votes to file...");

    const dataToSave = {
      currentMap: currentMap.value, // Ensure the currentMap is included
      totalVotes: totalVotes.value,
    };

    const response = await fetch("/api/saveVotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSave),
    });

    if (!response.ok) {
      throw new Error(`Failed to save votes: ${response.statusText}`);
    }

    console.log("Votes saved successfully.");
  } catch (error) {
    console.error("Error saving votes to file:", error);
  }
};

const fetchGameState = async () => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: "/api/get_gamestate" }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch game state: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Fetched game state:", data);

    const newMapId = data?.result?.current_map?.id;
    const prettyName = data?.result?.current_map?.map?.id || "";
    const gameMode = ""; // Populate game mode if available from API

    if (newMapId && newMapId !== currentMap.value.id) {
      console.log("Map has changed. Updating current map.");

      // Save current map votes to totalVotes
      currentMap.value.votes.forEach((mapVote) => {
        const totalVote = totalVotes.value.find(
          (entry) => entry.map === mapVote.prettyName,
        );
        if (totalVote) {
          totalVote.totalVotes += mapVote.votes;
        } else {
          totalVotes.value.push({
            map: mapVote.prettyName,
            totalVotes: mapVote.votes,
          });
        }
      });

      // Update currentMap
      currentMap.value = {
        id: newMapId,
        prettyName,
        gameMode,
        votes: [],
      };

      saveVotesToFile(); // Save updated data
    }
  } catch (error) {
    console.error("Error fetching game state:", error);
  }
};

const fetchVotesFromAPI = async () => {
  try {
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: "/api/get_votemap_status" }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch votes: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Fetched votes data from API:", data);

    if (data.result && Array.isArray(data.result)) {
      let isDataChanged = false;

      // Process each map entry in the API response
      data.result.forEach((entry: any) => {
        const prettyName = entry.map.pretty_name;
        const voters = entry.voters || [];

        // Find or create the map entry in currentMap
        let mapVote = currentMap.value.votes.find(
          (vote) => vote.prettyName === prettyName,
        );

        if (!mapVote) {
          mapVote = {
            prettyName,
            gameMode: entry.map.game_mode,
            votes: 0,
            voters: new Set<string>(),
          };
          currentMap.value.votes.push(mapVote);
        }

        // Add unique voters
        let newVotersAdded = false;
        voters.forEach((voter: string) => {
          if (!mapVote!.voters.has(voter)) {
            mapVote!.voters.add(voter);
            mapVote!.votes += 1;
            newVotersAdded = true;

            // Update totalVotes
            const totalVote = totalVotes.value.find(
              (entry) => entry.map === prettyName,
            );
            if (totalVote) {
              totalVote.totalVotes += 1;
            } else {
              totalVotes.value.push({
                map: prettyName,
                totalVotes: 1,
              });
            }
          }
        });

        if (newVotersAdded) {
          isDataChanged = true;
        }
      });

      if (isDataChanged) {
        console.log("New votes detected. Updating data...");
        saveVotesToFile(); // Save updated data
      } else {
        console.log("No new changes in votes.");
      }
    } else {
      console.warn("Invalid format in API response for votes.");
    }
  } catch (error) {
    console.error("Error fetching votes from API:", error);
  }
};

// Initialize on mount
onMounted(() => {
  loadVotesFromFile().then(() => {
    fetchGameState().then(() => {
      fetchVotesFromAPI(); // Initial load
      setInterval(() => {
        fetchVotesFromAPI(); // Refresh votes every minute
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
  max-width: 95%;
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
        color: #ffd700;
      }
    }
  }
}

.first-votes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
