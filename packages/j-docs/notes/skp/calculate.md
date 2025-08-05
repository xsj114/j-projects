<script setup>
import { ref, onMounted } from 'vue'

// 总流水
const total_flow = ref(0);
// 总收入
const total_income = ref(0);
// 公司压钱金额
const total_press_money = ref(0);
// 公司总转账金额
const total_account = ref(0);

const account_data = ref([
    {
        date: '2025-07-21',
        account: '160',
    },
    {
        date: '2025-07-24',
        account: '664',
    },
    {
        date: '2025-07-24',
        account: '5000',
    },
    {
        date: '2025-07-24',
        account: '5000',
    },
    {
        date: '2025-07-27',
        account: '5000',
    },
    {
        date: '2025-07-27',
        account: '5000',
    },
    {
        date: '2025-07-29',
        account: '20000',
    },
    {
        date: '2025-07-29',
        account: '10000',
    },
    {
        date: '2025-07-29',
        account: '10000',
    }
]);

const data = ref([
    {
        member: '0376',
        brand: 'chanel',
        total_amount: '10700',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
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
        date: '2025-7-24',
        source: '销售',
    },
    {
        member: '4991',
        brand: 'DR',
        total_amount: '29300',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        date: '2025-7-25',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'ANCE STUDIOS',
        total_amount: '3000',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-25',
        source: '客户',
    },
    {
        member: '0376',
        brand: '纪梵希',
        total_amount: '2530',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        date: '2025-7-26',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'celine',
        total_amount: '14500',
        discount: '91.5',
        real_discount: '92',
        press_money: '',
        income: '',
        date: '2025-7-27',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '750',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-27',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'SMFK',
        total_amount: '950',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-27',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '1080',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-27',
        source: '客户',
    },
    {
        member: '4991',
        brand: 'Lulu',
        total_amount: '580',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-28',
        source: '客户',
    },
    {
        member: '9303',
        brand: 'DR',
        total_amount: '96480',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        date: '2025-7-29',
        source: '销售',
    },
    {
        member: '9303',
        brand: 'DR',
        total_amount: '10500',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        date: '2025-7-29',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'Select Shoes',
        total_amount: '21440',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-29',
        source: '客户',
    },
    {
        member: '0376',
        brand: '麦昆',
        total_amount: '5800',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-30',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'celine',
        total_amount: '14500',
        discount: '91.5',
        real_discount: '92',
        press_money: '',
        income: '',
        date: '2025-7-30',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '980',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-7-31',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'DR',
        total_amount: '8850',
        discount: '83.5',
        real_discount: '83.5',
        press_money: '',
        income: '',
        date: '2025-7-31',
        source: '销售',
    },
    {
        member: '4991',
        brand: 'DR',
        total_amount: '16800',
        discount: '83',
        real_discount: '83',
        press_money: '',
        income: '',
        date: '2025-7-31',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '880',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-1',
        source: '客户',
    },
    {
        member: '0376',
        brand: '梵克雅宝',
        total_amount: '54500',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
        date: '2025-8-1',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'BV',
        total_amount: '32900',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-1',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'loro',
        total_amount: '18400',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
        date: '2025-8-1',
        source: '客户',
    },
    {
        member: '0376',
        brand: '植村秀',
        total_amount: '2345',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        date: '2025-8-1',
        source: '客户',
    },
    {
        member: '0376',
        brand: '梵克雅宝',
        total_amount: '23400',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '980',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'celine',
        total_amount: '10580',
        discount: '91.5',
        real_discount: '92',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'celine',
        total_amount: '920',
        discount: '91.5',
        real_discount: '92',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '2160',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: '梵克雅宝',
        total_amount: '13600',
        discount: '98.5',
        real_discount: '99',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: '娇韵诗',
        total_amount: '660',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'chanel',
        total_amount: '1040',
        discount: '75',
        real_discount: '76',
        press_money: '',
        income: '',
        date: '2025-8-2',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '880',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-3',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'Lulu',
        total_amount: '580',
        discount: '83.5',
        real_discount: '84',
        press_money: '',
        income: '',
        date: '2025-8-4',
        source: '客户',
    },
])

onMounted(()=>{
    // 计算个人收入
    handleCalcul();
    // 计算总流水
    handleInfo();
    // 计算公司转账金额
    handleAccount();
})

const handleAccount = () => {
    for (let val of account_data.value) {
        total_account.value += Number(val.account);
    }
}

// 算总流水，算总收入，算未结收入，算公司压钱
const handleInfo = () => {
    for (let val of data.value) {
        total_flow.value += Number(val.total_amount);
        total_income.value += Number(val.income);
        total_press_money.value += Number(val.total_amount) - parseInt(Number(val.total_amount) * Number(val.real_discount) /100);
    }
}

// 算收入，算压钱
const handleCalcul = () => {
    for (let item of data.value) {
        item.income = parseInt(Number(item.total_amount) * (item.real_discount - item.discount) / 100);
        item.press_money =  Number(item.total_amount) - parseInt(Number(item.total_amount) * Number(item.discount) / 100);
    }
}

</script>

<p>个人总流水为{{total_flow}}元，公司总转账金额为{{total_account}}元，公司压钱金额为{{total_press_money}}元,个人总收入为{{total_income}}元,剩余备用金{{total_account-total_press_money-total_income}}元</p>


<table>
    <thead>
        <tr>
            <th>日期</th>
            <th>公司转账</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in account_data">
            <td>
                {{item.date}}
            </td>
            <td>
                {{item.account}}
            </td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <th>序号</th>
            <th>会员</th>
            <th>品牌</th>
            <th>总金额</th>
            <th>折扣</th>
            <th>给客户折扣</th>
            <th>公司压钱</th>
            <th>个人收入</th>
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
            <td>{{item.date}}</td>
            <td>{{item.source}}</td>
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
