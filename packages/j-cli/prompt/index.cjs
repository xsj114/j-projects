const prompts = [
    {
        type: 'list',
        name: 'frame_type',
        message: ( before_answer ) => {
            return 'which framework do you want to use'
        },
        choices: ( before_answer ) => {
            return ['vue', 'react']
        }
    },
    {
        type: 'list',
        name: 'vue_version',
        message: () => {
            return 'Please select vue version'
        },
        choices: () => {
            return [
                {
                    name: 'Vue3',
                    value: 'vue3'
                },
                {
                    name: 'Vue2',
                    value: 'vue2'
                }
            ]
        },
        when: ( answers )=>{
            return answers.frame_type === 'vue'
        },
    },
    {
        type: 'checkbox',
        name: 'features',
        message: () => {
            return 'Please select the function you want'
        },
        choices: ( answers ) => {
            const options =  [
                {
                    name: 'Babel',
                    value: 'babel',
                },
                {
                    name: 'TypeScript',
                    value: 'typeScript'
                },
                {
                    name: 'Css Pre-processors',
                    value: 'css_process'
                },
                {
                    name: answers.frame_type === 'vue' ? 'Vue-router': 'React-Router-DOM',
                    value: 'router',
                    checked: true
                },
                {
                    name: 'Vuex',
                    value: 'store'
                },
                {
                    name: 'Linter',
                    value: 'linter'
                },
                {
                    name: 'Unit Testing',
                    value: 'unit_test'
                }
            ]
            answers.frame_type === 'react' && ( options.splice(4, 1) )
            return options
        },
    },
    {
        type: 'list',
        name: 'css_processor',
        message: () => {
            return 'Pick a CSS pre-processor'
        },
        choices: () => {
            return [
                {
                    name: 'Sass/SCSS',
                    value: 'sass'
                },
                {
                    name: 'Less',
                    value: 'less'
                },
                {
                    name: 'Stylus',
                    value: 'stylus'
                }
            ]
        },
        when: ( answers ) => {
            return answers.features.includes('css_process')
        }
    },
    {
        type: 'confirm',
        name: 'router_mode',
        message: () => {
            return 'Use history mode for router?'
        },
        when: ( answers ) => {
            return answers.features.includes('router')
        }
    },
    {
        type: 'list',
        name: 'unit_test',
        message: () => {
            return 'Pick a unit testing solution'
        },
        choices: () => {
            return [
                {
                    name: 'Jest',
                    value: 'jest'
                }
            ]
        },
        when: ( answers ) => {
            return answers.features.includes('unit_test')
        }
    },
]

module.exports = prompts
