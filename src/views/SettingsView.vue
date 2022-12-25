<template>
  <section class="px-4 py-2">
    <div class="w-full max-w-4xl">
      <div class="flex flex-col justify-between">
        <div class="my-12 divider dark:pb">
          <p class="text-sm capitalize dark:text-white md:text-lg">general</p>
          <hr />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Default Provider</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              The default provider used
            </p>
          </div>
          <select
            class="dark:text-white select dark:bg-gray-800"
            v-model="settings.defaultProvider"
            v-on:change="updateSettings"
          >
            <option
              v-for="(provider, i) in availableProvider"
              :key="i"
              :value="provider"
              class="capitalize"
            >
              {{ provider }}
            </option>
          </select>
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Cache Contents</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Cache contents for faster loading
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.cacheContents"
            checked
            disabled
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Cache History</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Cache history when offline
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.cacheHistory"
            v-on:change="updateSettings"
          />
        </div>
        <div class="my-12 divider">
          <p class="text-sm capitalize dark:text-white md:text-lg">
            appearance
          </p>
          <hr />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Background Picture</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle background picture
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.allowBgPicture"
            v-on:change="updateSettings"
          />
        </div>
        <div
          class="flex justify-between mb-6 dark:text-white"
          v-if="settings.allowBgPicture"
        >
          <div>
            <p class="text-sm font-semibold md:text-lg">Background Repeat</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Repeat background on y-axis
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.bgRepeat"
            v-on:change="updateSettings"
          />
        </div>
        <div
          class="flex justify-between mb-6 dark:text-white"
          v-if="settings.allowBgPicture"
        >
          <div>
            <p class="text-sm font-semibold md:text-lg">Background Overlay</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Change Background Overlay Opacity
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="dark:text-white" @click="settings.bgOpacity++">
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <span>{{ settings.bgOpacity }}</span>
            <button class="dark:text-white" @click="settings.bgOpacity--">
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
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          class="flex justify-between mb-6 dark:text-white"
          v-if="settings.allowBgPicture"
        >
          <div>
            <p class="text-sm font-semibold md:text-lg">Background Blur</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Change Background Blur
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="dark:text-white" @click="settings.bgBlur++">
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <span>{{ settings.bgBlur }}</span>
            <button class="dark:text-white" @click="settings.bgBlur--">
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
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Dark Mode</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle dark mode on or off
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.darkMode"
            v-on:change="toggleDarkMode"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">
              Show Logo, Greetings, etc
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle Show Logo, Greetings, etc
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.greets"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Show notification</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle notifications after updating your settings
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.showNotification"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Show Bottom Nav</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle Bottom Navigation
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.showBottomNav"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Show Footer</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle footer to show or hide footer
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.showFooter"
            v-on:change="updateSettings"
          />
        </div>
        <div class="my-12 divider">
          <p class="text-sm capitalize dark:text-white md:text-lg">
            User Experience
          </p>
          <hr />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Image Only Mode</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Toggle image only mode
            </p>
          </div>
          <input type="checkbox" class="toggle toggle-primary" disabled />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Animate On Scroll</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Animate card content when scrolling down
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.animateOnScroll"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Animate Page</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Animate when changing page
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.animatePage"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Hide Nav On Scroll</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Hide Bottom Nav on Scroll
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="settings.hideBottomNavOnScroll"
            v-on:change="updateSettings"
          />
        </div>
        <div class="flex justify-between mb-6 dark:text-white">
          <div>
            <p class="text-sm font-semibold md:text-lg">Reset Settings</p>
            <p class="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
              Reset user settings
            </p>
          </div>
          <button
            @click="resetSettings"
            type="button"
            class="px-4 text-base text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md font-se mibold hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
        <div class="my-12 divider">
          <p class="text-sm capitalize dark:text-white md:text-lg">
            Save Settings
          </p>
          <hr />
        </div>
        <div class="flex justify-end mb-6 dark:text-white">
          <button
            v-on:click="updateSettings"
            type="button"
            class="px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ts-nocheck
import { defaultSettings } from './../service/default-settings'

export default {
  data() {
    return {
      availableProvider: [
        "pururin",
        "nhentai",
        "hentaifox",
        "asmhentai",
        "hentai2read",
        "3hentai",
      ],
      settings: defaultSettings,
    };
  },
  methods: {
    resetSettings() {
      localStorage.setItem(
        "403app_settings",
        JSON.stringify(defaultSettings)
      );
      //   console.log(localStorage.getItem("403app_settings"));
      this.$notify({
        text: "Settings Reset! New settings will take an effect on next reload",
      });
    },
    toggleDarkMode() {
      document.documentElement.classList.toggle("dark");
      this.updateSettings();
    },
    updateSettings() {
      localStorage.setItem("403app_settings", JSON.stringify(this.settings));
      //   console.log(localStorage.getItem("403app_settings"));
      if (this.settings.showNotification) {
        this.$notify({
          text: "Settings Updated! New settings will take an effect on next reload",
        });
      }
    },
    fetchSettings() {
      if (!localStorage.getItem("403app_settings"))
        localStorage.setItem("403app_settings", JSON.stringify(this.settings));
      this.settings = JSON.parse(localStorage.getItem("403app_settings"));
    },
  },
  created() {
    this.fetchSettings();
  },
};
</script>

<style>
</style>