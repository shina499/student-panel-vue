<script setup>
const props = defineProps(['Footer'])
</script>

<template>
  <footer class="w-full bg-gray-200 flex flex-wrap md:flex-nowrap justify-between items-center gap-6 px-4 py-6 md:p-10 mt-4 text-sm md:text-base dark:bg-slate-900 ">

    <!-- ارتباط با ما -->
    <div class="hidden sm:flex flex-col justify-center">
      <h3 class="text-base md:text-xl text-gray-800 font-black mb-2 dark:text-white">با ما در ارتباط باشید</h3>
      <ul class="flex flex-col gap-1">
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.shad.ir/">شاد</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.rubika.ir/">روبیکا</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.splus.ir/">سروش پلاس</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://bale.ai/">بله</a></li>
      </ul>
    </div>

    <!-- همکاری در پروژه -->
    <div class="hidden sm:flex flex-col justify-center">
      <h3 class="text-base md:text-xl text-gray-800 font-black mb-2 dark:text-white">در پروژه ما همکاری کنید</h3>
      <ul class="flex flex-col gap-1">
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://github.com/shina499">گیت هاب</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://www.instagram.com/">اینستاگرام</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://www.linkedin.com/in/n-hosseiny-hosseiny-781256349/">لینکدین</a></li>
      </ul>
    </div>

    <!-- لوگو و نام سایت -->
    <div class="flex flex-col items-center gap-2 mx-auto">
      <a href="#">
        <img src="../../public/favicon.png" class="w-[70px] h-[70px] md:w-[120px] md:h-[120px] rounded" alt="icon" />
      </a>
      <span class="text-gray-700 text-base md:text-lg font-semibold dark:text-white">ایستگاه دانش</span>
    </div>

    <!-- ساخته شده توسط -->
    <p class="w-1/4 text-center text-gray-600 text-xs md:text-base mt-4 dark:text-gray-200">
      ساخته شده با ❤️ در گروه برنامه‌سازان آینده
    </p>

  </footer>
</template>
