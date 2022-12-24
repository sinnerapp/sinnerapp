<template>
  <div class="px-4 py-2 overflow-hidden text-center">
    <small class="font-semibold text-indigo-500">{{ content.id }}</small>
    <h1 class="text-3xl font-bold text-indigo-500">{{ content.title }}</h1>
    <p class="font-semibold dark:text-white">
      Total Panels: {{ content.total }}
    </p>
    <p class="dark:text-white">
      Tags: <br />
      <span
        v-for="tag in content.tags"
        :key="tag"
        class="text-gray-500/50 dark:text-gray-300/80"
        >{{ tag }},
      </span>
    </p>
  </div>

  <div class="my-12 images-container">
    <div class="w-full image" v-for="img in content.image" :key="img">
      <img :src="img" alt="Image" class="w-full" loading="lazy" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiEndpoints: [
        "https://janda.mod.land",
        "https://wandering-flip-flops-ant.cyclic.app",
      ],
      content: {},
    };
  },
  methods: {
    fetchOne() {
      try {
        fetch(
          `${this.apiEndpoints[0]}/${this.$route.params.provider}/get?book=${
            this.$route.params.id
          }${this.$route.params.provider == "hentai2read" ? "/1" : ""}`
        )
          .then((response) => response.json())
          .then((result) => {
            this.content = result.data;
          });
      } catch (error) {
        console.log(error);
        fetch(
          `${this.apiEndpoints[1]}/${this.$route.params.provider}/get?book=${
            this.$route.params.id
          }${this.$route.params.provider == "hentai2read" ? "/1" : ""}`
        )
          .then((response) => response.json())
          .then((result) => {
            this.content = result.data.image;
          });
      }
    },
  },
  mounted() {
    this.fetchOne();
  },
};
</script>

<style>
</style>