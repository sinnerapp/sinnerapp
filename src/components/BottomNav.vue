<template>
  <Transition>
    <nav
      class="fixed inset-x-0 bottom-0 flex justify-between text-sm text-indigo-900 uppercase bg-indigo-100  md:hidden"
      v-show="!hide"
    >
      <router-link
        to="/"
        class="block w-full px-3 pt-2 text-center transition duration-300  hover:bg-indigo-200 hover:text-indigo-800"
        :class="$route.name == 'home' ? 'font-extrabold' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>

        Home
      </router-link>

      <router-link
        to="/explore"
        class="block w-full px-3 pt-2 text-center  hover:bg-indigo-200 hover:text-indigo-800"
        :class="
          $route.name == 'explore' || $route.name == 'exploreViaProvider'
            ? 'font-extrabold'
            : ''
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-6 h-6 mx-auto"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
          <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
        </svg>
        Explore
      </router-link>

      <router-link
        to="/history"
        class="block w-full px-3 pt-2 text-center  hover:bg-indigo-200 hover:text-indigo-800"
        :class="$route.name == 'history' ? 'font-extrabold' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        History
      </router-link>
    </nav>
  </Transition>
</template>

<script>
export default {
  name: "BottomNav",
  props: ["hideOnScroll"],
  data() {
    return {
      hide: false,
    };
  },
  methods: {
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
  created() {
    if (this.hideOnScroll) {
      this.hideBottomNavOnScroll();
    }
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 750ms linear;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(75px);
  opacity: 0;
}
</style>