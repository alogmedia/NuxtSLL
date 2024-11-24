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
    <h3>Daily Votes</h3>
    <LazyBarChart :chartData="dailyChartData" chartTitle="Daily Votes" />

    <h3>Weekly Votes</h3>
    <LazyBarChart :chartData="weeklyChartData" chartTitle="Weekly Votes" />

    <h3>Monthly Votes</h3>
    <LazyBarChart :chartData="monthlyChartData" chartTitle="Monthly Votes" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Define Page Meta
definePageMeta({
  middleware: "auth-password",
});

// State for map votes, historical data, and total votes
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

const totalVotes = ref<TotalVote[]>([]);
const dailyVotes = ref<TotalVote[]>([]);
const weeklyVotes = ref<TotalVote[]>([]);
const monthlyVotes = ref<TotalVote[]>([]);

// Computed properties for chart data
const dailyChartData = computed(() => ({
  labels: dailyVotes.value.map((vote) => vote.map),
  values: dailyVotes.value.map((vote) => vote.totalVotes),
}));

const weeklyChartData = computed(() => ({
  labels: weeklyVotes.value.map((vote) => vote.map),
  values: weeklyVotes.value.map((vote) => vote.totalVotes),
}));

const monthlyChartData = computed(() => ({
  labels: monthlyVotes.value.map((vote) => vote.map),
  values: monthlyVotes.value.map((vote) => vote.totalVotes),
}));

// Function to load votes from the file
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

    // Ensure data.totalVotes is valid
    if (data.totalVotes && Array.isArray(data.totalVotes)) {
      totalVotes.value = data.totalVotes;
    }

    // Calculate daily, weekly, and monthly votes
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
    console.error("Error loading data from file:", error.message);
  }
};

// Function to calculate votes within a timeframe
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

// Load votes on component mount
onMounted(() => {
  loadVotesFromFile();
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
</style>
