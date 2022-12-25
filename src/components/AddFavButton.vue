<template>
  <button
    v-show="!hideFav"
    :disabled="favorited"
    @click="toggleFavorite"
    class="
      fixed
      btn btn-circle btn-error
      text-white
      bottom-[7.5rem]
      right-5
      disabled:bg-red-400 disabled:text-white
    "
  >
    <svg
      class="w-7 h-7"
      :class="favorited ? 'fill-red-500' : ''"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>
  </button>
</template>

<script>
import { clear, get, update } from "idb-keyval";

export default {
  props: ["content", "favorited"],
  data() {
    return {
      hideFav: false,
    };
  },
  methods: {
    async toggleFavorite() {
      await update("fav_list", (oldValue) => {
        const existingIndex = oldValue.findIndex(
          (el) => el.id === this.content.id
        );
        if (existingIndex >= 0) {
          console.log("already in list");
          this.$notify({
            text: "Removed From Favorite",
            type: "warn",
          });
          return oldValue.filter((val) => val.id !== this.content.id);
        }
        console.log("success added to list");
        this.$notify({
          text: "Added To Favorite!",
          type: "success",
        });
        return [...oldValue, JSON.parse(JSON.stringify(this.content))];
      });
    },
    hideBottomNavOnScroll() {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = () => {
        let currentScrollpos = window.pageYOffset;
        if (prevScrollpos > currentScrollpos) {
          this.hideFav = false;
        } else {
          this.hideFav = true;
        }
        prevScrollpos = currentScrollpos;
      };
    },
  },
  name: "AddFavoriteButtons",
  mounted() {
    this.hideBottomNavOnScroll();
  },
};
</script>

<style>
</style>