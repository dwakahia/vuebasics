<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <slot name="top"></slot>
    </header>
    <slot></slot>
    <footer>
      <slot name="bottom"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BaseLayout"
}
</script>

<style scoped>

</style>