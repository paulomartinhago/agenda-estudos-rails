<template>
    <section ref="result">
        <partial-modal-print :printModalResult="printModalResult"></partial-modal-print>

        <div id='form-actions' :class="{ 'text-center': centeredButtonsFormVehicle }">
            <partial-buttons 
                @sendForm="sendForm" 
                @printResultQuotation="printResultQuotation" 
                @setCommissionToAll="setCommissionToAll" 
                @canSeeCommission="canSeeCommission" 
                :showedQuotationCount="showedQuotationCount"
                :canPrintResults="canPrintResults"
                :result="result"
                :commissionAccess="commissionAccess"
                :showCommission="showCommission" />
        </div>

        <div class="row">
            <div class="col-xs-12">
                <div id="resultados" ref="resultados">
                    <div id="result-title-bar" class='row title' ref="resultTitleBar">
                        <div class='coluna-seguradora no-margin'><a @click.prevent="orderByInsurer()"><icon name="heartbeat"></icon> Seguradora <icon name="sort"></icon> </a></div>
                        <div class='coluna-acoes no-margin'><icon name="play-circle"></icon> {{ result.acesso_comissao && commissionAccess && showCommission ? 'Comissão' : 'Ações' }}</div>
                        <div class='coluna-valor no-margin'><a @click.prevent="orderByValue()"><icon name="money"></icon> Valores <icon name="sort"></icon></a></div>
                        <div class='coluna-detalhes no-margin visible-xs-block visible-sm-block'><icon name="info-circle"></icon> Detalhes</div>

                        <div class='coluna-detalhes-resultado hidden-xs hidden-sm'>
                            <div class="detalhes-scroll dynamic-title-bar">
                                <div class='coluna-mensagem dynamic-children coluna-time no-margin'><a @click.prevent="orderByTime()"><icon name="clock-o"></icon> (seg) <icon name="sort"></icon></a></div>
                                <div class='coluna-mensagem dynamic-children coluna-coverage no-margin'><icon name="bar-chart"></icon> Coberturas</div>
                                <div class='coluna-mensagem dynamic-children coluna-other-coverage no-margin'><icon name="bar-chart"></icon> Outras coberturas</div>
                                <div class='coluna-mensagem dynamic-children coluna-info no-margin'><icon name="info-circle"></icon> Veículo/Produto/ID</div>
                                <div class='coluna-mensagem dynamic-children coluna-messages no-margin'><icon name="comments"></icon> Ajustes</div>
                                <div class='coluna-mensagem dynamic-children coluna-messages no-margin'><icon name="comments"></icon> Mensagens da seguradora</div>
                            </div>
                        </div>
                    </div><!-- end result-title-bar -->


                    <div class="can-drop">
                        <partial-insurer
                            v-for="seguradora in result.seguradoras"
                            :key="seguradora.id"
                            :seguradora="seguradora"
                            :result="result"
                            :showCommission="showCommission"
                            :commissionAccess="commissionAccess"
                            :insurerAccess="insurerAccess"
                            :canPrintResults="canPrintResults"
                            :commission="commission">
                        </partial-insurer>

                        <partial-insurer-additional-product
                            v-for="additional in additionalProducts"
                            :key="additional.produto + ' ' + additional.insurer.id"
                            :additional="additional"
                            :result="result"
                            :insurerAccess="insurerAccess">
                        </partial-insurer-additional-product>
                    </div>

                </div><!-- end resultados -->
            </div>
        </div><!-- end row -->

        <div :class="{ 'text-center': centeredButtonsFormVehicle }">
            <partial-buttons 
                @sendForm="sendForm" 
                @printResultQuotation="printResultQuotation" 
                @setCommissionToAll="setCommissionToAll" 
                @canSeeCommission="canSeeCommission" 
                :showedQuotationCount="showedQuotationCount"
                :canPrintResults="canPrintResults"
                :result="result"
                :commissionAccess="commissionAccess"
                :showCommission="showCommission" />
        </div><!-- end row -->
    </section>
</template>

<script>
    import PartialInsurer from './PartialInsurer.vue'
    import PartialInsurerAdditionalProduct from './PartialInsurerAdditionalProduct.vue'
    import PartialModalPrint from './PartialModalPrint.vue'
    import PartialButtons from './PartialButtons.vue'
    import dragula from 'dragula'
    import { EventBus } from '../../EventBus/event-bus.js'
    import { AppConfig } from '../../../../config/app-config.js'
    import jQuery from 'jquery'

    export default {
        components: {
            PartialButtons,
            PartialModalPrint,
            PartialInsurer,
            PartialInsurerAdditionalProduct,
        },
        data(){
            return {
                resultSize: 0,
                resultErrorSize: 0,
                disableButtonQuote: false,
                showedQuotationCount: 0,
                showCommission: true,
                result: {},
                printModalResult: {},
                commission: ''
            }
        },
        computed: {
            additionalProducts(){
                return this.$store.state.VehicleResult.additionalProducts
            },
            canPrintResults(){
                return AppConfig.$options.printResults
            },
            centeredButtonsFormVehicle(){
                return AppConfig.$options.centeredButtonsFormVehicle
            },
            commissionAccess() {
                return AppConfig.$options.commissionAccess
            },
            insurerAccess() {
                return AppConfig.$options.insurerAccess
            }
        },
        mounted() {
            this.initInsurers()
            this.initDragula()
            this.initFixedTitleBar()

            EventBus.$on('onValidatedQuotation', () => this.enableDisableButtonsQuote(false))
            EventBus.$on('onSavingQuotation', () => this.enableDisableButtonsQuote(true))
            EventBus.$on('onSavedQuotation', () => this.enableDisableButtonsQuote(false))
            EventBus.$on('onErrorQuotation', () => this.enableDisableButtonsQuote(false))

            EventBus.$on('invokeResultByInsure', showed => {
                this.showedQuotationCount = showed ? this.showedQuotationCount + 1 : this.showedQuotationCount - 1

                setTimeout(() => {
                    this.$nextTick(() => {
                        if(showed){
                            this.orderByTime()
                        }
                    })
                }, 10)
            })
        },
        methods: {
            sendForm(){
                EventBus.$emit('onSavingQuotation')
                EventBus.$emit('onValidateForm')
            },
            enableDisableButtonsQuote(active){
                this.disableButtonQuote = active

                this.$children.forEach(child => {
                    child.disableButtonQuote = active
                })
            },
            printResultQuotation(){
                this.$store.dispatch('exibeMensagemCarregamento', 'Carregando relatório...')

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/impressoes/modal_relatorio', {
                    params: {
                        cotacao_id: this.$store.getters['VehicleForm/quotationId'] || AppConfig.$options.vehicleQuotationId
                    }
                }).then(response => {
                    this.$store.dispatch('closeLoading', 1000)

                    setTimeout(() => {
                        this.printModalResult = Object.assign(response.body, { openModal: true })
                    }, 1000)
                }, err => {
                    this.$store.dispatch('exibeMensagemCarregamento', 'Erro ao gerar relatório!')
                    this.$store.dispatch('closeLoading', 3000)
                })

                this.$store.dispatch('googleAnalytics', '/propostas?etapa=imprimir')
            },
            canSeeCommission(){
                this.showCommission = ! this.showCommission
            },
            setCommissionToAll(commission){
                this.commission = commission
            },
            initInsurers(){
                let self = this

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/resultados').then(response => {
                    self.result = response.body
                })
            },
            initDragula(){
                dragula({
                    isContainer: function (el) {
                        return el.classList.contains('can-drop')
                    },
                    moves: function (el, container, handle) {
                        return handle.classList.contains('draggable')
                    },
                }).on('drag', function (el, container) {
                    jQuery('.can-drop').addClass('drop-active')
                }).on('dragend', function (el, container){
                    jQuery('.can-drop').removeClass('drop-active')
                })
            },
            initFixedTitleBar(){
                let headerHeight,
                    positionResult,
                    positionWindow,
                    positionTitleBar,
                    widthTitleBar,
                    canFixTitleBar = false

                jQuery(window).scroll(() => {
                    // Leosoft
                    headerHeight         = jQuery('.container-nav-bar').length ? jQuery('.container-nav-bar').outerHeight() : 0
                    
                    // Segfy
                    headerHeight         = jQuery('#head-nav').length && jQuery('#head-nav').css("position") === 'fixed' ? jQuery('#head-nav').outerHeight() : headerHeight

                    positionResult       = jQuery(this.$refs.resultados).offset().top
                    positionWindow       = jQuery(window).scrollTop() + headerHeight
                    canFixTitleBar       = positionWindow > positionResult
                    widthTitleBar        = canFixTitleBar ? this.$refs.resultados.offsetWidth + 'px' : '100%'
                    positionTitleBar     = canFixTitleBar ? headerHeight : 0

                    jQuery(this.$refs.resultTitleBar)
                        .css('width', widthTitleBar)
                        .css('top', positionTitleBar)
                        .css("border-bottom", canFixTitleBar ? '2px solid #a6a6a6' : '2px solid #eee')
                        .css("position", canFixTitleBar ? 'fixed' : 'initial')
                })
            },
            orderByInsurer(){
                jQuery(this.$refs.resultados).find('.can-drop').append(
                    jQuery(this.$refs.resultados).find('.can-drop .data').sort((firstInsurer, secondInsurer) => {
                        let firstInsurerName  = jQuery(firstInsurer).find(".coluna-seguradora span").text(),
                            secondInsurerName = jQuery(secondInsurer).find(".coluna-seguradora span").text()

                        return firstInsurerName < secondInsurerName
                            ? -1
                            : (firstInsurerName > secondInsurerName) ? 1 : 0
                    })
                )
            },
            orderByValue(){
                jQuery(this.$refs.resultados).find('.can-drop').append(
                    jQuery(this.$refs.resultados).find('.can-drop .data').sort((firstInsurer, secondInsurer) => {
                        let firstInsurerValue  = jQuery(firstInsurer).find(".value .in-cash").text(),
                            secondInsurerValue = jQuery(secondInsurer).find(".value .in-cash").text()

                        if(!firstInsurerValue)
                            return 1

                        if(!secondInsurerValue)
                            return -1

                        let firstInsurerFloatValue  = parseFloat(firstInsurerValue.replace(".", "").replace(",", ".")),
                            secondInsurerFloatValue = parseFloat(secondInsurerValue.replace(".", "").replace(",", "."))

                        return firstInsurerFloatValue < secondInsurerFloatValue
                            ? -1
                            : (firstInsurerFloatValue > secondInsurerFloatValue) ? 1 : 0
                    })
                )
            },
            orderByTime(){
                jQuery(this.$refs.resultados).find('.can-drop').append(
                    jQuery(this.$refs.resultados).find('.can-drop .data').sort((firstInsurer, secondInsurer) => {
                        let firstInsurerTime  = jQuery(firstInsurer).find(".okay .time").text(),
                            secondInsurerTime = jQuery(secondInsurer).find(".okay .time").text()

                        if(!firstInsurerTime)
                            return 1

                        if(!secondInsurerTime)
                            return -1

                        return parseInt(firstInsurerTime) < parseInt(secondInsurerTime)
                            ? -1
                            : (parseInt(firstInsurerTime) > parseInt(secondInsurerTime)) ? 1 : 0
                    })
                )
            },
        }
    }
</script>

<style src="../../../../assets/propostas/sass/result.scss" lang="sass" scoped></style>
