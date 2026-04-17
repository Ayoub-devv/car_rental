<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { Globe } from 'lucide-vue-next';

const { locale } = useI18n();
const isOpen = ref(false);

const changeLanguage = (lang: string) => {
    locale.value = lang;
    localStorage.setItem('locale', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    isOpen.value = false;
};
</script>

<template>
    <div class="relative">
        <button @click="isOpen = !isOpen" class="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors">
            <Globe class="w-5 h-5" />
            <span class="text-sm font-medium uppercase">{{ locale }}</span>
        </button>
        
        <div v-if="isOpen" class="absolute right-0 mt-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
            <button @click="changeLanguage('en')" class="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors" :class="{ 'bg-red-600/10 text-red-500': locale === 'en' }">English</button>
            <button @click="changeLanguage('fr')" class="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors" :class="{ 'bg-red-600/10 text-red-500': locale === 'fr' }">Français</button>
            <button @click="changeLanguage('ar')" class="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors" :class="{ 'bg-red-600/10 text-red-500': locale === 'ar' }">العربية</button>
        </div>
    </div>
</template>
