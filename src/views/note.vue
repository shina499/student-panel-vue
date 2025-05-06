<template>
  <section class="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen p-6">
    <div class="container mx-auto max-w-3xl">
      <!-- عنوان -->
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeInDown">
        یادداشت‌های من ✏️
      </h1>

      <!-- فرم افزودن یادداشت -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-6 animate__animated animate__fadeInUp">
        <input
          v-model="noteText"
          type="text"
          placeholder="یادداشت جدید بنویسید..."
          class="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          @click="addNote"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          ➕ افزودن یادداشت
        </button>
      </div>

      <!-- بخش نمایش یادداشت‌ها -->
      <div id="notesContainer" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="note in notes"
          :key="note.id"
          class="note bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeIn"
          :data-id="note.id"
        >
          <div class="note-content">
            <p
              class="text-gray-800 editable-text outline-none"
              :contenteditable="note.editing ? 'true' : 'false'"
              @input="note.text = $event.target.textContent"
            >
              {{ note.text }}
            </p>
            <div class="mt-4 flex gap-2 justify-between">
              <button
                @click="toggleEdit(note)"
                class="edit-btn px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                {{ note.editing ? '💾 ذخیره' : '✏️ ویرایش' }}
              </button>
              <button
                @click="deleteNote(note.id)"
                class="delete-btn px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pb from '@/pb';

// متن ورودی یادداشت
const noteText = ref('');
// آرایه یادداشت‌ها
const notes = ref([]);

// بارگذاری یادداشت‌ها از PocketBase
const loadNotes = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای بارگذاری یادداشت‌ها:', userId);

    const record = await pb.collection('notes').getFirstListItem(`userId="${userId}"`, {
      requestKey: null,
    });
    console.log('رکورد یادداشت‌ها بارگذاری‌شده:', record);

    notes.value = (record.content || []).map(note => ({ ...note, editing: false }));
    console.log('داده‌های یادداشت‌ها بارگذاری‌شده:', notes.value);
  } catch (error) {
    if (error.status === 404) {
      notes.value = [];
      console.log('هیچ رکوردی برای یادداشت‌ها یافت نشد');
    } else {
      console.error('خطا در بارگذاری یادداشت‌ها:', error, error.data, error.status);
      alert('خطا در بارگذاری یادداشت‌ها: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
    }
  }
};

// ذخیره یادداشت‌ها در PocketBase
const saveNotes = async () => {
  try {
    const user = pb.authStore.model;
    if (!user) throw new Error('کاربر لاگین نکرده است');

    const userId = user.id;
    if (!userId) throw new Error('شناسه کاربر نامعتبر است');
    console.log('شناسه کاربر برای ذخیره یادداشت‌ها:', userId);

    let record;
    try {
      record = await pb.collection('notes').getFirstListItem(`userId="${userId}"`, {
        requestKey: null,
      });
      console.log('رکورد موجود یادداشت‌ها:', record);
    } catch (error) {
      if (error.status !== 404) throw error;
      console.log('رکورد جدیدی برای یادداشت‌ها ایجاد خواهد شد');
    }

    const notesToSave = notes.value.map(({ editing, ...rest }) => rest);
    const data = {
      userId: userId,
      content: notesToSave,
    };
    console.log('داده ارسالی یادداشت‌ها به PocketBase:', data);

    if (record) {
      const updatedRecord = await pb.collection('notes').update(record.id, data);
      console.log('رکورد یادداشت‌ها به‌روزرسانی شد:', updatedRecord);
    } else {
      const newRecord = await pb.collection('notes').create(data);
      console.log('رکورد جدید یادداشت‌ها ایجاد شد:', newRecord);
    }
  } catch (error) {
    console.error('خطا در ذخیره یادداشت‌ها:', error, error.data, error.status);
    alert('خطا در ذخیره یادداشت‌ها: ' + (error.message || 'لطفاً دوباره تلاش کنید.'));
  }
};

// افزودن یادداشت جدید
const addNote = () => {
  const text = noteText.value.trim();
  if (!text) {
    alert('لطفاً متن یادداشت را وارد کنید!');
    return;
  }
  const newNote = {
    id: Date.now(),
    text,
    editing: false,
  };
  notes.value.push(newNote);
  noteText.value = '';
  saveNotes();
};

// حذف یادداشت
const deleteNote = (id) => {
  notes.value = notes.value.filter(note => note.id !== id);
  saveNotes();
};

// تغییر حالت ویرایش/ذخیره برای یک یادداشت
const toggleEdit = (note) => {
  note.editing = !note.editing;
  if (!note.editing) {
    saveNotes();
  }
};

// بارگذاری اولیه یادداشت‌ها
onMounted(async () => {
  console.log('وضعیت احراز هویت:', pb.authStore.isValid, pb.authStore.model);
  await loadNotes();
});
</script>