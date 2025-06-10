<script setup>
const props = defineProps(['Footer'])
</script>

<template>
  <footer class="w-full bg-gray-200 flex flex-wrap md:flex-nowrap justify-between items-center gap-6 px-4 py-6 md:p-10 mt-4 text-sm md:text-base dark:bg-slate-900 ">

    <!-- ارتباط با ما -->
    <div class="hidden sm:flex flex-col justify-center">
      <h3 class="text-base md:text-xl text-gray-800 font-black mb-2 dark:text-white" data-en="contact with us" data-fa="با ما در ارتباط باشید">با ما در ارتباط باشید</h3>
      <ul class="flex flex-col gap-1">
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.shad.ir/" data-en="Shad" data-fa="شاد">شاد</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.rubika.ir/" data-en="Rubika" data-fa="روبیکا">روبیکا</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://web.splus.ir/" data-en="sorosh+" data-fa="سروش پلاس">سروش پلاس</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://bale.ai/" data-en="baleh" data-fa="بله">بله</a></li>
      </ul>
    </div>

    <!-- همکاری در پروژه -->
    <div class="hidden sm:flex flex-col justify-center">
      <h3 class="text-base md:text-xl text-gray-800 font-black mb-2 dark:text-white" data-en="send contribution request" data-fa="در پروژه ما همکاری کنید">در پروژه ما همکاری کنید</h3>
      <ul class="flex flex-col gap-1">
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://github.com/shina499" data-en="GitHub" data-fa="گیت هاب">گیت هاب</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://www.instagram.com/" data-en="Instagram" data-fa="اینستاگرام">اینستاگرام</a></li>
        <li class="text-gray-500 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"><a href="https://www.linkedin.com/in/n-hosseiny-hosseiny-781256349/" data-en="LinkedIn" data-fa="لینکدین">لینکدین</a></li>
      </ul>
    </div>

    <!-- لوگو و نام سایت -->
    <div class="flex flex-col items-center gap-2 mx-auto">
      <a href="#">
        <img src="../../public/favicon.png" class="w-[70px] h-[70px] md:w-[120px] md:h-[120px] rounded" alt="icon" />
      </a>
      <span class="text-gray-700 text-base md:text-lg font-semibold dark:text-white" data-en="Istgah Danesh" data-fa="ایستگاه دانش">ایستگاه دانش</span>
    </div>

    <!-- ساخته شده توسط -->
    <p class="w-1/4 text-center text-gray-600 text-xs md:text-base mt-4 dark:text-gray-200" data-en="Made with ❤️ by Future Programmers Group" data-fa="ساخته شده با ❤️ در گروه برنامه‌سازان آینده">
      ساخته شده با ❤️ در گروه برنامه‌سازان آینده
    </p>

  </footer>
</template>
