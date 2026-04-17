<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
   <img src="/images/logo.svg" alt="" class="h-6 object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
</template>
