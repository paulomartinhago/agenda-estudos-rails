export default {
    addAdditionalProduct (state, payload) {
        state.additionalProducts.push(payload)
    },
    removeAdditionalProduct (state, insurer) {
        state.additionalProducts = state.additionalProducts.filter(additional => {
            return additional.seguradora !== insurer
        })
    },
}
