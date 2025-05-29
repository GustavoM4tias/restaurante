<!-- src/views/RestauranteDetalhes.vue -->
<template>
    <div class="bg-gray-100 min-h-screen">
        <TopReturnAbsolute />
        <TopShareAbsolute />
        <div class="img h-[40vh] w-full relative group">
            <img v-if="photos" :src="photos[0]" alt="Foto do estabelecimento"
                class="w-full h-full object-cover rounded absolute" />

            <div class="gradient bg-gradient-to-t to-black/90 via-transparent from-transparent
                transition-all duration-300 absolute w-full h-full"></div>
            <div class="gradient bg-gradient-to-b to-black/70 via-transparent from-transparent
                transition-all duration-300 absolute w-full h-full"></div>


            <div class="text px-4 pb-3 w-full absolute z-10 bottom-0 text-white filter drop-shadow">
                <div class="flex gap-2 w-full truncate">
                    <h2 class="text-xl font-medium truncate">{{ details.name }}</h2>
                    <p class="text-sm my-auto">
                        <span v-if="details.open_now === true"
                            class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-600">
                            Aberto
                        </span>
                        <span v-else class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-500">
                            Fechado
                        </span>
                    </p>

                </div>

                <p class="text-sm text-gray-300 truncate">{{ details.address }}</p>

                <div class="flex text-xl drop-shadow-md">
                    <i class="fas fa-star mt-0.5 text-amber-400 hover:text-amber-500"></i>
                    <p class="text-gray-100 font-medium ps-1 me-3">{{ details.rating ?? '—' }}</p>
                    <span class="text-sm my-auto">{{ details.reviews?.length }} Avaliações</span>
                </div>
                <p class="text-sm mb-1 truncate">{{ details.vicinity }}</p>
            </div>
        </div>


        <div class="flex gap-4 p-4">

            <div class="bg-white w-full p-4 rounded-xl shadow-sm">
                <div class="space-y-2 text-sm">
                    <p v-if="details.phone">
                        <strong>Telefone:</strong>
                        <a :href="`tel:${details.phone}`" class="text-blue-600 hover:underline">
                            {{ details.phone }}
                        </a>
                    </p>
                    <p>
                        <strong>⭐ Avaliação:</strong> {{ details.rating ?? '—' }}
                        <span v-if="details.reviews">({{ details.reviews.length }})</span>
                    </p>
                    <p v-if="details.price_level !== undefined">
                        <strong>💰 Faixa de preço:</strong> {{ '₫'.repeat(details.price_level) }}
                    </p>
                    <p v-if="details.website">
                        <strong>🔗 Site:</strong>
                        <a :href="details.website" target="_blank" class="text-blue-600 hover:underline">
                            Visitar
                        </a>
                    </p>
                    <p v-if="details.location">
                        <strong>🗺️ Mapa:</strong>
                        <a :href="googleMapsUrl" target="_blank" class="text-blue-600 hover:underline">
                            Abrir no Maps
                        </a>
                    </p>

                    <!-- Iframe do Maps usando place_id -->
                    <iframe class="w-full h-48 rounded border" :src="iframeUrl" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>
            </div>

        </div>

    </div>
    <div>
        <!-- Loading / Erro -->
        <div v-if="loadingDetails" class="text-center py-10">Carregando detalhes...</div>

        <!-- Conteúdo -->
        <div v-else>
            <!-- Todas as fotos do estabelecimento -->
            <div v-if="photos.length" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <img v-for="(url, i) in photos" :key="i" :src="url" alt="Foto do estabelecimento"
                    class="w-full h-48 object-cover rounded" />
            </div>
            <!-- Informações gerais -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            </div>

            <!-- Horários traduzidos -->
            <div v-if="horariosTraduzidos.length" class="space-y-1 text-sm">
                <h2 class="text-xl font-semibold">Horários</h2>
                <ul class="list-disc pl-5">
                    <li v-for="(dia, i) in horariosTraduzidos" :key="i">{{ dia }}</li>
                </ul>
            </div>

            <!-- Avaliações ordenadas -->
            <div v-if="sortedReviews.length" class="space-y-4 text-sm">
                <h2 class="text-xl font-semibold">Avaliações</h2>
                <div v-for="rev in sortedReviews.slice(0, 5)" :key="rev.time" class="border rounded p-4">
                    <div class="flex items-center mb-2">
                        <img :src="rev.profile_photo_url" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
                        <div>
                            <p class="font-medium">{{ rev.author_name }}</p>
                            <p class="text-xs text-gray-500">{{ rev.relative_time_description }}</p>
                        </div>
                    </div>
                    <p class="mb-1">⭐ {{ rev.rating }}</p>
                    <p class="mb-2">{{ rev.text }}</p>
                    <a v-if="rev.author_url" :href="rev.author_url" target="_blank"
                        class="text-blue-600 hover:underline text-xs">
                        Ver no Google
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurantsStore } from '@/stores/restaurants'
import TopReturnAbsolute from '@/components/ui/TopReturnAbsolute.vue'
import TopShareAbsolute from '@/components/ui/TopShareAbsolute.vue'

const store = useRestaurantsStore()
const route = useRoute()

onMounted(() => {
    store.fetchDetails(route.params.id)
})

const loadingDetails = computed(() => store.loadingDetails)
const details = computed(() => store.details || {})

console.log(details)

// **Todas** as fotos
const photos = computed(() => details.value.photos || [])

// Aberto agora?
const isOpen = computed(() => details.value.opening_hours?.open_now)

// Ordena reviews do mais novo para o mais antigo
const sortedReviews = computed(() => {
    return (details.value.reviews || []).slice().sort((a, b) => b.time - a.time)
})

// Traduz linhas de horário
const mapaDias = {
    Monday: 'Segunda-feira',
    Tuesday: 'Terça-feira',
    Wednesday: 'Quarta-feira',
    Thursday: 'Quinta-feira',
    Friday: 'Sexta-feira',
    Saturday: 'Sábado',
    Sunday: 'Domingo'
}
const horariosTraduzidos = computed(() => {
    return (details.value.opening_hours?.weekday_text || []).map(line => {
        const [dia, resto] = line.split(': ')
        return `${mapaDias[dia] || dia}: ${resto}`
    })
})

// Link direto para o Maps
const googleMapsUrl = computed(() => {
    const loc = details.value.location
    return loc
        ? `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`
        : '#'
})

const iframeUrl = computed(() => {
    const loc = details.value.location
    return loc
        ? `https://maps.google.com/maps?q=${loc.lat},${loc.lng}&hl=pt&z=16&output=embed`
        : '#'
})
</script>