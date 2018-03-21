<template>
    <div class="row" id="leosoft-multicalculo">
        <span id="popup_message"></span>
        <input type="hidden" id="token" name="token" :value="tokenIntegration" v-if="tokenIntegration">

        <div class="col-xs-12" align="center" v-if="error">
            <h2 class="error-status">{{ error.status }}</h2>
            {{ error.statusText }}
        </div><!-- end col -->

        <div class="col-xs-12" v-else>
            <proposta-loading></proposta-loading>

            <section id="cotacoes-tabs" v-if="showTabs">
                <input id="tab-veiculo" type="radio" name="tabs" value="#content-veiculo" checked>
                <label for="tab-veiculo"><icon name="car" class="m-r-5"></icon> Veículo</label>

                <input id="tab-residencia" type="radio" name="tabs" value="#content-residencia" disabled>
                <label for="tab-residencia" class="cursor-default"><icon name="home" class="m-r-5"></icon> Residência <span class="label label-warning flag-em-breve-tab">EM BREVE</span></label>
            </section>

            <section :class="{ 'cotacao-content': showTabs }" id="content-veiculo" v-if="showFormVehicle">
                <form-vehicle></form-vehicle>
            </section>

            <section :class="{ 'cotacao-content': showTabs }" id="content-residencia" v-if="showFormResidence">
                ...
            </section>
        </div><!-- end col -->
    </div><!-- end row -->
</template>

<script>
    import PropostaLoading from './Loading/Loading.vue'
    import FormVehicle from './Vehicle/FormVehicle.vue'
    // import FormResidence from './Residence/FormResidence.vue'
    import { AppConfig } from '../../config/app-config.js'
    import jQuery from 'jquery'

    export default {
        name: 'AppPropostas',
        components: {
            PropostaLoading,
            FormVehicle,
            // FormResidence: () => import('./Residence/FormResidence.vue')
        },
        computed: {
            error(){
                return this.$store.state.error
            },
            showFormVehicle(){
                return AppConfig.$options.showFormVehicle
            },
            showFormResidence(){
                return AppConfig.$options.showFormResidence
            },
            tokenIntegration(){
                return AppConfig.$options.token
            },
            showTabs(){
                return this.showFormVehicle && this.showFormResidence
            },
        },
        mounted() {

            // Tabs
            if( jQuery('#cotacoes-tabs').length )
            {
                jQuery('#cotacoes-tabs').on('click', 'input', function(e){
                    jQuery('.cotacao-content').hide()
                    jQuery(this.value).fadeIn('fast')
                })

                jQuery('#cotacoes-tabs input:checked').trigger('click')
            }

            // Seguradoras - Tipo de Seguro
            this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas/seguradoras_renovacao').then(response => {
                this.$store.commit('updateRenovationSeguradoras', response.body)
            })

            // Faye
            this.$store.commit('updateFayeSetup', {
                channel: this.$store.getters['generateUUID'],
                url: AppConfig.$options.environment.fayeUrl
            })
        }
    }
</script>

<style src="../../assets/propostas/sass/app.scss" lang="sass"></style>
