// language.js
import { ref, watch } from 'vue'

// reactive language value
export const lang = ref(localStorage.getItem('language') || 'fa')

watch(lang, (newLang) => {
  localStorage.setItem('language', newLang)
  document.documentElement.lang = newLang
  updateTexts()
})

// Toggle between 'fa' and 'en'
export const toggleLanguage = () => {
  lang.value = lang.value === 'fa' ? 'en' : 'fa'
}

// Set language manually
export const setLanguage = (newLang) => {
  lang.value = newLang
}

// Get current language (reactive value)
export const getCurrentLang = () => lang.value

// Update DOM texts manually (for non-Vue elements)
export const updateTexts = () => {
  const currentLang = lang.value
  const elements = document.querySelectorAll('[data-fa][data-en]')
  elements.forEach(el => {
    el.textContent = currentLang === 'fa' ? el.getAttribute('data-fa') : el.getAttribute('data-en')
  })
}

// Optional: call this on app load
export const initializeLanguage = () => {
  document.documentElement.lang = lang.value
  updateTexts()
}
