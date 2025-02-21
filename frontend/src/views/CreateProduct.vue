<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 class="text-3xl font-bold text-center mb-6">Adicionar Produto</h2>
            <form @submit.prevent="handleCreate" class="space-y-4">
                <div>
                    <label for="nome" class="block text-gray-700">Nome do Produto</label>
                    <input id="nome" v-model="nome" type="text" placeholder="Nome do produto"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label for="preco" class="block text-gray-700">Preço</label>
                    <input id="preco" v-model="preco" type="number" step="0.01" placeholder="Preço do produto"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label for="descricao" class="block text-gray-700">Descrição</label>
                    <textarea id="descricao" v-model="descricao" placeholder="Descrição do produto"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>
                <button type="submit"
                    class="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
                    Adicionar Produto
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const nome = ref("");
const preco = ref("");
const descricao = ref("");

const handleCreate = async () => {
    try {
        await axios.post("http://localhost:5000/api/produtos", {
            nome: nome.value,
            preco: preco.value,
            descricao: descricao.value,
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        alert("Produto adicionado com sucesso!");
        window.location.href = "/";
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto.");
    }
};
</script>