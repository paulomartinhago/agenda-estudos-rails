<template>
    <section>
        <div id="sessao_tipo_do_seguro">
            <div class="row" id="renovacao">
                <div class="col-xs-12">
                    <h3>
                        <icon name="repeat"></icon> Tipo do seguro
                        <form-help
                            title="Tipo do seguro"
                            description="Se for o primeiro seguro selecione a opção Novo Negócio, caso contrário selecione a companhia do seu seguro vigente.">
                        </form-help>
                    </h3>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group" :class="{ 'has-error': errors.has(ciasVigentes.name) }">
                        <label :for="ciasVigentes.id">{{ ciasVigentes.label }}</label>
                        <select2 :options="ciasVigentes.options" :name="ciasVigentes.name" :id="ciasVigentes.id" :disabled="ciasVigentes.disabled" :placeholder="ciasVigentes.placeholder" v-model="ciaVigente"></select2>
                        <div class="error-message" v-if="errors.has(ciasVigentes.name)">{{ errors.first(ciasVigentes.name) }}</div>
                    </div>
                </div>
            </div>

            <div ref="hasRenovation">
                <div class="row renovacao">
                    <div class="col-xs-12 col-md-6" v-if="bonusAnterior">
                        <div class="form-group">
                            <label>Bônus anterior</label>
                            <input type="text" class="form-control" readonly v-model="bonusAnterior">
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cotacao[bonus]') }">
                            <label for="cotacao_bonus">Classe de bônus futura</label>
                            <form-help
                                title="Classe de bônus a ser calculada"
                                description="Deve-se informar a classe de bônus que será calculada na nova vigência. Por exemplo: Se a classe de bônus vigente é 2, então você irá informar neste campo o valor 3.">
                            </form-help>
                            <select class="form-control" id="cotacao_bonus" name="cotacao[bonus]" v-model="classeBonusFutura">
                                <option v-for="item in classeBonusFuturaOptions" :value="item">{{ item }}</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cotacao[bonus]')">{{ errors.first('cotacao[bonus]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cotacao[qtd_sinistros]') }">
                            <label class="lb-rd-esq" for="cotacao_qtd_sinistros">Quantidade de Sinistros <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="cotacao_qtd_sinistros" name="cotacao[qtd_sinistros]" min="0" data-vv-as="Quantidade de Sinistros" v-validate="{ rules: { required: true, numeric: true } }" v-model="quantidadeSinistros">
                            <div class="error-message" v-if="errors.has('cotacao[qtd_sinistros]')">{{ errors.first('cotacao[qtd_sinistros]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{'has-error': errors.has('cotacao[final_apolice]')}">
                            <label for="cotacao_final_apolice">Data Final da Apólice Vigente</label>
                            <input type="text" class="form-control" id="cotacao_final_apolice" name="cotacao[final_apolice]" v-mask="'##/##/####'" data-vv-as="Data Final da Apólice Vigente" v-model="dataFinalApoliceVigente" />
                            <div class="error-message" v-if="errors.has('cotacao[final_apolice]')">{{ errors.first('cotacao[final_apolice]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cotacao[apolice_anterior]') }">
                            <label for="cotacao_apolice_anterior">Número da Apólice Vigente</label>
                            <input type="text" class="form-control" id="cotacao_apolice_anterior" name="cotacao[apolice_anterior]" v-model="numeroApoliceVigente" />
                            <div class="error-message" v-if="errors.has('cotacao[apolice_anterior]')">{{ errors.first('cotacao[apolice_anterior]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cotacao[codigo_identificacao]') }">
                            <label for="cotacao_codigo_identificacao">C.I Vigente</label>
                            <input type="text" class="form-control" id="cotacao_codigo_identificacao" name="cotacao[codigo_identificacao]" v-model="ciVigente" />
                            <div class="error-message" v-if="errors.has('cotacao[codigo_identificacao]')">{{ errors.first('cotacao[codigo_identificacao]') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import _ from 'lodash'
    import FormHelp from './../../Help/FormHelp.vue'
    import Select2 from './../../Select2/Select2.vue'
    import jQuery from 'jquery'

    export default {
        components: {
            FormHelp,
            Select2
        },
        data(){
            return {
                classeBonusFuturaOptions: [...Array(11).keys()],
                ciasVigentes: {
                    id: 'cotacao_renovacao',
                    name: 'cotacao[renovacao]',
                    label: 'Cia Vigente',
                    disabled: true,
                    placeholder: 'Carregando...',
                    options: [
                        { id: 'novo', text: 'NOVO NEGÓCIO' }
                    ]
                },
                ciaVigente: 'novo',
                bonusAnterior: null,
                classeBonusFutura: 0,
                quantidadeSinistros: 0,
                dataFinalApoliceVigente: '',
                numeroApoliceVigente: '',
                ciVigente: ''
            }
        },
        computed: {
            seguradoras(){
                return this.$store.state.seguradoras
            },
            orderedInsurers() {
                return _.orderBy(this.seguradoras, 'name')
            },
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            }
        },
        mounted(){
            jQuery(this.$refs.hasRenovation).hide()
        },
        watch: {
            orderedInsurers(value){
                // Popular cia vigente com seguradoras
                let insurers = []
                value.forEach(item => insurers.push({ id: item.shortname, text: item.name }))

                this.ciasVigentes.options  = this.ciasVigentes.options.concat(insurers)
                this.ciasVigentes.disabled = false
            },
            ciaVigente(value){
                let hasRenovation = jQuery(this.$refs.hasRenovation)

                if(value == 'novo'){
                    hasRenovation.slideUp('slow')
                    this.bonusAnterior           = null
                    this.classeBonusFutura       = 0
                    this.quantidadeSinistros     = 0
                    this.dataFinalApoliceVigente = ''
                    this.numeroApoliceVigente    = ''
                    this.ciVigente               = ''

                    return
                }

                hasRenovation.slideDown('slow')
            },
            quotation(quotation){
                if( ! quotation.tipo_seguro )
                    return

                this.ciaVigente              = quotation.tipo_seguro.renovacao || 'novo'
                this.bonusAnterior           = quotation.tipo_seguro.bonus_anterior || null
                this.classeBonusFutura       = quotation.tipo_seguro.bonus || 0
                this.quantidadeSinistros     = quotation.tipo_seguro.qtd_sinistros || 0
                this.dataFinalApoliceVigente = quotation.tipo_seguro.final_apolice || ''
                this.numeroApoliceVigente    = quotation.tipo_seguro.apolice_anterior || ''
                this.ciVigente               = quotation.tipo_seguro.codigo_identificacao || ''
            }
        }
    }
</script>
