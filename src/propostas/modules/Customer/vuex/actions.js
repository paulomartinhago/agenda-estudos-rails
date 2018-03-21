export default {
    resetCustomer(context){
        context.commit('updatePessoa', '')
        context.commit('updateName', '')
        context.commit('updateBirthDate', '')
        context.commit('updateSex', '')
    },
    setUpdateCustomer(context, payload){
        context.commit('updateName', payload.name)
        context.commit('updateBirthDate', payload.birth_date)
        context.commit('updateSex', payload.sex)
        context.commit('updateEmail', payload.email)
        context.commit('updatePhone', payload.phone)
        context.commit('updateCelPhone', payload.celPhone)
    },
}