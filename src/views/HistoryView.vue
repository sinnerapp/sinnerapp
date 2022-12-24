<template>
  <section class="px-4 py-2">
    <div class="w-full max-w-4xl">
      <h1 class="mb-8 text-2xl dark:text-white">History</h1>

      <template v-if="!error">
        <Contents :contents="history" />
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
import Contents from "@/components/Contents.vue";
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
  methods: {},
  mounted() {
    const existingData = localStorage.getItem("403app_history");
    if (existingData) this.history = JSON.parse(existingData);
    else this.error = "Your history is empty!";
  },
};
</script>

<style scoped>
</style>