<script setup>
import { ref } from 'vue'

const data = ref([
    {
        brand: 'chanel',
        total_amount: '10700',
        discount: '98.5',
        press_money: '',
        date: new Date()
    }
])
</script>

<table>
    <thead>
        <tr>
            <th>品牌</th>
            <th>总金额</th>
            <th>折扣</th>
            <th>压钱</th>
            <th>日期</th>
        </tr>
    <thead>
    <tbody>
        <tr v-for="item in data">
            <td>{{item.brand}}</td>
            <td>{{item.total_amount}}</td>
            <td>{{item.discount}}</td>
            <td>{{item.press_money}}</td>
            <td>{{item.date}}</td>
        </tr>
    </tbody>
</table>

<button @click="count++">计算</button>

</style>

