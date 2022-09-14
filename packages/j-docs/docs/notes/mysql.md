[toc]
 
# Mysql

::: tip
1Tb = 1024GB<br/>
1GB = 1024Mb<br/>
1Mb = 1024Kb<br/>
1Kb = 1024Byte<br/>
1Byte = 8Bit
:::


## SQL VS NOSQL

| 关系数据库的特点 | 关系数据库的适用场景 |
| ------ | ----- |
| 数据结构化存储在二维表中 | 数据之间存在着一定关系，需要关联查询数据的场景 | 
| 支持事务的（原子性A，一致性C，隔离性I，持久性D）特性 | 需要事务支持的业务场景 |
| 支持使用SQL语言对存储在其中的数据进行操作 | 需要使用SQL语言灵活操作数据的场景 |


| 非关系数据库的特点 | 非关系数据库的适用场景 |
| ------ | ----- |
| 存储结构灵活，没有固定的结构 | 数据结构不固定的场景 |
| 对事务的支持比较弱，但对数据的并发处理性能高 | 对事务要求不高，但读写并发比较大的场景 |
| 大多不使用SQL语言操作数据 | 对数据的处理操作比较简单的场景 |

 
## 数据库设计范式


| 三范式 | 
| ---- |
| 表中的所有字段都是不可再分的 | 
| 表中必须存在业务主键，并且非主键依赖于全部业务主键 | 
| 表中的非主键列之间不能相互依赖 |


| 范式化设计的优缺点 | 分析 |
| ---- | ---- |
| 优点 | 减少数据冗余<br/>减少数据的插入，更新，删除异常<br/>让数据之间的关系更清晰|
| 缺点 | 查询需要关联多个表<br/>对查询性能有一定的影响|


## mysql的数据类型

### mysql的字符串类型

| mysql的字符串类型 | 介绍 |
| --- | --- |
| Char | 固定长度,`1-255`个字符 |
| VarChar | 存储可变长度的字符,一行中所占用的字节数不能超过65535个字节 |
| TinyText | 可变长度,最大长度255个字节 |
| Text | 可变长度,最大长度`64Kb`字节 |
| MediumText | 可变长度,最大长度`16Mb`字节 |
| LongText | 可变长度,最大长度`4Gb`字节 |
| Enum |  最多可定义`64Kb`的枚举值，只能存储枚举过程中定义的一些值 |


### mysql的整数类型

| mysql的整数类型 | 介绍 |
| --- | --- |
| tinyint | 占用1个字节存储空间|
| smallint | 占用2个字节存储空间 |
| mediumint | 占用3个字节存储空间|
| int | 占用4个字节存储空间 |
| bigint | 占用8个字节存储空间 |


| mysql的整数类型属性 | 介绍 |
| --- | --- |
| SIGNED | |
| UNSIGNED | 不允许具有无符号属性的整数类型中存储负数 |

::: tip
mysql整数类型的存储值的最大值是2的n-1次幂<br/>
mysql整数类型的存储值的最小值是2的n-1次幂-1<br/>
n是存储空间的位数
:::

### mysql的实数类型

| mysql的实数类型 | 介绍 | 是否精确|
| --- | --- | --- |
| FLOAT | 占用4个字节存储空间  | 非精确 |
| DOUBLE | 占用8个字节存储空间 | 非精确 |
| DECIMAL | 每4个字节存9个数字，小数点占一个字节  | 精确 |

### mysql的时间类型

| mysql的时间类型 | 介绍 | 格式 | 备注 |
| --- | --- | --- | ---|
| DATE | 占用3个字节存储空间 | `YYYY-MM-DD` | |
| TIME | 占用3到6个字节存储空间 | `HH:MM:SS[.微秒值]` | |
| YEAR | 占用1个字节存储空间 | `YYYY` | |
| DATETIME | 占用5到8个字节存储空间 | `YYYY-MM-DD  HH:MM:SS[.微秒值]` | |
| TIMESTAMP | 占用4到7个字节存储空间 | `YYYY-MM-DD  HH:MM:SS[.微秒值]` | 数据包含了时区信息 |


#### 微秒

| 微秒 | 存储空间 |
| ---- | ----- |
| 0  | 0 bytes |
| 1,2 | 1 bytes |
| 3,4 | 2 bytes |
| 5,6 | 3 bytes |

## sql语言种类


| sql语言种类 |
| ---- |
| DCL数据库管理类语句 | 
| DDL数据定义类语句 | 
| DML数据操作语句 | 
| TCL事务控制类语句 | 


| 常用的DCL语句 | 描述 |
| ----- | ----- |
| `create user` | 建立数据库账号 |
| `grant` | 对用户授权 | 
| `revoke` | 收回用户权限 |
| `show privileges` | 查看mysql支持哪些权限 |



| 常用的DDL语句 |  描述 |
| ------ | ----- |
| `truncate table`  | 清空表 |
| `rename table` | 重命名表 |
| `create/alter/drop database` | 建立/修改/删除数据库 |
| `create/alter/drop table` | 建立/修改/删除表 |
| `create/drop index` | 建立/删除索引 |
| `create/alter/drop view` | 建立/修改/删除视图 |

| 常用的DML语句 | 描述 |
| ----- | ----- |
| `insert into` | 新增表中的数据 |
| `delete` |  删除表中的数据 |
| `update` | 修改表中的数据 |
| `select` | 查询表中的数据 |



## mysql运算符

### 比较运算符

| 类型 | 备注 |
| --- |  --- |
| `=` | 等于 |
| `>` | 大于 |
| `<`  | 小于 |
| `>=` | 大于等于 |
| `<=` | 小于等于 |
| `< >` | 不等于 |
| `!=` | 不等于 |
| `between min and max` | 列的值大于等于最小值，小于等于最大值|
| `is null`<br/>`is not null` | 判断列的值是否为null |
| `like`<br/>`not like` | `%`代表任何数量的字符<br/>`_`代表任何一个字符|
| `in`<br/>`not in`| 判断列的值是否在指定的范围内 |

### 逻辑运算符

| 类型 | 备注 |
| --- |  --- |
| `and`<br/>`&&` | `and`运算符两边的表达式都为真时,返回的结果才为真 |
| `or`<br/>`\|\|`  | `or`运算符两边的表达式有一条为真,返回的结果就为真 |
| `xor` | `xor`运算符两边的表达式一真一假时返回真,两真两假时返回假 |

::: tip
任何运算符和null值运算结果都为null
:::

## mysql常用函数

### 聚合函数

| 函数名 | 作用 |
| --- |  --- |
| `count(*)`<br/>`count(col)` | 计算符合条件的数据行数 |
| `sum(col_name)` | 计算表中符合条件的数值列的合计值 |
| `avg(col_name)` | 计算表中符合条件的数值列的平均值 |
| `max(col_name)` | 计算表中符合条件的任意列中数据的最大值 |
| `min(col_name)`  | 计算表中符合条件的任意列中数据的最小值 |

### 系统函数

| 函数名 | 作用 |
| --- |  --- |
| `INET_ATON()` | 将字符串转换成整数类型 |
| `INET_NTOA()` | 将整数类型转换为字符串类型 |
| `curdate()` | 返回当前日期 |
| `curtime()`  |返回当前时间 |
| `now()`  | 返回当前的日期和时间 |
| `date_format(date,fmt)` | 按照`fmt`的格式,对日期`date`进行格式化|
| `sec_to_time(seconds)` | 把秒数转换为(小时:分:秒) |
| `time_to_sec(time)` | 把时间(小时:分:秒)转换为秒数 |
| `datediff(date1,date2)` | 返回`date1`和`date2`两个日期相差的天数 |
| `date_add(date,interval expr unit)` | 对给定的日期增加或减少指定的时间单元<br/>(`unit`: Day天/Hour小时/Minutes分钟/Second秒)|
| `extract(unit from date)` | 返回日期`date`的指定部分|
| `unix_timestamp()` | 返回`unix`时间戳|
| `from_unixtime()` | 把`unix`时间戳转换为日期时间|
| `concat(str1,str2)` | 把字符串`str1`,`str2`连接成一个字符串 |
| `concat_ws(sep,str1,str2)` | 用指定的分隔符`sep`连接字符串 |
| `char_length(str)` | 返回字符串`str`的字符个数|
| `length(str)` | 返回字符串`str`的字节个数|
| `format(x,d[,locale])` | 将数字n格式化为格式如"#,###,###.##",并舍入到`d`位小数 |
| `left(str,len)`<br/>`right(str,len)` | 从字符串的左边或右边起返回`len`长度的子字符串 |
| `substring(str,pos,[len])` | 从字符串`str`的`pos`位置起返回长度为`len`的子串 |
| `substring_index(str,delim,count)` | 返回字符串`str`按`delim`分割的前`count`个子字符串 |
| `locate(substr,str)`   | 在字符串`str`中返回子串`substr`第一次出现的位置|
| `trim([remstr FROM] str)` | 从字符串`str`两端删除不需要的字符`remstr` |
| `round(x,d)` | 对数值`x`进行四舍五入保留`d`位小数 |
| `rand()` | 返回一个在`0和1`之间的随机数|
| `md5(str)` | 返回`str`的`md5`值 |


## sql优化

### 配置mysql慢查询日志

::: tip
启用慢查询日志<br/>
`set global slow_query_log = [on|off]`
:::

 
::: tip
更改慢查询日志的记录位置及文件名<br/>
下面语句将慢查询日志放在根目录的`sql_log`下，文件名为`slowlog.log`<br/>
`set global slow_query_log_file = /sql_log/slowlog.log`
:::
 
::: tip
当sql的执行时间超过了`long_query_time`设置的时间时，会被记录在慢查询日志中<br/>
`set global long_query_time = xx.xxx秒`
:::
 
::: tip
会记录所有未使用到索引的sql<br/>
`set global log_queries_not_using_indexes = [on|off]`
:::


### 通过EXPLAIN命令分析sql执行计划

| 列名| 作用 |
| --- | --- |
|  id |   id列中的值只能有两种情况，一种是为数字，另一种是`null`<br/>如果是数字，则说明sql语句查询执行的顺序<br/>如果为`null`则说明数据是由另外两个查询进行`UNION`操作后，所产生的一个结果集 |
|  select_type |  查询类型  |
|  table |  数据是由哪个表输出的 |
|  partitions |  查询分区表时，显示查询的分区ID，对于非分区表，显示NULL |
|  type | 查询所使用的联接类型  |
|  possible_keys |   指出查询中可能会用到的索引 |
|  key |  指出查询时实际用到的索引 |
|  key_len | 实际使用索引的最大长度  |
|  ref |  指出哪些列或常量被用于索引查找 |
|  rows |  根据统计信息预估的扫描的行数 |
|  filtered |  表示返回结果的行数占需读取行数的百分比 |
|  Extra |  包括了不适合在其他列中所显示的一些额外信息 |
 


| `select_type`中可能出现的值 | 含义|
| --- | --- |
| SIMPLE | 不包含子查询或是`UNION`操作的查询 |
| PRIMARY |  查询中如果包含任何子查询，那么最外层的查询则被标记为`PRIMARY` | 
| SUBQUERY| SELECT列表中的子查询 |
|  DEPENDENT  SUBQUERY| 依赖外部结果的子查询  |
| UNION | `UNION`操作的第二个或是之后的查询的值为`UNION` |
| DEPENDENT UNION|  当`UNION`做为子查询时，第二或是第二个后的查询的`select_type`值 |
| UNION RESULT | `UNION`产生的结果集 |
| DERIVED | 出现在`FROM`子句中的子查询 | 
 
### Innodb支持的索引类型

| Innodb支持的索引类型 |
| ---- |
| Btree索引 |
| 自适应HASH索引 |
| 全文索引 |
| 空间索引 |
 
### Btree索引的限制

只能从最左侧开始按索引键的顺序使用索引不能跳过索引键<br/>
`NOT IN`和`<>`操作无法使用索引<br/>
索引列上不能使用表达式或是函数

### 如何选择复合索引键的顺序

区分度最高的列放在联合索引的最左侧<br/>
使用最频繁的列放到联合索引的最左侧<br/>
尽量把字段长度小的列放在联合索引列的最左侧

## 事务
    
### INNODB中的锁

查询需要对资源加共享锁<br/>
数据修改需要对资源加排它锁
    
### 阻塞

由于不同锁之间的兼容关系，造成的一个事务需要等待另一个事务释放其所占用的资源的现象

### 死锁

并行执行的多个事务相互之间占有了对方所需要的资源

## 数据库命名规则

所有数据库对象名称必须使用小写字母，可选用下划线分割<br/>
所有数据库对象名称定义禁止使用MySQL保留关键字<br/>
所有存储相同数据的列名和列类型必须一致<br/>
临时表以`tmp`为前缀并以日期为后缀<br/>
备份库，表以`bak`为前缀并以日期为后缀
