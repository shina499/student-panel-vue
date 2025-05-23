<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const windowWidth = ref(window.innerWidth);

// چک می‌کنیم آیا صفحه کوچکتر از 1024px هست یا نه (موبایل + تبلت)
const isMobileOrTablet = () => windowWidth.value < 1024;

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const menuItems = [
  { path: '/', name: "داشبورد دانش آموزی📚🖋️", bgClass: "bg-red-200", buttonClass: "bg-red-500", shadowColor: "shadow-red-500", buttonHover: "hover:bg-red-600", buttonText: "پیش به سوی آن!" },
  { path: '/exam', name: "پنل امتحانات📔🗂️", bgClass: "bg-lime-200", buttonClass: "bg-lime-500", shadowColor: "shadow-lime-500", buttonHover: "hover:bg-lime-600", buttonText: "بریم ببینیم!" },
  { path: '/salamat', name: "پنل سلامت🩺🥼", bgClass: "bg-sky-100", buttonClass: "bg-sky-500", shadowColor: "shadow-sky-500", buttonHover: "hover:bg-sky-600", buttonText: "بزن بریم!" },
  { path: '/note', name: "دفترچه یادداشت📒✏️", bgClass: "bg-yellow-200", buttonClass: "bg-yellow-500", shadowColor: "shadow-yellow-500", buttonHover: "hover:bg-yellow-600", buttonText: "ورود به دفترچه یادداشت" }
];
</script>

<template>
  <!-- دکمه برای موبایل و تبلت -->
  <button
    v-if="isMobileOrTablet()"
    class="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
    @click="toggleSidebar"
  >
    ☰
  </button>

  <!-- بک‌دراپ تار (فقط برای موبایل/تبلت) -->
  <div
    v-if="isMobileOrTablet() && isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-30"
    @click="toggleSidebar"
  ></div>

  <!-- سایدبار -->
  <transition name="sidebar-slide">
    <aside
      v-show="!isMobileOrTablet() || isOpen"
      class="fixed lg:static top-0 right-0 z-40 w-[80%] sm:w-[300px] lg:w-[350px] h-full lg:h-[180vh] bg-white shadow-2xl p-4 rounded-lg overflow-y-auto dark:bg-slate-800"
    >
      <!-- دکمه بستن برای موبایل/تبلت -->
      <button
        v-if="isMobileOrTablet()"
        class="mb-4 text-red-500 font-bold"
        @click="toggleSidebar"
      >
        ✖ بستن
      </button>

      <h2 class="font-black text-2xl lg:text-3xl mb-6 text-center dark:text-white">پنل دسترسی سریع</h2>

      <section class="flex flex-col justify-center items-center gap-6 bg-white dark:bg-slate-800">
        <div
          v-for="item in menuItems"
          :key="item.path"
          :class="[
            'w-full lg:w-[95%] h-[160px] lg:h-[200px] flex flex-col justify-center items-center gap-4 lg:gap-[30px] rounded-lg shadow-xl',
            item.bgClass,
            item.shadowColor
          ]"
        >
          <h3 class="text-lg lg:text-2xl text-center px-2">{{ item.name }}</h3>
          <router-link :to="item.path">
            <button
              :class="[
                'px-3 py-2 lg:px-4 lg:py-3 text-white rounded text-sm lg:text-base',
                item.buttonClass,
                item.buttonHover
              ]"
            >
              {{ item.buttonText }}
            </button>
          </router-link>
        </div>

        <!-- ربات تلگرام -->
        <div
          class="w-full lg:w-[95%] h-[160px] lg:h-[200px] bg-purple-200 flex flex-col justify-center items-center gap-4 lg:gap-[30px] shadow-purple-500 shadow-xl"
        >
          <h3 class="text-lg lg:text-2xl">ربات همکلاسی 🤖</h3>
          <a target="_blank" href="https://t.me/Hamekelasit_bot">
            <button class="px-3 py-2 lg:px-4 lg:py-3 bg-purple-500 text-white hover:bg-purple-600 rounded text-sm lg:text-base">
              ورود به ربات تلگرام
            </button>
          </a>
        </div>
      </section>
    </aside>
  </transition>
</template>

<style scoped>
/* انیمیشن نرم‌تر برای سایدبار */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: all 0.4s ease;
}
.sidebar-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.sidebar-slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.sidebar-slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.sidebar-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
