<template>
    <div>
        <form id="cotacao" ref="formVehicleQuotation">
            <input type="hidden" name="faye_channel" :value="faye.channel">

            <div id="quotation-data" :style="{ maxWidth: widthFormVehicle }" :class="{ 'form-centered': centeredFormVehicle }">
                <form-partial-quotation type="VEHICLE"></form-partial-quotation>
                <form-partial-renovation></form-partial-renovation>
                <form-partial-location></form-partial-location>
                <form-partial-customer type="VEHICLE"></form-partial-customer>
                <form-partial-vehicle></form-partial-vehicle>
                <form-partial-risk-assessment></form-partial-risk-assessment>
                <form-partial-main-conductor></form-partial-main-conductor>
                <form-partial-additional-conductors></form-partial-additional-conductors>
                <form-partial-coverage v-if="!showFormVehicleCustomer"></form-partial-coverage>
            </div>

            <form-partial-result v-if="!showFormVehicleCustomer"></form-partial-result>

            <div class="row" :class="{ 'text-center': centeredButtonsFormVehicle }" v-if="showFormVehicleCustomer">
                <div class="col-xs-12">
                    <hr>
                    <input type="hidden" name="form_customer" value="true">
                    <input class="btn btn-primary" type="submit" value="Salvar cotação" @click.prevent="sendForm()" :disabled="disableButtonQuote">
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import FormPartialQuotation from './../Quotation/FormPartialQuotation.vue'
    import FormPartialRenovation from './Renovation/FormPartialRenovation.vue'
    import FormPartialLocation from './Location/FormPartialLocation.vue'
    import FormPartialCustomer from './../Customer/FormPartialCustomer.vue'
    import FormPartialVehicle from './Vehicle/FormPartialVehicle.vue'
    import FormPartialRiskAssessment from './RiskAssessment/FormPartialRiskAssessment.vue'
    import FormPartialMainConductor from './MainConductor/FormPartialMainConductor.vue'
    import FormPartialAdditionalConductors from './AdditionalConductors/FormPartialAdditionalConductors.vue'
    import FormPartialCoverage from './Coverage/FormPartialCoverage.vue'
    import FormPartialResult from './Result/FormPartialResult.vue'
    import { AppConfig } from '../../../config/app-config.js'
    import { EventBus } from '../EventBus/event-bus.js'
    import jQuery from 'jquery'
    import { decodificarChassi, buscaModeloPorFipe } from './Vehicle/services.js'

    export default {
        components: {
            FormPartialQuotation,
            FormPartialRenovation,
            FormPartialLocation,
            FormPartialCustomer,
            FormPartialVehicle,
            FormPartialRiskAssessment,
            FormPartialMainConductor,
            FormPartialAdditionalConductors,
            FormPartialCoverage,
            FormPartialResult
        },
        mounted(){
            this.initQuotation()

            EventBus.$on('onLoadFields', fields => this.onLoadFieldsByFipe(fields))
            EventBus.$on('onValidateForm', (insurer = null) => this.validateForm(insurer))
            EventBus.$on('onValidatedQuotation', () => this.enableDisableButtonsQuote(false))
            EventBus.$on('onSavingQuotation', () => this.enableDisableButtonsQuote(true))
            EventBus.$on('onSavedQuotation', () => this.enableDisableButtonsQuote(false))
            EventBus.$on('onErrorQuotation', () => this.enableDisableButtonsQuote(false))
        },
        data(){
            return {
                disableButtonQuote: false
            }
        },
        computed: {
            showFormVehicleCustomer(){
                return AppConfig.$options.showFormVehicleCustomer
            },
            faye() {
                return this.$store.state.faye
            },
            centeredFormVehicle(){
                return AppConfig.$options.centeredFormVehicle
            },
            widthFormVehicle(){
                return AppConfig.$options.widthFormVehicle
            },
            centeredButtonsFormVehicle(){
                return AppConfig.$options.centeredButtonsFormVehicle
            }
        },
        methods: {
            initQuotation(){
                this.$store.commit('VehicleForm/setQuotationId', null)

                if(!AppConfig.$options.vehicleQuotationId)
                    return

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/carrega_proposta', {
                    params: {
                        quotation: AppConfig.$options.vehicleQuotationId,
                        loadResult: AppConfig.$options.vehicleLoadResult
                    }
                }).then(response => {
                    this.$store.commit('VehicleForm/setQuotation', response.body)
                })
            },
            onLoadFieldsByFipe(fields){
                if( fields.veiculo && !fields.veiculo.marca && !fields.veiculo.modelo_id && fields.veiculo.fipe ) {
                    buscaModeloPorFipe(this.$http, fields.veiculo.fipe)
                        .then(response => {
                            if( response.error ){
                                this.$store.dispatch('exibeMensagemCarregamento', response.error)
                                this.$store.dispatch('closeLoading', 3000)

                                if( fields.veiculo.chassis )
                                    this.onLoadFieldsByChassi(fields)
                                else
                                    this.$store.commit('VehicleForm/setQuotation', fields)
                            }

                            if( response.data ){
                                fields.veiculo.marca = response.data.marca_id
                                fields.veiculo.modelo_id = response.data.id
                                this.$store.commit('VehicleForm/setQuotation', fields)
                            }
                        })

                    return
                }

                if( fields.veiculo && !fields.veiculo.marca && !fields.veiculo.modelo_id && fields.veiculo.chassis ) {
                    this.onLoadFieldsByChassi(fields)
                    return
                }

                this.$store.commit('VehicleForm/setQuotation', fields)
            },
            onLoadFieldsByChassi(fields){
                decodificarChassi(this.$http, fields.veiculo.chassis)
                    .then(response => {
                        if( response.error ){
                            this.$store.dispatch('exibeMensagemCarregamento', response.error)
    						this.$store.dispatch('closeLoading', 3000)
                        }

                        if( response.data ){
                            fields.veiculo.ano_fab    = parseInt(response.data.ano)
                            fields.veiculo.ano_modelo = parseInt(response.data.ano)
                            fields.veiculo.marca      = response.data.marcas[0].id
                            fields.veiculo.modelo_id  = response.data.modelos[0].id
                        }

                        this.$store.commit('VehicleForm/setQuotation', fields)
                    })
            },
            enableDisableButtonsQuote(active){
                this.disableButtonQuote = active
            },
            sendForm(){
                EventBus.$emit('onSavingQuotation')
                EventBus.$emit('onValidateForm')
            },
            sendFormAllInsurers(){
                let formData = new FormData(this.$refs.formVehicleQuotation)
                formData = this.addQuotationIdInFormData(formData)

                this.$http.post(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/calcular', formData).then(response => {
                    if( ! this.showFormVehicleCustomer )
                    this.$store.dispatch('startFayeClient')

                    this.$store.commit('VehicleForm/setQuotationId', response.body.id)
                    this.$store.dispatch('VehicleForm/onSaveQuotation', response.body)

                    if( this.showFormVehicleCustomer ) {
                        this.$store.dispatch('exibeMensagemCarregamento', 'Cotação salva com sucesso!')
                        this.$store.dispatch('closeLoading', 3000)
                    }

                    EventBus.$emit('onSavedQuotation')
                    EventBus.$emit('onInitQuote')
                }, err => {
                    if(err.status == 400)
                    this.applyErrorsQuotationResponse(err.body.fields_errors)

                    EventBus.$emit('onErrorQuotation')
                })
            },
            sendFormInsurerQuote(insurer){
                this.insurerQuote = null

                let formData = new FormData(this.$refs.formVehicleQuotation)
                formData.append('seguradora', insurer)
                formData = this.addQuotationIdInFormData(formData)

                this.$http.post(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/calcular_uma', formData).then(response => {
                    this.$store.commit('VehicleForm/setQuotationId', response.body.id)
                    this.$store.dispatch('startFayeClient')
                    this.$store.dispatch('VehicleForm/onSaveQuotation', response.body)

                    EventBus.$emit('onSavedQuotation')

                    if(['porto', 'itau', 'azul'].includes(insurer))
                        ['porto', 'itau', 'azul'].forEach(eachInsurer => {
                            EventBus.$emit('onInitQuote', eachInsurer)
                        })
                    else
                        EventBus.$emit('onInitQuote', insurer)
                }, err => {
                    if(err.status == 400)
                        this.applyErrorsQuotationResponse(err.body.fields_errors)

                    EventBus.$emit('onErrorQuotation')
                })
            },
            addQuotationIdInFormData(formData){
                if(this.$store.getters['VehicleForm/quotationId'])
                    formData.append('cotacao[id]', this.$store.getters['VehicleForm/quotationId'])

                return formData
            },
            validateForm(insurer){
                let errorFieldFound = false

                this.$children.forEach(child => {
                    child.$validator.validateAll().then((result) => {
                        if ( ! result )
                            errorFieldFound = true
                    })
                })

                setTimeout(() => {
                    if(errorFieldFound){
                        EventBus.$emit('onValidatedQuotation')
                        this.scrollToTop()
                        return
                    }

                    if(insurer)
                        this.sendFormInsurerQuote(insurer)
                    else
                        this.sendFormAllInsurers()
                }, 200)
            },
            applyErrorsQuotationResponse(errors){
                this.$children.forEach(child => {
                    for(let error in errors)
                        child.errors.add(error, errors[error])
                })

                this.scrollToTop()
            },
            scrollToTop(){
                this.$nextTick(() => {
                    if( jQuery(this.$refs.formVehicleQuotation).find('.has-error').length > 0 )
                    {
                        this.$store.dispatch(
                            'scrollToTop',
                            jQuery(this.$refs.formVehicleQuotation).find('.has-error').first().offset().top - 90
                        )
                    }
                })
            }
        }
    }
</script>
