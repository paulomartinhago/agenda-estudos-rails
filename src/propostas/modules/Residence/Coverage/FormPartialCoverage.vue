<template>
    <section>
        <div class='row'>
            <div class="col-xs-12">
                <h3><i class="fa fa-bar-chart"></i> Coberturas</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Danos elétricos</label>
                    <form-help
                        title="Cobertura de danos elétricos"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[danos_eletricos]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Tubulações</label>
                    <form-help
                        title="Cobertura de tubulações"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[tubulacoes]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Pagamento de aluguel</label>
                    <form-help
                        title="Cobertura de pagamento de aluguel"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[pagamento_aluguel]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Vidros</label>
                    <form-help
                        title="Cobertura de vidros"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[vidros]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Recomposição de documentos</label>
                    <form-help
                        title="Cobertura de recomposição de documentos"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[recomposicao_documentos]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Familiar</label>
                    <form-help
                        title="Cobertura familiar"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[familiar]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Roubo/Furto</label>
                    <form-help
                        title="Cobertura de roubo/furto"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[roubo]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Vento</label>
                    <form-help
                        title="Cobertura de vento"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[vento]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Impacto de veículo</label>
                    <form-help
                        title="Cobertura de impacto de veículo"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[impacto_veiculo]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Incêndio</label>
                    <form-help
                        title="Cobertura de incêndio"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[incendio]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Danos morais</label>
                    <form-help
                        title="Cobertura de danos morais"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[danos_morais]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Desmoronamento</label>
                    <form-help
                        title="Cobertura de desmoronamento"
                        description="...">
                    </form-help>
                    <div class="input-group">
                        <span class="input-group-addon">R$</span>
                        <input class="form-control double" name="cobertura[desmoronamento]" type="text" />
                        <span class="input-group-addon">,00</span>
                    </div>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label>Verba</label>
                    <select class="form-control" name="cobertura[verba]">
                        <option value="">- Selecione - </option>
                        <option v-for="verba in verbas" :value="verba">{{ verba }}</option>
                    </select>
                </div>
            </div>
        </div><!-- end row -->
    </section>
</template>

<script>
    import FormHelp from './../../Help/FormHelp.vue'
    import { AppConfig } from '../../../../config/app-config.js'

    export default {
        components: {
            FormHelp
        },
        mounted() {
            this.initVerbas()
        },
        computed: {
            verbas(){
                return this.$store.state.ResidenceCoverage.verbas
            },
        },
        watch: {
            //
        },
        methods: {
            initVerbas(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/verbas').then(response => {
                    this.$store.commit('ResidenceCoverage/setVerbas', response.body)
                })
            },
        }
    }
</script>
