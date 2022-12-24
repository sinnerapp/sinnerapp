<template>
  <notifications position="bottom right" width="300" :ignoreDuplicates="true" />
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
    class="w-full mx-auto mt-12 mb-24 lg:px-0"
    :class="$route.name == '404' ? '' : 'max-w-5xl'"
  >
    <router-view
      v-slot="{ Component }"
      :defaultProvider="settings.defaultProvider"
      :animatePage="settings.animatePage"
      :greets="settings.greets"
    >
      <transition name="slide-fade" v-if="settings.animatePage">
        <component :is="Component" />
      </transition>
      <div v-else>
        <component :is="Component" />
      </div>
    </router-view>
  </div>

  <Footer class="bg-indigo-500 border-t" v-if="settings.showFooter" />
  <BottomNav
    v-if="settings.showBottomNav"
    :hideOnScroll="settings.hideBottomNavOnScroll"
  />
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import BottomNav from "./components/BottomNav.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      settings: JSON.parse(localStorage.getItem("403app_settings")) || {
        defaultProvider: "pururin",
        darkMode: false,
        showFooter: true,
        showBottomNav: true,
        animateOnScroll: false,
        animatePage: true,
        cacheContents: true,
        bgImage: "",
        bgBlur: 10,
        bgOpacity: 3,
        bgRepeat: true,
        cacheHistory: true,
        hideBottomNavOnScroll: true,
        allowBgPicture: true,
        greets: true,
      },
    };
  },
  components: {
    Footer,
    Navbar,
    BottomNav,
  },
  methods: {
    async getBg() {
      const res = await fetch("https://api.waifu.pics/nsfw/waifu");
      const data = res.json();
      return data;
    },
  },
  mounted() {
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
