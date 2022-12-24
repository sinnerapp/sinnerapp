<template>
  <section class="px-4">
    <div class="mb-4 text">
      <h1 class="text-2xl font-semibold dark:text-white" v-if="greets">
        Welcome, Enjoy Your Time..
      </h1>
      <div class="flex justify-between">
        <h4 class="text-lg text-gray-500">
          Showing {{ contents.length }} Items
        </h4>
        <router-link
          to="/explore"
          class="text-gray-500 transition duration-300  focus:text-primary hover:text-primary focus:scale-105"
          >View More...</router-link
        >
      </div>
    </div>
    <Contents
      :contents="contents"
      :provider="defaultProvider"
      :animatePage="animatePage"
    />
  </section>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Contents from "@/components/Contents.vue";

dayjs.extend(relativeTime);

export default {
  props: ["animatePage", "greets", "defaultProvider"],
  components: {
    Contents,
  },
  data() {
    return {
      contents: [],
      apiEndpoints: [
        "https://janda.mod.land",
        "https://wandering-flip-flops-ant.cyclic.app",
      ],
    };
  },
  methods: {
    fetchAPI() {
      try {
        fetch(`${this.apiEndpoints[0]}/${this.defaultProvider}/search?key=milf`)
          .then((response) => {
            if (response.status !== 200) {
              console.log("Request Timeout... Using Alternatives");
              fetch(
                `${this.apiEndpoints[1]}/${this.defaultProvider}/search?key=milf`
              )
                .then((secondResponse) => {
                  if (secondResponse.status !== 200)
                    throw new Error("uncaught error");

                  return secondResponse.json();
                })
                .then((result) => {
                  result.created_at = new Date();
                  // set how much data will be cached
                  result.expired_at = dayjs().add(45, "minute");
                  result.provider = this.defaultProvider;
                  localStorage.setItem("cached_data", JSON.stringify(result));
                  this.contents = result;
                  console.log("Request Success!");
                });
            }

            return response.json();
          })
          .then((result) => {
            result.created_at = new Date();
            // set how much data will be cached
            result.expired_at = dayjs().add(45, "minute");
            result.provider = this.defaultProvider;
            localStorage.setItem("cached_data", JSON.stringify(result));
            this.contents = result;
            console.log("Request Success!");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    dataIsExpired(expired_at) {
      return new Date(expired_at) < new Date();
    },
  },
  mounted() {
    // this.fetchAPI();
    const existingData = localStorage.getItem("cached_data");
    if (!existingData) this.fetchAPI();
    if (JSON.parse(existingData).provider !== this.defaultProvider)
      this.fetchAPI();
    if (this.dataIsExpired(JSON.parse(existingData).expired_at))
      this.fetchAPI();

    this.contents = JSON.parse(existingData);
    console.log("hello mounted");
  },
  created() {
    console.log("hello created");
  },
};
</script>

<style>
</style>