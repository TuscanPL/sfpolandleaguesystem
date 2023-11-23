<template>
    <fwb-sidebar-item>
        <template v-if="icon" #icon>
            <v-icon :name="icon" />
        </template>
        <template #default>
            <span class="font-medium">{{ label }}</span>
        </template>
    </fwb-sidebar-item>
</template>
<script setup lang="ts">
import { FwbSidebarItem } from 'flowbite-vue';

interface Props {
    label: string,
    icon?: string,
}

defineProps<Props>();
</script>