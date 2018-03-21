import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTheMask from 'vue-the-mask'
import ptBR from 'vee-validate/dist/locale/pt_BR'
import VeeValidate, { Validator } from 'vee-validate'
import { AppConfig } from '../config/app-config.js'
import { EventBus } from './modules/EventBus/event-bus.js'
import App from './modules/App.vue'
import store from './vuex/store'
import jQuery from 'jquery'

import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/car'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/calendar'
import 'vue-awesome/icons/repeat'
import 'vue-awesome/icons/map-marker'
import 'vue-awesome/icons/male'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/user-plus'
import 'vue-awesome/icons/bar-chart'
import 'vue-awesome/icons/sign-in'
import 'vue-awesome/icons/calculator'
import 'vue-awesome/icons/exclamation-triangle'
import 'vue-awesome/icons/clock-o'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/heartbeat'
import 'vue-awesome/icons/play-circle'
import 'vue-awesome/icons/money'
import 'vue-awesome/icons/comments'
import 'vue-awesome/icons/sort'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/file-pdf-o'
import 'vue-awesome/icons/file-excel-o'
import Icon from 'vue-awesome/components/Icon.vue'
import moment from 'moment'

moment.locale('pt-br')

window.Multicalculo = {
    onSave: value => {},
    onSaveInsurerQuotation: value => {},
    onReceiveResult: (container, value) => {},
    onLoadFields: fields => EventBus.$emit('onLoadFields', fields)
}

Vue.component('icon', Icon)

Vue.use(VueResource)
Vue.use(VueTheMask)

Validator.addLocale(ptBR)
Validator.setLocale('pt_BR')

Validator.extend('date_valid', {
    getMessage: field => `O campo ${field} não possui uma data válida.`,
    validate: value => new Promise(resolve => {
        let isValid = moment(value, 'DD/MM/YYYY', true).isValid();

        resolve({
            valid: value && isValid
        });
    })
})

Vue.use(VeeValidate, {
    locale: 'pt_BR',
    events: 'blur',
    validity: false
})

Vue.http.interceptors.push((request, next) => {
    if(jQuery('meta[name="csrf-token"]').length)
        request.headers.set('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))

    if(AppConfig.$options.token)
        request.params['token'] = AppConfig.$options.token

    next()
})

new Vue({
    store,
    name: 'Multicalculo',
    el: '#' + (AppConfig.$options.container || 'app-propostas'),
    render: h => h(App)
})
