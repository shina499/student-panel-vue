<script setup>
import Layout from "@/components/Layout.vue";
import Theme from "@/components/Theme.vue";
</script>
<template>
  <div class="w-[100%] justify-between flex items-center bg-gray-100 dark:bg-slate-900 border-b dark:border-b-gray-300 p-5">
    <nav v-if="!isAuthenticated" class="bg-transparent cursor-pointer  w-[90%]" >
      <router-link to="/signup" class="dark:text-white">ثبت‌نام</router-link> |
      <router-link to="/login" class="dark:text-white">ورود</router-link>
    </nav>
    <nav v-else class=" dark:text-white cursor-pointer w-[90%] bg-transparent">
        <router-link to="/dashboard" class="dark:text-white">داشبورد</router-link> <span class="dark:text-white">|</span>
      <router-link to="/exam" class="dark:text-white">آزمون</router-link> <span class="dark:text-white">|</span>
      <router-link to="/salamat" class="dark:text-white">سلامت</router-link> <span class="dark:text-white">|</span>
      <router-link to="/note" class="dark:text-white">یادداشت</router-link> <span class="dark:text-white">| </span>
      <button @click="logout" class="dark:text-white">خروج</button>
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