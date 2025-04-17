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
  <div class="flex flex-col min-h-screen">
    <Heading /> 
    <div class="layout-wrapper flex flex-1 w-full">
      <div class="sidebar-container">
        <Sidebar />
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex: 1;
}

/* Sidebar */
.layout-wrapper {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar-container {
  width: 250px;
  flex-shrink: 0; /* از جمع شدن جلوگیری می‌کنه */
}

/* Main Content */
.main-content {
  width: calc(100% - 250px);
  padding: 1rem;
  overflow: auto;
}

/* موبایل */
@media (max-width: 900px) {
  .layout-wrapper {
    flex-direction: column;
  }

  .sidebar-container {
    width: 100%;
  }

  .main-content {
    width: 100%;
  }
}

</style>
