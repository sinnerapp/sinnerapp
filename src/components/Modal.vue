<template>
  <input type="checkbox" :id="modalID" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box" :class="modalClasses">
      <h3 class="text-lg font-bold">{{ modalTitle }}</h3>
      <slot class="py-4" />
      <div class="modal-action">
        <label :for="modalID" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["modalID", "modalTitle", "modalClasses"],
};
</script>

<style>
</style>