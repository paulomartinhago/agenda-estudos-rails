<template>
    <section>
        <div class="row">
            <div class="col-xs-12">
                <h3><i class="fa fa-repeat"></i> Tipo do seguro</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-xs-12">
                <div class="form-group">
                    <label for="cotacao_renovacao">Cia Vigente</label>
                    <select id="cotacao_renovacao" name="cotacao[renovacao]" ref="renovation">
                        <option value="novo">NOVO NEGÓCIO</option>
                        <option v-for="insurer in orderedInsurers" :value="insurer.shortname">{{ insurer.name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div ref="hasRenovation">
            <div class="row">
                <div class="col-md-3 col-xs-6">
                    <div class="form-group">
                        <label for="cotacao_bonus">Classe de bônus futura</label>
                        <form-help
                            title="Classe de bônus a ser calculada"
                            description="Deve-se informar a classe de bônus que será calculada na nova vigência. Por exemplo: Se a classe de bônus vigente é 2, então você irá informar neste campo o valor 3.">
                        </form-help>
                        <select class="form-control" id="cotacao_bonus" name="cotacao[bonus]">
                            <option v-for="item in classeBonusFuturaOptions" :value="item">{{ item }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3 col-xs-6">
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[qtd_sinistros]') }">
                        <label class="lb-rd-esq" for="cotacao_qtd_sinistros">Quantidade de Sinistros <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="cotacao_qtd_sinistros" name="cotacao[qtd_sinistros]" min="0" data-vv-as="Quantidade de Sinistros" v-validate="{ rules: { required: true, numeric: true } }" v-model="quantidadeSinistros">
                        <div class="error-message" v-if="errors.has('cotacao[qtd_sinistros]')">{{ errors.first('cotacao[qtd_sinistros]') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import _ from 'lodash'
    import FormHelp from './../../Help/FormHelp.vue'

    export default {
        components: {
            FormHelp
        },
        data(){
            return {
                classeBonusFuturaOptions: [...Array(11).keys()],
                quantidadeSinistros: 0
            }
        },
        computed: {
            seguradoras(){
                return this.$store.state.seguradoras
            },
            orderedInsurers() {
                return _.orderBy(this.seguradoras, 'name')
            }
        },
        mounted() {
            let hasRenovation = jQuery(this.$refs.hasRenovation)

            hasRenovation.hide()

            jQuery(this.$refs.renovation).select2({
                theme: 'bootstrap',
                width: '100%'
            }).on('change', function (){
                if(this.value == 'novo'){
                    hasRenovation.slideUp('slow')
                    return
                }

                hasRenovation.slideDown('slow')
            }).on(
                'select2:close',
                function () {
                    $(this).focus()
                }
            )
        }
    }
</script>
