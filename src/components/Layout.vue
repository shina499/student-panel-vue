<script setup>
import Heading from "@/components/Header.vue"; 
import Footer from "@/components/Footer.vue"; 
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div class="wrapper" >
    <Heading />
    <div class="content">
      <div class="sidebar dark:bg-slate-800 dark:shadow-slate-900 shadow-2xl">
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
}

/* سایدبار */
.sidebar {
  flex-shrink: 0;
}

/* محتوای اصلی */
.main {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}

/* حالت دسکتاپ */
@media (min-width: 1024px) {
  .sidebar {
    width: 350px !important; /* عرض ثابت مطابق با Sidebar.vue */
  }
  .main {
    width: calc(100% - 350px) !important; /* پر کردن فضای باقی‌مانده */
  }
}

/* حالت موبایل و تبلت */
@media (max-width: 1023px) {
  .content {
    flex-direction: column;
  }

  .sidebar {
    width: 0; /* سایدبار به‌صورت پیش‌فرض هیچ عرضی ندارد */
    overflow: hidden; /* جلوگیری از نمایش محتوای سایدبار وقتی بسته است */
  }

  .main {
    width: 100% !important;
  }
}
</style>