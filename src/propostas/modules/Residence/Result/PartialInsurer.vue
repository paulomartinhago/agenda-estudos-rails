<template>
    <div class="row data" :id="'result-' + seguradora.seguradora">
        <!-- Logo Seguradora -->
        <div class='col-xs-4 col-md-2 insurer-img coluna-seguradora'>
            <img class="oferta" src="images/ofertas.png">
            <i class="fa fa-arrows draggable"></i>
            <img class='insurer-badge open-insurer' :data-seguradora-id="seguradora.id" :data-insurer-badge="seguradora.seguradora" :src="(imagesPath || 'images/login-seguradoras') + '/' + seguradora.seguradora + '.png'" :title="seguradora.nome">
            <br/>
            <span style="font-size: 10px;">{{ seguradora.nome_abreviado }}</span>
        </div>

        <template v-if="seguradora.inativo">
            <div class="col-xs-8 col-md-10 inactive">
                <div class="alert insurer-inactive" :class="seguradora.instabilidade ? 'alert-danger' : 'alert-info'">{{ seguradora.instabilidade ? result.msg_seguradora_fora : result.msg_seguradora_inativa }}</i></div>
            </div>
        </template>

        <template v-else>
            <!-- Ações e loading da cotação -->
            <div class='col-xs-4 col-md-1 result-actions coluna-acoes'>
                <div class='buttons' v-show="!loadingQuotation">
                    <div :style="{width: '76px', margin: '0 auto', visibility: (result.acesso_comissao ? 'visible' : 'hidden')}">
                        <div class='input-group input-group-sm'>
                            <input type="text" class="form-control comission" :id="'preco_comissao[' + seguradora.seguradora + ']'" :name="'preco[comissao[' + seguradora.seguradora + ']]'" maxlength="2" size="2" :value="seguradora.comissao">
                            <span class="input-group-addon comission">%</span>
                        </div>
                    </div>

                    <a class='btn btn-primary btn-xs btn-calculate' title='Calcular' @click="insurerQuote($event, seguradora.seguradora)">
                        <i class="fa fa-calculator"></i><span> Cotar</span>
                    </a>

                    <a v-if="seguradora.seguradora == 'tokio'" href="impressoes/relatorio_tokio/00000" class='btn btn-warning btn-xs rel-tokio' style='visibility:hidden' target='_blank'>
                        <span>Imprimir</span>
                    </a>

                    <a v-if="seguradora.seguradora == 'mitsui'" href="impressoes/relatorio_mitsui/00000" class='btn btn-warning btn-xs rel-mitsui' style='visibility:hidden'  target='_blank'>
                        <span>Imprimir</span>
                    </a>
                </div>

                <div v-show="loadingQuotation">
                    <img :src="(imagesPath || 'images/status') + '/loading3.gif'" height="65">
                </div>
            </div>

            <!-- Valores -->
            <div class='col-xs-4 col-md-1 value coluna-valor' v-if="showQuotationResult">
                <!-- Valor e parcelamento -->
                <a class="amazing-tooltip">
                    <div class='in-cash'>{{ quotationResult.value }}</div>
                    <span class='forward'>
                        <div class="payments" v-for="(payments, paymentType) in quotationResult.paymentForms">
                            <h5>{{ paymentType }}</h5>
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
            </div>

            <!-- Ícone de alerta -->
            <div class='col-xs-4 col-md-1 alert-icon' style="display: none;">
                <i class="fa fa-exclamation-triangle fa-3x"></i>
            </div>

            <div class='col-xs-4 col-md-1 timeout-icon' style="display: none;">
                <i class="fa fa-clock-o fa-3x"></i>
            </div>

            <div class='okay hidden-xs col-md-8 dynamic' v-show="showQuotationResult">
                <!-- Tempo -->
                <div class='time dynamic-children coluna-time'>{{ quotationResult.time }}</div>

                <!-- Coberturas -->
                <div class='coverage dynamic-children coluna-coverage'>
                    <div class='message-text message-dynamic'></div>
                </div>

                <!-- Outras coberturas -->
                <div class='other-coverage coluna-mensagem dynamic-children coluna-other-coverage'>
                    <div class='message-text message-dynamic limited-text' data-msg-hover=""></div>
                </div>

                <!-- Residência/ID -->
                <div class='additional-info dynamic-children coluna-info'>
                    <div class='vehicle limited-text' data-msg-hover>{{ quotationResult.residence }}</div>
                    <div class='product'>{{ quotationResult.product }}</div>
                    <div class='code btn btn-primary btn-xs fa fa-sign-in'>
                        <a href="#">{{ quotationResult.code }}</a>
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

            <!-- Mensagens de erro -->
            <div class='error hidden-xs col-md-8 dynamic' :style="{ display: displayError }">
                <div class='message-text message-dynamic limited-text' v-html="errorTextMessage"></div>
            </div>
        </template>
    </div>
</template>

<script>
    import { AppConfig } from '../../../../config/app-config.js'

    export default {
        props: ['seguradora', 'result'],
        data(){
            return {
                loadingQuotation: false,
                errorTextMessage: null,
                displayError: 'none',
                showQuotationResult: false,
                quotationResult: {
                    time: null,
                    value: null,
                    franchise: null,
                    code: null,
                    residence: null,
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
            fayeResult(){
                return this.$store.state.faye.result
            },
            imagesPath(){
                return AppConfig.$options.imagesPath
            }
        },
        watch: {
            fayeResult(result){
                if(!result.type || result.type != 'RESIDENCE')
                    return

                if(result.action == 'passo')
                    this.stepRun(result.params)
                else if(result.action == 'logar' || result.action == 'cotar')
                    this.eachInsurers(result.params)
            }
        },
        methods: {
            insurerQuote(e, insurer){
                this.$store.commit('ResidenceResult/setInsurerQuote', insurer)
            },
            stepRun(insurerParams){
                if(this.seguradora.seguradora != insurerParams.seguradora)
                    return

                this.loadingQuotation = true
                this.displayError     = 'flex'
                this.errorTextMessage = insurerParams.mensagem.replace(/\n/, '<br>')
            },
            eachInsurers(insurersParams){
                var self = this

                insurersParams.forEach(currentValue => {
                    if(self.seguradora.seguradora != currentValue.seguradora)
                        return

                    self.updateInsurer(currentValue)
                })
            },
            updateInsurer(insurerParams){
                this.loadingQuotation    = false
                this.displayError        = 'none'
                this.errorTextMessage    = null
                this.showQuotationResult = true

                // Quotation result
                this.quotationResult.time             = insurerParams.tempo
                this.quotationResult.value            = insurerParams.valor
                this.quotationResult.paymentForms     = JSON.parse(insurerParams.valor_parcelado)
                this.quotationResult.franchise        = insurerParams.franquia
                this.quotationResult.code             = insurerParams.codigo
                this.quotationResult.residence        = insurerParams.residencia
                this.quotationResult.product          = insurerParams.produto
                this.quotationResult.message          = insurerParams.mensagem.replace(/\n/, '<br>')
                this.quotationResult.messageHover     = ''
                this.quotationResult.adjustments      = insurerParams.mensagem_ajuste.replace(/\n/, '<br>')
                this.quotationResult.adjustmentsHover = ''

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
            },
            showPopupMessage(event){
                let target       = jQuery(event.target)
                let messageHover = target.data('msg-hover')

                if(messageHover.length === 0)
                    return

                let popupMessage = jQuery('#popup_message')
                let posX         = target.offset().left
                let posY         = target.offset().top

                popupMessage.html(messageHover)

                let popUpWidth  = popupMessage.width() + 35
                let popUpHeight = popupMessage.height() + 35

                if (target.parent('div.error').length) {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', posX + ((target.width() / 2) - popUpWidth))
                } else {
                    popupMessage.css('top', posY - popUpHeight)
                    popupMessage.css('left', posX - popUpWidth)
                }

                popupMessage.fadeIn('fast')
            },
            hidePopupMessage(event){
                jQuery('#popup_message').hide()
            },
        }
    }
</script>

<style scoped>
    .forward .payments {
        display: inline-block;
        margin-right: 30px;
        vertical-align: top;
    }
</style>
