<template>
  <section class="px-4">
    <div class="mb-4">
      <h1 class="text-2xl font-semibold dark:text-white" v-if="greets">
        Explore Some Goodies 😏
      </h1>

      <div class="mt-8 filters">
        <div class="mb-4">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <form @submit.prevent="$refs.go_button.click()">
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Search something..."
                v-model="selectedKey"
                required
              />
              <button
                type="submit"
                class="
                  text-white
                  absolute
                  right-2.5
                  bottom-2.5
                  bg-indigo-700
                  hover:bg-indigo-800
                  focus:ring-4 focus:outline-none focus:ring-indigo-300
                  transition
                  duration-300
                  font-medium
                  rounded-lg
                  text-sm
                  px-4
                  py-2
                  dark:bg-indigo-600
                  dark:hover:bg-indigo-700
                  dark:focus:ring-indigo-800
                "
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <button
          @click="$refs.filterModalRef.click()"
          type="button"
          class="px-4 py-2 font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md cursor-pointer  items-centergap-2 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <span class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </span>
        </button>
        <label for="filterModal" ref="filterModalRef"></label>
        <Modal
          modalTitle="Filters Tab"
          modalID="filterModal"
          modalClasses="dark:bg-gray-800 dark:text-white"
        >
          <div class="mt-4 filters-container">
            <form
              @submit.prevent="changeProvider"
              :action="`#/explore/${selectedProvider}`"
              class="flex flex-col gap-5"
            >
              <div class="flex flex-col gap-2 select-provider">
                <label for="provider"
                  >Change Provider To : {{ selectedProvider }}</label
                >
                <select
                  id="provider"
                  class="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm  w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-black"
                  placeholder="Select a Provider"
                  required
                  v-model="selectedProvider"
                >
                  <option
                    v-for="(provider, id) in availableProvider"
                    :key="id"
                    :value="provider.from"
                  >
                    {{ provider.from }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2" v-if="checkForParams('page')">
                <label for="pageOptions">Search: </label>
                <input
                  type="text"
                  class="w-24 text-black input input-sm"
                  name="search"
                  v-model="selectedKey"
                />
              </div>
              <div class="flex flex-col gap-2" v-if="checkForParams('page')">
                <label for="pageOptions">Page: </label>
                <input
                  type="text"
                  pattern="^[0-9]*$"
                  v-model="selectedPage"
                  class="w-24 text-black input input-sm"
                  name="page"
                />
              </div>
              <div class="flex flex-col gap-2" v-if="checkForParams('sort')">
                <label for="pageOptions">Sort: </label>
                <select
                  id="sort"
                  class="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm  w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-black"
                  name="sort"
                  placeholder="Sort content by: "
                  v-model="selectedSort"
                >
                  <option v-for="(sort, i) in getProp('sort')" :key="i">
                    {{ sort }}
                  </option>
                </select>
              </div>
              <div>
                <button
                  ref="go_button"
                  class="px-4 py-2 font-semibold text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md  hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Change Provider \\ Go...
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <div class="flex justify-between mt-4">
        <h4 class="text-lg text-gray-500">
          Showing {{ contents.length }} Items
        </h4>
      </div>
    </div>
    <Contents :contents="contents" :key="contents.uKey" />
  </section>
</template>

<script>
// @ts-nocheck

import Modal from "./../components/Modal.vue";
import Contents from "./../components/Contents.vue";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default {
  props: ["greets", "defaultProvider"],
  data() {
    let selectedProvider = this.defaultProvider;
    let selectedPage = this.$route.query.page || 1;
    let selectedSort = "";
    let selectedKey = this.$route.query.search || "milf";
    return {
      contents: {},
      currentPage: 1,
      sortBy: null,
      provider: this.$route.params.provider || this.defaultProvider,
      apiEndpoints: [
        "https://janda.mod.land",
        "https://wandering-flip-flops-ant.cyclic.app",
      ],
      selectedProvider,
      selectedPage,
      selectedSort,
      selectedKey,
      availableProvider: [
        {
          from: "pururin",
          params: {
            sort: [
              "newest",
              "most-popular",
              "highest-rated",
              "most-viewed",
              "title",
              "random",
            ],
            page: 1,
            key: 1,
          },
        },
        {
          from: "nhentai",
          params: {
            sort: ["popular-today", "popular-week", "popular"],
            page: 1,
            key: 1,
          },
        },
        {
          from: "hentaifox",
          params: {
            sort: ["latest", "popular"],
            page: 1,
            key: 1,
          },
        },
        {
          from: "asmhentai",
          params: {
            page: 1,
          },
        },
        {
          from: "hentai2read",
          params: {
            page: 1,
            key: 1,
          },
        },
        // {
        //   from: "simply-hentai",
        // },
        {
          from: "3hentai",
          params: {
            key: 1,
            page: 1,
            sort: ["recent", "popular-24h", "popular-7d", "popular"],
          },
        },
      ],
    };
  },
  components: {
    Contents,
    Modal,
  },
  methods: {
    dataIsExpired(expired_at) {
      return new Date(expired_at) < new Date();
    },
    changeProvider() {
      this.provider = this.selectedProvider;
      this.$router.push(
        `/explore/${this.provider}?search=${this.selectedKey}&sort=${this.selectedSort}&page=${this.selectedPage}`
      );
      this.fetchAPI();
    },
    checkForParams(foo) {
      const i = this.availableProvider
        .map((val) => val.from)
        .indexOf(this.selectedProvider);
      const obj = this.availableProvider[i];
      if (!obj.params) return false;

      return obj.params.hasOwnProperty(foo);
    },
    getIndexOfProp() {
      const i = this.availableProvider
        .map((val) => val.from)
        .indexOf(this.selectedProvider);
      return i;
    },
    getProp(prop) {
      const i = this.availableProvider
        .map((val) => val.from)
        .indexOf(this.selectedProvider);
      const obj = this.availableProvider[i];
      return prop ? obj.params[prop] : obj.params;
    },
    // fetchAPI() {

    //   try {
    //     fetch(
    //     )
    //       .then((response) => response.json())
    //       .then((result) => {
    //         result.uKey = uuidv4();
    //         this.contents = result;
    //         this.sortBy = result.sort;
    //         this.currentPage = result.page;
    //         console.log(JSON.parse(JSON.stringify(result)), "TRY BLOCK");
    //       });
    //   } catch (error) {
    //     console.log("Using Alternatives, a bit slower please be patient.");
    //     fetch(
    //       `${this.apiEndpoints[1]}/${this.provider}/search?key=${this.selectedKey}&$sort=${this.sortBy}&page=${this.currentPage}`
    //     )
    //       .then((response) => response.json())
    //       .then((result) => {
    //         result.uKey = uuidv4();
    //         this.contents = result;
    //         this.sortBy = result.sort;
    //         this.currentPage = result.page;
    //         // console.log(JSON.parse(JSON.stringify(result)), "CATCH BLOCK");
    //       });
    //   } finally {
    //     console.log("Success, Enjoy your content 😏");
    //   }
    // },
    fetchAPI() {
      try {
        fetch(
          `${this.apiEndpoints[0]}/${this.provider}/search?key=${this.selectedKey}&sort=${this.selectedSort}&page=${this.selectedPage}`
        )
          .then((response) => {
            if (response.status !== 200) {
              console.log("Request Timeout... Using Alternatives");
              fetch(
                `${this.apiEndpoints[1]}/${this.provider}/search?key=${this.selectedKey}&sort=${this.selectedSort}&page=${this.selectedPage}`
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
  },
  created() {
    // this.fetchAPI();
    const existingData = localStorage.getItem("cached_data");
    if (!existingData) this.fetchAPI();
    this.contents = JSON.parse(existingData);
  },
};
</script>

<style>
</style>