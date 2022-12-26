<template>
  <section class="px-4 py-2">
    <div class="w-full max-w-4xl">
      <div class="flex justify-between w-full">
        <h1 class="mb-8 text-2xl dark:text-white">Favorite List</h1>
        <button class="btn btn-primary btn-sm" @click="clearfavorite">
          Clear List
        </button>
      </div>

      <template v-if="!error">
        <Contents
          :contents="favorite"
          :key="this.favorite.key"
          :cantPaginate="true"
          :reverse="true"
          :showMoreInfo="true"
        />
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
      favorite: {},
      error: "",
    };
  },
  methods: {
    clearfavorite() {
      update("fav_list", (oldValue) => []);
      this.favorite.data = [];
    },
  },
  async mounted() {
    this.favorite.data = await get("fav_list");
  },
};
</script>

<style scoped>
</style>