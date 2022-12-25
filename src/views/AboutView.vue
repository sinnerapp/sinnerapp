<template>
  <div class="flex flex-col gap-8 px-4 about dark:text-white">
    <div id="tech-stack" class="flex flex-col items-center gap-2">
      <p class="py-8">Stack Used:</p>
      <ul class="flex items-center gap-8">
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
          >
            <div class="w-16">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png"
                alt="JS Logo"
                class="object-cover w-full glow js"
              />
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
          >
            <div class="w-16">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
                alt="JS Logo"
                class="object-cover w-full glow tailwind"
              />
            </div>
          </a>
        </li>
        <li>
          <a
            href="https://vuejs.org/"
            target="_blank"
            class="text-blue-500 hover:text-blue-600"
          >
            <div class="w-16">
              <img
                src="./../assets/logo.png"
                alt="JS Logo"
                class="object-cover w-full glow vue"
              />
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div id="app-ver" class="mt-16">
      <p class="font-mono">App Version: <span id="app-version">V1.0.0</span></p>
    </div>

    <div id="developer-note">
      <pre class="font-mono text-sm dark:text-gray-400">
Bebas pergunakan aplikasi ini untuk keperluan apapun 😏.

Kalo mau komplain, silahkan komplen ke diri sendiri karena make aplikasi ini.

Kalo gambarnya ga ngeload salahin provider internet lu, 
Siapa suruh blokir blokir hehe.
          -K, developer out-
      </pre>
    </div>
    <div id="copyright">
      <p>&copy; Copyright 2022 403app</p>
      <br />
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </p>
      <br />
      <p>
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </p>
      <br />
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </div>
  </div>
</template>

<style scoped>
.glow {
  transition: all 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: filter;
}
.glow.js:is(:hover, :focus) {
  filter: drop-shadow(0 0 2em #f0db4f);
}
.glow.vue:is(:hover, :focus) {
  filter: drop-shadow(0 0 2em #41b883);
}
.glow.tailwind:is(:hover, :focus) {
  filter: drop-shadow(0 0 2em #01b7d6);
}
</style>