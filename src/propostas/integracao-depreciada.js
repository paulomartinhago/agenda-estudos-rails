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

window.Multicalculo = {
    onSave: value => {},
    onSaveInsurerQuotation: value => {},
    onReceiveResult: (container, value) => {},
    onLoadFields: fields => EventBus.$emit('onLoadFields', fields)
}

const callbackSaveQuotation = (url, format, data) => {
    const params = (format === 'json')
        ? JSON.stringify(data)
        : jQuery('#leosoft-multicalculo #content-veiculo form').serialize() +
            '&veiculo[marca]=' + jQuery('#veiculo_marca_id option:selected').text() +
            '&veiculo[modelo]=' + jQuery('#veiculo_modelo_id option:selected').text() +
            '&condutor_principal[profissao]=' + jQuery('#condutor_principal_profissao_id option:selected').text()

    Vue.http.post(url, params)
}

const callbackSaveInsurerQuotation = (url, format, data) => {
    const params = (format === 'json')
        ? JSON.stringify(data)
        : data

    Vue.http.post(url, params)
}

const setEnvironment = environment => {
    if(environment === 'productionSegfy')
        AppConfig.$options.environment = AppConfig.$options.environments.productionSegfy

    if(environment === 'development')
        AppConfig.$options.environment = AppConfig.$options.environments.development

    if(environment === 'homologation')
        AppConfig.$options.environment = AppConfig.$options.environments.homologation

    if(environment === 'externalHomologation')
        AppConfig.$options.environment = AppConfig.$options.environments.externalHomologation

    if(environment === 'test')
        AppConfig.$options.environment = AppConfig.$options.environments.test
}

/**
 * API_MULTICALCULO
 */
window.api_multicalculo = options => {
    AppConfig.$options.token       = options.token
    AppConfig.$options.container   = options.div
    AppConfig.$options.imagesPath  = options.imagens

    if(options.environment)
        setEnvironment(options.environment)

    if(options.cotacao && options.cotacao.id)
        AppConfig.$options.vehicleQuotationId = options.cotacao.id

    if(options.onSave)
        Multicalculo.onSave = options.onSave

    if(options.url_cotacao){
        Multicalculo.onSave = data => {
            callbackSaveQuotation(options.url_cotacao, options.formato || 'text', data)
        }
    }

    if(options.url_resultado){
        Multicalculo.onSaveInsurerQuotation = data => {
            callbackSaveInsurerQuotation(options.url_resultado, options.formato || 'text', data)
        }
    }

    if(options.onReceiveResult)
        Multicalculo.onReceiveResult = options.onReceiveResult

    if(options.impressao)
        AppConfig.$options.printResults = options.impressao

    if(options.loadResults)
        AppConfig.$options.vehicleLoadResult = options.loadResults

    if(options.validar_contato)
        AppConfig.$options.contactValidate = options.validar_contato

    Vue.http.interceptors.push((request, next) => {
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
}

/**
 * API_MULTICALCULO_LOGINS
 */
window.api_multicalculo_logins = options => {
    window.loginInvalid = options.loginInvalid || (data => {})
    window.loginValid   = options.loginValid || (data => {})
    window.activeToggle = options.activeToggle || (data => {})

    AppConfig.$options.token       = options.token
    AppConfig.$options.container   = options.div
    AppConfig.$options.imagesPath  = options.imagens

    if(options.environment)
        setEnvironment(options.environment)

    Vue.http.get(AppConfig.$options.environment.applicationUrl + '/integracao/logins', {
        params: {
            token: AppConfig.$options.token,
            seguradoras: options.seguradoras,
            images: AppConfig.$options.imagesPath
        }
    }).then(response => {
        jQuery('#' + AppConfig.$options.container).append(response.body)

        setTimeout(() => {
            document.getElementById('token').value = AppConfig.$options.token
        }, 100)
    })

    jQuery.getScript(AppConfig.$options.environment.fayeUrl + '/faye.js', () => {
        jQuery.getScript(AppConfig.$options.environment.fayeUrl + '/faye/client.js', () => {
            jQuery.getScript(AppConfig.$options.environment.applicationUrl + '/integracao/login_seguradoras.js')
        })
    })
}

/**
 * FORM_CLIENTE
 */
window.form_cliente = options => {
    AppConfig.$options.token                   = options.token
    AppConfig.$options.container               = options.div
    AppConfig.$options.showFormVehicleCustomer = true

    if(options.environment)
        setEnvironment(options.environment)

    if(options.onSave || options.onSaveClient)
        Multicalculo.onSave = options.onSave || options.onSaveClient

    if(options.url_cotacao){
        Multicalculo.onSave = data => {
            callbackSaveQuotation(options.url_cotacao, options.formato || 'text', data)
        }
    }

    if(options.cotacao && options.cotacao.id)
        AppConfig.$options.vehicleQuotationId = options.cotacao.id

    if(options.validar_contato)
        AppConfig.$options.contactValidate = options.validar_contato

    Vue.http.interceptors.push((request, next) => {
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
}
