import Vue from 'vue'
import { App } from './app'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faArrowLeft, faPenClip, faListCheck} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft, faPenClip, faListCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
