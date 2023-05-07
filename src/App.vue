<script setup lang="ts">
import { message } from 'ant-design-vue';

const info = () => {
  message.info('This is a normal message');
};
</script>

<template>
  <a-button type="primary" @click="info">Display normal message</a-button>
</template>

<style scoped lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
