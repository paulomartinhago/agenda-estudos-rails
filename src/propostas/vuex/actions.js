import Faye from 'faye'
import { AppConfig } from '../../config/app-config.js'
import jQuery from 'jquery'

export default {
    startFayeClient({ commit, state }) {
        if(state.faye.client) return

        let fayeClient = new Faye.Client(state.faye.url + '/faye', { retry: 5 })
        commit('updateFayeClient', fayeClient)

        fayeClient.disable('websocket')
        fayeClient.disable('autodisconnect')
        fayeClient.subscribe('/faye/' + state.faye.channel, result => {
            setTimeout(() => commit('updateFayeResult', result), 10)
        })
    },
    onSaveQuotation(context, payload){
        Multicalculo.onSave(payload)
    },
    onSaveInsurerQuotation(context, payload){
        Multicalculo.onSaveInsurerQuotation(payload)
        Multicalculo.onReceiveResult(jQuery('#result-' + payload.seguradora), payload)
    },
    exibeMensagemCarregamento ({ dispatch }, payload) {
        dispatch('Loading/updateLoading', {
            show: true,
            message: payload
        })
    },
    closeLoading ({ dispatch }, timerToClose = 0) {
        setTimeout(() => {
            dispatch('Loading/updateLoading', {
                show: false
            })
        }, timerToClose)
    },
    scrollToTop(context, payload){
        jQuery("html, body").animate({
            scrollTop: payload
        }, "slow")
    },
    redirecionaLogin(){
        window.location = AppConfig.$options.environment.applicationUrl + '/usuario/login'
    },
    googleAnalytics(context, payload) {
        try {
            ga('send', 'pageview', payload)
        } catch(e) {}
    }
}
