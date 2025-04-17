<template>
  <div class="w-full container">
    <section class="g-system">
      <!-- کارت ۱: تحلیل فعالیت هفتگی -->
      <div class="card bg-white rounded-2xl shadow-xl p-6 animate__animated animate__bounceIn w-full max-w-lg">
        <!-- هدر -->
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold text-purple-600">📊 تحلیل فعالیت هفتگی</h1>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">🎯 هدف: ۳۵ ساعت</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">📅 هفته جاری</span>
          </div>
        </div>
        <!-- نمودار -->
        <div id="activity-chart"></div>
        <!-- راهنمای رنگ‌ها -->
        <div class="grid grid-cols-4 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-6 md:gap-2">
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#6366f1] rounded-full"></div>
            <span class="text-sm">مطالعه</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#10b981] rounded-full"></div>
            <span class="text-sm">ورزش</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
            <span class="text-sm">سرگرمی</span>
          </div>
          <div class="flex items-center gap-1 justify-center">
            <div class="w-3 h-3 bg-[#ef4444] rounded-full"></div>
            <span class="text-sm">استراحت</span>
          </div>
        </div>
      </div>
  
      <!-- کارت ۲: لیست تکالیف دانش آموزی -->
      <div class="card bg-gray-50 rounded-xl animate__animated animate__bounceIn w-full max-w-lg mt-4">
        <div class="container mx-auto p-4">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">لیست تکالیف دانش آموزی</h1>
            <div class="flex gap-2 mb-4">
              <input 
                type="text" 
                id="todoInput" 
                placeholder="تکلیف جدید..."
                class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button 
                id="addBtn"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                افزودن
              </button>
            </div>
            <ul id="todoList" class="space-y-2 max-h-[220px] overflow-y-auto pr-2">
              <!-- آیتم‌های todo اینجا نمایش داده می‌شوند -->
            </ul>
            <div class="mt-4 text-sm text-gray-500 text-center">
              تعداد تکالیف: <span id="count">0</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- کارت ۳: برنامه هفتگی -->
      <div class="card bg-gray-50 flex flex-col items-center justify-center p-4 week w-full max-w-lg mt-4">
        <div class="w-full">
          <h1 class="text-2xl font-bold text-center mb-4 text-gray-800 animate__animated animate__fadeIn">
            برنامه هفتگی
          </h1>
          <table id="schedule" class="w-full bg-white rounded-lg shadow-sm animate__animated animate__fadeInUp">
            <thead>
              <tr class="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                <th class="p-2">زنگ</th>
                <th class="p-2">شنبه</th>
                <th class="p-2">یکشنبه</th>
                <th class="p-2">دوشنبه</th>
                <th class="p-2">سه‌شنبه</th>
                <th class="p-2">چهارشنبه</th>
              </tr>
            </thead>
            <tbody>
              <!-- ردیف‌ها به صورت دینامیک با JS پر می‌شوند -->
            </tbody>
          </table>
          <button id="saveBtn" class="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-blue-500 animate__animated animate__fadeIn">
            ذخیره برنامه
          </button>
        </div>
      </div>
  
      <!-- کارت ۴: سیستم تمرکز هوشمند -->
      <div class="card bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center animate__animated animate__bounceIn w-full max-w-lg mt-4">
        <!-- هدر -->
        <div class="flex items-center gap-3 mb-6">
          <span class="text-4xl">🎯</span>
          <h1 class="text-2xl font-bold text-blue-600">سیستم تمرکز هوشمند</h1>
        </div>
        <!-- نمایشگر اصلی -->
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
            <div id="time" class="text-4xl font-bold text-blue-600">25:00</div>
            <div id="status" class="text-blue-400">آماده</div>
          </div>
        </div>
        <!-- کنترل‌ها -->
        <div class="flex gap-4 mt-6">
          <button id="startBtn" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            ▶ شروع
          </button>
          <button id="resetBtn" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            🔄 تنظیم مجدد
          </button>
        </div>
        <!-- تنظیمات -->
        <div class="grid grid-cols-2 gap-4 mt-6 w-full">
          <div class="bg-blue-50 p-3 rounded-lg">
            <label class="block text-sm text-blue-500 mb-1">مدت مطالعه (دقیقه)</label>
            <input type="number" id="studyTime" value="25" min="0" 
                   class="w-full p-2 border border-blue-200 rounded-lg">
          </div>
          <div class="bg-blue-50 p-3 rounded-lg">
            <label class="block text-sm text-blue-500 mb-1">مدت استراحت (دقیقه)</label>
            <input type="number" id="breakTime" value="5" min="0"
                   class="w-full p-2 border border-blue-200 rounded-lg">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // ----------------------- نمودار -----------------------
  const chartOptions = {
    series: [{
      name: 'مطالعه',
      data: [3, 4, 2, 5, 4, 6, 2]
    }, {
      name: 'ورزش',
      data: [1, 2, 1, 3, 1, 2, 1]
    }, {
      name: 'سرگرمی',
      data: [2, 3, 1, 4, 2, 3, 1]
    }, {
      name: 'استراحت',
      data: [8, 7, 9, 6, 8, 7, 9]
    }],
    chart: {
      type: 'bar',
      height: 320,
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Vazirmatn'
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        dataLabels: { position: 'top' }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val + "h",
      style: { fontSize: '12px' }
    },
    xaxis: {
      categories: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
      labels: { style: { fontSize: '14px' } }
    },
    yaxis: {
      max: 24,
      labels: { formatter: (val) => val + "h" }
    },
    legend: { show: false },
    tooltip: {
      y: { formatter: (val) => val + " ساعت" },
      style: { fontFamily: 'Vazirmatn' }
    },
    responsive: [{
      breakpoint: 480,
      options: { plotOptions: { bar: { columnWidth: '70%' } } }
    }]
  };
  const chart = new ApexCharts(document.querySelector("#activity-chart"), chartOptions);
  chart.render();

  // ----------------------- لیست تکالیف -----------------------
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  const countSpan = document.getElementById('count');
  const addBtn = document.getElementById('addBtn');

  const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    countSpan.innerText = todos.length;
  };

  const createTodoElement = (todo) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[72px]';
    li.innerHTML = `
      <div class="flex-1">
        <span class="text-gray-800">${todo.text}</span>
        <span class="text-xs text-gray-400 block mt-1">${new Date(todo.timestamp).toLocaleString('fa-IR')}</span>
      </div>
      <button class="delete-btn text-red-500 hover:text-red-700 transition-colors" data-id="${todo.id}">
        ×
      </button>
    `;
    return li;
  };

  const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const todoElement = createTodoElement(todo);
      todoList.appendChild(todoElement);
    });
  };

  const addTodo = () => {
    const text = todoInput.value.trim();
    if (!text) {
      alert('لطفا متن تکلیف را وارد کنید!');
      todoInput.focus();
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toISOString(),
      completed: false
    };
    addBtn.classList.add("animate__animated", "animate__jackInTheBox");
    todos.unshift(newTodo);
    todoInput.value = '';
    renderTodos();
    updateLocalStorage();
  };

  const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    updateLocalStorage();
  };

  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = Number(e.target.dataset.id);
      deleteTodo(id);
    }
  });
  renderTodos();
  updateLocalStorage();

  // ----------------------- برنامه هفتگی -----------------------
  const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
  const periods = ['زنگ اول', 'زنگ دوم', 'زنگ سوم', 'زنگ چهارم', 'زنگ پنجم'];
  const tableBody = document.querySelector('#schedule tbody');
  const colors = ['bg-red-300', 'bg-yellow-300', 'bg-lime-300', 'bg-blue-300', 'bg-fuchsia-300'];

  periods.forEach((period) => {
    const row = document.createElement('tr');
    const periodCell = document.createElement('td');
    periodCell.textContent = period;
    periodCell.classList.add('p-2', 'font-bold', 'bg-gray-100', 'text-center');
    row.appendChild(periodCell);

    days.forEach((day, index) => {
      const cell = document.createElement('td');
      cell.contentEditable = true;
      cell.classList.add('p-2', 'border', 'border-gray-200', 'text-center', 'hover:bg-opacity-75', 'focus:bg-opacity-100', colors[index % colors.length], 'animate__animated', 'animate__fadeIn');
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });

  document.getElementById('saveBtn').addEventListener('click', function () {
    const schedule = [];
    tableBody.querySelectorAll('tr').forEach(row => {
      const rowData = [];
      row.querySelectorAll('td').forEach((cell, index) => {
        if (index !== 0) {
          rowData.push(cell.textContent);
        }
      });
      schedule.push(rowData);
    });
    localStorage.setItem('weeklySchedule', JSON.stringify(schedule));
    alert('برنامه با موفقیت ذخیره شد!');
  });

  const savedSchedule = JSON.parse(localStorage.getItem('weeklySchedule'));
  if (savedSchedule) {
    tableBody.querySelectorAll('tr').forEach((row, rowIndex) => {
      row.querySelectorAll('td').forEach((cell, cellIndex) => {
        if (cellIndex !== 0) {
          cell.textContent = savedSchedule[rowIndex][cellIndex - 1];
        }
      });
    });
  }

  // ----------------------- هشدار تمرکز -----------------------
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
        progressCircle: document.querySelector('.progress-ring__circle')
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
      this.ui.time.textContent = `${mins}:${secs}`.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
      this.updateProgress((this.currentTime / this.totalTime) * 100);
    }
    updateProgress(percent) {
      if (isNaN(percent)) percent = 0;
      const circumference = 565.48;
      const offset = circumference - (percent / 100 * circumference);
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
        break: parseInt(this.ui.breakInput.value) || 5
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

