<!-- src/components/UI/Input.vue -->
<template>
    <div class="input-field w-full mt-4">
        <label v-if="label" :for="id" class="block text-gray-800 dark:text-gray-200 font-medium mb-2">
            {{ label }}
        </label>
        <input :id="id" :type="type" :placeholder="placeholder" :value="modelValue" @input="updateValue"
            :required="required" :disabled="disabled"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200 ease-in-out bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    id: { type: String, default: "" },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    label: { type: String, default: "" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
};
</script>