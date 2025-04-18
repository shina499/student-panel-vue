<script setup>
import Heading from "@/components/Header.vue"; 
import Footer from "@/components/Footer.vue"; 
import Sidebar from "./Sidebar.vue";
import Dashboard from "@/views/dashboard.vue";
import Exam from "@/views/exam.vue";
import Salamat from "@/views/salamat.vue";
import Note from "@/views/note.vue";
</script>

<template>
  <div class="wrapper">
    <Heading />
    <div class="content">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
/* کل صفحه */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* بخش وسط صفحه */
.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
 /* جلوگیری از بیرون‌زدگی */
}

/* سایدبار با عرض ثابت */
.sidebar {
  width: 23% !important;
  flex-shrink: 0;
  background-color: #fff;
}

/* محتوای اصلی */
.main {
  flex: 1;
  padding: 1rem;
  background-color: #f5f5f5;
  overflow: auto; /* اگر محتوا زیاد بود، اسکرول بگیره */
  width: 60% !important;
}


/* حالت موبایل */
@media (max-width: 900px) {
  .content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .main {
    width: 100%;
  }
}
</style>
