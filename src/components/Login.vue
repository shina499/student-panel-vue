<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-blue-600">
    <div class="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg animate__animated animate__zoomIn">
      <h1 class="text-4xl font-bold  text-center mb-10 tracking-tight">ورود به پنل دانش‌آموزی 🌟</h1>
      
      <div class="relative mb-8">
        <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
        <input
          v-model="email"
          type="email"
          placeholder="ایمیل"
          class="w-full pl-12 pr-4 py-4 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 border border-transparent focus:border-transparent focus:ring-4 focus:ring-gradient-to-r focus:ring-from-blue-400 focus:ring-to-purple-400 transition-all duration-300 hover:scale-105"
        />
      </div>

      <div class="relative mb-8">
        <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
        <input
          v-model="password"
          type="password"
          placeholder="رمز عبور"
          class="w-full p-12  pr-4 py-4 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 border border-transparent focus:border-transparent focus:ring-4 focus:ring-gradient-to-r focus:ring-from-blue-400 focus:ring-to-purple-400 transition-all duration-300 hover:scale-105"
        />
      </div>

      <p v-if="error" class="text-red-200 text-sm mb-6 flex items-center animate__animated animate__shakeX">
        <i class="fas fa-exclamation-circle mr-2"></i> {{ error }}
      </p>

      <button
        @click="signIn"
        :disabled="isLoading"
        class="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700  font-bold text-lg hover:from-blue-700 hover:to-purple-800 hover:rotate-1 transition-all duration-300 flex items-center justify-center shadow-lg"
      >
        <span v-if="isLoading">
          <i class="fas fa-spinner fa-spin mr-2"></i> در حال ورود...
        </span>
        <span v-else>ورود</span>
      </button>

      <p class="text-gray-200 text-sm text-center mt-6">
        حساب ندارید؟ <router-link to="/signup" class="text-blue-300 hover:text-blue-400 font-medium">ثبت‌نام کنید</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import pb from '@/pb';

const email = ref('');
const password = ref('');
const error = ref(null);
const isLoading = ref(false);
const router = useRouter();

const signIn = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    const authData = await pb.collection('users').authWithPassword(email.value, password.value);
    console.log('ورود موفق:', authData);
    localStorage.setItem('token', pb.authStore.token);
    localStorage.setItem('user', JSON.stringify(pb.authStore.model));
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'خطا در ورود. لطفاً ایمیل یا رمز عبور را بررسی کنید.';
    console.error('خطا در ورود:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* فونت وزیر برای کل صفحه */
body {
  font-family: 'Vazir', sans-serif;
}

/* افکت شیشه‌ای قوی‌تر */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* افکت هاور و فوکوس */
button:hover, input:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* گرادیان برای فوکوس */
.focus\:ring-gradient-to-r {
  --tw-ring-color: transparent;
  background-image: linear-gradient(to right, #60A5FA, #A78BFA);
}

/* استایل‌های ریسپانسیو */
@media (max-width: 640px) {
  .max-w-lg {
    max-width: 95%;
    padding: 2rem;
  }
  h1 {
    font-size: 1.75rem;
  }
  input, button {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
  .pl-12 {
    padding-left: 2.5rem;
  }
  .text-lg {
    font-size: 0.875rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .max-w-lg {
    max-width: 80%;
  }
}
</style>