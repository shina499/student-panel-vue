<template>
  <div>
    <section class="flex flex-col lg:flex-row md:flex-col justify-center gap-6 items-center h-auto">
      <!-- کارت تقویم امتحانی -->
      <div class="bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center w-full md:w-[500px]">
        <div class="w-full md:w-[500px] h-auto bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          <!-- هدر -->
          <div class="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
            <h1 class="text-xl sm:text-2xl font-bold">📅 تقویم امتحانی</h1>
            <p class="text-sm opacity-80 mt-1">{{ todayStr }}</p>
          </div>
          <!-- محتوا -->
          <div class="flex-1 p-4 overflow-y-auto">
            <!-- کارت امتحانات امروز -->
            <div class="bg-purple-50 p-4 rounded-xl mb-4">
              <h2 class="text-lg font-bold text-purple-600 mb-2">امتحانات امروز</h2>
              <div class="space-y-2">
                <div
                  v-for="exam in todayExams"
                  :key="exam.id"
                  class="bg-white p-3 rounded-xl shadow-sm flex items-center justify-between animate__animated animate__fadeIn"
                >
                  <div>
                    <h3 class="font-bold">{{ exam.title }}</h3>
                    <p class="text-sm text-gray-500">
                      {{ new Date(exam.date).toLocaleDateString('fa-IR') }}
                    </p>
                  </div>
                  <button
                    @click="deleteExam(exam.id)"
                    class="text-red-500 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p v-if="!todayExams.length" class="text-gray-500 text-sm">
                  امتحانی برای امروز ندارید!
                </p>
              </div>
            </div>
            <!-- لیست امتحانات آینده -->
            <div>
              <h2 class="text-lg font-bold text-blue-600 mb-2">امتحانات آینده</h2>
              <div class="max-h-64 overflow-y-auto space-y-2">
                <div
                  v-for="exam in upcomingExams"
                  :key="exam.id"
                  class="bg-white p-3 rounded-xl shadow-sm flex items-center justify-between animate__animated animate__fadeIn"
                >
                  <div>
                    <h3 class="font-bold">{{ exam.title }}</h3>
                    <p class="text-sm text-gray-500">
                      {{ new Date(exam.date).toLocaleDateString('fa-IR') }}
                    </p>
                  </div>
                  <button
                    @click="deleteExam(exam.id)"
                    class="text-red-500 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p v-if="!upcomingExams.length" class="text-gray-500 text-sm">
                  امتحانی در آینده نزدیک ندارید!
                </p>
              </div>
            </div>
          </div>
          <!-- فرم افزودن -->
          <div class="border-t p-4 bg-gray-50">
            <div class="flex flex-col sm:flex-row gap-4">
              <input
                v-model="examTitle"
                type="text"
                placeholder="📝 عنوان امتحان"
                class="w-full p-2 border-2 border-purple-100 rounded-xl focus:border-purple-400 transition-all"
              />
              <input
                v-model="examDate"
                type="date"
                class="w-full p-2 border-2 border-purple-100 rounded-xl focus:border-purple-400 transition-all"
              />
              <button
                @click="addExam"
                class="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all shadow-md"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- کارت نمرات -->
      <div
        class="card bg-white p-6 rounded-lg shadow-lg w-full md:w-[600px] h-[600px] sm:h-[1000px] mb-10 overflow-y-auto"
      >
        <h1 class="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
          پنل نمرات دانش‌آموزی
        </h1>
        <!-- فیلد نام درس -->
        <div class="mb-4">
          <label for="studentName" class="block text-gray-700">نام درس:</label>
          <input
            v-model="gradeStudentName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <!-- فیلد تاریخ -->
        <div class="mb-4">
          <label for="date" class="block text-gray-700">تاریخ:</label>
          <input
            v-model="gradeDate"
            type="date"
            class="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <!-- فیلد نمرات -->
        <div class="mb-4">
          <label for="grades" class="block text-gray-700"
            >نمرات (با کاما جدا کنید):</label
          >
          <input
            v-model="gradeInput"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="مثال: ۱۸, ۱۹, ۲۰"
          />
        </div>
        <!-- دکمه ذخیره -->
        <button
          @click="saveGradesHandler"
          class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          ذخیره نمرات
        </button>
        <!-- نمایش نتیجه -->
        <div class="mt-6 text-center overflow-y-auto text-gray-700">
          <div v-if="gradesData.length" class="grid grid-cols-1 gap-8">
            <div
              v-for="entry in gradesData"
              :key="entry.id"
              class="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 group"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 p-8">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {{ entry.studentName.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">{{ entry.studentName }}</h3>
                    <p class="text-sm text-gray-500 group-hover:text-purple-100 transition-colors duration-500">{{ entry.date }}</p>
                  </div>
                  <button
                    @click="deleteGrade(entry.id)"
                    class="ml-auto text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </div>
                <ul class="space-y-4">
                  <li class="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-xl">
                    <div class="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 group-hover:text-purple-100 transition-colors duration-500">تاریخ ثبت</p>
                      <p class="font-medium text-gray-900 group-hover:text-white transition-colors duration-500">{{ entry.date }}</p>
                    </div>
                  </li>
                  <li class="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-xl">
                    <div class="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 group-hover:text-purple-100 transition-colors duration-500">نمرات</p>
                      <p class="font-medium text-gray-900 group-hover:text-white transition-colors duration-500">{{ entry.grades.join(', ') }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-20">
            <div class="inline-block bg-gradient-to-br from-purple-500 to-blue-500 p-10 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
              <svg class="w-24 h-24 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
              <h3 class="mt-6 text-2xl font-bold text-white">هنوز نمره‌ای ثبت نشده است</h3>
              <p class="mt-2 text-purple-100">برای شروع، نمره جدیدی اضافه کنید。</p>
              <button
                @click="openAddGradeModal"
                class="mt-8 bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 hover:shadow-lg transition-all"
              >
                افزودن نمره
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="w-full lg:w-[900px] md:w-[600px] h-auto mx-auto my-10 bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col md:flex-row"
    >
      <!-- سایدبار -->
      <div
        class="w-full md:w-64 bg-gradient-to-b from-purple-600 to-blue-500 p-6 flex flex-col items-center"
      >
        <div class="text-white text-center mb-8">
          <h2 class="text-xl sm:text-2xl font-bold mb-2">🏆 امتیاز کل</h2>
          <div class="text-3xl sm:text-4xl font-black">{{ state.totalScore }}</div>
        </div>
        <div class="bg-white/20 p-4 rounded-xl w-full">
          <h3 class="text-white font-bold mb-2">پیشرفت امروز</h3>
          <div class="bg-gray-200 h-2 rounded-full mb-2">
            <div
              class="bg-yellow-400 h-2 rounded-full"
              :style="{ width: `${(state.dailyProgress / 4) * 100}%` }"
            ></div>
          </div>
          <p class="text-white text-sm">{{ state.dailyProgress }}/4 سوال</p>
        </div>
      </div>
      <!-- محتوا -->
      <div class="flex-1 p-8 overflow-y-auto">
        <h1 class="text-2xl sm:text-3xl font-bold text-purple-600 mb-6">
          چالش امروز 🗓️ <span class="text-lg sm:text-2xl">{{ todayStr }}</span>
        </h1>
        <!-- سوالات علوم -->
        <div class="mb-8 animate__animated animate__fadeInLeft">
          <div class="bg-red-100 rounded-xl p-6 mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-red-600 mb-4">🔬 علوم</h2>
            <div class="space-y-4">
              <div
                v-for="(q, index) in state.todayQuestions.science"
                :key="`science-${index}`"
                class="bg-white p-4 rounded-lg shadow-sm"
              >
                <p class="font-bold mb-2">سوال {{ index + 1 }}: {{ q.question }}</p>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="option in q.options"
                    :key="option"
                    @click="handleAnswer('science', index, option)"
                    :disabled="answeredQuestions.science[index]"
                    :class="[
                      'p-2 rounded transition-all',
                      answeredQuestions.science[index]
                        ? option === q.answer
                          ? 'bg-green-200'
                          : selectedAnswers.science[index] === option
                          ? 'bg-red-200 animate__animated animate__shakeX'
                          : 'bg-gray-50'
                        : 'bg-gray-50 hover:bg-purple-100'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- سوالات ریاضی -->
        <div class="animate__animated animate__fadeInRight">
          <div class="bg-blue-100 rounded-xl p-6">
            <h2 class="text-xl sm:text-2xl font-bold text-blue-600 mb-4">🧮 ریاضی</h2>
            <div class="space-y-4">
              <div
                v-for="(q, index) in state.todayQuestions.math"
                :key="`math-${index}`"
                class="bg-white p-4 rounded-lg shadow-sm"
              >
                <p class="font-bold mb-2">سوال {{ index + 1 }}: {{ q.question }}</p>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="option in q.options"
                    :key="option"
                    @click="handleAnswer('math', index, option)"
                    :disabled="answeredQuestions.math[index]"
                    :class="[
                      'p-2 rounded transition-all',
                      answeredQuestions.math[index]
                        ? option === q.answer
                          ? 'bg-green-200'
                          : selectedAnswers.math[index] === option
                          ? 'bg-red-200 animate__animated animate__shakeX'
                          : 'bg-gray-50'
                        : 'bg-gray-50 hover:bg-purple-100'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import pb from '@/pb';

// -------------------- بخش تقویم امتحانی --------------------
const exams = ref([]);
const examTitle = ref('');
const examDate = ref('');
const todayStr = new Date().toLocaleDateString('fa-IR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const todayExams = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0);
  return exams.value.filter(exam => new Date(exam.date).setHours(0, 0, 0, 0) === today);
});

const upcomingExams = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0);
  return exams.value.filter(exam => new Date(exam.date).setHours(0, 0, 0, 0) > today);
});

const loadExams = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای بارگذاری امتحانات:', userId);

    const record = await pb.collection('exam_calender').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    console.log('رکورد امتحانات بارگذاری‌شده:', record);

    exams.value = record.content || [];
    console.log('داده‌های امتحانات بارگذاری‌شده:', exams.value);
  } catch (error) {
    if (error.status === 404) {
      exams.value = [];
      console.log('هیچ رکوردی برای امتحانات یافت نشد');
    } else {
      console.error('خطا در بارگذاری امتحانات:', error, error.data, error.status);
      alert('خطا در بارگذاری امتحانات: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
    }
  }
};

const saveExams = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای ذخیره امتحانات:', userId);

    let record;
    try {
      record = await pb.collection('exam_calender').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
      console.log('رکورد موجود امتحانات:', record);
    } catch (error) {
      if (error.status !== 404) throw error;
      console.log('رکورد جدیدی برای امتحانات ایجاد خواهد شد');
    }

    const data = {
      userId: userId,
      content: exams.value,
    };
    console.log('داده ارسالی امتحانات به PocketBase:', data);

    if (record) {
      const updatedRecord = await pb.collection('exam_calender').update(record.id, data);
      console.log('رکورد امتحانات به‌روزرسانی شد:', updatedRecord);
    } else {
      const newRecord = await pb.collection('exam_calender').create(data);
      console.log('رکورد جدید امتحانات ایجاد شد:', newRecord);
    }
  } catch (error) {
    console.error('خطا در ذخیره امتحانات:', error, error.data, error.status);
    alert('خطا در ذخیره امتحانات: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
  }
};

const addExam = () => {
  if (!examTitle.value || !examDate.value) {
    alert('لطفاً عنوان و تاریخ را وارد کنید!');
    return;
  }

  const exam = {
    id: Date.now().toString(),
    title: examTitle.value,
    date: examDate.value,
  };

  exams.value.push(exam);
  examTitle.value = '';
  examDate.value = '';
  saveExams();
};

const deleteExam = (id) => {
  exams.value = exams.value.filter(e => e.id.toString() !== id.toString());
  saveExams();
};

// -------------------- بخش نمرات --------------------
const gradesData = ref([]);
const gradeStudentName = ref('');
const gradeDate = ref('');
const gradeInput = ref('');

const loadGrades = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای بارگذاری نمرات:', userId);

    const record = await pb.collection('grades').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    console.log('رکورد نمرات بارگذاری‌شده:', record);

    gradesData.value = record.content || [];
    console.log('داده‌های نمرات بارگذاری‌شده:', gradesData.value);
  } catch (error) {
    if (error.status === 404) {
      gradesData.value = [];
      console.log('هیچ رکوردی برای نمرات یافت نشد');
    } else {
      console.error('خطا در بارگذاری نمرات:', error, error.data, error.status);
      alert('خطا در بارگذاری نمرات: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
    }
  }
};

const saveGrades = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای ذخیره نمرات:', userId);

    let record;
    try {
      record = await pb.collection('grades').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
      console.log('رکورد موجود نمرات:', record);
    } catch (error) {
      if (error.status !== 404) throw error;
      console.log('رکورد جدیدی برای نمرات ایجاد خواهد شد');
    }

    const data = {
      userId: userId,
      content: gradesData.value,
    };
    console.log('داده ارسالی نمرات به PocketBase:', data);

    if (record) {
      const updatedRecord = await pb.collection('grades').update(record.id, data);
      console.log('رکورد نمرات به‌روزرسانی شد:', updatedRecord);
    } else {
      const newRecord = await pb.collection('grades').create(data);
      console.log('رکورد جدید نمرات ایجاد شد:', newRecord);
    }
  } catch (error) {
    console.error('خطا در ذخیره نمرات:', error, error.data, error.status);
    alert('خطا در ذخیره نمرات: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
  }
};

const saveGradesHandler = () => {
  if (!gradeStudentName.value || !gradeDate.value || !gradeInput.value) {
    alert('لطفاً همه فیلدها را پر کنید!');
    return;
  }

  const gradesArray = gradeInput.value.split(',').map(grade => grade.trim());

  const newGrade = {
    id: Date.now().toString(),
    studentName: gradeStudentName.value,
    date: gradeDate.value,
    grades: gradesArray,
  };

  gradesData.value.push(newGrade);
  saveGrades();

  gradeStudentName.value = '';
  gradeDate.value = '';
  gradeInput.value = '';
};

const deleteGrade = (id) => {
  gradesData.value = gradesData.value.filter(entry => entry.id.toString() !== id.toString());
  saveGrades();
};

const openAddGradeModal = () => {
  // در صورت نیاز می‌توانید این تابع را تکمیل کنید
};

// -------------------- بخش چالش روزانه --------------------
const state = ref({
  totalScore: parseInt(localStorage.getItem('totalScore')) || 0,
  lastPlayedDate: localStorage.getItem('lastPlayedDate') || '',
  dailyProgress: 0,
  todayQuestions: { science: [], math: [] },
});

// برای ردیابی وضعیت پاسخ‌داده‌شده هر سوال
const answeredQuestions = ref({
  science: [],
  math: [],
});

// برای ذخیره پاسخ انتخاب‌شده برای هر سوال
const selectedAnswers = ref({
  science: [],
  math: [],
});

const questionBank = {
  science: [
    {
      question: 'کدام سیاره نزدیک‌ترین به خورشید است؟',
      options: ['زهره', 'مریخ', 'عطارد', 'زحل'],
      answer: 'عطارد',
    },
    {
      question: 'کدام عنصر بیشترین درصد هوا را تشکیل می‌دهد؟',
      options: ['اکسیژن', 'نیتروژن', 'کربن دی‌اکسید', 'هیدروژن'],
      answer: 'نیتروژن',
    },
    {
      question: 'کدام حیوان بزرگ‌ترین مغز را دارد؟',
      options: ['فیل', 'نهنگ آبی', 'شامپانزه', 'دلفین'],
      answer: 'نهنگ آبی',
    },
  ],
  math: [
    {
      question: 'حاصل ۵ × (۳ + ۲) چیست؟',
      options: ['۱۵', '۲۰', '۲۵', '۳۰'],
      answer: '۲۵',
    },
    {
      question: 'مقدار x در معادله ۲x + ۵ = ۱۵ چیست؟',
      options: ['۵', '۱۰', '۷.۵', '۲'],
      answer: '۵',
    },
    {
      question: 'مساحت دایره با شعاع ۷ چقدر است؟ (π=۳)',
      options: ['۱۴۷', '۱۵۴', '۱۶۹', '۱۸۹'],
      answer: '۱۴۷',
    },
  ],
};

const initializeQuiz = () => {
  console.log('راه‌اندازی کوییز...');
  checkDailyReset();
  generateDailyQuestions();
};

const checkDailyReset = () => {
  const today = new Date().toLocaleDateString('fa-IR');
  console.log('بررسی ریست روزانه:', { today, lastPlayed: state.value.lastPlayedDate });
  if (state.value.lastPlayedDate !== today) {
    resetDailyProgress();
  }
};

const resetDailyProgress = () => {
  console.log('ریست پیشرفت روزانه');
  state.value.dailyProgress = 0;
  state.value.lastPlayedDate = new Date().toLocaleDateString('fa-IR');
  localStorage.setItem('lastPlayedDate', state.value.lastPlayedDate);
  answeredQuestions.value = { science: [], math: [] };
  selectedAnswers.value = { science: [], math: [] };
  generateDailyQuestions();
};

const generateDailyQuestions = () => {
  console.log('تولید سوالات روزانه');
  const getRandomQuestions = (pool, count) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  state.value.todayQuestions.science = getRandomQuestions(
    questionBank.science,
    Math.min(2, questionBank.science.length)
  );
  state.value.todayQuestions.math = getRandomQuestions(
    questionBank.math,
    Math.min(2, questionBank.math.length)
  );
  // مقداردهی اولیه آرایه‌های پاسخ
  answeredQuestions.value.science = new Array(state.value.todayQuestions.science.length).fill(false);
  answeredQuestions.value.math = new Array(state.value.todayQuestions.math.length).fill(false);
  selectedAnswers.value.science = new Array(state.value.todayQuestions.science.length).fill(null);
  selectedAnswers.value.math = new Array(state.value.todayQuestions.math.length).fill(null);
  console.log('سوالات تولید‌شده:', state.value.todayQuestions);
};

const handleAnswer = (subject, index, selected) => {
  if (answeredQuestions.value[subject][index]) return; // جلوگیری از پاسخ چندباره

  console.log('پاسخ انتخاب‌شده:', { subject, index, selected });
  const question = state.value.todayQuestions[subject][index];

  // ثبت پاسخ
  answeredQuestions.value[subject][index] = true;
  selectedAnswers.value[subject][index] = selected;

  if (selected === question.answer) {
    updateScore();
  }
};

const updateScore = () => {
  state.value.totalScore += 10;
  state.value.dailyProgress++;
  localStorage.setItem('totalScore', state.value.totalScore.toString());
  console.log('امتیاز به‌روزرسانی شد:', {
    totalScore: state.value.totalScore,
    dailyProgress: state.value.dailyProgress,
  });
};

// -------------------- راه‌اندازی اولیه --------------------
onMounted(async () => {
  console.log('وضعیت احراز هویت:', pb.authStore.isValid, pb.authStore.model);
  await loadExams();
  await loadGrades();
  initializeQuiz();
});
</script>

<style scoped>
.bdr {
  border-radius: 20px;
}
.card {
  border: 1px solid #e2e8f0;
}
@media (max-width: 640px) {
  .card {
    margin-top: 1rem;
  }
  .bg-gradient-to-br {
    background-size: cover;
  }
}
</style>