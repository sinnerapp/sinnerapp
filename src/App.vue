<template>
  <div
    class="fixed z-50 p-8 mx-4 bg-white border border-indigo-100 shadow-lg  bottom-10 md:mx-24 rounded-2xl"
    role="alert"
    v-if="deferredPrompt && showBanner"
  >
    <div class="items-center sm:flex">
      <span
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-indigo-400 rounded-full "
      >
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
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </span>

      <p class="mt-3 text-lg font-medium sm:mt-0 sm:ml-3">
        Hello, Our Welcomed User!
      </p>
    </div>

    <p class="mt-4 text-gray-500">
      This application is available as a Web App! All you had to do is click
      "Install" button down below and it will
      <a class="text-indigo-500" href="https://web.dev/progressive-web-apps/"
        >install the website as an app</a
      >. <br /><br />
      Halo, pengunjung yang soleh & soleha 😏. Klik tombol "install" dibawah
      untuk install website ini sebagai aplikasi.
    </p>

    <div class="mt-6 sm:flex">
      <button
        @click="install"
        class="inline-block w-full px-5 py-3 text-sm font-semibold text-center text-white bg-indigo-500 rounded-lg  sm:w-auto"
        href=""
      >
        Install
      </button>

      <button
        @click="dismiss"
        class="inline-block w-full px-5 py-3 mt-3 text-sm font-semibold text-center text-gray-500 rounded-lg  bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
        href=""
      >
        Dismiss
      </button>
    </div>
  </div>

  <notifications
    position="top right"
    width="300"
    animation-type="velocity"
    :reverse="true"
    :max="5"
  />
  <div
    id="zImage"
    v-if="settings.allowBgPicture"
    :style="`background-image: url('${settings.bgImage}'); background-repeat: ${
      settings.bgRepeat ? 'repeat-y' : 'no-repeat'
    }; background-size: 100%; background-position: center; `"
  ></div>
  <div
    id="zImage2"
    v-if="settings.allowBgPicture"
    :style="`backdrop-filter: blur(${settings.bgBlur}px); background-color: rgba(0, 0, 0, 0.${settings.bgOpacity})`"
  ></div>
  <Navbar :greets="settings.greets" />
  <div
    class="w-full mx-auto mt-20 mb-24 lg:px-0"
    :class="$route.name == '404' ? '' : 'max-w-5xl'"
  >
    <RouterView
      v-slot="{ Component }"
      :defaultProvider="settings.defaultProvider"
      :animatePage="settings.animatePage"
      :greets="settings.greets"
      :allowHistory="settings.allowHistory"
    >
      <Transition name="slide-fade" v-if="settings.animatePage">
        <component :is="Component" />
      </Transition>
      <div v-else>
        <component :is="Component" />
      </div>
    </RouterView>
  </div>

  <Footer class="bg-indigo-500 border-t" v-if="settings.showFooter" />
  <BottomNav
    v-if="settings.showBottomNav"
    :hideOnScroll="settings.hideBottomNavOnScroll"
  />
  <BackToTopButton />
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import BottomNav from "./components/BottomNav.vue";
import BackToTopButton from "./components/BackToTopButton.vue";
import { defaultSettings } from "./service/default-settings";
import { get } from "idb-keyval";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      settings:
        JSON.parse(localStorage.getItem("403app_settings")) || defaultSettings,
      deferredPrompt: null,
      showBanner: true,
    };
  },
  components: {
    Footer,
    Navbar,
    BottomNav,
    BackToTopButton,
  },
  methods: {
    async getBg() {
      const res = await fetch("https://api.waifu.pics/nsfw/waifu");
      const data = res.json();
      return data;
    },
    async dismiss() {
      this.deferredPrompt = null;
      localStorage.setItem("showBanner", "false");
      this.showBanner = false;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
  },
  mounted() {
    if (localStorage.getItem("showBanner")) this.showBanner = false;

    AOS.init({
      disable: !this.settings.animateOnScroll,
    });
    // console.log(JSON.parse(JSON.stringify(this.settings)));

    if (
      this.settings.darkMode &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (this.settings.allowBgPicture) {
      this.getBg().then((result) => {
        this.settings.bgImage = result.url;
      });
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@400;500;700&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: "Fredoka One", cursive;
  font-family: "Montserrat", sans-serif;
}

[v-cloak] {
  display: none !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 300ms linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
