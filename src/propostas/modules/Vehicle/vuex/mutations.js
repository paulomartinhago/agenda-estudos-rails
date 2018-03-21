export default {
    setQuotationId (state, payload) {
        state.quotationId = payload
    },
    setQuotation (state, payload) {
        state.quotation = payload
    },
    lastQuotationSaved(state, payload) {
        state.lastQuotationSaved = payload
    }
}
