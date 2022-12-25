<template>
  <button
    v-show="!hide"
    @click="backToTop"
    class="fixed text-white btn btn-primary btn-circle bottom-16 right-5"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 11l7-7 7 7M5 19l7-7 7 7"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  methods: {
    backToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    hideBottomNavOnScroll() {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = () => {
        let currentScrollpos = window.pageYOffset;
        if (prevScrollpos > currentScrollpos) {
          this.hide = false;
        } else {
          this.hide = true;
        }
        prevScrollpos = currentScrollpos;
      };
    },
  },
  data() {
    return {
      hide: false,
    };
  },
  name: "BackToTopButton",
  mounted() {
    this.hideBottomNavOnScroll();
  },
};
</script>

<style>
</style>