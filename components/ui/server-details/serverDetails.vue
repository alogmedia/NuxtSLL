<template>
  <div v-if="server" class="serverdetails">
    <strong>Soldiers playing on our battlefield right now</strong>
    <p class="players">
      <span :class="playerCountColor"> {{ server.players }} </span> /
      {{ server.maxPlayers }}
    </p>
  </div>
</template>

<script setup lang="ts">
// Adding a dynamic server name updating according to the server title.
import { ref, computed, onMounted } from "vue";

interface ServerDetails {
  name: string;
  players: number;
  maxPlayers: number;
  [key: string]: any;
}

// Reactive reference for the server data
const server = ref<ServerDetails | null>(null);

// Helper function to format server name by removing URLs
const formatServerName = (name: string): string => {
  const urlRegex = /https?:\/\/[^\s]+/;
  return name.replace(urlRegex, "").trim();
};

// Fetch server details from API
const fetchServerDetails = () => {
  fetch(
    "https://api.battlemetrics.com/servers?fields%5Bserver%5D=rank%2Cname%2Cplayers%2CmaxPlayers%2Caddress%2Cip%2Cport%2Ccountry%2Clocation%2Cdetails%2Cstatus&relations%5Bserver%5D=game%2CserverGroup&filter%5Bgame%5D=hll&filter%5Bsearch%5D=scandinavian",
  )
    .then((response) => response.json())
    .then((data) => {
      const serverAttributes = data.data[0].attributes;
      server.value = {
        ...serverAttributes,
        name: formatServerName(serverAttributes.name),
      };
    })
    .catch((error) => {
      console.error("Error fetching server details:", error);
    });
};

// Computed property to determine the player count color
const playerCountColor = computed(() => {
  if (!server.value) return "";
  const players = server.value?.players;
  if (players <= 25) {
    return "red";
  } else if (players <= 50) {
    return "yellow";
  } else {
    return "green";
  }
});

// Fetch server details when the component is mounted
onMounted(() => {
  fetchServerDetails();
});
</script>

<style scoped>
.serverdetails {
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #f7f7f7;
    margin: 0;
  }

  .players {
    color: rgba(250, 204, 21, 1);
  }
}

.red {
  color: red;
}

.yellow {
  color: rgba(250, 204, 21, 1);
}

.green {
  color: green;
}
</style>
