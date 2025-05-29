<template>
    <div ref="buttonDiv"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(['google-login']);
const buttonDiv = ref(null);

// A sua Client ID do .env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

onMounted(() => {
    /* global google */
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
            // response.credential é o id_token
            emit('google-login', response.credential);
        }
    });

    google.accounts.id.renderButton(buttonDiv.value, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        logo_alignment: 'center',
        locale: 'pt-BR'
    });
});
</script>