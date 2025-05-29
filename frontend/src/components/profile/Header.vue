<template>
    <header class="flex h-28">
        <div class="flex my-auto px-2">
            <Avatar class="m-2" :picture="props.user.picture" :name="props.user.name" />
            <div class="my-auto ps-2">
                <h3 class="text-2xl font-semibold text-gray-700 truncate">
                    {{ (props.user.name || '').split(/\s+/).filter(Boolean).slice(0, 2).join(' ') }}</h3>
                <p class="text-gray-500 text-sm truncate -mt-1">{{ props.user.email }}</p>
            </div>
        </div>
    </header>
</template>

<script setup>
import Avatar from '@/components/profile/Avatar.vue'
const props = defineProps({
    user: {
        type: Object,
        default: () => ({})
    }
});
</script>