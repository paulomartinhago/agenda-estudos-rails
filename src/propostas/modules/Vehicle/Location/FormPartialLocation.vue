<template>
    <section>
        <div id="sessao_localizacao">
            <div class="row" id="localizacao">
                <div class="col-xs-12">
                    <h3><icon name="map-marker"></icon> Localização</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[cep_circula]')}">
                        <label for="cotacao_cep_circula">CEP de Circulação <span class="text-danger">*</span></label>
                        <input class="form-control" id="cotacao_cep_circula" name="cotacao[cep_circula]" type="text" v-model="cepCirculacao" v-mask="'#####-###'" v-validate="{ rules: { required: true, regex: /^(\d{5}-\d{3})$/ } }" data-vv-as="CEP de Circulação" />
                        <div class="error-message" v-if="errors.has('cotacao[cep_circula]')">{{ errors.first('cotacao[cep_circula]') }}</div>
                    </div>
                </div>

                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[cep_pernoite]')}">
                        <label for="cotacao_cep_pernoite">CEP de Pernoite <span class="text-danger">*</span></label>
                        <input class="form-control" id="cotacao_cep_pernoite" name="cotacao[cep_pernoite]" type="text" v-model="cepPernoite" v-mask="'#####-###'" v-validate="{ rules: { required: true, regex: /^(\d{5}-\d{3})$/ } }" data-vv-as="CEP de Pernoite" />
                        <div class="error-message" v-if="errors.has('cotacao[cep_pernoite]')">{{ errors.first('cotacao[cep_pernoite]') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return {
                cepCirculacao: '',
                cepPernoite: ''
            }
        },
        computed: {
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            }
        },
        watch: {
            cepCirculacao(value){
                this.cepPernoite = value
            },
            quotation(quotation){
                if( ! quotation.localizacao )
                    return

                this.cepCirculacao = quotation.localizacao.cep_circula || ''

                this.$nextTick(() => {
                    this.cepPernoite   = quotation.localizacao.cep_pernoite || ''
                })
            }
        }
    }
</script>
