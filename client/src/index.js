
console.log(' - ready steady go! ', name, isDev, isProd)
//  халоу


// Напишемо щось у стилі es6
// чому?
// Бо круто і треба писати код нормально)
// Наприклад розбивати на модулі і юзати їх, як нижче
import devs from './users'

console.log('DEVS:', devs)



import Vue from 'vue'

// import api from './js/api'

import App from './js/App'

import './index.less'


new Vue({
    el: '#app',
    render: h => h(App),
})

