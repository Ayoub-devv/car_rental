import { onMounted, ref, watch } from 'vue';

type Appearance = 'light' | 'dark' | 'system';

export function updateTheme(value: Appearance) {
    if (typeof window === 'undefined') return;

    const doc = document.documentElement;
    doc.classList.remove('light', 'dark');

    let resolvedAppearance = value;

    if (value === 'system') {
        resolvedAppearance = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    doc.classList.add(resolvedAppearance);
}

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const appearance = ref<Appearance>('light');

export function initializeTheme() {
    if (typeof window === 'undefined') return;

    const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
    appearance.value = savedAppearance || 'system';
    updateTheme(appearance.value);
}

export function useAppearance() {
    onMounted(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        if (savedAppearance) {
            appearance.value = savedAppearance;
        } else {
            appearance.value = 'system';
        }
        updateTheme(appearance.value);
    });

    watch(appearance, (newValue) => {
        updateTheme(newValue);
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;
        localStorage.setItem('appearance', value);
        setCookie('appearance', value);
        updateTheme(value);
    }

    return {
        appearance,
        updateAppearance,
    };
}
