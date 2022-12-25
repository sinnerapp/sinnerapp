<template>
  <!-- <pre class="text-white">{{ contents }}</pre> -->
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
        v-for="(content, i) in contents.data"
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
            v-if="content.created_at"
            class="text-sm tracking-widest text-indigo-500 uppercase  font-mediu m line-clamp-1"
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
      </router-link>
    </transition-group>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Contents",
  props: ["contents", "provider", "animatePage", "reverse"],
  methods: {
    formatDate(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style>
</style>