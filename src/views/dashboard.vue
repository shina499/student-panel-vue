<template>
  <div class="w-full container">
    <section class="g-system">
      <!-- کارت ۱: تحلیل فعالیت هفتگی -->
      <div class="card bg-white rounded-2xl shadow-xl p-6 animate__animated animate__bounceIn w-full max-w-lg dark:bg-slate-900 dark:text-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-purple-600" data-en="Weekly Activity Analysis" data-fa="تحلیل فعالیت هفتگی">📊 تحلیل فعالیت هفتگی</h3>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm" data-en="Goal: 35 hours" data-fa="هدف: ۳۵ ساعت">🎯 هدف: ۳۵ ساعت</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm" data-en="Current Week" data-fa="هفته جاری">📅 هفته جاری</span>
          </div>
        </div>
        <div id="activity-chart" class="dark:text-white"></div>
        <div class="grid grid-cols-4 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-6 md:gap-2">
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#6366f1] rounded-full"></div>
            <span class="text-sm" data-en="Study" data-fa="مطالعه">مطالعه</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#10b981] rounded-full"></div>
            <span class="text-sm" data-en="Exercise" data-fa="ورزش">ورزش</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
            <span class="text-sm" data-en="Entertainment" data-fa="سرگرمی">سرگرمی</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#ef4444] rounded-full"></div>
            <span class="text-sm" data-en="Rest" data-fa="استراحت">استراحت</span>
          </div>
        </div>
      </div>

      <!-- کارت ۲: لیست تکالیف دانش‌آموزی -->
      <div class="card bg-gray-50 rounded-xl animate__animated animate__bounceIn w-full max-w-lg mt-4 dark:bg-slate-900 dark:text-white">
        <div class="container mx-auto p-4">
          <div class="bg-white rounded-lg p-6 dark:bg-slate-950 dark:shadow-slate-950 shadow-2xl">
            <h3 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white" data-en="Student Homework List" data-fa="لیست تکالیف دانش‌آموزی">لیست تکالیف دانش‌آموزی</h3>
            <div class="flex gap-2 mb-4">
              <input
                v-model="todoText"
                type="text"
                placeholder="تکلیف جدید..."
                class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-en="New homework..." data-fa="تکلیف جدید..."
              />
              <button
                @click="addTodo"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors animate__animated animate__jackInTheBox"
                data-en="Add" data-fa="افزودن"
              >
                افزودن
              </button>
            </div>
            <ul class="space-y-2 max-h-[220px] overflow-y-auto pr-2">
              <li
                v-for="todo in todos"
                :key="todo.id"
                class="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[72px] dark:bg-slate-950 dark:border"
              >
                <div class="flex-1 ">
                  <span class="text-gray-800 dark:text-white">{{ todo.text }}</span>
                  <span class="text-xs text-gray-400 block mt-1 dark:text-white">{{
                    new Date(todo.timestamp).toLocaleString('fa-IR')
                  }}</span>
                </div>
                <button
                  @click="deleteTodo(todo.id)"
                  class="text-red-500 hover:text-red-700 transition-colors"
                >
                  ×
                </button>
              </li>
            </ul>
            <div class="mt-4 text-sm text-gray-500 text-center">
              <span data-en="Number of tasks:" data-fa="تعداد تکالیف:">تعداد تکالیف:</span> <span>{{ todos.length }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- کارت ۳: برنامه هفتگی -->
      <div class="card bg-gray-50 flex flex-col items-center justify-center p-4 week w-full max-w-lg mt-4 dark:bg-slate-900 ">
        <div class="w-full">
          <h3 class="text-2xl font-bold text-center mb-4 text-gray-800 animate__animated animate__fadeIn dark:text-white" data-en="Weekly Schedule" data-fa="برنامه هفتگی">
            برنامه هفتگی
          </h3>
          <table id="schedule" class="w-full bg-white rounded-lg shadow-sm animate__animated animate__fadeInUp dark:border-black">
            <thead class="dark:border-black">
              <tr class="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                <th class="p-2" data-en="session" data-fa="زنگ">زنگ</th>
                <th class="p-2" data-en="Saturday" data-fa="شنبه">شنبه</th>
                <th class="p-2" data-en="Sunday" data-fa="یکشنبه">یکشنبه</th>
                <th class="p-2" data-en="Monday" data-fa="دوشنبه">دوشنبه</th>
                <th class="p-2" data-en="Tuesday" data-fa="سه‌شنبه">سه‌شنبه</th>
                <th class="p-2" data-en="Wednesday" data-fa="چهارشنبه">چهارشنبه</th>
              </tr>
            </thead>
            <tbody class="dark:border-black">
              <tr v-for="(period, rowIndex) in periods" :key="period">
                <td class="p-2 font-bold bg-gray-100 text-center" :data-en="'session ' + (rowIndex + 1)" :data-fa="period">{{ period }}</td>
                <td
                  v-for="(day, colIndex) in days"
                  :key="day"
                  contenteditable
                  class="p-2 border border-gray-200 dark:border-black text-center hover:bg-opacity-75 focus:bg-opacity-100"
                  :class="colors[colIndex % colors.length]"
                  @input="updateSchedule(rowIndex, colIndex, $event)"
                >
                  {{ schedule[rowIndex] && schedule[rowIndex][colIndex] ? schedule[rowIndex][colIndex] : '' }}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            @click="saveSchedule"
            class="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-blue-500 animate__animated animate__fadeIn"
            data-en="Save Schedule" data-fa="ذخیره برنامه"
          >
            ذخیره برنامه
          </button>
        </div>
      </div>

      <!-- کارت ۴: سیستم تمرکز هوشمند -->
      <div class="card bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center animate__animated animate__bounceIn w-full max-w-lg mt-4 dark:bg-slate-900 ">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-4xl">🎯</span>
          <h3 class="text-2xl font-bold text-blue-600 dark:text-white" data-en="Smart Focus System" data-fa="سیستم تمرکز هوشمند">سیستم تمرکز هوشمند</h3>
        </div>
        <div class="relative">
          <svg width="200" height="200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e7ff" stroke-width="10"/>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#6366f1" 
                    stroke-width="10" stroke-linecap="round"
                    class="progress-ring__circle"
                    stroke-dasharray="565.48" 
                    stroke-dashoffset="0"/>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div id="time" class="text-4xl font-bold text-blue-600 dark:text-blue-400">25:00</div>
            <div id="status" class="text-blue-400 dark:text-blue-200" data-en="Ready" data-fa="آماده">آماده</div>
          </div>
        </div>
        <div class="flex gap-4 mt-6">
          <button id="startBtn" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" data-en="Start" data-fa="شروع">
            ▶ شروع
          </button>
          <button id="resetBtn" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" data-en="Reset" data-fa="تنظیم مجدد">
            🔄 تنظیم مجدد
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-6 w-full">
          <div class="bg-blue-50 p-3 rounded-lg dark:bg-slate-950 dark:text-white">
            <label class="block text-sm text-blue-500 mb-1" data-en="Study Duration (minutes)" data-fa="مدت مطالعه (دقیقه)">مدت مطالعه (دقیقه)</label>
            <input type="number" id="studyTime" value="25" min="0" 
                   class="w-full p-2 border border-blue-200 rounded-lg">
          </div>
          <div class="bg-blue-50 p-3 rounded-lg dark:bg-slate-950 dark:text-white">
            <label class="block text-sm text-blue-500 mb-1" data-en="Break Duration (minutes)" data-fa="مدت استراحت (دقیقه)">مدت استراحت (دقیقه)</label>
            <input type="number" id="breakTime" value="5" min="0"
                   class="w-full p-2 border border-blue-200 rounded-lg">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { updateTexts } from '../utils/language'
import { ref, reactive, onMounted } from 'vue';
import pb from '@/pb';

// داده‌های ثابت
const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
const periods = ['زنگ اول', 'زنگ دوم', 'زنگ سوم', 'زنگ چهارم', 'زنگ پنجم'];
const colors = ['bg-red-300', 'bg-yellow-300', 'bg-lime-300', 'bg-blue-300', 'bg-fuchsia-300'];

// داده‌های واکنشی برای لیست تکالیف
const todos = ref([]);
const todoText = ref('');

// داده‌های واکنشی برای برنامه هفتگی
const schedule = reactive([]);

// تابع برای بارگذاری لیست تکالیف
const loadTodos = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای بارگذاری تکالیف:', userId);

    const record = await pb.collection('homework_list').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    console.log('رکورد تکالیف بارگذاری‌شده:', record);
    todos.value = record.content || [];
    console.log('داده‌های تکالیف بارگذاری‌شده:', todos.value);
  } catch (error) {
    if (error.status === 404) {
      todos.value = [];
      console.log('هیچ رکوردی برای تکالیف یافت نشد');
    } else {
      console.error('خطا در بارگذاری تکالیف:', error, error.data, error.status);
      alert('خطا در بارگذاری تکالیف: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
    }
  }
};

// تابع برای ذخیره لیست تکالیف
const saveTodos = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای ذخیره تکالیف:', userId);

    let record;
    try {
      record = await pb.collection('homework_list').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
      console.log('رکورد موجود تکالیف:', record);
    } catch (error) {
      if (error.status !== 404) throw error;
      console.log('رکورد جدیدی برای تکالیف ایجاد خواهد شد');
    }

    const data = {
      userId: userId,
      content: todos.value,
    };
    console.log('داده ارسالی تکالیف به PocketBase:', data);

    if (record) {
      const updatedRecord = await pb.collection('homework_list').update(record.id, data);
      console.log('رکورد تکالیف به‌روزرسانی شد:', updatedRecord);
    } else {
      const newRecord = await pb.collection('homework_list').create(data);
      console.log('رکورد جدید تکالیف ایجاد شد:', newRecord);
    }
  } catch (error) {
    console.error('خطا در ذخیره تکالیف:', error, error.data, error.status);
    alert('خطا در ذخیره تکالیف. لطفاً دوباره تلاش کنید.');
  }
};

// تابع برای افزودن تکلیف
const addTodo = () => {
  const text = todoText.value.trim();
  if (!text) {
    alert('لطفاً متن تکلیف را وارد کنید!');
    return;
  }
  const newTodo = {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString(),
    completed: false,
  };
  todos.value.unshift(newTodo);
  todoText.value = '';
  saveTodos();
};

// تابع برای حذف تکلیف
const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  saveTodos();
};

// تابع برای بارگذاری برنامه هفتگی
const loadSchedule = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای بارگذاری برنامه:', userId);

    const record = await pb.collection('weekly_schedule').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    console.log('رکورد برنامه بارگذاری‌شده:', record);

    const loadedContent = Array.isArray(record.content) ? record.content : periods.map(() => Array(days.length).fill(''));
    console.log('داده‌های خام content:', record.content);
    console.log('داده‌های تنظیم‌شده:', loadedContent);

    while (schedule.length) schedule.pop();
    loadedContent.forEach(row => schedule.push([...row]));
    console.log('schedule بعد از تنظیم:', schedule);
  } catch (error) {
    if (error.status === 404) {
      while (schedule.length) schedule.pop();
      periods.forEach(() => schedule.push(Array(days.length).fill('')));
      console.log('هیچ رکوردی برای برنامه یافت نشد، برنامه خالی تنظیم شد:', schedule);
    } else {
      console.error('خطا در بارگذاری برنامه هفتگی:', error, error.data, error.status);
      alert('خطا در بارگذاری برنامه هفتگی: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
    }
  }
};

// تابع برای ذخیره برنامه هفتگی
const saveSchedule = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای ذخیره برنامه:', userId);

    const validSchedule = schedule.length ? schedule : periods.map(() => Array(days.length).fill(''));
    console.log('داده‌های برنامه برای ذخیره:', validSchedule);

    const jsonString = JSON.stringify(validSchedule);
    console.log('JSON برنامه:', jsonString);

    let record;
    try {
      record = await pb.collection('weekly_schedule').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
      console.log('رکورد موجود برنامه:', record);
    } catch (error) {
      if (error.status !== 404) throw error;
      console.log('رکورد جدیدی برای برنامه ایجاد خواهد شد');
    }

    const data = {
      userId: userId,
      content: validSchedule,
    };
    console.log('داده ارسالی برنامه به PocketBase:', data);

    if (record) {
      const updatedRecord = await pb.collection('weekly_schedule').update(record.id, data);
      console.log('رکورد برنامه به‌روزرسانی شد:', updatedRecord);
    } else {
      const newRecord = await pb.collection('weekly_schedule').create(data);
      console.log('رکورد جدید برنامه ایجاد شد:', newRecord);
    }
    alert('برنامه با موفقیت ذخیره شد!');
  } catch (error) {
    console.error('خطا در ذخیره برنامه:', error, error.data, error.status);
    alert('خطا در ذخیره برنامه: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
  }
};

// تابع برای به‌روزرسانی برنامه هفتگی
const updateSchedule = (rowIndex, colIndex, event) => {
  if (!schedule[rowIndex]) {
    schedule[rowIndex] = Array(days.length).fill('');
  }
  schedule[rowIndex][colIndex] = event.target.textContent;
  console.log('schedule بعد از به‌روزرسانی:', schedule);
};

// بارگذاری اولیه داده‌ها
onMounted(async () => {
  console.log('وضعیت احراز هویت:', pb.authStore.isValid, pb.authStore.model);

  // نمودار
  const chartOptions = {
    series: [
      { name: 'مطالعه', data: [3, 4, 2, 5, 4, 6, 2] },
      { name: 'ورزش', data: [1, 2, 1, 3, 1, 2, 1] },
      { name: 'سرگرمی', data: [2, 3, 1, 4, 2, 3, 1] },
      { name: 'استراحت', data: [8, 7, 9, 6, 8, 7, 9] },
    ],
    chart: {
      type: 'bar',
      height: 320,
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Vazirmatn',
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
    plotOptions: {
      bar: { borderRadius: 8, columnWidth: '60%', dataLabels: { position: 'top' } },
    },
    dataLabels: { enabled: true, formatter: (val) => val + 'h', style: { fontSize: '12px' } },
    xaxis: { categories: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'], labels: { style: { fontSize: '14px' } } },
    yaxis: { max: 24, labels: { formatter: (val) => val + 'h' } },
    legend: { show: false },
    tooltip: { y: { formatter: (val) => val + ' ساعت' }, style: { fontFamily: 'Vazirmatn' } },
    responsive: [{ breakpoint: 480, options: { plotOptions: { bar: { columnWidth: '70%' } } } }],
  };
  const chart = new ApexCharts(document.querySelector('#activity-chart'), chartOptions);
  chart.render();

  // بارگذاری داده‌ها از PocketBase
  await loadTodos();
  await loadSchedule();

  // سیستم تمرکز هوشمند
  class FocusTimer {
    constructor() {
      this.timer = null;
      this.isRunning = false;
      this.currentTime = parseInt(localStorage.getItem('currentTime')) || 0;
      this.isBreakTime = localStorage.getItem('isBreakTime') === 'true' || false;
      this.settings = JSON.parse(localStorage.getItem('focusSettings')) || { study: 25, break: 5 };
      this.totalTime = (this.isBreakTime ? this.settings.break : this.settings.study) * 60;
      this.ui = {
        time: document.getElementById('time'),
        status: document.getElementById('status'),
        startBtn: document.getElementById('startBtn'),
        resetBtn: document.getElementById('resetBtn'),
        studyInput: document.getElementById('studyTime'),
        breakInput: document.getElementById('breakTime'),
        progressCircle: document.querySelector('.progress-ring__circle'),
      };
      this.init();
    }
    init() {
      this.ui.studyInput.value = this.settings.study;
      this.ui.breakInput.value = this.settings.break;
      this.updateProgress((this.currentTime / this.totalTime) * 100);
      this.updateDisplay(this.totalTime - this.currentTime);
      this.setupEventListeners();
    }
    setupEventListeners() {
      this.ui.startBtn.addEventListener('click', () => this.toggleTimer());
      this.ui.resetBtn.addEventListener('click', () => this.resetTimer());
      this.ui.studyInput.addEventListener('change', () => this.updateSettings());
      this.ui.breakInput.addEventListener('change', () => this.updateSettings());
    }
    toggleTimer() {
      if (!this.isRunning) {
        this.startTimer();
        this.ui.startBtn.textContent = '⏸ توقف';
        this.ui.startBtn.classList.replace('bg-blue-500', 'bg-yellow-500');
      } else {
        this.pauseTimer();
        this.ui.startBtn.textContent = '▶ ادامه';
        this.ui.startBtn.classList.replace('bg-yellow-500', 'bg-blue-500');
      }
      this.isRunning = !this.isRunning;
    }
    startTimer() {
      clearInterval(this.timer);
      if (this.currentTime === 0) {
        this.totalTime = (this.isBreakTime ? this.settings.break : this.settings.study) * 60;
        this.ui.status.textContent = this.isBreakTime ? 'زمان استراحت! ☕' : 'در حال تمرکز...';
      }
      this.timer = setInterval(() => {
        this.currentTime++;
        localStorage.setItem('currentTime', this.currentTime);
        const remaining = this.totalTime - this.currentTime;
        this.updateDisplay(remaining);
        if (remaining <= 0) {
          this.handleComplete();
        }
      }, 1000);
    }
    updateDisplay(seconds) {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      this.ui.time.textContent = `${mins}:${secs}`.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
      this.updateProgress((this.currentTime / this.totalTime) * 100);
    }
    updateProgress(percent) {
      if (isNaN(percent)) percent = 0;
      const circumference = 565.48;
      const offset = circumference - (percent / 100) * circumference;
      this.ui.progressCircle.style.strokeDashoffset = offset;
    }
    handleComplete() {
      this.pauseTimer();
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
      this.isBreakTime = !this.isBreakTime;
      localStorage.setItem('isBreakTime', this.isBreakTime);
      this.currentTime = 0;
      this.totalTime = (this.isBreakTime ? this.settings.break : this.settings.study) * 60;
      this.ui.status.textContent = this.isBreakTime ? 'زمان استراحت! ☕' : 'در حال تمرکز...';
      this.startTimer();
    }
    pauseTimer() {
      clearInterval(this.timer);
    }
    resetTimer() {
      this.pauseTimer();
      this.currentTime = 0;
      this.isRunning = false;
      this.isBreakTime = false;
      localStorage.setItem('currentTime', this.currentTime);
      localStorage.setItem('isBreakTime', this.isBreakTime);
      this.ui.startBtn.textContent = '▶ شروع';
      this.ui.startBtn.classList.replace('bg-yellow-500', 'bg-blue-500');
      this.ui.status.textContent = 'آماده';
      this.totalTime = this.settings.study * 60;
      this.updateDisplay(this.totalTime);
    }
    updateSettings() {
      this.settings = {
        study: parseInt(this.ui.studyInput.value) || 25,
        break: parseInt(this.ui.breakInput.value) || 5,
      };
      localStorage.setItem('focusSettings', JSON.stringify(this.settings));
      this.totalTime = this.isBreakTime ? this.settings.break * 60 : this.settings.study * 60;
      if (!this.isRunning) {
        this.resetTimer();
      }
    }
  }
  new FocusTimer();
});
onMounted(() => {
  updateTexts();
});
</script>

<style scoped>
/* تنظیمات اصلی برای container اصلی */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

/* گرید اصلی برای کارت‌ها */
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

/* تنظیمات برای موبایل‌ها */
@media (max-width: 768px) {
  .week, .bg-gray-50, .w-full {
    width: 100%;
    height: auto;
  }
  .text-xl, .text-2xl, .text-4xl {
    font-size: 1.2rem;
  }
  table {
    font-size: 0.8rem;
  }
  .text-sm {
    font-size: 0.75rem;
  }
  input, button {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
  }
  .animate__animated {
    animation-duration: 0.3s;
  }
  .flex {
    flex-direction: column;
    gap: 6px;
  }
  .bg-blue-500, .bg-green-400, .bg-gradient-to-r {
    width: 100%;
    text-align: center;
  }
  .grid {
    gap: 4px;
  }
}
</style>