<script setup>
import { ref } from 'vue'

const data = ref([
    {
        member: '0376',
        brand: 'chanel',
        total_amount: '10700',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-21',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'DIOR',
        total_amount: '20640',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'NARS',
        total_amount: '1630',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'YSL',
        total_amount: '400',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'DR',
        total_amount: '4025',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-24',
        source: '销售',
    },
    {
        member: '4991',
        brand: 'DR',
        total_amount: '24490',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        is_carry: '',
        date: '2025-7-24',
        source: '销售',
    }
])

const handleCalcul = () => {
    for (let item of data.value) {
        let price = (Number(item.total_amount) * Number(item.discount) / 100).toString();
        const price_arr = price.split('.');
        // 有小数点
        if (price_arr.length > 1) {
            const decimal = price_arr[1]
            // 小数点有几位
            if (decimal.length > 1) {
                price = Math.ceil(Number(price));
                item.is_carry = '1'
            } else {
                item.is_carry = '2'
            }
        } else {
            item.is_carry = '2'
        }
        item.income = Number(item.total_amount) * (item.real_discount - item.discount) / 100;
        if (item.is_carry === '1') {
            item.press_money =  Number(item.total_amount) - Number(price) + 1 ;
        } else {
            item.press_money =  Number(item.total_amount) - Number(price);
        }
    }
}

</script>

<table>
    <thead>
        <tr>
            <th>序号</th>
            <th>会员</th>
            <th>品牌</th>
            <th>总金额</th>
            <th>折扣</th>
            <th>给客户折扣</th>
            <th>压钱</th>
            <th>个人收入</th>
            <th>向上取整</th>
            <th>日期</th>
            <th>单子来源</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in data">
            <td>{{index+1}}</td>
            <td>{{item.member}}</td>
            <td>{{item.brand}}</td>
            <td>{{item.total_amount}}</td>
            <td>{{item.discount}}</td>
            <td>{{item.real_discount}}</td>
            <td>{{item.press_money}}</td>
            <td>{{item.income}}</td>
            <td>{{item.is_carry === '2' ? '否' : '是'}}</td>
            <td>{{item.date}}</td>
            <td>{{item.source}}</td>
        </tr>
    </tbody>
</table>

<button :class="$style.button" @click="handleCalcul">计算</button>

<div></div>

<table>
    <thead>
        <tr>
            <th>日期</th>
            <th>公司转账</th>
            <th>个人给公司或客户转账</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

<style module>
.table_button {
  color: #606266;
}
.button {
  font-weight: bold;
  border: 1px solid #dcdfe6;
  padding: 2px 15px;
  color: #606266;
}
</style>
