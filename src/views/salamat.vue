<template>
  <section class="g-system">
    <!-- Water Consumption Component -->
    <div class="w-full max-w-[550px] h-[400px] bg-blue-200 rounded-2xl shadow-xl p-8 flex flex-col items-center animate__animated animate__fadeIn dark:bg-blue-600">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-4xl">💧</span>
        <h1 class="text-2xl font-bold text-blue-600 dark:text-white" data-en="Today's Water Consumption" data-fa="آب مصرفی امروز">آب مصرفی امروز</h1>
      </div>

      <div class="flex items-center gap-6 mb-8">
        <button @click="changeCount(-1)" class="p-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-500 text-2xl transition-all dark:bg-red-400 dark:hover:bg-red-500 dark:text-red-700" data-en="Decrease" data-fa="کاهش">
          🥤-
        </button>
        
        <div class="text-6xl font-bold text-blue-500 dark:text-sky-200">
          <span>{{ waterData.count }}</span>
          <span class="text-2xl text-blue-300 dark:text-sky-100">/8</span>
        </div>
        
        <button @click="changeCount(1)" class="p-3 rounded-xl bg-blue-300 hover:bg-blue-400 text-blue-500 text-2xl transition-all dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-blue-700" data-en="Increase" data-fa="افزایش">
          🥤+
        </button>
      </div>

      <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div :style="{ width: `${Math.min((waterData.count / 8) * 100, 100)}%` }" 
             class="bg-gradient-to-r from-blue-300 to-blue-600 h-4 rounded-full transition-all duration-500"></div>
      </div>

      <div class="flex items-center justify-between w-full mt-auto">
        <div class="text-lg text-blue-400 dark:text-white">{{ getStatusText() }}</div>
        <button @click="resetCount" class="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 dark:text-white dark:hover:text-sky-200" data-en="Reset" data-fa="بازنشانی">
          🔄 بازنشانی
        </button>
      </div>
    </div>

    <!-- Exercise Manager Component -->
    <div class="w-full max-w-[550px] h-[400px] rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn bg">
      <div class="flex items-center gap-3 mb-4">
        <h1 class="text-2xl font-bold text-green-600 bg-white p-2" data-en="🏃‍♀️ Daily Exercise Management" data-fa="🏃‍♀️ مدیریت ورزش روزانه">🏃‍♀️ مدیریت ورزش روزانه</h1>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center">
        <div class="text-6xl font-mono text-green-600 mb-4 bg-white p-2">{{ formattedTime }}</div>
        
        <div class="flex gap-3">
          <button @click="toggleTimer" :class="timer.isRunning ? 'bg-yellow-500' : 'bg-green-500'" 
                  class="px-5 py-2 hover:bg-green-600 text-white rounded-lg transition-colors"
                  :data-en="timer.isRunning ? '⏸ Pause' : '▶ Start'" :data-fa="timer.isRunning ? '⏸ توقف' : '▶ شروع'">
            {{ timer.isRunning ? '⏸ توقف' : '▶ شروع' }}
          </button>
          <button @click="saveWorkout" class="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" data-en="💾 Save" data-fa="💾 ذخیره">
            💾 ذخیره
          </button>
        </div>
      </div>

      <div class="border-t pt-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-green-600 font-bold bg-white p-2" data-en="📅 Weekly History" data-fa="📅 تاریخچه هفتگی">📅 تاریخچه هفتگی</h3>
          <button @click="clearHistory" class="text-red-500 hover:text-red-700 text-sm bg-white p-2" data-en="Clear History" data-fa="پاکسازی تاریخچه">
            پاکسازی تاریخچه
          </button>
        </div>
        <ul class="space-y-2 max-h-[100px] overflow-y-auto pr-2 text-black">
          <li v-for="workout in workoutHistory" :key="workout.id" class="flex justify-between items-center bg-gray-50 p-2 rounded">
            <div class="flex items-center gap-2">
              <span class="text-green-500">🔥 {{ workout.calories }}</span>
              <span data-en="calories" data-fa="کالری">کالری</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-gray-400">{{ workout.date }}</span>
              <button @click="deleteWorkout(workout.id)" class="text-red-300 hover:text-red-500 transition-colors" data-en="Delete" data-fa="حذف">
                ✕
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sleep Manager Component -->
    <div class="w-full max-w-[550px] h-[400px] bg-pink-300 rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn dark:bg-pink-400">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🌙</span>
        <h1 class="text-2xl font-bold text-purple-600 bg-white p-2" data-en="Student Sleep Pattern" data-fa="الگوی خواب دانش‌آموزی">الگوی خواب دانش‌آموزی</h1>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-purple-50 p-4 rounded-xl">
          <label class="text-purple-500 mb-2 block" data-en="🛌 Bedtime" data-fa="🛌 زمان خواب">🛌 زمان خواب</label>
          <input type="time" v-model="bedtime" class="w-full p-2 rounded-lg border border-purple-200">
        </div>
        
        <div class="bg-purple-50 p-4 rounded-xl">
          <label class="text-purple-500 mb-2 block" data-en="🌅 Wake-up Time" data-fa="🌅 زمان بیداری">🌅 زمان بیداری</label>
          <input type="time" v-model="waketime" class="w-full p-2 rounded-lg border border-purple-200">
        </div>
      </div>

      <div class="bg-purple-100 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⏳</span>
          <div>
            <p class="text-sm text-purple-500" data-en="Sleep Duration" data-fa="مدت خواب">مدت خواب</p>
            <p class="text-xl font-bold text-purple-600">{{ sleepDuration }}</p>
          </div>
        </div>
        <button @click="calculateSleep" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors" data-en="Calculate" data-fa="محاسبه">
          محاسبه
        </button>
      </div>

      <div class="bg-purple-50 rounded-lg p-3 flex-1 overflow-y-auto">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-purple-600 font-bold" data-en="📅 Sleep History" data-fa="📅 تاریخچه خواب">📅 تاریخچه خواب</h3>
          <button @click="clearSleepHistory" class="text-purple-400 hover:text-purple-600 text-sm" data-en="Clear" data-fa="پاکسازی">
            پاکسازی
          </button>
        </div>
        <ul class="space-y-2">
          <li v-for="entry in sleepHistory" :key="entry.id" class="flex items-center justify-between bg-white p-2 rounded">
            <div class="flex items-center gap-2">
              <span class="text-purple-400">⭐</span>
              <span>{{ entry.date }}</span>
            </div>
            <div class="flex gap-4">
              <span class="text-purple-500">{{ entry.duration }}</span>
              <span class="text-gray-400">{{ entry.bedtime }} - {{ entry.waketime }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mood Tracker Component -->
    <div class="bg-yellow-200 rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn dark:bg-yellow-400" style="width: 100%; max-width: 550px; height: 400px;">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="text-3xl">😊</span>
          <h1 class="text-xl font-bold text-purple-600 dark:text-black" data-en="Daily Mood Tracker" data-fa="ردیاب احساسات روزانه">ردیاب احساسات روزانه</h1>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-800">{{ todayDate }}</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mb-4">
        <button @click="addMoodEntry('happy')" class="mood-btn bg-green-300 hover:bg-green-400 p-2 rounded-lg animation3 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white" data-en="😊 Happy" data-fa="😊 شاد">
          😊 شاد
        </button>
        <button @click="addMoodEntry('sad')" class="mood-btn bg-blue-300 hover:bg-blue-400 p-2 rounded-lg animation2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white" data-en="😢 Sad" data-fa="😢 ناراحت">
          😢 ناراحت
        </button>
        <button @click="addMoodEntry('angry')" class="mood-btn bg-red-300 hover:bg-red-400 p-2 rounded-lg animation1 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white" data-en="😠 Angry" data-fa="😠 عصبانی">
          😠 عصبانی
        </button>
      </div>

      <div class="bg-gray-50 rounded-lg p-3 flex-1 mb-4">
        <div class="h-full space-y-1">
          <div v-for="(count, mood) in moodCounts" :key="mood" class="chart-item mb-1">
            <div class="flex items-center justify-between text-sm">
              <span>{{ getMoodIcon(mood) }} {{ mood }}</span>
              <span>{{ count }}</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2">
              <div :class="['mood-bar', 'h-2', 'rounded-full', getMoodColor(mood)]" 
                   :style="{ width: `${(count / moodData.entries.length) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <div class="bg-purple-100 px-3 py-1 rounded-full text-sm dark:bg-purple-300 dark:text-white">
            <span data-en="📊 Total:" data-fa="📊 مجموع:">📊 مجموع:</span> <span>{{ moodData.entries.length }}</span>
          </div>
          <div class="bg-green-100 px-3 py-1 rounded-full text-sm  dark:bg-green-300 dark:text-white">
            <span data-en="🏆 Best Day:" data-fa="🏆 بهترین روز:">🏆 بهترین روز:</span> <span>{{ bestDay }}</span>
          </div>
        </div>
        <button @click="resetMoodData" class="text-red-400 hover:text-red-600 text-sm dark:text-red-600 dark:hover:text-red-800" data-en="🔄 Reset" data-fa="🔄 بازنشانی">
          🔄 بازنشانی
        </button>
      </div>
    </div>

    <!-- Goals and Weekly Tasks Component -->
    <div class="relative mb-20">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6 dark:bg-slate-600">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-purple-800 dark:text-white" data-en="My Golden Goals ✨" data-fa="اهداف طلایی من ✨">اهداف طلایی من ✨</h1>
          <p class="text-gray-600 mt-2 dark:text-white" data-en="Every day I get one step closer to my dreams 💪" data-fa="هر روز یک قدم به رویاهام نزدیک‌تر میشم 💪">هر روز یک قدم به رویاهام نزدیک‌تر میشم 💪</p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <input type="text" v-model="newGoal.text" placeholder="هدف جدید" 
                   class="w-full p-2 border-2 border-dashed border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 dark:text-white"
                   data-en="New Goal" data-fa="هدف جدید" />
            <input type="date" v-model="newGoal.date" 
                   class="p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 dark:text-white" />
            <button @click="addGoal" class="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800">➕</button>
          </div>
          <div class="space-y-2">
            <div v-for="goal in goals" :key="goal.id" class="flex items-center gap-4">
              <input type="text" :value="goal.text" class="w-full p-2 border-2 border-purple-300 rounded-lg dark:text-white" readonly />
              <input type="date" :value="goal.date" class="p-2 border-2 border-purple-300 rounded-lg dark:text-white" readonly />
              <button @click="toggleGoal(goal.id)" class="p-2 bg-purple-500 text-white rounded-lg dark:bg-purple-700">
                {{ goal.completed ? '✅' : '⬜' }}
              </button>
              <button @click="deleteGoal(goal.id)" class="p-2 bg-red-500 text-white rounded-lg">🗑️</button>
            </div>
          </div>
        </div>

        <div class="text-center relative">
          <h2 class="text-xl font-bold text-purple-800 dark:text-white" data-en="my progress" data-fa="پیشرفت من">پیشرفت من</h2>
          <div id="progressChart" class="w-64 h-64 mx-auto mt-4"></div>
          <div class="text-2xl font-bold text-purple-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 dark:text-white">
            {{ progressPercentage }}%
          </div>
        </div>
        
        <div class="text-center">
          <h2 class="text-xl font-bold text-purple-800 dark:text-white" data-en="weekly scudule" data-fa="برنامه هفتگی">برنامه هفتگی</h2>
          <div class="grid grid-cols-3 gap-2 mt-4">
            <div v-for="day in daysOfWeek" :key="day" class="bg-purple-100 rounded-lg p-2 cursor-pointer hover:bg-purple-200 dark:bg-purple-300 dark:hover:bg-purple-400">
              <div class="font-bold">{{ day }}</div>
              <div class="text-sm mt-1 space-y-1">
                <div v-for="(task, taskIndex) in weeklyTasks[day]" :key="taskIndex" class="flex justify-between items-center bg-white p-1 rounded">
                  <span>{{ task }}</span>
                  <button @click="removeTask(day, taskIndex)" class="text-red-500">×</button>
                </div>
                <div class="mt-2">
                  <input v-model="newTask[day]" placeholder="اضافه کردن کار" class="p-1 w-full rounded-md border-2 border-gray-200" />
                  <button @click="addTask(day)" class="bg-purple-500 text-white px-3 py-1 mt-2 rounded-md" data-en="add" data-fa="افزودن">افزودن</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import pb from '@/pb';

// -------------------- عمومی --------------------
const todayDate = new Date().toLocaleDateString('fa-IR');

// -------------------- ردیاب آب --------------------
const waterData = ref({
  count: 0,
  date: todayDate,
});

const loadWaterData = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('بارگذاری داده‌های آب:', userId);

    const record = await pb.collection('water_tracker').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    waterData.value = record.content || { count: 0, date: todayDate };
    console.log('داده‌های آب بارگذاری شد:', waterData.value);

    if (waterData.value.date !== todayDate) {
      resetCount();
    }
  } catch (error) {
    if (error.status === 404) {
      waterData.value = { count: 0, date: todayDate };
      console.log('رکورد آب یافت نشد، مقدار پیش‌فرض تنظیم شد');
    } else {
      console.error('خطا در بارگذاری آب:', error);
      alert('خطا در بارگذاری داده‌های آب: ' + (error.message || 'دوباره تلاش کنید'));
    }
  }
};

const saveWaterData = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('ذخیره داده‌های آب:', userId);

    let record;
    try {
      record = await pb.collection('water_tracker').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
    } catch (error) {
      if (error.status !== 404) throw error;
    }

    const data = { userId, content: waterData.value };
    if (record) {
      await pb.collection('water_tracker').update(record.id, data);
      console.log('داده‌های آب به‌روزرسانی شد');
    } else {
      await pb.collection('water_tracker').create(data);
      console.log('رکورد جدید آب ایجاد شد');
    }
  } catch (error) {
    console.error('خطا در ذخیره آب:', error);
    alert('خطا در ذخیره داده‌های آب: ' + (error.message || 'دوباره تلاش کنید'));
  }
};

const changeCount = (amount) => {
  if (waterData.value.date !== todayDate) {
    waterData.value.count = 0;
    waterData.value.date = todayDate;
  }
  waterData.value.count = Math.max(0, waterData.value.count + amount);
  saveWaterData();
};

const resetCount = () => {
  waterData.value = { count: 0, date: todayDate };
  saveWaterData();
};

const getStatusText = () => {
  if (waterData.value.count === 0) return '😴 هنوز شروع نکردی!';
  if (waterData.value.count < 4) return '💪 ادامه بده!';
  if (waterData.value.count < 8) return '🎯 عالی پیش میری!';
  return '🎉 هدف امروز تکمیل شد!';
};

// -------------------- ردیاب ورزش --------------------
const timer = ref({
  isRunning: false,
  startTime: 0,
  elapsedTime: 0,
  interval: null,
});
const workoutHistory = ref([]);
const formattedTime = ref('۰۰:۰۰:۰۰');

const loadWorkoutHistory = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('بارگذاری تاریخچه ورزش:', { userId });

    const record = await pb.collection('exercise_manage').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    const content = record.content || [];
    // اعتبارسنجی داده‌ها
    workoutHistory.value = Array.isArray(content)
      ? content.filter(item => item && item.id && item.duration && item.date && item.calories)
      : [];
    console.log('تاریخچه ورزش بارگذاری شد:', workoutHistory.value);
  } catch (error) {
    if (error.status === 404) {
      workoutHistory.value = [];
      console.log('رکورد ورزش یافت نشد، مقدار پیش‌فرض تنظیم شد');
    } else {
      console.error('خطا در بارگذاری تاریخچه ورزش:', {
        message: error.message,
        status: error.status,
        data: error.data,
      });
      alert('خطا در بارگذاری تاریخچه ورزش: ' + (error.message || 'لطفاً دوباره تلاش کنید'));
    }
  }
};

const saveWorkoutHistory = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('ذخیره تاریخچه ورزش:', { userId, workoutHistory: workoutHistory.value });

    let record;
    try {
      record = await pb.collection('exercise_manage').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
    } catch (error) {
      if (error.status !== 404) throw error;
    }

    const data = { userId, content: workoutHistory.value };
    if (record) {
      await pb.collection('exercise_manage').update(record.id, data);
      console.log('تاریخچه ورزش به‌روزرسانی شد:', { recordId: record.id });
    } else {
      const newRecord = await pb.collection('exercise_manage').create(data);
      console.log('رکورد جدید ورزش ایجاد شد:', { recordId: newRecord.id });
    }
  } catch (error) {
    console.error('خطا در ذخیره تاریخچه ورزش:', {
      message: error.message,
      status: error.status,
      data: error.data,
    });
    alert('خطا در ذخیره تاریخچه ورزش: ' + (error.message || 'لطفاً دوباره تلاش کنید'));
  }
};

const toggleTimer = () => {
  if (!timer.value.isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
};

const startTimer = () => {
  // جلوگیری از اجرای چند interval همزمان
  if (timer.value.interval) {
    clearInterval(timer.value.interval);
  }
  timer.value.startTime = Date.now() - timer.value.elapsedTime;
  timer.value.interval = setInterval(() => {
    const totalSeconds = Math.floor((Date.now() - timer.value.startTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '۰');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '۰');
    const seconds = (totalSeconds % 60).toString().padStart(2, '۰');
    formattedTime.value = `${hours}:${minutes}:${seconds}`;
  }, 1000);
  timer.value.isRunning = true;
  console.log('تایمر شروع شد:', { startTime: timer.value.startTime });
};

const stopTimer = () => {
  if (timer.value.interval) {
    clearInterval(timer.value.interval);
    timer.value.interval = null;
  }
  timer.value.elapsedTime = Date.now() - timer.value.startTime;
  timer.value.isRunning = false;
  console.log('تایمر متوقف شد:', { elapsedTime: timer.value.elapsedTime });
};

const saveWorkout = async () => {
  if (timer.value.elapsedTime <= 0) {
    alert('لطفاً تایمر را شروع کنید و مدت زمانی را ثبت کنید!');
    return;
  }
  try {
    const workout = {
      id: Date.now().toString(),
      duration: Math.floor(timer.value.elapsedTime / 1000),
      date: todayDate,
      calories: Math.floor(timer.value.elapsedTime / 1000 * 0.1),
    };
    workoutHistory.value.unshift(workout);
    if (workoutHistory.value.length > 7) {
      workoutHistory.value.pop();
    }
    await saveWorkoutHistory();
    resetTimer();
    console.log('ورزش ذخیره شد:', workout);
  } catch (error) {
    console.error('خطا در ذخیره ورزش:', {
      message: error.message,
      status: error.status,
      data: error.data,
    });
    alert('خطا در ذخیره ورزش: ' + (error.message || 'لطفاً دوباره تلاش کنید'));
  }
};

const deleteWorkout = async (id) => {
  workoutHistory.value = workoutHistory.value.filter(workout => workout.id !== id);
  await saveWorkoutHistory();
  console.log('ورزش حذف شد:', { id });
};

const clearHistory = async () => {
  workoutHistory.value = [];
  await saveWorkoutHistory();
  console.log('تاریخچه ورزش پاک شد');
};

const resetTimer = () => {
  if (timer.value.interval) {
    clearInterval(timer.value.interval);
    timer.value.interval = null;
  }
  timer.value = {
    isRunning: false,
    startTime: 0,
    elapsedTime: 0,
    interval: null,
  };
  formattedTime.value = '۰۰:۰۰:۰۰';
  console.log('تایمر ریست شد');
};

// -------------------- ردیاب خواب --------------------
const bedtime = ref('');
const waketime = ref('');
const sleepDuration = ref('۰ ساعت ۰ دقیقه');
const sleepHistory = ref([]);

const loadSleepHistory = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('بارگذاری تاریخچه خواب:', userId);

    const record = await pb.collection('sleep_tracker').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    sleepHistory.value = record.content || [];
    console.log('تاریخچه خواب بارگذاری شد:', sleepHistory.value);
  } catch (error) {
    if (error.status === 404) {
      sleepHistory.value = [];
      console.log('رکورد خواب یافت نشد');
    } else {
      console.error('خطا در بارگذاری خواب:', error);
      alert('خطا در بارگذاری تاریخچه خواب: ' + (error.message || 'دوباره تلاش کنید'));
    }
  }
};

const saveSleepHistory = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('ذخیره تاریخچه خواب:', userId);

    let record;
    try {
      record = await pb.collection('sleep_tracker').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
    } catch (error) {
      if (error.status !== 404) throw error;
    }

    const data = { userId, content: sleepHistory.value };
    if (record) {
      await pb.collection('sleep_tracker').update(record.id, data);
      console.log('تاریخچه خواب به‌روزرسانی شد');
    } else {
      await pb.collection('sleep_tracker').create(data);
      console.log('رکورد جدید خواب ایجاد شد');
    }
  } catch (error) {
    console.error('خطا در ذخیره خواب:', error);
    alert('خطا در ذخیره تاریخچه خواب: ' + (error.message || 'دوباره تلاش کنید'));
  }
};

const calculateSleep = () => {
  if (!bedtime.value || !waketime.value) return;
  const [bedHour, bedMin] = bedtime.value.split(':').map(Number);
  const [wakeHour, wakeMin] = waketime.value.split(':').map(Number);
  let diffHours = wakeHour - bedHour;
  let diffMinutes = wakeMin - bedMin;
  if (diffMinutes < 0) {
    diffHours--;
    diffMinutes += 60;
  }
  if (diffHours < 0) diffHours += 24;
  sleepDuration.value = `${diffHours} ساعت ${diffMinutes} دقیقه`;
  saveSleepHistoryEntry({
    id: Date.now().toString(),
    date: todayDate,
    duration: `${diffHours}h ${diffMinutes}m`,
    bedtime: bedtime.value,
    waketime: waketime.value,
  });
};

const saveSleepHistoryEntry = (entry) => {
  sleepHistory.value.unshift(entry);
  if (sleepHistory.value.length > 7) {
    sleepHistory.value.pop();
  }
  saveSleepHistory();
};

const clearSleepHistory = () => {
  sleepHistory.value = [];
  saveSleepHistory();
};

// -------------------- ردیاب احساسات --------------------
const moodData = ref({ entries: [] });

const loadMoodData = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('بارگذاری داده‌های احساسات:', userId);

    const record = await pb.collection('emotion_tracker').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    moodData.value = record.content || { entries: [] };
    console.log('داده‌های احساسات بارگذاری شد:', moodData.value);
  } catch (error) {
    if (error.status === 404) {
      moodData.value = { entries: [] };
      console.log('رکورد احساسات یافت نشد');
    } else {
      console.error('خطا در بارگذاری احساسات:', error);
      alert('خطا در بارگذاری داده‌های احساسات: ' + (error.message || 'دوباره تلاش کنید'));
    }
  }
};

const saveMoodData = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('ذخیره داده‌های احساسات:', userId);

    let record;
    try {
      record = await pb.collection('emotion_tracker').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
    } catch (error) {
      if (error.status !== 404) throw error;
    }

    const data = { userId, content: moodData.value };
    if (record) {
      await pb.collection('emotion_tracker').update(record.id, data);
      console.log('داده‌های احساسات به‌روزرسانی شد');
    } else {
      await pb.collection('emotion_tracker').create(data);
      console.log('رکورد جدید احساسات ایجاد شد');
    }
  } catch (error) {
    console.error('خطا در ذخیره احساسات:', error);
    alert('خطا در ذخیره داده‌های احساسات: ' + (error.message || 'دوباره تلاش کنید'));
  }
};

const addMoodEntry = (mood) => {
  moodData.value.entries.push({ date: new Date().toISOString(), mood });
  saveMoodData();
};

const resetMoodData = () => {
  if (confirm('آیا از پاک کردن تمام داده‌ها اطمینان دارید؟')) {
    moodData.value = { entries: [] };
    saveMoodData();
  }
};

const moodCounts = computed(() => {
  return moodData.value.entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});
});

const bestDay = computed(() => {
  const days = {};
  moodData.value.entries.forEach(entry => {
    const date = new Date(entry.date).toLocaleDateString('fa-IR');
    days[date] = (days[date] || 0) + 1;
  });
  const bestDay = Object.entries(days).reduce((a, b) => b[1] > a[1] ? b : a, [null, 0]);
  return bestDay[0] || '---';
});

const getMoodIcon = (mood) => {
  const icons = { happy: '😊', sad: '😢', angry: '😠' };
  return icons[mood] || '❓';
};

const getMoodColor = (mood) => {
  const colors = { happy: 'bg-green-500', sad: 'bg-blue-500', angry: 'bg-red-500' };
  return colors[mood] || 'bg-gray-400';
};

// -------------------- ردیاب اهداف و برنامه هفتگی --------------------
const goals = ref([]);
const newGoal = ref({ text: '', date: '', completed: false });
const daysOfWeek = ref(['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه']);
const weeklyTasks = ref({});
const newTask = ref({});
let progressChart = null;

const progressPercentage = computed(() => {
  const completed = goals.value.filter(g => g.completed).length;
  return goals.value.length > 0 ? Math.round((completed / goals.value.length) * 100) : 0;
});

const loadGoals = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('بارگذاری داده‌های اهداف:', userId);

    const record = await pb.collection('goals_tracker').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    const content = record.content || { goals: [], weeklyTasks: {} };
    goals.value = content.goals || [];
    weeklyTasks.value = content.weeklyTasks || {};
    daysOfWeek.value.forEach(day => {
      if (!weeklyTasks.value[day]) weeklyTasks.value[day] = [];
      if (!newTask.value[day]) newTask.value[day] = '';
    });
    console.log('داده‌های اهداف بارگذاری شد:', goals.value, weeklyTasks.value);
  } catch (error) {
    if (error.status === 404) {
      goals.value = [];
      weeklyTasks.value = {};
      daysOfWeek.value.forEach(day => {
        weeklyTasks.value[day] = [];
        newTask.value[day] = '';
      });
      console.log('رکورد اهداف یافت نشد');
    } else {
      console.error('خطا در بارگذاری اهداف:', error);
      alert('خطا در بارگذاری داده‌های اهداف: ' + (error.message || 'دوباره تلاش کنید'));
    }
  }
};

const saveGoals = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');
    const userId = user.id;
    console.log('ذخیره داده‌های اهداف:', userId);

    let record;
    try {
      record = await pb.collection('goals_tracker').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
    } catch (error) {
      if (error.status !== 404) throw error;
    }

    const data = { userId, content: { goals: goals.value, weeklyTasks: weeklyTasks.value } };
    if (record) {
      await pb.collection('goals_tracker').update(record.id, data);
      console.log('داده‌های اهداف به‌روزرسانی شد');
    } else {
      await pb.collection('goals_tracker').create(data);
      console.log('رکورد جدید اهداف ایجاد شد');
    }
  } catch (error) {
    console.error('خطا در ذخیره اهداف:', error);
    alert('خطا در ذخیره داده‌های اهداف: ' + (error.message || 'دوباره تلاش کنید'));
  }
};

const addGoal = () => {
  if (newGoal.value.text.trim() === '' || newGoal.value.date === '') {
    alert('لطفاً هدف و تاریخ را وارد کنید!');
    return;
  }
  goals.value.push({ ...newGoal.value, id: Date.now().toString() });
  saveGoals();
  newGoal.value = { text: '', date: '', completed: false };
  updateProgressChart();
};

const toggleGoal = (id) => {
  const goal = goals.value.find(g => g.id === id);
  if (goal) {
    goal.completed = !goal.completed;
    saveGoals();
    updateProgressChart();
  }
};

const deleteGoal = (id) => {
  goals.value = goals.value.filter(g => g.id !== id);
  saveGoals();
  updateProgressChart();
};

const addTask = (day) => {
  if (newTask.value[day].trim()) {
    weeklyTasks.value[day].push(newTask.value[day]);
    newTask.value[day] = '';
    saveGoals();
  }
};

const removeTask = (day, index) => {
  weeklyTasks.value[day].splice(index, 1);
  saveGoals();
};

const initProgressChart = () => {
  progressChart = new ApexCharts(document.querySelector("#progressChart"), {
    chart: {
      type: 'donut',
      height: '100%',
      width: '100%',
      animations: { enabled: true, easing: 'easeinout', speed: 800 },
    },
    series: [0, 100],
    colors: ['#8B5CF6', '#EDE9FE'],
    labels: ['پیشرفت', 'باقیمانده'],
    plotOptions: { pie: { donut: { size: '75%', labels: { show: false } } } },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: { enabled: false },
    responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }],
  });
  progressChart.render();
  updateProgressChart();
};

const updateProgressChart = () => {
  const completed = goals.value.filter(g => g.completed).length;
  const progress = goals.value.length > 0 ? Math.round((completed / goals.value.length) * 100) : 0;
  const remaining = 100 - progress;
  progressChart.updateSeries([progress, remaining]);
};

// -------------------- راه‌اندازی اولیه --------------------
onMounted(async () => {
  console.log('وضعیت احراز هویت:', pb.authStore.isValid, pb.authStore.model);
  await loadWaterData();
  await loadWorkoutHistory();
  await loadSleepHistory();
  await loadMoodData();
  await loadGoals();
  initProgressChart();
});

onUnmounted(() => {
  if (progressChart) {
    progressChart.destroy();
  }
  // اطمینان از پاکسازی تایمر هنگام خروج
  if (timer.value.interval) {
    clearInterval(timer.value.interval);
  }
});
</script>

<style scoped>
.mood-bar {
  transition: width 0.5s ease-in-out;
}
.bg {
  background-image: url(../assets/images/seamless-pattern-with-sports-icons-doodle-with-sport-icons-on-white-background-vintage-sport-pat.png);
  background-color: #01ff0586;
  background-blend-mode: color;
}
.animation1:hover {
  animation: shakeY 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s infinite;
}
@keyframes shakeY {
  0%, 100% { transform: translateY(0); }
  10% { transform: translateY(-12px); }
  20% { transform: translateY(12px); }
  30% { transform: translateY(-9px); }
  40% { transform: translateY(9px); }
  50% { transform: translateY(-6px); }
  60% { transform: translateY(6px); }
  70% { transform: translateY(-3px); }
  80% { transform: translateY(3px); }
  90% { transform: translateY(-1px); }
}
.animation2:hover {
  animation: swing 2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s 3;
  transform-origin: top center;
}
@keyframes swing {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(20deg); }
  40% { transform: rotate(-20deg); }
  60% { transform: rotate(15deg); }
  80% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
}
.animation3:hover {
  animation: tada 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s 2;
}
@keyframes tada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-5deg); }
  30%, 50%, 70%, 90% { transform: scale(1.2) rotate(5deg); }
  40%, 60%, 80% { transform: scale(1.2) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
}
.g-system {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
@media (max-width: 899px) {
  .g-system {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
@media (min-width: 900px) {
  .g-system {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1000px;
    margin: 0 auto;
    justify-items: center;
  }
}
</style>