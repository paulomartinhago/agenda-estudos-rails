<template>
    <div>
        <form @submit.prevent="sendForm($event)" ref="formResidenceQuotation">
            <input type="hidden" name="faye_channel" :value="faye.channel">
            <form-partial-quotation></form-partial-quotation>
            <form-partial-renovation></form-partial-renovation>
            <form-partial-customer type="RESIDENCE"></form-partial-customer>
            <form-partial-residence></form-partial-residence>
            <form-partial-coverage></form-partial-coverage>
            <form-partial-result></form-partial-result>
        </form>
    </div>
</template>

<script>
    import FormPartialQuotation from './../Quotation/FormPartialQuotation.vue'
    import FormPartialRenovation from './Renovation/FormPartialRenovation.vue'
    import FormPartialCustomer from './../Customer/FormPartialCustomer.vue'
    import FormPartialResidence from './Residence/FormPartialResidence.vue'
    import FormPartialCoverage from './Coverage/FormPartialCoverage.vue'
    import FormPartialResult from './Result/FormPartialResult.vue'
    import { AppConfig } from '../../../config/app-config.js'

    export default {
        components: {
            FormPartialQuotation,
            FormPartialRenovation,
            FormPartialCustomer,
            FormPartialResidence,
            FormPartialCoverage,
            FormPartialResult
        },
        computed: {
            insurerQuote(){
                return this.$store.state.ResidenceResult.insurerQuote
            },
            faye() {
                return this.$store.state.faye
            }
        },
        mounted(){
            this.initQuotation()
        },
        watch: {
            insurerQuote(value){
                this.sendFormInsurerQuote(value)
            }
        },
        methods: {
            initQuotation(){
                //
            },
            sendForm(e){
                let self = this

                if(self.validateForm())
                    return

                let formData = new FormData(e.target)

                self.$http.post(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/calcular', formData).then(response => {
                    this.$store.dispatch('startFayeClient')
                })
            },
            sendFormInsurerQuote(insurer){
                let self = this

                if(self.validateForm())
                    return

                let formData = new FormData(this.$refs.formResidenceQuotation)

                formData.append('seguradora', insurer)

                self.$http.post(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/calcular_uma', formData).then(response => {
                    this.$store.dispatch('startFayeClient')
                })
            },
            validateForm(){
                let errorFieldFound = false

                this.$children.forEach(child => {
                    child.$validator.validateAll()

                    if(child.errors.any())
                        errorFieldFound = true
                })

                if(errorFieldFound){
                    this.$nextTick(() => {
                        this.$store.dispatch(
                            'scrollToTop',
                            jQuery(this.$refs.formResidenceQuotation).find('.has-error').first().offset().top - 90
                        )
                    })
                }

                return errorFieldFound
            }
        }
    }
</script>
