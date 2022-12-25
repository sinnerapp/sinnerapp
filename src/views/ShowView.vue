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
  <AddFavButtonVue :content="content" :favorited="favorited" />
</template>

<script>
import { get, set, update } from "idb-keyval";
import AddFavButtonVue from "./../components/AddFavButton.vue";

export default {
  props: ["allowHistory"],
  components: {
    AddFavButtonVue,
  },
  data() {
    return {
      apiEndpoints: [
        "https://janda.mod.land",
        "https://wandering-flip-flops-ant.cyclic.app",
      ],
      content: {},
      favorited: false,
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
            result.data.provider = this.$route.params.provider;
            if (this.allowHistory) {
              result.data.created_at = new Date();
              result.data.cover =
                result.data.image[
                  Math.floor(Math.random() * result.data.image.length)
                ];
              update("history_list", (oldValue) => {
                const existingIndex = oldValue.findIndex(
                  (el) => el.id === result.data.id
                );
                if (existingIndex >= 0) {
                  console.log("already in list");
                  return oldValue;
                }
                console.log("success added to list");
                return [...oldValue, result.data];
              });
            }
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
            this.content = result.data;
            result.data.provider = this.$route.params.provider;
            if (this.allowHistory) {
              result.data.created_at = new Date();
              result.data.cover =
                result.data.image[
                  Math.floor(Math.random() * result.data.image.length)
                ];
              update("history_list", (oldValue) => {
                const existingIndex = oldValue.findIndex(
                  (el) => el.id === result.data.id
                );
                // if (existingIndex >= 0) {
                //   console.log("already in list");
                //   return oldValue;
                // }
                console.log("success added to list");
                return [...oldValue, result.data];
              });
            }
          });
      }
    },
  },
  mounted() {
    this.fetchOne();
    get("fav_list").then((value) => {
      if (value.findIndex((el) => el.id === this.content.id) >= 0) {
        this.favorited = true;
      } else this.favorited = false;
    });
  },
};
</script>

<style>
</style>