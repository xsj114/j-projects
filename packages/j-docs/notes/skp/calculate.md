<script setup>
import { ref, onMounted } from 'vue'

const total_flow = ref(0);
const total_income = ref(0);
const total_no_income = ref(0);
const total_press_money = ref(0);
const total_account = ref(0);
const imprest = ref(0);

const account_data = ref([
    {
        date: '2025-07-21',
        account: '160.5',
        status: '1',
    },
    {
        date: '2025-07-24',
        account: '664',
        status: '2',
    },
    {
        date: '2025-07-24',
        account: '5000',
        status: '2',
    },
    {
        date: '2025-07-24',
        account: '5000',
        status: '2',
    }
]);

const data = ref([
    {
        member: '0376',
        brand: 'chanel',
        total_amount: '10700',
        discount: '98.5',
        real_discount: '99',
        is_person_press: '2',
        press_money: '',
        income: '',
        is_carry: '',
        status: '1',
        date: '2025-7-21',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'DIOR',
        total_amount: '20640',
        discount: '75',
        real_discount: '76',
        is_person_press: '2',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'NARS',
        total_amount: '1630',
        discount: '75',
        real_discount: '76',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'YSL',
        total_amount: '400',
        discount: '75',
        real_discount: '76',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-24',
        source: '客户',
    },
    {
        member: '0376',
        brand: 'DR',
        total_amount: '4025',
        discount: '83.5',
        real_discount: '83.5',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-24',
        source: '销售',
    },
    {
        member: '4991',
        brand: 'DR',
        total_amount: '24490',
        discount: '83.5',
        real_discount: '83.5',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-24',
        source: '销售',
    },
    {
        member: '4991',
        brand: 'DR',
        total_amount: '29300',
        discount: '83.5',
        real_discount: '83.5',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-25',
        source: '销售',
    },
    {
        member: '0376',
        brand: 'ANCE STUDIOS',
        total_amount: '3000',
        discount: '83.5',
        real_discount: '84',
        is_person_press: '1',
        press_money: '',
        income: '',
        is_carry: '',
        status: '2',
        date: '2025-7-25',
        source: '客户',
    }
])

onMounted(()=>{
    // 计算个人收入
    handleCalcul();
    // 计算总流水
    handleInfo();
    // 计算公司转账金额
    handleAccount();
    // 计算剩余备用金
    handleImprest();
})

const handleImprest = () => {
    for (let item of account_data.value) {
        if (item.status === '2') {
            imprest.value += Number(item.account);
        }
    }
    for (let item of data.value) {
        if (item.status === '2' && item.is_person_press === '1') {
            imprest.value -= Number(item.total_amount) - parseInt(item.total_amount * item.real_discount / 100)
        }
    }
}

const handleAccount = () => {
    for (let val of account_data.value) {
        total_account.value += Number(val.account);
    }
}

const handleInfo = () => {
    for (let val of data.value) {
        total_flow.value += Number(val.total_amount);
        total_income.value += Number(val.income);
        if (val.status == 2) {
            total_no_income.value += Number(val.income);
        }
        total_press_money.value += Number(val.press_money);
    }
}

const handleCalcul = () => {
    for (let item of data.value) {
        item.income = parseInt(Number(item.total_amount) * (item.real_discount - item.discount) / 100);
        item.press_money =  Number(item.total_amount) - parseInt(Number(item.total_amount) * Number(item.discount) / 100);
    }
}

</script>

<p>截止目前，个人总流水为{{total_flow}}元，个人总收入为{{total_income}}元，公司总压钱金额为{{total_press_money}}元，未结算个人总收入{{total_no_income}}元</p>

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
            <th>是否个人压钱</th>
            <th>个人收入</th>
            <th>忽略小数</th>
            <th>单子状态</th>
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
            <td>{{item.is_person_press === '2' ? '否' : '是'}}</td>
            <td>{{item.income}}</td>
            <td>{{item.is_carry === '2' ? '否' : '是'}}</td>
            <th>{{item.status === '2' ? '未结算' : '已结算'}}</th>
            <td>{{item.date}}</td>
            <td>{{item.source}}</td>
        </tr>
    </tbody>
</table>


<p>截止目前，公司总转账金额为{{total_account}}元，剩余备用金{{imprest}}元</p>
<table>
    <thead>
        <tr>
            <th>日期</th>
            <th>公司转账</th>
            <th>单子状态</th>
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
            <td>
                {{item.status === '2' ? '未结算' : '已结算' }}
            </td>
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
