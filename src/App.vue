<script setup>
import Layout from "@/components/Layout.vue";
</script>
<template>
    <nav v-if="!isAuthenticated">
      <router-link to="/signup">ثبت‌نام</router-link> |
      <router-link to="/login">ورود</router-link>
    </nav>
    <nav v-else>
      <router-link to="/dashboard">داشبورد</router-link> |
      <router-link to="/exam">آزمون</router-link> |
      <router-link to="/salamat">سلامت</router-link> |
      <router-link to="/note">یادداشت</router-link> |
      <button @click="logout">خروج</button>
    </nav>
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
nav {
  padding: 10px;
  background: oklch(96.7% 0.003 264.542);
  border: 1px solid black;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}
button:hover {
  color: #42b983;
}
</style>