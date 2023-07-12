<script setup lang="ts">
import MyBtns from './btns.vue';
import { message } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { Theme, changeTheme, currentTheme } from './theme';
import { changeLang, Language } from '@locale/index';
import { getUser } from './api';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

const locale = ref(zhCN);
const info = () => {
  message.info('This is a normal message');
  changeTheme(Theme.DARK);
};
const info2 = () => {
  message.info('This is a normal message');
  changeTheme(Theme.LIGHT);
};
const info3 = () => {
  changeLang(Language.EN);
};
const info4 = () => {
  changeLang(Language.ZH);
};

const { isFetching, data, execute } = getUser();
</script>

<script lang="ts">
export default { name: 'UserCard' };
</script>

<template>
  <a-config-provider :locale="locale">
    <a-radio-group @change="info4"></a-radio-group>
    <my-btns />
    <a-button type="primary">{{ 'btn4' }}</a-button>
    <a-button type="primary" @click="info">{{ $t('common.confirm') }}</a-button>
    <a-button type="primary" @click="info2">{{ $t('common.confirm') }}</a-button>
    <a-button type="primary" @click="info3">{{ $t('common.confirm') }}</a-button>
    <a-button type="primary" @click="info4">{{ $t('common.confirm') }}</a-button>
    <a-button type="primary" @click="() => execute()">{{ 'test' }}</a-button>
    <div class="test">{{ 'Hello World' }}</div>
    <p>{{ currentTheme }}</p>
    <div v-if="isFetching">{{ 'loading' }}</div>
    <div v-else>
      <p>{{ data.name }}</p>
      <p>{{ data.age }}</p>
      <p>{{ data.email }}</p>
    </div>
    <RouterView></RouterView>
  </a-config-provider>
</template>

<style scoped lang="less">
:deep(.ant-btn) {
  color: orange;
}

.ant-btn {
  color: orange;
}

.test {
  color: var(--primary-color);
}

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
