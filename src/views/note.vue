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
      <div id="notesContainer" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  import { ref, onMounted } from 'vue'
  
  // متن ورودی یادداشت
  const noteText = ref('')
  // آرایه یادداشت‌ها
  const notes = ref([])
  
  // بارگذاری یادداشت‌های ذخیره شده از localStorage هنگام mount شدن کامپوننت
  onMounted(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
    // افزودن پراپرتی editing به هر یادداشت (برای حالت ویرایش)
    notes.value = savedNotes.map(note => ({ ...note, editing: false }))
  })
  
  // ذخیره آرایه یادداشت‌ها در localStorage (بدون پراپرتی editing)
  function saveNotes() {
    const notesToSave = notes.value.map(({ editing, ...rest }) => rest)
    localStorage.setItem('notes', JSON.stringify(notesToSave))
  }
  
  // افزودن یادداشت جدید
  function addNote() {
    const text = noteText.value.trim()
    if (text) {
      const newNote = {
        id: Date.now(),
        text,
        editing: false
      }
      notes.value.push(newNote)
      saveNotes()
      noteText.value = ''
    }
  }
  
  // حذف یادداشت
  function deleteNote(id) {
    notes.value = notes.value.filter(note => note.id !== id)
    saveNotes()
  }
  
  // تغییر حالت ویرایش/ذخیره برای یک یادداشت
  function toggleEdit(note) {
    note.editing = !note.editing
    if (!note.editing) {
      // هنگام ذخیره ویرایش، localStorage به‌روزرسانی می‌شود
      saveNotes()
    }
  }
  </script>
  