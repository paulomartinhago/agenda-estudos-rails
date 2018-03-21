<template>
    <section>
        <div class='row'>
            <div class="col-xs-12">
                <h3><i class="fa fa-home"></i> Dados do imóvel</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Segmento</label>
                    <select class="form-control" name="imovel[segmento]">
                        <option value="">- Selecione - </option>
                        <option v-for="segmento in segmentos" :value="segmento">{{ segmento }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Tipo de construção</label>
                    <select class="form-control" name="imovel[tipo_construcao]">
                        <option value="">- Selecione - </option>
                        <option v-for="tipoConstrucao in tiposConstrucoes" :value="tipoConstrucao">{{ tipoConstrucao }}</option>
                    </select>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-xs-6">
                <div class="form-group">
                    <label>Tipo de residência</label>
                    <select class="form-control" name="imovel[tipo_residencia]">
                        <option value="">- Selecione - </option>
                        <option v-for="tipoResidencia in tiposResidencias" :value="tipoResidencia">{{ tipoResidencia }}</option>
                    </select>
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Tipo de logradouro</label>
                    <select class="form-control" name="imovel[tipo_logradouro]">
                        <option value="">- Selecione - </option>
                        <option v-for="tipoLogradouro in tiposLogradouros" :value="tipoLogradouro">{{ tipoLogradouro }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Logradouro</label>
                    <input class="form-control" name="imovel[logradouro]" type="text" />
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Número</label>
                    <input class="form-control" name="imovel[numero]" type="text" />
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Complemento</label>
                    <input class="form-control" name="imovel[complemento]" type="text" />
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>CEP</label>
                    <input class="form-control" name="imovel[cep]" type="text" />
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Bairro</label>
                    <input class="form-control" name="imovel[bairro]" type="text" />
                </div>
            </div>
        </div><!-- end row -->

        <div class="row">
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Cidade</label>
                    <input class="form-control" name="imovel[cidade]" type="text" />
                </div>
            </div>
            <div class="col-md-3 col-xs-6">
                <div class="form-group">
                    <label>Estado</label>
                    <select class="form-control" name="imovel[estado]">
                        <option value="">- Selecione - </option>
                        <option v-for="estado in estados" :value="estado.uf">{{ estado.name }}</option>
                    </select>
                </div>
            </div>
        </div><!-- end row -->
    </section>
</template>

<script>
    import { AppConfig } from '../../../../config/app-config.js'

    export default {
        mounted() {
            this.initSegmentos()
            this.initTiposConstrucoes()
            this.initTiposResidencias()
            this.initTiposLogradouros()
            this.initEstados()
        },
        computed: {
            segmentos(){
                return this.$store.state.Residence.segmentos
            },
            tiposConstrucoes(){
                return this.$store.state.Residence.tiposConstrucoes
            },
            tiposResidencias(){
                return this.$store.state.Residence.tiposResidencias
            },
            tiposLogradouros(){
                return this.$store.state.Residence.tiposLogradouros
            },
            estados(){
                return this.$store.state.Residence.estados
            },
        },
        watch: {
            //
        },
        methods: {
            initSegmentos(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/segmentos').then(response => {
                    this.$store.commit('Residence/setSegmentos', response.body)
                })
            },
            initTiposConstrucoes(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/tipos_construcoes').then(response => {
                    this.$store.commit('Residence/setTiposConstrucoes', response.body)
                })
            },
            initTiposResidencias(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/tipos_residencias').then(response => {
                    this.$store.commit('Residence/setTiposResidencias', response.body)
                })
            },
            initTiposLogradouros(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/tipos_logradouros').then(response => {
                    this.$store.commit('Residence/setTiposLogradouros', response.body)
                })
            },
            initEstados(){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_residenciais/estados').then(response => {
                    this.$store.commit('Residence/setEstados', response.body)
                })
            },
        }
    }
</script>
