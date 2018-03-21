export default {
    updateError (state, payload) {
        state.error = payload
    },
    updateFayeSetup (state, payload) {
        state.faye = Object.assign(state.faye, payload)
    },
    updateFayeClient (state, payload) {
        state.faye = Object.assign(state.faye, { client: payload })
    },
    updateFayeResult (state, payload) {
        state.faye = Object.assign(state.faye, { result: payload })
    },
    updateRenovationSeguradoras (state, payload) {
        state.seguradoras = payload
    }
}
