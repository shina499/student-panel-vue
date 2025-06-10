// Get language from localStorage or default to 'fa'
export const getCurrentLang = () => {
  return localStorage.getItem('language') || 'fa'
}

// Set language in localStorage and update document
export const setLanguage = (lang) => {
  localStorage.setItem('language', lang)
  document.documentElement.lang = lang
  updateTexts()
}

// Update all texts based on current language
export const updateTexts = () => {
  const currentLang = getCurrentLang()
  const elements = document.querySelectorAll('[data-fa][data-en]')
  elements.forEach(element => {
    const faText = element.getAttribute('data-fa')
    const enText = element.getAttribute('data-en')
    element.textContent = currentLang === 'fa' ? faText : enText
  })
}

// Toggle language between fa and en
export const toggleLanguage = () => {
  const currentLang = getCurrentLang()
  const newLang = currentLang === 'fa' ? 'en' : 'fa'
  setLanguage(newLang)
  return newLang
}

// Initialize language on app start
export const initializeLanguage = () => {
  const currentLang = getCurrentLang()
  document.documentElement.lang = currentLang
  updateTexts()
} 