<template>
  <section class="px-4 py-2">
    <div class="w-full max-w-4xl">
      <div class="flex justify-between w-full">
        <h1 class="mb-8 text-2xl dark:text-white">History</h1>
        <button class="btn btn-primary btn-sm" @click="clearHistory">
          Clear History
        </button>
      </div>

      <template v-if="!error">
        <Contents :contents="history" :key="this.history.key" :reverse="true" />
      </template>
      <template v-else>
        <h2 class="text-lg font-semibold text-center dark:text-gray-400">
          {{ error }}
        </h2>
      </template>
    </div>
  </section>
</template>

<script>
import Contents from "./../components/Contents.vue";
import { set, get, update, del, clear } from "idb-keyval";

export default {
  components: {
    Contents,
  },
  data() {
    return {
      history: {},
      error: "",
    };
  },
  methods: {
    clearHistory() {
      update("history_list", (oldValue) => []);
      this.history.data = [];
    },
    getRandomStr(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
  async mounted() {
    this.history.data = await get("history_list");
  },
};
</script>

<style scoped>
</style>