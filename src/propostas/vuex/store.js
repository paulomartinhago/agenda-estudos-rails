import Vue from 'vue'
import Vuex from 'vuex'

// Vuex app global
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// Vuex default in modules
import Customer from './../modules/Customer/vuex/store'
import Loading from './../modules/Loading/vuex/store'

// Vuex vehicle
import VehicleForm from './../modules/Vehicle/vuex/store'
import VehicleRenovation from './../modules/Vehicle/Renovation/vuex/store'
import Vehicle from './../modules/Vehicle/Vehicle/vuex/store'
import VehicleResult from './../modules/Vehicle/Result/vuex/store'

// Vuex residence
import ResidenceForm from './../modules/Residence/vuex/store'
import ResidenceRenovation from './../modules/Residence/Renovation/vuex/store'
import Residence from './../modules/Residence/Residence/vuex/store'
import ResidenceCoverage from './../modules/Residence/Coverage/vuex/store'
import ResidenceResult from './../modules/Residence/Result/vuex/store'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        // Default
        Customer,
        Loading,

        // Vehicle
        VehicleForm,
        VehicleRenovation,
        Vehicle,
        VehicleResult,

        // Residence
        ResidenceForm,
        ResidenceRenovation,
        Residence,
        ResidenceCoverage,
        ResidenceResult
    }
})
