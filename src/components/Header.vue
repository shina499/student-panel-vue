<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentLang, toggleLanguage, initializeLanguage } from '../utils/language'

const props = defineProps(['heading'])
const currentLang = ref(getCurrentLang())

// Get current date and format it in Persian
const today = new Date()
const formattedDate = new Intl.DateTimeFormat('fa-IR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(today)

// Handle language toggle
const handleLanguageToggle = () => {
  currentLang.value = toggleLanguage()
}

// Initialize language on component mount
onMounted(() => {
  initializeLanguage()
})
</script>

<template>
  <header class="w-full h-auto bg-gray-100 dark:bg-slate-900 dark:text-white">
    <div class="flex flex-row justify-between items-center gap-3 md:gap-[20px] p-3 md:p-5 h-auto md:h-[80px]">

      <!-- خوش آمدید - فقط در md و بالاتر -->
      <div class="hidden md:flex flex-col gap-1 text-right min-w-[100px]">
        <p class="text-lg font-bold" data-en="welcome" data-fa="خوش آمدید">خوش آمدید</p>
        <p class="text-sm font-light"><span data-en="today" data-fa="امروز">امروز</span> <span>{{ formattedDate }}</span></p>
      </div>

      <!-- آیکن و عنوان - همیشه نمایش داده میشه -->
      <div class="flex flex-row gap-2 md:gap-[10px] justify-center items-center text-center mx-auto">
        <img class="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded" src="../../public/favicon.png" alt="website-icon" />
        <h1 class="text-base md:text-2xl font-black whitespace-nowrap" data-en="Istgah danesh student panel" data-fa="پنل دانش آموزی ایستگاه دانش">پنل دانش آموزی ایستگاه دانش</h1>
      </div>

      <!-- نام خدا و دکمه تغییر زبان - فقط در md و بالاتر -->
      <div class="hidden md:flex flex-col items-end gap-2 min-w-[100px]">
        <p class="text-lg font-bold" data-en="In the name of God" data-fa="به نام خداوند جان و خرد">به نام خداوند جان و خرد</p>
        <button 
          @click="handleLanguageToggle" 
          class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          :title="currentLang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'"
          data-en="EN" 
          data-fa="فا"
        >
          {{ currentLang === 'fa' ? 'EN' : 'فا' }}
        </button>
      </div>

    </div>
  </header>
</template>
