<script setup>
const props = defineProps(['heading'])

// Get current date and format it in Persian
const today = new Date()
const formattedDate = new Intl.DateTimeFormat('fa-IR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(today)
</script>

<template>
  <header class="w-full h-auto bg-gray-100 dark:bg-slate-900 dark:text-white">
    <div class="flex flex-row justify-between items-center gap-3 md:gap-[20px] p-3 md:p-5 h-auto md:h-[80px]">

      <!-- خوش آمدید - فقط در md و بالاتر -->
      <div class="hidden md:flex flex-col gap-1 text-right min-w-[100px]">
        <p class="text-lg font-bold">خوش آمدید</p>
        <p class="text-sm font-light">امروز <span>{{ formattedDate }}</span></p>
      </div>

      <!-- آیکن و عنوان - همیشه نمایش داده میشه -->
      <div class="flex flex-row gap-2 md:gap-[10px] justify-center items-center text-center mx-auto">
        <img class="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded" src="../../public/favicon.png" alt="website-icon" />
        <h1 class="text-base md:text-2xl font-black whitespace-nowrap">پنل دانش آموزی ایستگاه دانش</h1>
      </div>

      <!-- نام خدا - فقط در md و بالاتر -->
      <div class="hidden md:block text-right min-w-[100px]">
        <p class="text-lg font-bold">به نام خداوند جان و خرد</p>
      </div>

    </div>
  </header>
</template>
