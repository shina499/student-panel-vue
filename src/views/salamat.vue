<template>
  <section class="g-system">
    <!-- Water Consumption Component -->
    <div class="w-full max-w-[550px] h-[400px] bg-blue-200 rounded-2xl shadow-xl p-8 flex flex-col items-center animate__animated animate__fadeIn">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-4xl">💧</span>
        <h1 class="text-2xl font-bold text-blue-600">آب مصرفی امروز</h1>
      </div>

      <div class="flex items-center gap-6 mb-8">
        <button @click="changeCount(-1)" class="p-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-500 text-2xl transition-all">
          🥤-
        </button>
        
        <div class="text-6xl font-bold text-blue-500">
          <span>{{ waterData.count }}</span>
          <span class="text-2xl text-blue-300">/8</span>
        </div>
        
        <button @click="changeCount(1)" class="p-3 rounded-xl bg-blue-300 hover:bg-blue-400 text-blue-500 text-2xl transition-all">
          🥤+
        </button>
      </div>

      <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div :style="{ width: `${Math.min((waterData.count / 8) * 100, 100)}%` }" 
             class="bg-gradient-to-r from-blue-300 to-blue-600 h-4 rounded-full transition-all duration-500"></div>
      </div>

      <div class="flex items-center justify-between w-full mt-auto">
        <div class="text-lg text-blue-400">{{ getStatusText() }}</div>
        <button @click="resetCount" class="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2">
          🔄 بازنشانی
        </button>
      </div>
    </div>

    <!-- Exercise Manager Component -->
    <div class="w-full max-w-[550px] h-[400px] rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn bg">
      <div class="flex items-center gap-3 mb-4">
        <h1 class="text-2xl font-bold text-green-600 bg-white p-2">🏃‍♀️ مدیریت ورزش روزانه</h1>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center">
        <div class="text-6xl font-mono text-green-600 mb-4 bg-white p-2">{{ formattedTime }}</div>
        
        <div class="flex gap-3">
          <button @click="toggleTimer" :class="timer.isRunning ? 'bg-yellow-500' : 'bg-green-500'" 
                  class="px-5 py-2 hover:bg-green-600 text-white rounded-lg transition-colors">
            {{ timer.isRunning ? '⏸ توقف' : '▶ شروع' }}
          </button>
          <button @click="saveWorkout" class="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            💾 ذخیره
          </button>
        </div>
      </div>

      <div class="border-t pt-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-green-600 font-bold bg-white p-2">📅 تاریخچه هفتگی</h3>
          <button @click="clearHistory" class="text-red-500 hover:text-red-700 text-sm bg-white p-2">
            پاکسازی تاریخچه
          </button>
        </div>
        <ul class="space-y-2 max-h-[100px] overflow-y-auto pr-2 text-black">
          <li v-for="workout in workoutHistory" :key="workout.id" class="flex justify-between items-center bg-gray-50 p-2 rounded">
            <div class="flex items-center gap-2">
              <span class="text-green-500">🔥 {{ workout.calories }}</span>
              <span>کالری</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-gray-400">{{ workout.date }}</span>
              <button @click="deleteWorkout(workout.id)" class="text-red-300 hover:text-red-500 transition-colors">
                ✕
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sleep Manager Component -->
    <div class="w-full max-w-[550px] h-[400px] bg-pink-300 rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🌙</span>
        <h1 class="text-2xl font-bold text-purple-600 bg-white p-2">الگوی خواب دانش‌آموزی</h1>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-purple-50 p-4 rounded-xl">
          <label class="text-purple-500 mb-2 block">🛌 زمان خواب</label>
          <input type="time" v-model="bedtime" class="w-full p-2 rounded-lg border border-purple-200">
        </div>
        
        <div class="bg-purple-50 p-4 rounded-xl">
          <label class="text-purple-500 mb-2 block">🌅 زمان بیداری</label>
          <input type="time" v-model="waketime" class="w-full p-2 rounded-lg border border-purple-200">
        </div>
      </div>

      <div class="bg-purple-100 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⏳</span>
          <div>
            <p class="text-sm text-purple-500">مدت خواب</p>
            <p class="text-xl font-bold text-purple-600">{{ sleepDuration }}</p>
          </div>
        </div>
        <button @click="calculateSleep" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
          محاسبه
        </button>
      </div>

      <div class="bg-purple-50 rounded-lg p-3 flex-1 overflow-y-auto">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-purple-600 font-bold">📅 تاریخچه خواب</h3>
          <button @click="clearSleepHistory" class="text-purple-400 hover:text-purple-600 text-sm">
            پاکسازی
          </button>
        </div>
        <ul class="space-y-2">
          <li v-for="(entry, index) in sleepHistory" :key="index" class="flex items-center justify-between bg-white p-2 rounded">
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
    <div class="bg-yellow-200 rounded-2xl shadow-xl p-6 flex flex-col animate__animated animate__fadeIn" style="width: 100%; max-width: 550px; height: 400px;">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="text-3xl">😊</span>
          <h1 class="text-xl font-bold text-purple-600">ردیاب احساسات روزانه</h1>
        </div>
        <span class="text-sm text-gray-500">{{ todayDate }}</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mb-4">
        <button @click="addMoodEntry('happy')" class="mood-btn bg-green-300 p-2 rounded-lg animation3">
          😊 شاد
        </button>
        <button @click="addMoodEntry('sad')" class="mood-btn bg-blue-300 p-2 rounded-lg animation2">
          😢 ناراحت
        </button>
        <button @click="addMoodEntry('angry')" class="mood-btn bg-red-300 p-2 rounded-lg animation1">
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
          <div class="bg-purple-100 px-3 py-1 rounded-full text-sm">
            📊 مجموع: <span>{{ moodData.entries.length }}</span>
          </div>
          <div class="bg-green-100 px-3 py-1 rounded-full text-sm">
            🏆 بهترین روز: <span>{{ bestDay }}</span>
          </div>
        </div>
        <button @click="resetMoodData" class="text-red-400 hover:text-red-600 text-sm">
          🔄 بازنشانی
        </button>
      </div>
    </div>

    <!-- Goals and Weekly Tasks Component -->
    <div class="relative mb-20">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-purple-800">اهداف طلایی من ✨</h1>
          <p class="text-gray-600 mt-2">هر روز یک قدم به رویاهام نزدیک‌تر میشم 💪</p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <input type="text" v-model="newGoal.text" placeholder="هدف جدید" 
                   class="w-full p-2 border-2 border-dashed border-purple-300 rounded-lg focus:outline-none focus:border-purple-500" />
            <input type="date" v-model="newGoal.date" 
                   class="p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500" />
            <button @click="addGoal" class="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">➕</button>
          </div>
          <div class="space-y-2">
            <div v-for="(goal, index) in goals" :key="index" class="flex items-center gap-4">
              <input type="text" :value="goal.text" class="w-full p-2 border-2 border-purple-300 rounded-lg" readonly />
              <input type="date" :value="goal.date" class="p-2 border-2 border-purple-300 rounded-lg" readonly />
              <button @click="toggleGoal(index)" class="p-2 bg-purple-500 text-white rounded-lg">
                {{ goal.completed ? '✅' : '⬜' }}
              </button>
              <button @click="deleteGoal(index)" class="p-2 bg-red-500 text-white rounded-lg">🗑️</button>
            </div>
          </div>
        </div>

        <div class="text-center relative">
          <h2 class="text-xl font-bold text-purple-800">پیشرفت من</h2>
          <div id="progressChart" class="w-64 h-64 mx-auto mt-4"></div>
          <div class="text-2xl font-bold text-purple-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {{ progressPercentage }}%
          </div>
        </div>
        
        <div class="text-center">
          <h2 class="text-xl font-bold text-purple-800">برنامه هفتگی</h2>
          <div class="grid grid-cols-3 gap-2 mt-4">
            <div v-for="day in daysOfWeek" :key="day" class="bg-purple-100 rounded-lg p-2 cursor-pointer hover:bg-purple-200">
              <div class="font-bold">{{ day }}</div>
              <div class="text-sm mt-1 space-y-1">
                <div v-for="(task, taskIndex) in weeklyTasks[day]" :key="taskIndex" class="flex justify-between items-center bg-white p-1 rounded">
                  <span>{{ task }}</span>
                  <button @click="removeTask(day, taskIndex)" class="text-red-500">×</button>
                </div>
                <div class="mt-2">
                  <input v-model="newTask[day]" placeholder="اضافه کردن کار" class="p-1 w-full rounded-md border-2 border-gray-200" />
                  <button @click="addTask(day)" class="bg-purple-500 text-white px-3 py-1 mt-2 rounded-md">افزودن</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        // Water Tracker
        waterData: {
          count: 0,
          date: new Date().toLocaleDateString('fa-IR')
        },
        // Exercise Tracker
        timer: {
          isRunning: false,
          startTime: 0,
          elapsedTime: 0,
          interval: null
        },
        workoutHistory: [],
        formattedTime: '۰۰:۰۰:۰۰',
        // Sleep Tracker
        bedtime: '',
        waketime: '',
        sleepDuration: '۰ ساعت ۰ دقیقه',
        sleepHistory: [],
        // Mood Tracker
        moodData: { entries: [] },
        todayDate: new Date().toLocaleDateString('fa-IR'),
        // Goals Tracker
        goals: [],
        newGoal: { text: '', date: '', completed: false },
        progressChart: null,
        // Weekly Tasks
        daysOfWeek: ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'],
        weeklyTasks: {},
        newTask: {} // مدل داینامیک برای ورودی هر روز
      };
    },
    computed: {
      progressPercentage() {
        const completed = this.goals.filter(g => g.completed).length;
        return this.goals.length > 0 ? Math.round((completed / this.goals.length) * 100) : 0;
      },
      moodCounts() {
        return this.moodData.entries.reduce((acc, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
          return acc;
        }, {});
      },
      bestDay() {
        const days = {};
        this.moodData.entries.forEach(entry => {
          const date = new Date(entry.date).toLocaleDateString('fa-IR');
          days[date] = (days[date] || 0) + 1;
        });
        const bestDay = Object.entries(days).reduce((a, b) => b[1] > a[1] ? b : a, [null, 0]);
        return bestDay[0] || '---';
      }
    },
    mounted() {
      this.loadData();
      this.initializeWeeklyTasks();
      this.initProgressChart();
    },
    beforeUnmount() {
      if (this.progressChart) {
        this.progressChart.destroy();
      }
    },
    methods: {
      // Water Tracker Methods
      loadWaterData() {
        const savedData = localStorage.getItem('waterData');
        if (savedData) {
          this.waterData = JSON.parse(savedData);
          if (new Date().toLocaleDateString('fa-IR') !== this.waterData.date) {
            this.resetCount();
          }
        }
      },
      saveWaterData() {
        localStorage.setItem('waterData', JSON.stringify(this.waterData));
      },
      changeCount(amount) {
        if (new Date().toLocaleDateString('fa-IR') !== this.waterData.date) {
          this.waterData.count = 0;
          this.waterData.date = new Date().toLocaleDateString('fa-IR');
        }
        this.waterData.count = Math.max(0, this.waterData.count + amount);
        this.saveWaterData();
      },
      resetCount() {
        this.waterData = {
          count: 0,
          date: new Date().toLocaleDateString('fa-IR')
        };
        this.saveWaterData();
      },
      getStatusText() {
        if (this.waterData.count === 0) {
          return '😴 هنوز شروع نکردی!';
        } else if (this.waterData.count < 4) {
          return '💪 ادامه بده!';
        } else if (this.waterData.count < 8) {
          return '🎯 عالی پیش میری!';
        } else {
          return '🎉 هدف امروز تکمیل شد!';
        }
      },
      // Exercise Tracker Methods
      loadWorkoutHistory() {
        this.workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
      },
      saveWorkoutHistory() {
        localStorage.setItem('workoutHistory', JSON.stringify(this.workoutHistory));
      },
      toggleTimer() {
        if (!this.timer.isRunning) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      },
      startTimer() {
        this.timer.startTime = Date.now() - this.timer.elapsedTime;
        this.timer.interval = setInterval(this.updateTimerDisplay, 1000);
        this.timer.isRunning = true;
      },
      stopTimer() {
        clearInterval(this.timer.interval);
        this.timer.elapsedTime = Date.now() - this.timer.startTime;
        this.timer.isRunning = false;
      },
      updateTimerDisplay() {
        const totalSeconds = Math.floor((Date.now() - this.timer.startTime) / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '۰');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '۰');
        const seconds = (totalSeconds % 60).toString().padStart(2, '۰');
        this.formattedTime = `${hours}:${minutes}:${seconds}`;
      },
      saveWorkout() {
        if (this.timer.elapsedTime > 0) {
          const workout = {
            id: Date.now(),
            duration: Math.floor(this.timer.elapsedTime / 1000),
            date: new Date().toLocaleDateString('fa-IR'),
            calories: Math.floor(this.timer.elapsedTime / 1000 * 0.1)
          };
          this.workoutHistory.unshift(workout);
          if (this.workoutHistory.length > 7) {
            this.workoutHistory.pop();
          }
          this.saveWorkoutHistory();
          this.resetTimer();
        }
      },
      deleteWorkout(id) {
        this.workoutHistory = this.workoutHistory.filter(workout => workout.id !== id);
        this.saveWorkoutHistory();
      },
      clearHistory() {
        this.workoutHistory = [];
        localStorage.removeItem('workoutHistory');
      },
      resetTimer() {
        clearInterval(this.timer.interval);
        this.timer = {
          isRunning: false,
          startTime: 0,
          elapsedTime: 0,
          interval: null
        };
        this.formattedTime = '۰۰:۰۰:۰۰';
      },
      // Sleep Tracker Methods
      loadSleepHistory() {
        this.sleepHistory = JSON.parse(localStorage.getItem('sleepHistory')) || [];
      },
      saveSleepHistory() {
        localStorage.setItem('sleepHistory', JSON.stringify(this.sleepHistory));
      },
      calculateSleep() {
        if (!this.bedtime || !this.waketime) return;
        const [bedHour, bedMin] = this.bedtime.split(':').map(Number);
        const [wakeHour, wakeMin] = this.waketime.split(':').map(Number);
        let diffHours = wakeHour - bedHour;
        let diffMinutes = wakeMin - bedMin;
        if (diffMinutes < 0) {
          diffHours--;
          diffMinutes += 60;
        }
        if (diffHours < 0) diffHours += 24;
        this.sleepDuration = `${diffHours} ساعت ${diffMinutes} دقیقه`;
        this.saveSleepHistoryEntry({
          date: new Date().toLocaleDateString('fa-IR'),
          duration: `${diffHours}h ${diffMinutes}m`,
          bedtime: this.bedtime,
          waketime: this.waketime
        });
      },
      saveSleepHistoryEntry(entry) {
        this.sleepHistory.unshift(entry);
        if (this.sleepHistory.length > 7) {
          this.sleepHistory.pop();
        }
        this.saveSleepHistory();
      },
      clearSleepHistory() {
        this.sleepHistory = [];
        localStorage.removeItem('sleepHistory');
      },
      // Mood Tracker Methods
      loadMoodData() {
        this.moodData = JSON.parse(localStorage.getItem('moodData')) || { entries: [] };
      },
      saveMoodData() {
        localStorage.setItem('moodData', JSON.stringify(this.moodData));
      },
      addMoodEntry(mood) {
        this.moodData.entries.push({ date: new Date().toISOString(), mood });
        this.saveMoodData();
      },
      resetMoodData() {
        if (confirm('آیا از پاک کردن تمام داده‌ها اطمینان دارید؟')) {
          this.moodData = { entries: [] };
          localStorage.removeItem('moodData');
        }
      },
      getMoodIcon(mood) {
        const icons = { happy: '😊', sad: '😢', angry: '😠' };
        return icons[mood] || '❓';
      },
      getMoodColor(mood) {
        const colors = { happy: 'bg-green-500', sad: 'bg-blue-500', angry: 'bg-red-500' };
        return colors[mood] || 'bg-gray-400';
      },
      // Goals Tracker Methods
      loadGoals() {
        this.goals = JSON.parse(localStorage.getItem('goals')) || [];
      },
      saveGoals() {
        localStorage.setItem('goals', JSON.stringify(this.goals));
      },
      addGoal() {
        if (this.newGoal.text.trim() === '' || this.newGoal.date === '') {
          alert('لطفاً هدف و تاریخ را وارد کنید!');
          return;
        }
        this.goals.push({ ...this.newGoal });
        this.saveGoals();
        this.newGoal = { text: '', date: '', completed: false };
        this.updateProgressChart();
      },
      toggleGoal(index) {
        this.goals[index].completed = !this.goals[index].completed;
        this.saveGoals();
        this.updateProgressChart();
      },
      deleteGoal(index) {
        this.goals.splice(index, 1);
        this.saveGoals();
        this.updateProgressChart();
      },
      initProgressChart() {
        this.progressChart = new ApexCharts(document.querySelector("#progressChart"), {
          chart: {
            type: 'donut',
            height: '100%',
            width: '100%',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800
            }
          },
          series: [0, 100],
          colors: ['#8B5CF6', '#EDE9FE'],
          labels: ['پیشرفت', 'باقیمانده'],
          plotOptions: {
            pie: {
              donut: {
                size: '75%',
                labels: {
                  show: false
                }
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          tooltip: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              }
            }
          }]
        });
  
        this.progressChart.render();
        this.updateProgressChart();
      },
      updateProgressChart() {
        const completed = this.goals.filter(g => g.completed).length;
        const progress = this.goals.length > 0 ? Math.round((completed / this.goals.length) * 100) : 0;
        const remaining = 100 - progress;
        this.progressChart.updateSeries([progress, remaining]);
      },
      // Weekly Tasks Methods
      initializeWeeklyTasks() {
        this.daysOfWeek.forEach(day => {
          this.weeklyTasks[day] = [];
          this.newTask[day] = "";
        });
        this.loadWeeklyTasks();
      },
      loadWeeklyTasks() {
        const savedTasks = localStorage.getItem('weeklyTasks');
        if (savedTasks) {
          this.weeklyTasks = JSON.parse(savedTasks);
          // اطمینان از وجود کلید برای هر روز
          this.daysOfWeek.forEach(day => {
            if (!this.weeklyTasks[day]) {
              this.weeklyTasks[day] = [];
            }
          });
        }
      },
      saveWeeklyTasks() {
        localStorage.setItem('weeklyTasks', JSON.stringify(this.weeklyTasks));
      },
      addTask(day) {
        if (this.newTask[day].trim()) {
          this.weeklyTasks[day].push(this.newTask[day]);
          this.newTask[day] = "";
          this.saveWeeklyTasks();
        }
      },
      removeTask(day, index) {
        this.weeklyTasks[day].splice(index, 1);
        this.saveWeeklyTasks();
      },
      // General Methods
      loadData() {
        this.loadWaterData();
        this.loadWorkoutHistory();
        this.loadSleepHistory();
        this.loadMoodData();
        this.loadGoals();
      }
    }
  };
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
    animation: shakeY 1.5s, cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s infinite;
    background-color: oklch(0.885 0.062 18.334);
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
    background-color: oklch(0.882 0.059 254.128);
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
    background-color: oklch(0.925 0.084 155.995);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* تغییر به grid auto-fill */
}

@media (max-width: 899px) {
  .g-system {
    grid-template-columns: 1fr; /* برای گوشی‌های کوچک: یک ستون */
    justify-items: center; /* هر کارت داخل گرید وسط */
  }
}

@media (min-width: 900px) {
  .g-system {
    grid-template-columns: repeat(2, 1fr); /* برای تبلت‌ها: دو ستون */
    max-width: 1000px;
    margin: 0 auto;
    justify-items: center;
  }
}


</style>