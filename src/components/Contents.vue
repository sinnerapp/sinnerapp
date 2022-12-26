<template>
  <div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
    <transition-group :name="animatePage ? 'slide-fade' : ''">
      <router-link
        data-aos="fade-down"
        data-aos-offset="0"
        :data-aos-delay="i * 20"
        data-aos-once="true"
        :to="`/${contents.provider || content.provider}/${
          typeof content.id == 'string'
            ? content.id.replace('/', '')
            : content.id
        }`"
        class="relative block bg-black group rounded-xl"
        v-for="(content, i) in reverse && contents.data
          ? contents.data.slice().reverse()
          : contents.data"
        :key="i"
      >
        <img
          alt="Cover Image"
          :src="`${
            contents.provider == 'hentai2read'
              ? content.cover.replace(
                  'https://hentai2read.com/cdn-cgi/image/format=auto/',
                  ''
                )
              : content.cover
          }`"
          referrerpolicy="no-referrer"
          loading="lazy"
          class="absolute inset-0 object-cover w-full h-full transition-opacity opacity-50  md:opacity-75 group-hover:opacity-50 rounded-xl"
        />

        <div class="relative max-w-xs p-8 md:max-w-none">
          <p
            v-if="content.created_at && showMoreInfo"
            class="text-sm font-medium tracking-widest text-teal-500 uppercase  line-clamp-1"
          >
            {{ formatDate(content.created_at) }}
          </p>
          <p
            class="text-sm font-medium tracking-widest text-pink-500 uppercase  line-clamp-1"
          >
            {{
              typeof content.id == "string"
                ? content.id.replace("/", "")
                : content.id
            }}
          </p>

          <p class="text-2xl font-bold text-white line-clamp-2">
            {{
              typeof content.title == "object"
                ? content.title.pretty
                : content.title
            }}
          </p>

          <div class="mt-64">
            <div
              class="transition-all transform opacity-100  md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              <p class="text-sm font-semibold text-white">
                Total Panels: {{ content.total || "?" }}
              </p>
              <p class="text-sm text-white md:text-gray-500">
                Full Title: <br />
                <template v-if="typeof content.title == 'object'">
                  <span v-for="title in content.title" :key="title">
                    {{ title }}
                  </span>
                </template>
                <span v-else>{{ content.title }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 z-5">
          <button
            @click.prevent="toggleFavorite(content)"
            class="p-1 text-white transition-all duration-300  bg-red-400/50 backdrop-blur-css rounded-tr-xl rounded-bl-xl"
          >
            <svg
              class="w-7 h-7"
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
            <span class="sr-only">Add To Favorite</span>
          </button>
        </div>
      </router-link>
    </transition-group>
  </div>
  <div class="mt-4 btn-group" v-if="!cantPaginate">
    <button class="btn" @click="$emit('paginate-back')">«</button>
    <button class="btn">Page {{ $route.query.page || 1 }}</button>
    <button class="btn" @click="$emit('paginate-forward')">»</button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { update } from "idb-keyval";

export default {
  name: "Contents",
  props: [
    "contents",
    "provider",
    "animatePage",
    "reverse",
    "cantPaginate",
    "showMoreInfo",
  ],
  methods: {
    formatDate(date) {
      return dayjs(date).fromNow();
    },
    async toggleFavorite(content) {
      content.provider = this.contents.provider;
      content.created_at = new Date();
      console.log(JSON.parse(JSON.stringify(content)));
      await update("fav_list", (oldValue) => {
        const existingIndex = oldValue.findIndex((el) => el.id === content.id);
        if (existingIndex >= 0) {
          console.log("already in list");
          this.$notify({
            text: "Removed From Favorite",
            type: "warn",
          });
          return oldValue.filter((val) => val.id !== content.id);
        }
        console.log("success added to list");
        this.$notify({
          text: "Added To Favorite!",
          type: "success",
        });
        return [...oldValue, JSON.parse(JSON.stringify(content))];
      });
    },
  },
};
</script>

<style>
</style>