export default {
    updateLoading({ commit, state }, payload){
        commit('setShow', payload.show)
        commit('setMessage', payload.message || state.message)
    }
}
