<template>
    <section>
        <div id="sessao_condutor_adicional">
            <div class="row" id="condutor-principal">
                <div class="col-xs-12">
                    <h3><icon name="user-plus"></icon> Condutores adicionais</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[cobertura_para_outro_condutor]') }">
                        <label for="cotacao_cobertura_para_outro_condutor">Residem com o principal condutor pessoas na faixa etária de:</label>
                        <select class="form-control" id="cotacao_cobertura_para_outro_condutor" name="cotacao[cobertura_para_outro_condutor]" v-model="coberturaOutroCondutor">
                            <option value="NAO_EXISTE">Não residem</option>
                            <option value="RESIDEM">Entre 18 e 25 anos e não utilizam o veículo</option>
                            <option value="ENTRE_18_E_25_ANOS">Entre 18 e 25 anos e utilizam o veículo</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[cobertura_para_outro_condutor]')">{{ errors.first('cotacao[cobertura_para_outro_condutor]') }}</div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 condutor-adicional" ref="blockCondutorSecundarioSexo">
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[condutor_secundario_sexo]') }">
                        <label for="cotacao_condutor_secundario_sexo">Sexo</label>
                        <select class="form-control" id="cotacao_condutor_secundario_sexo" name="cotacao[condutor_secundario_sexo]" v-model="sexo">
                            <option value=""> - Selecione - </option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="A">Ambos</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[condutor_secundario_sexo]')">{{ errors.first('cotacao[condutor_secundario_sexo]') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import jQuery from 'jquery'

    export default {
        data(){
            return {
                coberturaOutroCondutor: 'NAO_EXISTE',
                sexo: ''
            }
        },
        computed: {
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            },
        },
        mounted(){
            jQuery(this.$refs.blockCondutorSecundarioSexo).hide()
        },
        watch: {
            coberturaOutroCondutor(value){
                if(value != 'NAO_EXISTE' && value != 'RESIDEM'){
                    jQuery(this.$refs.blockCondutorSecundarioSexo).slideDown('slow')
                    return
                }

                jQuery(this.$refs.blockCondutorSecundarioSexo).slideUp('slow')
            },
            quotation(quotation){
                if( ! quotation.condutores_adicionais )
                    return

                if( quotation.condutores_adicionais.cobertura_para_outro_condutor )
                    this.coberturaOutroCondutor = quotation.condutores_adicionais.cobertura_para_outro_condutor

                this.sexo = quotation.condutores_adicionais.condutor_secundario_sexo || ''
            },
        }
    }
</script>
