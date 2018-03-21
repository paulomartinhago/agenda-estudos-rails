<template>
    <section>
        <div id="sessao_avaliacao_de_risco">
            <div class="row" id="avaliacao">
                <div class="col-xs-12">
                    <h3><icon name="question-circle"></icon> Avaliação de risco</h3>
                </div>
            </div>

            <div class='row'>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[garagem_residencia]') }">
                        <label for="cotacao_garagem_residencia">Garagem na residência</label>
                        <select class="form-control" id="cotacao_garagem_residencia" name="cotacao[garagem_residencia]" v-model="garagemResidencia">
                            <option value="sim">Sim, sem portão eletrônico</option>
                            <option value="sim_com_portao">Sim, com portão eletrônico</option>
                            <option value="nao">Não</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[garagem_residencia]')">{{ errors.first('cotacao[garagem_residencia]') }}</div>
                    </div>
                </div>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[garagem_trabalho]') }">
                        <label for="cotacao_garagem_trabalho">Garagem no trabalho</label>
                        <select class="form-control" id="cotacao_garagem_trabalho" name="cotacao[garagem_trabalho]" v-model="garagemTrabalho">
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                            <option value="nu">Não utiliza para trabalhar</option>
                            <option value="nao_trabalha">Não trabalha</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[garagem_trabalho]')">{{ errors.first('cotacao[garagem_trabalho]') }}</div>
                    </div>
                </div>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[garagem_estudo]') }">
                        <label for="cotacao_garagem_estudo">Garagem no Estudo/Curso</label>
                        <select class="form-control" id="cotacao_garagem_estudo" name="cotacao[garagem_estudo]" v-model="garagemEstudoCurso">
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                            <option value="nu">Não utiliza para estudar</option>
                            <option value="nao_estuda">Não estuda</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[garagem_estudo]')">{{ errors.first('cotacao[garagem_estudo]') }}</div>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='col-xs-12 col-md-6'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[utilizacao_veiculo]') }">
                        <label for="cotacao_utilizacao_veiculo">Utilização do veículo</label>
                        <select class="form-control" id="cotacao_utilizacao_veiculo" name="cotacao[utilizacao_veiculo]" v-model="utilizacaoVeiculo">
                            <option value="pessoal">Exclusivamente para locomoção diária</option>
                            <option value="trabalho">Para uso comercial ou visitar clientes / fornecedores</option>
                            <option value="ambos">Locomoção diária e uso comercial</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[utilizacao_veiculo]')">{{ errors.first('cotacao[utilizacao_veiculo]') }}</div>
                    </div>
                </div>
                <div class='col-xs-12 col-md-6'>
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[carros_residencia]')}">
                        <label for="cotacao_carros_residencia">Quantidade de veículos na residência <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="cotacao_carros_residencia" name="cotacao[carros_residencia]" v-validate="{ rules: { required: true, numeric: true } }" data-vv-as="Quantidade de veículos na residência" v-model="quantidadeVeiculosResidencia" />
                        <div class="error-message" v-if="errors.has('cotacao[carros_residencia]')">{{ errors.first('cotacao[carros_residencia]') }}</div>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[vitima_furto]') }">
                        <label for="cotacao_vitima_furto">Vítima roubo ou furto de veículos?</label>
                        <form-help
                            title="Vitima de furto ou roubo?"
                            description="Nos últimos 2 anos o principal condutor foi vítima de roubo ou furto de veículos?">
                        </form-help>
                        <select class="form-control" id="cotacao_vitima_furto" name="cotacao[vitima_furto]" v-model="vitimaRoubo">
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[vitima_furto]')">{{ errors.first('cotacao[vitima_furto]') }}</div>
                    </div>
                </div>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[distancia_residencia_trabalho]') }">
                        <label for="cotacao_distancia_residencia_trabalho">Distância do trabalho</label>
                        <select class="form-control" id="cotacao_distancia_residencia_trabalho" name="cotacao[distancia_residencia_trabalho]" v-model="distanciaTrabalho">
                            <option value="">Não informado</option>
                            <option value="ATE_10_KM">Até 10 km</option>
                            <option value="ATE_20_KM">Até 20 km</option>
                            <option value="ATE_30_KM">Até 30 km</option>
                            <option value="ATE_40_KM">Até 40 km</option>
                            <option value="ACIMA_DE_40KM">Acima de 40 km</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[distancia_residencia_trabalho]')">{{ errors.first('cotacao[distancia_residencia_trabalho]') }}</div>
                    </div>
                </div>
                <div class='col-xs-12 col-md-4'>
                    <div class="form-group" :class="{'has-error': errors.has('cotacao[km_mensal]')}">
                        <label for="cotacao_km_mensal">Km Mensal <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="cotacao_km_mensal" name="cotacao[km_mensal]" v-validate="{ rules: { required: true, numeric: true } }" data-vv-as="Km Mensal" v-model="kmMensal" />
                        <div class="error-message" v-if="errors.has('cotacao[km_mensal]')">{{ errors.first('cotacao[km_mensal]') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import FormHelp from './../../Help/FormHelp.vue'

    export default {
        components: {
            FormHelp
        },
        data(){
            return {
                garagemResidencia: 'sim',
                garagemTrabalho: 'sim',
                garagemEstudoCurso: 'sim',
                utilizacaoVeiculo: 'pessoal',
                quantidadeVeiculosResidencia: '',
                vitimaRoubo: 'false',
                distanciaTrabalho: '',
                kmMensal: '',
            }
        },
        computed: {
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            }
        },
        watch: {
            quotation(quotation){
                if( ! quotation.avaliacao_risco )
                    return

                this.garagemResidencia            = quotation.avaliacao_risco.garagem_residencia || 'sim'
                this.garagemTrabalho              = quotation.avaliacao_risco.garagem_trabalho || 'sim'
                this.garagemEstudoCurso           = quotation.avaliacao_risco.garagem_estudo || 'sim'
                this.utilizacaoVeiculo            = quotation.avaliacao_risco.utilizacao_veiculo || 'pessoal'
                this.quantidadeVeiculosResidencia = quotation.avaliacao_risco.carros_residencia || ''
                this.vitimaRoubo                  = quotation.avaliacao_risco.vitima_furto || 'false'
                this.distanciaTrabalho            = quotation.avaliacao_risco.distancia_residencia_trabalho || ''
                this.kmMensal                     = quotation.avaliacao_risco.km_mensal || ''
            }
        }
    }
</script>
