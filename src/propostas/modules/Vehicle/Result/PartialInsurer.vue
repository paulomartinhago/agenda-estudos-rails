<template>
    <div class="row data resultado" :id="'result-' + seguradora.seguradora" :seguradora="'result-' + seguradora.seguradora" ref="insurerElement" v-if="!isAliro || showAliro">
        <span class="popup_message" ref="popupMessage"></span>

        <!-- Logo Seguradora -->
        <div class='insurer-img coluna-seguradora'>
            <img class="oferta" src="images/ofertas.png" v-if="showOffer">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEVDQz8BAQEBAQECAgICAgIBAQEEBAMBAQEBAQEUFBMCAgICAgIRERACAgIBAQEBAQEEBARJ+V+CAAAAEXRSTlMC/r2xr6dC47APhIMP5+bkRE9K57AAAABrSURBVBjTVY9bDoAgDATpA1pFwPuf1haJlv1oYJKyQ1pBTFtOgBrvN1hKAANzRgngSEQ2VorYkdSwzK0KXsDsVXD6gEzErbNqBsAXKPfGSg5MIa7U7dFLPpXLam38ERcbAZRdfcqYQkj4/gMppQIsOucWHwAAAABJRU5ErkJggg==" alt="" class="draggable">
            <img class='insurer-badge ' :class="{ 'open-insurer': insurerAccess }" :data-seguradora-id="seguradora.id" :data-insurer-badge="seguradora.seguradora" :src="(imagesPath || 'images/login-seguradoras') + '/' + seguradora.seguradora + '.png'" :title="seguradora.nome">
            <br/>
            <span style="font-size: 10px;">{{ seguradora.nome_abreviado }}</span>
        </div>

        <template v-if="seguradora.inativo">
            <div class="inactive">
                <div class="alert insurer-inactive" :class="seguradora.instabilidade ? 'alert-danger' : 'alert-info'">{{ seguradora.instabilidade ? result.msg_seguradora_fora : result.msg_seguradora_inativa }}</i></div>
            </div>
        </template>

        <template v-else>

            <!-- Ações e loading da cotação -->
            <div class='result-actions coluna-acoes'>
                <div class='buttons' v-if="!loadingQuotation" :class="{'has-error': errors.has('preco[comissao[' + seguradora.seguradora + ']]')}">
                    <div :style="{width: '76px', margin: '0 auto', visibility: (result.acesso_comissao && commissionAccess && showCommission ? 'visible' : 'hidden')}" v-if="!isAliro">
                        <div class='input-group input-group-sm'>
                            <input type="text" class="form-control comission" :id="'preco_comissao[' + seguradora.seguradora + ']'" :name="'preco[comissao[' + seguradora.seguradora + ']]'" v-model="comissao" v-validate="{ rules: { numeric: true, min_value: 0, max_value: 100 } }" data-vv-as="Comissão">
                            <span class="input-group-addon comission">%</span>
                        </div>
                    </div>

                    <button class='btn btn-primary btn-xs btn-calculate' title='Calcular' @click.prevent="sendForm($event, seguradora.seguradora)" :disabled="disableButtonQuote || isAliro">
                        <icon name="calculator"></icon><span> Cotar</span>
                    </button>

                    <div class="error-message" v-if="errors.has('preco[comissao[' + seguradora.seguradora + ']]')">{{ errors.first('preco[comissao[' + seguradora.seguradora + ']]') }}</div>

                    <a v-if="canPrintResults && showQuotationResult && seguradora.seguradora == 'tokio'" :href="'impressoes/relatorio_tokio/' + quotationResult.code" class='btn btn-warning btn-xs' target='_blank'>
                        <span>Imprimir</span>
                    </a>

                    <a v-if="canPrintResults && showQuotationResult && seguradora.seguradora == 'mitsui'" :href="'impressoes/relatorio_mitsui/' + quotationResult.code" class='btn btn-warning btn-xs' target='_blank'>
                        <span>Imprimir</span>
                    </a>
                </div>

                <div class="loading" v-if="loadingQuotation">
                    <img :src="(imagesPath || 'images/status') + '/loading2.gif'">
                </div>
            </div>

            <!-- Valores -->
            <div class='value coluna-valor' v-if="showQuotationResult">
                <!-- Valor e parcelamento -->
                <a class="amazing-tooltip">
                    <div class='in-cash'>{{ quotationResult.value }}</div>
                    <span class='forward'>
                        <div class="payments" v-for="(payments, paymentType) in quotationResult.paymentForms">
                            <h5>{{ paymentTypesPreDefinition[paymentType] || paymentType }}</h5>
                            <div v-for="(value, key) in payments">
                                {{ key }} - {{ value }}
                            </div>
                        </div>
                    </span>
                </a>
                <!-- Franquia -->
                <div class='franchise'>
                    <b>Franquia: </b>{{ quotationResult.franchise }}
                </div>

                <button type="button" class="btn btn-primary btn-xs" @click="showQuotationModalInsurerResult = true"><span>DETALHES</span></button>
            </div>

            <!-- Ícone de alerta -->
            <div class='alert-icon coluna-alert-icon icon-info' v-if="showAlertIcon">
                <icon name="exclamation-triangle" scale="3"></icon>
                <button type="button" class="btn btn-primary btn-xs" @click="showQuotationModalAlert = true"><span>DETALHES</span></button>
            </div>

            <div class='timeout-icon coluna-timeout-icon icon-info' v-if="showTimeoutIcon">
                <icon name="clock-o" scale="3"></icon>
                <button type="button" class="btn btn-primary btn-xs" @click="showQuotationTimeoutAlert = true"><span>DETALHES</span></button>
            </div>

            <div class="coluna-detalhes visible-xs-block visible-sm-block" v-if="showQuotationResult">
                <button type="button" class="btn btn-primary" @click="showQuotationModalInsurerResult = true"><span>DETALHES</span></button>
            </div>

            <div class='okay dynamic coluna-detalhes-resultado hidden-xs hidden-sm' v-if="showQuotationResult">
                <div class="detalhes-scroll">
                    <!-- Tempo -->
                    <div class='time dynamic-children coluna-time'>{{ quotationResult.time }}</div>

                    <!-- Coberturas -->
                    <div class='coverage dynamic-children coluna-coverage'>
                        <div class='message-text message-dynamic' v-html="quotationResult.coverages"></div>
                    </div>

                    <!-- Outras coberturas -->
                    <div class='other-coverage coluna-mensagem dynamic-children coluna-other-coverage'>
                        <div class='message-text message-dynamic limited-text' :data-msg-hover="quotationResult.otherCoveragesHover" @mouseenter="showPopupMessage" @mouseleave="hidePopupMessage" v-html="quotationResult.otherCoverages"></div>
                    </div>

                    <!-- Veículo/Produto/ID -->
                    <div class='additional-info dynamic-children coluna-info'>
                        <div class='vehicle limited-text' :data-msg-hover="quotationResult.vehicleHover" @mouseenter="showPopupMessage" @mouseleave="hidePopupMessage">{{ quotationResult.vehicle }}</div>
                        <div class='product'>{{ quotationResult.product }}</div>
                        <div class='code btn btn-primary btn-xs' v-if="insurerAccess">
                            <icon name="sign-in"></icon>
                            <a href="javascript:void(0)" :data-preco-id="quotationResult.priceId" class="open-quotation">{{ quotationResult.code }}</a>
                        </div>
                    </div>

                    <!-- Ajustes -->
                    <div class='adjust-messages dynamic-children coluna-messages'>
                        <div class='message-text message-dynamic' :data-msg-hover="quotationResult.adjustmentsHover" @mouseenter="showPopupMessage" @mouseleave="hidePopupMessage" v-html="quotationResult.adjustments"></div>
                    </div>

                    <!-- Mensagens da seguradora -->
                    <div class='insurer-messages dynamic-children coluna-messages'>
                        <div class='message-text message-dynamic' :data-msg-hover="quotationResult.messageHover" @mouseenter="showPopupMessage" @mouseleave="hidePopupMessage" v-html="quotationResult.message"></div>
                    </div>
                </div>
            </div>

            <partial-modal-result-insurer-details
                v-if="showQuotationResult && showQuotationModalInsurerResult"
                @close="showQuotationModalInsurerResult = false"
                :imagesPath="imagesPath"
                :seguradora="seguradora"
                :quotationResult="quotationResult">
            </partial-modal-result-insurer-details>

            <partial-modal-alert-details
                v-if="showQuotationModalAlert"
                @close="showQuotationModalAlert = false"
                :imagesPath="imagesPath"
                :seguradora="seguradora"
                :message="errorTextMessageHover || errorTextMessage">
            </partial-modal-alert-details>

            <partial-modal-timeout-details
                v-if="showQuotationTimeoutAlert"
                @close="showQuotationTimeoutAlert = false"
                :imagesPath="imagesPath"
                :seguradora="seguradora"
                :message="errorTextMessageHover || errorTextMessage">
            </partial-modal-timeout-details>

            <!-- Mensagens de erro -->
            <div class='error dynamic coluna-error' v-if="displayError">
                <div class="coluna-error-table">
                    <div class='error-message-text' :data-msg-hover="errorTextMessageHover"  @mouseenter="showPopupMessage" @mouseleave="hidePopupMessage" v-html="errorTextMessage"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import PartialModalResultInsurerDetails from './PartialModalResultInsurerDetails.vue'
    import PartialModalAlertDetails from './PartialModalAlertDetails.vue'
    import PartialModalTimeoutDetails from './PartialModalTimeoutDetails.vue'
    import { EventBus } from '../../EventBus/event-bus.js'
    import { AppConfig } from '../../../../config/app-config.js'
    import jQuery from 'jquery'

    export default {
        props: ['seguradora', 'result', 'showCommission', 'commissionAccess', 'insurerAccess', 'canPrintResults', 'commission'],
        components: {
            PartialModalResultInsurerDetails,
            PartialModalAlertDetails,
            PartialModalTimeoutDetails
        },
        data(){
            return {
                isFirefox: typeof InstallTrigger !== 'undefined',
                showQuotationModalInsurerResult: false,
                showQuotationModalAlert: false,
                showQuotationTimeoutAlert: false,
                disableButtonQuote: false,
                loadingQuotation: false,
                timeoutQuotation: null,
                timeoutQuotationDefined: false,
                errorTextMessage: null,
                errorTextMessageHover: '',
                displayError: false,
                showQuotationResult: false,
                showOffer: false,
                showAlertIcon: false,
                showTimeoutIcon: false,
                quotationResult: {
                    time: null,
                    value: null,
                    franchise: null,
                    coverages: null,
                    otherCoverages: null,
                    otherCoveragesHover: '',
                    code: null,
                    priceId: null,
                    vehicle: null,
                    vehicleHover: '',
                    product: null,
                    message: null,
                    messageHover: '',
                    adjustments: null,
                    adjustmentsHover: '',
                    paymentForms: {},
                },
                additionalProductsCount: 0,
                comissao: 0,
                showAliro: false
            }
        },
        computed: {
            faye() {
                return this.$store.state.faye
            },
            fayeResult(){
                return this.$store.state.faye.result
            },
            paymentTypesPreDefinition(){
                return this.$store.state.VehicleResult.paymentTypesPreDefinition
            },
            imagesPath(){
                return AppConfig.$options.imagesPath
            },
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            },
            lastQuotationSaved(){
                return this.$store.getters['VehicleForm/lastQuotationSaved']
            },
            isAliro(){
                return this.seguradora.seguradora === 'aliro'
            },
            isLiberty(){
                return this.seguradora.seguradora === 'liberty'
            }
        },
        mounted() {
            this.comissao = this.seguradora.comissao

            EventBus.$on('onInitQuote', (insurer = null) => {
                this.stepRun({ seguradora: (insurer || this.seguradora.seguradora), mensagem: 'Iniciando cálculo...' })
            })

            if(this.isAliro)
                EventBus.$on('onShowAliro', show => this.showAliro = show)
        },
        watch: {
            fayeResult(result){
                if(!result.type || result.type != 'VEHICLE')
                    return

                if(result.action == 'passo')
                    this.stepRun(result.params)
                else if(result.action == 'logar' || result.action == 'cotar')
                    this.eachInsurers(result.params)
            },
            showQuotationResult(value){
                EventBus.$emit('invokeResultByInsure', value)
            },
            quotation(quotation){
                if(quotation.results)
                    this.eachInsurers(quotation.results)
            },
            commission(value) {
                this.comissao = value
            }
        },
        methods: {
            sendForm(e, insurer){
                EventBus.$emit('onSavingQuotation')
                EventBus.$emit('onValidateForm', insurer)
            },
            stepRun(insurerParams){
                if(this.seguradora.seguradora != insurerParams.seguradora)
                    return

                if(this.isLiberty)
                    EventBus.$emit('onShowAliro', false)

                this.initTimeoutQuotation()

                for(let i = 0; i < this.additionalProductsCount; i++)
                    EventBus.$emit('invokeResultByInsure', false)

                this.$store.commit('VehicleResult/removeAdditionalProduct', insurerParams.seguradora)

                this.additionalProductsCount = 0
                this.showQuotationResult     = false
                this.showAlertIcon           = false
                this.showTimeoutIcon         = false
                this.loadingQuotation        = true
                this.displayError            = true
                this.errorTextMessage        = insurerParams.mensagem.replace(/\n/, '<br>')
            },
            eachInsurers(insurersParams){
                let self = this

                insurersParams.forEach(currentValue => {
                    if(self.seguradora.seguradora != currentValue.seguradora)
                        return

                    self.updateInsurer(currentValue)
                })
            },
            updateInsurer(insurerParams){
                this.disableButtonQuote = false
                this.loadingQuotation   = false
                this.showAlertIcon      = false
                this.showTimeoutIcon    = false

                clearTimeout(this.timeoutQuotation)
                this.timeoutQuotationDefined = false

                if(insurerParams.status === 'PRODUTO_ADICIONAL'){
                    insurerParams.insurer = this.seguradora
                    this.$store.commit('VehicleResult/addAdditionalProduct', insurerParams)
                    this.additionalProductsCount++

                    EventBus.$emit('invokeResultByInsure', true)
                    return
                }

                if(insurerParams.status !== 'OK'){
                    this.showAlertIcon = true
                    this.showError(insurerParams.mensagem)

                    this.$nextTick(() => {
                        this.$store.dispatch('VehicleForm/onSaveInsurerQuotation', insurerParams)
                    })

                    return
                }

                if(this.isAliro)
                    EventBus.$emit('onShowAliro', true)

                this.displayError          = false
                this.errorTextMessage      = null
                this.errorTextMessageHover = ''
                this.showQuotationResult   = true

                if(insurerParams.oferta === true)
                    this.showOffer = true

                this.quotationResult.time                = insurerParams.tempo
                this.quotationResult.value               = insurerParams.valor
                this.quotationResult.paymentForms        = JSON.parse(insurerParams.valor_parcelado)
                this.quotationResult.franchise           = insurerParams.franquia
                this.quotationResult.coverages           = insurerParams.coberturas
                this.quotationResult.otherCoverages      = insurerParams.outras_coberturas
                this.quotationResult.otherCoveragesHover = insurerParams.outras_coberturas_completo_popup
                this.quotationResult.code                = insurerParams.codigo
                this.quotationResult.priceId             = insurerParams.preco_id
                this.quotationResult.vehicle             = insurerParams.veiculo
                this.quotationResult.vehicleHover        = ''
                this.quotationResult.product             = insurerParams.produto
                this.quotationResult.message             = insurerParams.mensagem.replace(/\n/, '<br>')
                this.quotationResult.messageHover        = ''
                this.quotationResult.adjustments         = insurerParams.mensagem_ajuste.replace(/\n/, '<br>')
                this.quotationResult.adjustmentsHover    = ''

                if(this.quotationResult.vehicle.length > 45){
                    this.quotationResult.vehicleHover = this.quotationResult.vehicle
                    this.quotationResult.vehicle      = this.quotationResult.vehicle.substr(0, 45).trim() + '...'
                }

                if(
                    this.quotationResult.message.length > 120 ||
                    this.quotationResult.message.split(/<br.?>/).length > 3
                ){
                    this.quotationResult.messageHover = this.quotationResult.message
                    this.quotationResult.message      = this.quotationResult.message.split(/<br.?>/, 3).join('<br/>').substr(0, 120).trim() + '...'
                }

                if(
                    this.quotationResult.adjustments.length > 120 ||
                    this.quotationResult.adjustments.split(/<br.?>/).length > 3
                ){
                    this.quotationResult.adjustmentsHover = this.quotationResult.adjustments
                    this.quotationResult.adjustments      = this.quotationResult.adjustments.split(/<br.?>/, 3).join('<br/>').substr(0, 120).trim() + '...'
                }

                this.$nextTick(() => {
                    jQuery(this.$refs.insurerElement).find('.dynamic').scroll(() => {
                        jQuery('.dynamic').scrollLeft(jQuery(this.$refs.insurerElement).find('.dynamic').scrollLeft())
                        jQuery('.dynamic-title-bar').css('left', '-' + jQuery(this.$refs.insurerElement).find('.dynamic').scrollLeft() + 'px');
                    })

                    this.$store.dispatch('VehicleForm/onSaveInsurerQuotation', insurerParams)
                })
            },
            showError(message){
                this.displayError          = true
                this.errorTextMessage      = message.replace(/\n/, '<br>')
                this.errorTextMessageHover = ''
                this.showQuotationResult   = false

                if(
                    this.errorTextMessage > 200 ||
                    this.errorTextMessage.split(/<br.?>/).length > 3
                ){
                    this.errorTextMessageHover = this.errorTextMessage
                    this.errorTextMessage      = this.errorTextMessage.split(/<br.?>/, 3).join('<br/>').substr(0, 120).trim() + '...'
                }
            },
            initTimeoutQuotation(){
                if(this.timeoutQuotationDefined)
                    return

                this.timeoutQuotationDefined = true

                this.timeoutQuotation = setTimeout(() => {
                    this.showTimeoutIcon  = true
                    this.loadingQuotation = false
                    this.showError('A seguradora ' + this.seguradora.nome_abreviado + ' está demorando mais que o previsto para calcular a cotação!\nEla ainda poderá retornar o resultado, aguarde uns instantes ou tente novamente.')
                }, 100500)
            },
            showPopupMessage(event){
                let target       = jQuery(event.target)
                let messageHover = target.data('msg-hover')

                if(messageHover.length === 0)
                    return

                let popupMessage   = jQuery(this.$refs.popupMessage)
                let posX           = target.offset().left - jQuery('#resultados').offset().left
                let posY           = 0

                popupMessage.html(messageHover)

                let popUpWidth  = popupMessage.width() + (this.isFirefox ? 35 : 0)
                let popUpHeight = popupMessage.height() + (this.isFirefox ? 35 : 0)

                if (target.parent('div.error').length) {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', posX + ((target.width() / 2) - popUpWidth))
                } else {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', (posX - popUpWidth))
                }

                popupMessage.show()
            },
            hidePopupMessage(event){
                jQuery(this.$refs.popupMessage).hide()
            },
        }
    }
</script>

<style src="../../../../assets/propostas/sass/result-insurer.scss" lang="sass" scoped></style>
