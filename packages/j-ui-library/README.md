[toc]

# j-ui-library

## Introduction

A vue ui component library

## Install

```
npm i j-ui-library
```

## Import

```
import Vue from 'vue';
import JUI from 'j-ui-library'
import 'j-ui-library/lib/j-ui-library.css'

Vue.use(JUI)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## Components

### Tag

#### Attributes

| Param |  Description | Type |  Default | Optional value |
| --- | ---- | ---- | ---- | ---- |
| closable | Whether with delete button | Boolean | false | true/false |
| size | tag size | string | middle | small/large |
| disable | tag is disabled | Boolean | false | true/false |
| active | tag is enabled | Boolean | false | true/false |

#### Events

| EventName | Description | 
| -------- | --------- |
| mouseover | Event triggered when the mouse moves into the tag |
| mouseout | Event triggered when the mouse moves out of the tag |
| click | Event triggered when tag is clicked |
| close | Event triggered when tag is clicked close btn |


#### slots

| Name | Description|
| ---- | -------- |
| icon | Custom close button |



### Button

#### Attributes

| Param |  Description | Type |  Default | Optional value |
| --- | ---- | ---- | ---- | ---- |
| size | Button size | String | middle | small/large|
| round | Whether the button is rounded | Boolean |  false | true/false |
| border |  Button without background color | Boolean | false | true/false |
| disabled | Button is disabled | Boolean | false | true/false |

#### Events

| EventName | Description | 
| -------- | --------- |
| click | Event triggered when button is clicked |

### Bubble

#### Attribute

| Param |  Description | Type |  Default | Optional value |
| --- | ---- | ---- | ---- | ---- |
| size | Bubble size | String | middle | small/large |
| placement | Where the bubble pops | string | bottom | (top \| botton \| left \| right)(-start \| -end) |
| visibleArrow | Whether to show arrow | Boolean | true | true \| false |
| appendToBody |  Whether to add to dom | Boolean | true | true \| false |


#### Methods

| MethodName | Description | 
| -------- | --------- |
|    open    |  open bubble |
|    close    |  close bubble |

#### slots

| Name | Description |
| --- | ---- |
|  content  |  bubble content |


### Card

#### Attributes

| Param |  Description | Type |  Default | Optional value |
| --- | ---- | ---- | ---- | ---- |
| size | card size | String | middle | small/large |
| role | current role | String | patient | doctor/patient |
| direction | card direction | String | vertical | vertical/horizontal |
| text | Text to display | String | | |


#### Events

| EventName | Description | 
| -------- | --------- |
|   mouseup    |  Triggered when the mouse up  |
|   mousedown    |  Triggered when the mouse down |

#### slots

| Name | Description|
| ---- | -------- |
| prefix | Custom icon |
| append  | Custom icon |
| avatar | Custom avatar icon |


### Input

#### Attributes

| Param |  Description | Type |  Default | Optional value |
| --- | ---- | ---- | ---- | ---- |
| size | Input size | String | middle | small/large |
| round | Whether the input box is rounded | Boolean | false | true/false |
| type | Input type | String | text | Type value of native input |
| tabindex | Input tabindex | String | | |
| showPassword | Whether to display the switch password icon | Boolean | false | true/false |
| clearable | Can be emptied | Boolean | false | true/false |
| disabled | input disabled  |  Boolean | false | true/false |
| readonly | input readonly | Boolean  | false | true/false |
| value | input value | String/Number | '' | |

#### Events

| EventName | Description | 
| -------- | --------- |
| focus | Triggered when input gets focus |
| blur  | Triggered when input loses focus |
| input | Triggered when the Input value changes |
| change | Only triggered when the input box loses focus |
| clear | Triggered when the clear button is clicked |


#### Methods

| MethodName | Description |
| ---- | ---- |
| focus | input gets focus |
| blur | input loses focus |

#### slots

| Name | Description|
| ---- | -------- |
| prepend | Front content of input box |
| append | Content behind the input box |
| prefix | Header content of input box |
| suffix | End of input box |


### Autocomplete

#### Attributes 

| Param |  Description | Type |  Default | Optional value |
| ----- | ----- | ---- | ---- | --- | 
| size | autocomplete size | String | middle | small/large |
| value | autocomplete value | String \| Number |  |  |
| fetchSuggest | Enter the suggested method | Function | | |
| debounce | Debounce delay | Number | 300 | |
| valueKey | Data field value displayed | String | value | |
| placement | Enter suggested pop-up location | String | botoom | (top \| botton \| left \| right)(-start \| -end) |
| visibleArrow | Whether to show arrow | Boolean | true | true/false |
| appendToBody | Whether to insert input suggestions into the body element | Boolean | true | true \| false |
| round |  Whether rounded | Boolean | false | true \| false |
| readonly |  Whether readonly | Boolean | false | true \| false |
| disabled |  Whether disabled | Boolean | false | true \| false |


#### Events

| EventName | Description | 
| -------- | --------- |
| focus | Triggered when input gets focus |
| blur  | Triggered when input loses focus |
| input | Triggered when the Input value changes |
| select | Triggered when a suggestion is selected |




#### slots

| Name | Description|
| ---- | -------- |
| prepend | Front content of input box |
| append | Content behind the input box |
| prefix | Header content of input box |
| suffix | End of input box |


### Select

#### Attributes 


| Param |  Description | Type |  Default | Optional value |
| ----- | ----- | ---- | ---- | --- | 
|  size    | Select size  |  String  |  middle | small/large    |
| disabled | Whether disabled | Boolean | false |  true \| false|
| value | Select value |  String \| Array | | |
| multiple |  Whether to select multiple | Boolean  |  false | true \| false |
| popperClass |  customize popper element class | String | | |
| clearable | Whether to bring a clear button | Boolean | false |  true \| false |
| allowCreate | Whether to allow creation of options | Boolean | false | true \| false |
| filterable | Whether to Searchable | Boolean | false | true \| false |
| placeholder | placeholder | String |  请选择 | |
| remote | Whether to search remotely | Boolean | false | true \| false |
| remoteMethod |  remote method | Function | |  |

#### Events 

| EventName | Description | 
| -------- | --------- |
| focus | Triggered when input gets focus |
| blur  | Triggered when input loses focus |
| input | Triggered when the Input value changes |
| change  | Triggered when the selected value changes |
| visible-change |  Triggered when the drop-down box appears/hidden |
| remove-tag | Triggered when multiple selection options are deleted |
| clear | Triggered when click clear btn |


#### slots

| Name | Description|
| ---- | -------- |
| prefix | Header content of select box |
| suffix | End of select box |


### Option 

#### Attributes 

| Param |  Description | Type |  Default | Optional value |
| ----- | ----- | ---- | ---- | --- | 
|  size    | option size  |  String  |  middle | small/large    |
|  label    | option label  |  String \| Number  |  |     |
|  value    | option value  | String  |  |   |
