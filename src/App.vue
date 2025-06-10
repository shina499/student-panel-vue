<script setup>
import Layout from "@/components/Layout.vue";
import Theme from "@/components/Theme.vue";
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { updateTexts } from './utils/language';

const route = useRoute();

// Watch for route changes and update texts
watch(() => route.path, () => {
  updateTexts();
}, { immediate: true });
</script>

<template>
  <div class="w-[100%] justify-between flex items-center bg-gray-100 dark:bg-slate-900 border-b dark:border-b-gray-300 p-5">
    <nav v-if="!isAuthenticated" class="bg-transparent cursor-pointer w-[90%]">
      <router-link to="/signup" class="dark:text-white" data-en="Sign Up" data-fa="ثبت‌نام">ثبت‌نام</router-link> |
      <router-link to="/login" class="dark:text-white" data-en="Login" data-fa="ورود">ورود</router-link>
    </nav>
    <nav v-else class="dark:text-white cursor-pointer w-[90%] bg-transparent">
      <router-link to="/dashboard" class="dark:text-white" data-en="Dashboard" data-fa="داشبورد">داشبورد</router-link> <span class="dark:text-white">|</span>
      <router-link to="/exam" class="dark:text-white" data-en="Exam" data-fa="آزمون">آزمون</router-link> <span class="dark:text-white">|</span>
      <router-link to="/salamat" class="dark:text-white" data-en="Health" data-fa="سلامت">سلامت</router-link> <span class="dark:text-white">|</span>
      <router-link to="/note" class="dark:text-white" data-en="Notes" data-fa="یادداشت">یادداشت</router-link> <span class="dark:text-white">| </span>
      <button @click="logout" class="dark:text-white" data-en="Logout" data-fa="خروج">خروج</button>
    </nav>
    <Theme />
  </div>

  <Layout />
</template>

<script>
import pb from '@/pb';

export default {
  data() {
    return {
      isAuthenticated: pb.authStore.isValid,
    };
  },
  methods: {
    logout() {
      pb.authStore.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  },
  mounted() {
    pb.authStore.onChange(() => {
      this.isAuthenticated = pb.authStore.isValid;
    });
  },
};
</script>

<style scoped>
nav a {
  margin: 0 10px;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button:hover {
  color: #42b983;
}
</style>