<template>
    <section>
        <div id="sessao_vigencia">
            <div class="row" id="cotacao">
                <div class="col-xs-12">
                    <h3><icon name="calendar"></icon> Vigência</h3>
                </div>
            </div>

            <div class="row" v-if="hasQuotation">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group">
                        <label for="id_cotacao">Cotação ID</label>
                        <input class="form-control" id="id_cotacao" name="id_cotacao" type="text" disabled />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[inicio_vigencia]')}">
                        <label for="cotacao_inicio_vigencia">Início Vigência <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="cotacao_inicio_vigencia" name="cotacao[inicio_vigencia]" v-mask="'##/##/####'" v-validate="{ rules: { required: true, date_valid: true } }" data-vv-as="Início Vigência" v-model="inicio_vigencia" />
                        <div class="error-message" v-if="errors.has('cotacao[inicio_vigencia]')">{{ errors.first('cotacao[inicio_vigencia]') }}</div>
                    </div>
                </div>

                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[termino_vigencia]')}">
                        <label for="cotacao_termino_vigencia">Fim Vigência <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="cotacao_termino_vigencia" name="cotacao[termino_vigencia]" v-mask="'##/##/####'" v-validate="{ rules: { required: true, date_valid: true } }" data-vv-as="Fim Vigência" v-model="termino_vigencia" />
                        <div class="error-message" v-if="errors.has('cotacao[termino_vigencia]')">{{ errors.first('cotacao[termino_vigencia]') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import moment from 'moment'
    moment.locale('pt-br')

    export default {
        props: [
            'type'
        ],
        data(){
            return {
                inicio_vigencia: moment().format('DD/MM/YYYY'),
                termino_vigencia: moment().add(1, 'years').calendar()
            }
        },
        computed: {
            hasQuotation: function() {
                return this.$store.state.hasQuotation
            },
            quotation(){
                return this.$store.getters[this.type == 'RESIDENCE' ? 'ResidenceForm/quotation' : 'VehicleForm/quotation']
            }
        },
        watch: {
            inicio_vigencia(value){
                if(moment(value, 'DD/MM/YYYY', true).isValid())
                    this.termino_vigencia = moment(value, 'DD/MM/YYYY').add(1, 'years').calendar()
            },
            quotation(quotation){
                if( ! quotation.vigencia || ! quotation.vigencia.inicio_vigencia || ! quotation.vigencia.termino_vigencia )
                    return

                this.inicio_vigencia = quotation.vigencia.inicio_vigencia

                this.$nextTick(() => {
                    this.termino_vigencia = quotation.vigencia.termino_vigencia
                })
            }
        }
    }
</script>
