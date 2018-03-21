<template>
    <section>
        <div class="row">
            <div class="col-xs-12">
                <hr>
                <input class="btn btn-primary" type="submit" value="Calcular em todas">
                <a href="#" class="btn btn-warning" target="_blank">Imprimir</a>
                <label>
                    <input type="checkbox" @change="modifyComissionAccess()"> Ocultar comissão
                </label>
            </div>
            <div class="col-xs-12">
                <div id="resultados" class="can-drop">
                    <div id ="result-title-bar" class='row title hidden-xs' style="position: initial; background: none; width: 100%;">
                        <div class='coluna-seguradora'><a onclick="ordenarPorSeguradora();"><i class="fa fa-heartbeat"></i> Seguradora <i class="fa fa-sort"></i> </a></div>
                        <div class='coluna-acoes'><i class="fa fa-play-circle"></i> Comissão</div>
                        <div class='coluna-valor'><a onclick="ordenarPorValor();"><i class="fa fa-money"></i> Valores <i class="fa fa-sort"></i></a></div>

                        <div class='dynamic okay coluna-detalhes-resultado'>
                            <div class='coluna-mensagem dynamic-children coluna-time'><a onclick="ordenarPorTempo();"><i class="fa fa-clock-o"></i> (seg) <i class="fa fa-sort"></i></a></div>
                            <div class='coluna-mensagem dynamic-children coluna-coverage'><i class="fa fa-bar-chart"></i> Coberturas</div>
                            <div class='coluna-mensagem dynamic-children coluna-other-coverage'><i class="fa fa-bar-chart"></i> Outras coberturas</div>
                            <div class='coluna-mensagem dynamic-children coluna-info'><i class="fa fa-info-circle"></i> Residência/ID</div>
                            <div class='coluna-mensagem dynamic-children coluna-messages'><i class="fa fa-comments"></i> Ajustes</div>
                            <div class='coluna-mensagem dynamic-children coluna-messages'><i class="fa fa-comments"></i> Mensagens da seguradora</div>
                        </div>
                    </div><!-- end result-title-bar -->

                    <partial-insurer
                        v-for="seguradora in result.seguradoras"
                        :key="seguradora.id"
                        :seguradora="seguradora"
                        :result="result"
                    >
                    </partial-insurer>

                </div><!-- end resultados -->
            </div>
        </div><!-- end row -->
    </section>
</template>

<script>
    import PartialInsurer from './PartialInsurer.vue'
    import { AppConfig } from '../../../../config/app-config.js'

    export default {
        components: {
            PartialInsurer
        },
        mounted() {
            this.initInsurers()
        },
        data(){
            return {
                result: {}
            }
        },
        methods: {
            modifyComissionAccess(){
                this.result.acesso_comissao = ! this.result.acesso_comissao
            },
            initInsurers(){
                let self = this

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/resultados').then(response => {
                    self.result = response.body
                })
            }
        }
    }
</script>
