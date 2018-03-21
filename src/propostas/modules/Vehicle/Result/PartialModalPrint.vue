<template lang="html">
    <bootstrap-modal ref="reportModal" :need-header="true" :need-footer="true" :closed="closedModal" size="large">
        <div slot="title">Relatório</div><!-- end title -->

        <div slot="body">
            <div class="row">
                <div class="col-md-10"></div>
                <div class="col-md-2">
                    <a href="#" @click.prevent="showConfig = !showConfig" class="btn btn-warning btn-xs">
                        <icon name="cog"></icon> <strong>Opções</strong>
                    </a>
                </div>
            </div>

            <div class="row exibir-configuracoes">
                <div class="col-md-12" v-show="!showConfig">
                    <h4 class="text-center">Selecione as seguradoras para gerar o relatório</h4>
                    <div class="panel panel-default" v-for="(coverage, index) in options.coverages" :key="coverage.number">
                        <div class="panel-heading">
                            <div class="row check-title">
                                <label class="custom-checkbox">Cobertura {{ coverage.number }} <span class="label label-success" v-if="index === 0">ÚLTIMA CALCULADA</span>
                                    <input type="checkbox" checked="index === 0" class="checkall" @change="checkInsurers">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12 col-md-3" v-for="price in coverage.prices" :key="price.priceId">
                                    <div class="row">
                                        <div class="col-md-12 padding-price">
                                            <div class=bording-price>
                                                <div class="row">
                                                    <label class="custom-checkbox">
                                                        {{ price.insurer }}
                                                        <input type="checkbox" class="checkmark" name="seguradoras[]" :value="price.priceId" :checked="index === 0">
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12"><i class="fa fa-money"></i> {{ price.value }}</div>
                                                </div>
                                                <div class="row">    
                                                    <div class="col-md-8"><i class="fa fa-percent"></i> {{ price.commission }}</div>
                                                </div>    
                                                <div class="row">
                                                    <div class="col-md-12"><strong>{{ price.product }}</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- end col -->
            </div>

            <div class="row exibir-configuracoes">
                <div class="col-md-12" v-show="showConfig">
                    <div class="row">
                        <div class="col-xs-12 col-md-8 col-md-offset-2">
                            <h4>Selecione a quantidade de parcelas para exibir</h4>
                            <select class="form-control" name="parcela" v-model="options.parcela">
                                <option v-for="parcela in parcelas" :value="parcela" :key="parcela">{{ parcela + ' ' + (parcela == 1 ? 'vez' : 'vezes') }}</option>
                            </select>
                            <br>
                        </div>
                        <div class="col-xs-12 col-md-8 col-md-offset-2">
                            <h4>Selecione o tipo do relatório</h4>
                            <select class="form-control" name="relatorio" v-model="options.relatorio">
                                <option v-for="(value, key) in relatorios" :value="key" :key="key">{{ value }}</option>
                            </select>
                            <br>
                        </div>
                        <div class="col-xs-12 col-md-12" v-if="!options.hasLogo && !token">
                            <div class="text-danger">
                                <p style="text-align: center !important">
                                    Sua corretora não possui logo cadastrada:
                                    <a :href="options.corretora_edit" target="_blank">Adicionar</a>
                                </p>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-12" v-if="!token">
                            <p class="bg-warning message-attention">
                                ATENÇÃO: Nobre Corretor(a), o relatório em questão ainda está em desenvolvimento e pode conter informações divergentes em relação as seguradoras. Caso verifique que algo pode ser melhorado, favor entrar em contato conosco e informar. Agradecemos a sua ajuda e compreensão!
                            </p>
                        </div>
                    </div>
                </div><!-- end col -->
            </div><!-- end row -->
        </div><!-- end body -->

        <div slot="footer">
            <div class="row">
                <div class="col-md-6 text-rigth" :class="{ 'has-error': errors.has('other_email[]') }" v-if="!token">
                    <input type="text" class="form-control valid-email" name="other_email[]" placeholder="E-mail" :value="options.email" v-validate="{ rules: { email: true } }" data-vv-as="E-mail" :disabled="isDetailedReport">
                    <div class="error-message" v-if="errors.has('other_email[]')">{{ errors.first('other_email[]') }}</div>
                </div>
                <div class="col-md-6 text-left">
                    <button type="button" class="btn btn-warning" @click.prevent="sendReportToEmail" :disabled="isDetailedReport" v-if="!token">
                        <icon name="envelope"></icon> Enviar por E-mail</a>
                    </button>
                    <button type="button" class="btn btn-info" @click.prevent="downloadReport($event, 'pdf')">
                        <icon name="file-pdf-o"></icon> Gerar PDF</a>
                    </button>
                    <button type="button" class="btn btn-info" @click.prevent="downloadReport($event, 'xls')" :disabled="isDetailedReport">
                        <icon name="file-excel-o"></icon> Gerar XLS</a>
                    </button>
                </div>
            </div>
        </div><!-- end footer -->
    </bootstrap-modal>
</template>

<script>
    import BootstrapModal from 'vue2-bootstrap-modal'
    import jQuery from 'jquery'
    import { AppConfig } from '../../../../config/app-config.js'
    import { Validator } from 'vee-validate'

    export default {
        components: {
            BootstrapModal,
        },
        props: [
            'printModalResult'
        ],
        data(){
            return {
                openModal: false,
                showConfig: false,
                parcelas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                relatorios: {
                    's': 'Simples',
                    'c': 'Completo',
                    'd': 'Detalhado'
                },
            }
        },
        computed: {
            token(){
                return AppConfig.$options.token
            },
            options(){
                return this.printModalResult
            },
            isDetailedReport(){
                return this.options.relatorio === 'd'
            },
            inputEmail(){
                return this.$el.querySelector('input[name="other_email[]"]')
            }
        },
        watch: {
            options(value){
                this.openModal = value.openModal || false
            },
            openModal(value){
                if(value)
                    this.$refs.reportModal.open()
            }
        },
        methods: {
            closedModal(){
                this.openModal = false
            },
            sendReportToEmail(){
                this.$store.dispatch('exibeMensagemCarregamento', 'Enviando relatório por e-mail...')

                this.$http.get(this.options.action_relatorio, this.parseParams('email')).then(response => {
                    this.$store.dispatch('exibeMensagemCarregamento', response.body.message)
                    this.$store.dispatch('closeLoading', 3000)
                })
            },
            downloadReport(e, typeOutput){
                let params = this.parseParams(typeOutput).params

                if(this.token)
                    params.token = this.token

                window.location.href = this.options.action_relatorio + '?' + jQuery.param(params)
            },
            parseParams(typeOutput){
                let formData = {
                    params: {
                        seguradoras: [],
                        cotacao_id: this.options.quotationId,
                        parcela: this.$el.querySelector('select[name="parcela"]').value,
                        relatorio: this.$el.querySelector('select[name="relatorio"]').value,
                        other_email: [],
                    }
                }

                formData.params[typeOutput] = true

                if(this.inputEmail)
                    formData.params.other_email.push(this.inputEmail.value)

                this.$el.querySelectorAll('input[name="seguradoras[]"]:checked').forEach(item => {
                    formData.params.seguradoras.push(item.value)
                })

                return formData
            },
            checkInsurers(e){
                const checked = jQuery(e.target).is(':checked')

                jQuery(e.target).parents('div.panel-default').find('input.checkmark').each(
                    (index, obj) => jQuery(obj).prop("checked", checked)
                )
            }
        }
    }
</script>

<style src="../../../../assets/propostas/sass/modal-report.scss" lang="sass" scoped></style>
