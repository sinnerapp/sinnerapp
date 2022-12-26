<template>
  <nav
    class="fixed top-0 z-50 w-full  bg-gray-50 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm"
  >
    <div
      class="container relative px-6 py-4 mx-auto  md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <div>
          <router-link
            class="text-base font-bold text-gray-800 transition-colors duration-300 transform  md:text-2xl dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
            to="/"
            >403App 💦</router-link
          >
        </div>

        <!-- Mobile menu button -->
        <div class="flex lg:hidden">
          <button
            x-cloak
            @click="isNavbarOpen = !isNavbarOpen"
            type="button"
            class="text-gray-500  dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
            aria-label="toggle menu"
          >
            <svg
              v-show="!isNavbarOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              v-show="isNavbarOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div
        id="navbar-menu"
        v-cloak
        :class="[
          isNavbarOpen
            ? 'translate-x-0 opacity-100 '
            : 'opacity-0 -translate-x-full',
        ]"
        class="absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out border-b border-black border-opacity-50  bg-gray-800/80 dark:shadow-white/10 dark:border-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center dark:border-opacity-50 backdrop-blur-md md:border-none top-14"
      >
        <div class="flex flex-col md:flex-row md:mx-6">
          <router-link
            class="nav-route-link"
            :class="$route.name == 'home' ? 'active' : ''"
            to="/"
            >Home</router-link
          >
          <router-link
            class="nav-route-link"
            :class="$route.name == 'explore' ? 'active' : ''"
            to="/explore"
            >Explore</router-link
          >
          <router-link
            class="nav-route-link"
            :class="$route.name == 'favorite' ? 'active' : ''"
            to="/favorite"
            >Favorite</router-link
          >
          <router-link
            class="nav-route-link"
            :class="$route.name == 'history' ? 'active' : ''"
            to="/history"
            >History</router-link
          >
        </div>

        <div class="flex flex-row justify-center gap-4">
          <router-link
            class="relative text-gray-700 transition-colors duration-300 transform  dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            to="/settings"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span class="sr-only">Settings</span>
          </router-link>
          <router-link
            class="relative text-gray-700 transition-colors duration-300 transform  dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            to="/about"
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span class="sr-only">About</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["greets"],
  name: "Navbar",
  data() {
    return {
      isNavbarOpen: false,
    };
  },
};
</script>

<style></style>
