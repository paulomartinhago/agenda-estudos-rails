<template>
    <div class="row data resultado" :seguradora="'result-' + additional.insurer.seguradora" ref="insurerElement">
        <span class="popup_message" ref="popupMessage"></span>

        <!-- Logo Seguradora -->
        <div class='insurer-img coluna-seguradora'>
            <img class="oferta" src="images/ofertas.png" v-if="showOffer">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEVDQz8BAQEBAQECAgICAgIBAQEEBAMBAQEBAQEUFBMCAgICAgIRERACAgIBAQEBAQEEBARJ+V+CAAAAEXRSTlMC/r2xr6dC47APhIMP5+bkRE9K57AAAABrSURBVBjTVY9bDoAgDATpA1pFwPuf1haJlv1oYJKyQ1pBTFtOgBrvN1hKAANzRgngSEQ2VorYkdSwzK0KXsDsVXD6gEzErbNqBsAXKPfGSg5MIa7U7dFLPpXLam38ERcbAZRdfcqYQkj4/gMppQIsOucWHwAAAABJRU5ErkJggg==" alt="" class="draggable">
            <img class='insurer-badge' :class="{ 'open-insurer': insurerAccess }" :data-seguradora-id="additional.insurer.id" :data-insurer-badge="additional.insurer.seguradora" :src="(imagesPath || 'images/login-seguradoras') + '/' + additional.insurer.seguradora + '.png'" :title="additional.insurer.nome">
            <br/>
            <span style="font-size: 10px;">{{ additional.insurer.nome_abreviado }}</span>
        </div>

        <div class='result-actions coluna-acoes'>
            <div class="produto-adicional">PRODUTO<br>ADICIONAL</div>
        </div>

        <!-- Valores -->
        <div class='value coluna-valor'>
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

            <button type="button" class="btn btn-primary btn-xs visile-xs-inline-block" @click="showQuotationModalInsurerResult = true"><span>DETALHES</span></button>
        </div>

        <div class="coluna-detalhes visible-xs-block visible-sm-block">
            <button type="button" class="btn btn-primary" @click="showQuotationModalInsurerResult = true"><span>DETALHES</span></button>
        </div>

        <div class='okay dynamic coluna-detalhes-resultado hidden-xs hidden-sm'>
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
            v-if="showQuotationModalInsurerResult"
            @close="showQuotationModalInsurerResult = false"
            :imagesPath="imagesPath"
            :seguradora="additional.insurer"
            :quotationResult="quotationResult">
        </partial-modal-result-insurer-details>

    </div>
</template>

<script>
    import PartialModalResultInsurerDetails from './PartialModalResultInsurerDetails.vue'
    import { AppConfig } from '../../../../config/app-config.js'
    import jQuery from 'jquery'

    export default {
        props: ['additional', 'seguradora', 'result', 'insurerAccess'],
        components: {
            PartialModalResultInsurerDetails,
        },
        data(){
            return {
                isFirefox: typeof InstallTrigger !== 'undefined',
                showQuotationModalInsurerResult: false,
                showOffer: false,
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
            }
        },
        computed: {
            paymentTypesPreDefinition(){
                return this.$store.state.VehicleResult.paymentTypesPreDefinition
            },
            imagesPath(){
                return AppConfig.$options.imagesPath
            }
        },
        mounted() {
            this.showOffer = this.additional.oferta === true

            this.quotationResult.time                = this.additional.tempo
            this.quotationResult.value               = this.additional.valor
            this.quotationResult.paymentForms        = JSON.parse(this.additional.valor_parcelado)
            this.quotationResult.franchise           = this.additional.franquia
            this.quotationResult.coverages           = this.additional.coberturas
            this.quotationResult.otherCoverages      = this.additional.outras_coberturas
            this.quotationResult.otherCoveragesHover = this.additional.outras_coberturas_completo_popup
            this.quotationResult.code                = this.additional.codigo
            this.quotationResult.priceId             = this.additional.preco_id
            this.quotationResult.vehicle             = this.additional.veiculo
            this.quotationResult.vehicleHover        = ''
            this.quotationResult.product             = this.additional.produto
            this.quotationResult.message             = this.additional.mensagem.replace(/\n/, '<br>')
            this.quotationResult.messageHover        = ''
            this.quotationResult.adjustments         = this.additional.mensagem_ajuste.replace(/\n/, '<br>')
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
                })

                this.$store.dispatch('VehicleForm/onSaveInsurerQuotation', this.additional)
            })
        },
        methods: {
            showPopupMessage(event){
                let target       = jQuery(event.target)
                let messageHover = target.data('msg-hover')

                if(messageHover.length === 0)
                    return

                let popupMessage = jQuery(this.$refs.popupMessage)
                let posX         = target.offset().left - jQuery('#resultados').offset().left
                let posY         = 0

                popupMessage.html(messageHover)

                let popUpWidth  = popupMessage.width() + (this.isFirefox ? 35 : 0)
                let popUpHeight = popupMessage.height() + (this.isFirefox ? 35 : 0)

                if (target.parent('div.error').length) {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', posX + ((target.width() / 2) - popUpWidth))
                } else {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', posX - popUpWidth)
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
