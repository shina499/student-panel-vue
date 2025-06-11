<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-pink-200">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate__animated animate__fadeInUp dark:bg-slate-800">
      <h1 class="text-3xl font-bold text-pink-600 text-center mb-8 dark:text-white" data-fa="ثبت‌نام در پنل دانش‌آموزی 🎉" data-en="sign in into student panel 🎉">ثبت‌نام در پنل دانش‌آموزی </h1>
      
      <div class="relative mb-6">
        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
        <input
          v-model="name"
          type="text"
          placeholder="نام (اختیاری)"
          class="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-100 text-gray-800 placeholder-gray-500 focus:bg-blue-50 focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:scale-101"
        />
      </div>

      <div class="relative mb-6">
        <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500"></i>
        <input
          v-model="email"
          type="email"
          placeholder="ایمیل"
          class="w-full pl-10 pr-4 py-3 rounded-lg bg-yellow-100 text-gray-800 placeholder-gray-500 focus:bg-yellow-50 focus:ring-2 focus:ring-yellow-400 transition-all duration-200 hover:scale-101"
        />
      </div>

      <div class="relative mb-6">
        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="w-full pl-10 pr-4 py-3 rounded-lg bg-green-100 text-gray-800 placeholder-gray-500 focus:bg-green-50 focus:ring-2 focus:ring-green-400 transition-all duration-200 hover:scale-101"
        />
      </div>

      <div class="relative mb-6">
        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
        <input
          v-model="passwordConfirm"
          type="password"
          placeholder="تأیید رمز عبور"
          class="w-full pl-10 pr-4 py-3 rounded-lg bg-green-100 text-gray-800 placeholder-gray-500 focus:bg-green-50 focus:ring-2 focus:ring-green-400 transition-all duration-200 hover:scale-101"
        />
      </div>

      <p v-if="error" class="text-red-500 text-sm mb-4 flex items-center animate__animated animate__fadeIn">
        <i class="fas fa-exclamation-circle mr-2"></i> {{ error }}
      </p>

      <button
        @click="signUp"
        :disabled="isLoading"
        class="w-full py-3 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
      >
        <span v-if="isLoading">
          <i class="fas fa-spinner fa-spin mr-2"></i> <span data-fa="در حال ثبت‌نام..." data-en="signing in ...">در حال ثبت‌نام...</span>
        </span>
        <span data-en="sign in" data-fa="ثبت‌نام" v-else>ثبت‌نام</span>
      </button>

      <p class="text-gray-600 text-sm text-center mt-4">
        <span data-fa="حساب دارید؟" data-en="already have an account?">حساب دارید؟ </span> <router-link to="/login" class="text-blue-500 hover:text-blue-600 font-medium"><span data-fa="وارد شوید" data-en="login">وارد شوید</span></router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { updateTexts } from '../utils/language'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pb from '@/pb';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const error = ref(null);
const isLoading = ref(false);
const router = useRouter();

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const signUp = async () => {
  error.value = null;
  isLoading.value = true;

  if (!validateEmail(email.value)) {
    error.value = 'لطفاً ایمیل معتبر وارد کنید.';
    isLoading.value = false;
    return;
  }

  if (password.value.length < 8) {
    error.value = 'رمز عبور باید حداقل 8 کاراکتر باشد.';
    isLoading.value = false;
    return;
  }

  if (password.value !== passwordConfirm.value) {
    error.value = 'رمز عبور و تأیید آن یکسان نیستند.';
    isLoading.value = false;
    return;
  }

  try {
    const userData = {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };
    if (name.value.trim()) {
      userData.name = name.value;
    }
    const user = await pb.collection('users').create(userData);
    console.log('کاربر ثبت شد:', user);
    await pb.collection('users').requestVerification(email.value); // درخواست ایمیل تأیید
    router.push('/login');
  } catch (err) {
    console.error('خطا در ثبت‌نام:', err);
    if (err.data?.data?.email?.message) {
      error.value = 'ایمیل قبلاً ثبت شده است.';
    } else {
      error.value = err.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  updateTexts();
});
</script>

<style scoped>
/* فونت وزیر برای کل صفحه */
body {
  font-family: 'Vazir', sans-serif;
}

/* افکت هاور برای ورودی‌ها */
input:hover {
  transform: scale(1.01);
}

/* افکت lift برای دکمه */
button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* استایل‌های ریسپانسیو */
@media (max-width: 640px) {
  .max-w-md {
    max-width: 95%;
    padding: 1.5rem;
  }
  h1 {
    font-size: 1.75rem;
  }
  input, button {
    font-size: 0.875rem;
    padding: 0.75rem;
  }
  .pl-10 {
    padding-left: 2.5rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .max-w-md {
    max-width: 80%;
  }
}
</style>