<template>
    <div class="list-projects">
        <div
            v-for="item in lists"
            class="list-projects-item"
            :key="item.title"
        >
            <p>{{item.title}}</p>
            <p>{{item.describe}}</p>
            <div>
                <span>文档</span>
                <span v-if="item.address">地址</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const lists = ref([
    {
        title: 'j-check-word',
        describe: 'A tool for checking English words',
        path: 'j-check-word',
        address: true
    },
    {
        title: 'j-http-code',
        describe: 'Tool to set and get the meaning of http status codes',
        path: 'j-http-code',
        address: true
    },
    {
        title: 'j-is',
        describe: 'type checking library',
        path: 'j-is',
        address: false
    }
])
</script>

