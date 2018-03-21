<template>
    <section>
        <div id="veiculo-section">
            <div id="sessao_dados_do_veiculo">
                <div class="row" id="veiculo">
                    <div class="col-xs-12">
                        <h3><icon name="car"></icon> Dados do veículo</h3>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-4'>
                        <div class="form-group" :class="{'has-error': errors.has('veiculo[placa]')}">
                            <label for="veiculo_placa">Placa</label>
                            <form-help
                                title="Placa"
                                description="Somente letras e números.">
                            </form-help>
                            <input type="text" class="form-control veiculo" id="veiculo_placa" name="veiculo[placa]" v-mask="'AAA-####'" v-validate="{ rules: { regex: /^(\D{3}-\d{4})$/ } }" data-vv-as="Placa" v-model="placa" @blur="buscarVeiculoPorPlaca" />
                            <div class="error-message" v-if="errors.has('veiculo[placa]')">{{ errors.first('veiculo[placa]') }}</div>
                        </div>
                    </div>
                    <div class='col-xs-12 col-md-4'>
                        <div class="form-group" :class="{'has-error': errors.has('veiculo[chassis]')}">
                            <label for="veiculo_chassi">Chassi</label>
                            <input class="form-control veiculo" id="veiculo_chassi" name="veiculo[chassis]" type="text" v-mask="'XXXXXXXXXXXXXXXXX'" v-validate="{ rules: { regex: /^[a-zA-Z0-9]{17}$/ } }" data-vv-as="Chassi" ref="chassi" v-model="chassi" @blur="decodificarChassi" />
                            <div class="error-message" v-if="errors.has('veiculo[chassis]')">{{ errors.first('veiculo[chassis]') }}</div>
                        </div>
                    </div>
                    <div class='col-xs-12 col-md-4'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[zero_km]') }">
                            <label for="veiculo_zero_km">Zero km?</label>
                            <select class="form-control veiculo" id="veiculo_zero_km" name="veiculo[zero_km]" v-model="zeroKm">
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[zero_km]')">{{ errors.first('veiculo[zero_km]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row veiculo_manual' ref="veiculoManual">
                    <div class='col-xs-12'>
                        <div class="form-group">
                            <div class='input-group'>
                                <label class="checkbox-inline"><input type="checkbox" id="veiculo_manual" :checked="checkboxVeiculoManual" @change="checkboxVeiculoManual = !checkboxVeiculoManual">Selecionar Veículo Manualmente</label>
                            </div>
                            <span class="help-block"><b>Chassi decodificado com sucesso!</b> Caso seja diferente do que consta no documento do veículo, basta marcar opção acima e digitar a Marca, ano e modelo corretos'.</span>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12'>
                        <div class="form-group" :class="{'has-error': errors.has(marcas.name)}">
                            <label :for="marcas.id">{{ marcas.label }} <span class="text-danger">*</span></label>
                            <select2 :options="marcas.options" :name="marcas.name" :id="marcas.id" :disabled="marcas.disabled" :placeholder="marcas.placeholder" v-validate="{ rules: { required: true } }" :data-vv-as="marcas.label" v-model="marca"></select2>
                            <div class="error-message" v-if="errors.has(marcas.name)">{{ errors.first(marcas.name) }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{'has-error': errors.has('veiculo[ano_fab]')}">
                            <label for="veiculo_ano_fab">Ano Fabricação <span class="text-danger">*</span></label>
                            <input type="type" class="form-control" id="veiculo_ano_fab" maxlength="4" name="veiculo[ano_fab]" size="4" v-validate="{ rules: { required: true, numeric: true } }" data-vv-as="Ano Fabricação" v-model="anoFabricacao" />
                            <div class="error-message" v-if="errors.has('veiculo[ano_fab]')">{{ errors.first('veiculo[ano_fab]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{'has-error': errors.has('veiculo[ano_modelo]')}">
                            <label for="veiculo_ano_fab">Ano Modelo <span class="text-danger">*</span></label>
                            <input type="type" class="form-control" id="veiculo_ano_modelo" maxlength="4" name="veiculo[ano_modelo]" size="4" v-validate="{ rules: { required: true, numeric: true } }" data-vv-as="Ano Modelo" ref="anoModelo" v-model="anoModelo" />
                            <div class="error-message" v-if="errors.has('veiculo[ano_modelo]')">{{ errors.first('veiculo[ano_modelo]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12'>
                        <div class="form-group" :class="{'has-error': errors.has(modelos.name)}">
                            <label :for="modelos.id">{{ modelos.label }} <span class="text-danger">*</span></label>
                            <select2 :options="modelos.options" :name="modelos.name" :id="modelos.id" :disabled="modelos.disabled" :placeholder="modelos.placeholder" v-validate="{ rules: { required: true } }" :data-vv-as="modelos.label" v-model="modelo"></select2>
                            <div class="error-message" v-if="errors.has(modelos.name)">{{ errors.first(modelos.name) }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[tipo_combustivel]') }">
                            <label for="veiculo_tipo_combustivel">Tipo Combustível</label>
                            <select class="form-control" id="veiculo_tipo_combustivel" name="veiculo[tipo_combustivel]" v-model="tipoCombustivel">
                                <option v-for="combustivel in combustiveis" :value="combustivel[1]">{{ combustivel[0] }}</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[tipo_combustivel]')">{{ errors.first('veiculo[tipo_combustivel]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[fipe]') }">
                            <label for="veiculo_fipe">Código fipe</label>
                            <input class="form-control" id="veiculo_fipe" name="veiculo[fipe]" type="text" v-model="fipe" disabled />
                            <div class="error-message" v-if="errors.has('veiculo[fipe]')">{{ errors.first('veiculo[fipe]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row vlr-kit-gas' ref="valorKitGasBlock">
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[valor_kit_gas]') }">
                            <label for="veiculo_valor_kit_gas">Valor Kit Gás</label>
                            <div class='input-group'>
                                <span class="input-group-addon">R$</span>
                                    <input class="form-control" id="veiculo_valor_kit_gas" name="veiculo[valor_kit_gas]" type="text" v-money="money" v-model.lazy="valorKitGas" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('veiculo[valor_kit_gas]')">{{ errors.first('veiculo[valor_kit_gas]') }}</div>
                            <span class="help-block">Para contratação em algumas seguradoras é necessário informar o valor do Kit Gás.</span>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[tipo_veiculo]') }">
                            <label for="veiculo_tipo_veiculo">Tipo Veículo</label>
                            <select class="form-control veiculo" id="veiculo_tipo_veiculo" name="veiculo[tipo_veiculo]" title="Tipo de Veículo." v-model="tipoVeiculo">
                                <option v-for="tipo_veiculo in tiposVeiculos" :value="tipo_veiculo[1]">{{ tipo_veiculo[0] }}</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[tipo_veiculo]')">{{ errors.first('veiculo[tipo_veiculo]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[isencao_fiscal]') }">
                            <label for="veiculo_isencao_fiscal">Isenção Fiscal (IPI/ICMS)</label>
                            <select class="form-control" name="veiculo[isencao_fiscal]" id="veiculo_isencao_fiscal" v-model="isencaoFiscal">
                                <option value="Não se aplica">Não se aplica</option>
                                <option value="PCD com isenção" v-if="isPCD">PCD com isenção</option>
                                <option value="PCD sem isenção" v-if="isPCD">PCD sem isenção</option>
                                <option value="Táxi sem isenção" v-if="isTaxi">Táxi sem isenção</option>
                                <option value="Táxi com isenção" v-if="isTaxi">Táxi com isenção</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[isencao_fiscal]')">{{ errors.first('veiculo[isencao_fiscal]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[categoria]') }">
                            <label for="veiculo_categoria">Categoria Anti-Furto</label>
                            <select class="form-control" id="veiculo_categoria" name="veiculo[categoria]" v-model="categoriaAntiFurto">
                                <option value="">- Selecione uma categoria -</option>
                                <option v-for="categoriaAntiFurto in categoriasAntiFurto" :value="categoriaAntiFurto[1]">{{ categoriaAntiFurto[0] }}</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[categoria]')">{{ errors.first('veiculo[categoria]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has(marcasAntiFurto.name) }">
                            <label :for="marcasAntiFurto.id">{{ marcasAntiFurto.label }}</label>
                            <select2 :options="marcasAntiFurto.options" :name="marcasAntiFurto.name" :id="marcasAntiFurto.id" :disabled="marcasAntiFurto.disabled" :placeholder="marcasAntiFurto.placeholder" v-model="marcaAntiFurto"></select2>
                            <div class="error-message" v-if="errors.has(marcasAntiFurto.name)">{{ errors.first(marcasAntiFurto.name) }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[alienado]') }">
                            <label for="veiculo_alienado">Veículo Alienado/Financiado</label>
                            <select class="form-control veiculo" id="veiculo_alienado" name="veiculo[alienado]" v-model="veiculoAlienado">
                                <option value="false">Não</option>
                                <option value="true">Sim</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[alienado]')">{{ errors.first('veiculo[alienado]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[chassi_remarcado]') }">
                            <label for="veiculo">Chassi Remarcado</label>
                            <select class="form-control veiculo" id="veiculo_chassi_remarcado" name="veiculo[chassi_remarcado]" v-model="chassiRemarcado">
                                <option value="false">Não</option>
                                <option value="true">Sim</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[chassi_remarcado]')">{{ errors.first('veiculo[chassi_remarcado]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[blindado]') }">
                            <label for="veiculo_blindado">Veículo Blindado</label>
                            <select class="form-control" id="veiculo_blindado" name="veiculo[blindado]" v-model="veiculoBlindado">
                                <option value="false">Não</option>
                                <option value="true">Sim</option>
                            </select>
                            <div class="error-message" v-if="errors.has('veiculo[blindado]')">{{ errors.first('veiculo[blindado]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6 vlr-blindado' ref="valorBlindado">
                        <div class="form-group" :class="{ 'has-error': errors.has('veiculo[valor_blindado]') }">
                            <label for="veiculo_valor_blindado">Valor da Blindagem</label>
                            <div class='input-group'>
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="veiculo_valor_blindado" name="veiculo[valor_blindado]" type="text" v-money="money" v-model.lazy="valorBlindagem" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('veiculo[valor_blindado]')">{{ errors.first('veiculo[valor_blindado]') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import jQuery from 'jquery'
    import FormHelp from './../../Help/FormHelp.vue'
    import Select2 from './../../Select2/Select2.vue'
    import { VMoney } from 'v-money'
    import { AppConfig } from '../../../../config/app-config.js'
    import { buscaFipePorModelo } from './services.js'

    export default {
        components: {
            FormHelp,
            Select2
        },
        mounted() {
            this.initVeiculoManualmente()
            this.initMarcas()
            this.initCombustiveis()
            this.initTiposVeiculos()
            this.initCategoriasAntiFurto()
            this.initVeiculoBlindado()
        },
        data(){
            return {
                placa: '',
                chassi: '',
                checkboxVeiculoManual: false,
                marcas: {
                    id: 'veiculo_marca_id',
                    name: 'veiculo[marca_id]',
                    label: 'Marca',
                    disabled: true,
                    placeholder: 'Carregando...',
                    options: []
                },
                marca: '',
                anoFabricacao: '',
                anoModelo: '',
                modelos: {
                    id: 'veiculo_modelo_id',
                    name: 'veiculo[modelo_id]',
                    label: 'Modelo',
                    disabled: true,
                    placeholder: '- Selecione um modelo -',
                    options: []
                },
                modelo: '',
                combustiveis: [],
                tipoCombustivel: 'FLEX',
                fipe: '',
                valorKitGas: '0',
                tiposVeiculos: [],
                tipoVeiculo: '',
                isencaoFiscal: 'Não se aplica',
                categoriasAntiFurto: [],
                categoriaAntiFurto: '',
                marcasAntiFurto: {
                    id: 'veiculo_anti_furto_id',
                    name: 'veiculo[anti_furto_id]',
                    label: 'Marca Anti-Furto',
                    disabled: true,
                    placeholder: '- Selecione uma marca anti-furto -',
                    options: []
                },
                marcaAntiFurto: '',
                veiculoAlienado: 'false',
                chassiRemarcado: 'false',
                veiculoBlindado: 'false',
                valorBlindagem: 0,
                veiculoPorPlaca: null,
                ultimoChassiAtribuido: null,
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 0,
                    masked: false
                },
                lastBrand: null,
                lastVehicleModelYear: null
            }
        },
        directives: {
            money: VMoney
        },
        computed: {
            isPCD(){
                return ['Particular', 'Aluguel/frete', 'Escolar', 'Táxi/transporte de pessoa por aplicativo'].includes(this.tipoVeiculo)
            },
            isTaxi(){
                return ['Táxi/transporte de pessoa por aplicativo'].includes(this.tipoVeiculo)
            },
            zeroKm: {
                get(){
                    return this.$store.state.Vehicle.zeroKm
                },
                set(value){
                    this.$store.commit('Vehicle/setZeroKm', value)
                }
            },
            canUpdateVehicleByLicensePlate(){
                return this.marcas.options.length > 0
                    && this.combustiveis.length > 0
                    && this.tiposVeiculos.length > 0
                    && this.categoriasAntiFurto.length > 0
                    && this.veiculoPorPlaca !== null
            },
            changeVehicleBrandAndVehicleModelYear(){
                return {
                    marca: this.marca,
                    anoModelo: this.anoModelo
                }
            },
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            }
        },
        watch: {
            checkboxVeiculoManual(value){
                if(value)
                    this.onVeiculoManual()
            },
            tiposVeiculos(){
                this.tipoVeiculo = this.tiposVeiculos[0][1]
            },
            canUpdateVehicleByLicensePlate(value){
                if(value)
                    this.updateVehicleByLicensePlate()
            },
            changeVehicleBrandAndVehicleModelYear(obj){
                let isDifferentBrandAndVehicleModelYear = obj.marca &&
                    obj.anoModelo.toString().length === 4 &&
                    ! jQuery(this.$refs.anoModelo).is('[readonly]') &&
                    (this.lastBrand != obj.marca.toString() || this.lastVehicleModelYear != obj.anoModelo.toString())

                this.lastBrand = obj.marca.toString()
                this.lastVehicleModelYear = obj.anoModelo.toString()

                if(isDifferentBrandAndVehicleModelYear) {
                    this.updateVehicleModels()
                }
            },
            modelo(value){
                this.updateCodigoFipe(value)
            },
            tipoCombustivel(value){
                this.updateTipoCombustivel(value)
            },
            tipoVeiculo(){
                this.updateIsencaoFiscal()
            },
            categoriaAntiFurto(value){
                this.updateMarcasAntiFurto(value)
            },
            veiculoBlindado(value) {
                let valorBlindado = jQuery(this.$refs.valorBlindado)

                if(value.toString() === 'true'){
                    valorBlindado.slideDown('fast')
                    return
                }

                valorBlindado.slideUp('fast')
            },
            quotation(quotation){
                if( ! quotation.veiculo )
                    return

                this.updateByQuotation(quotation.veiculo)
            },
        },
        methods: {
            initVeiculoManualmente(){
                jQuery(this.$refs.veiculoManual).hide()
            },
            initMarcas(){
                this.marcas.placeholder = '- Selecione uma marca -'
                this.marcas.disabled    = false

                if(sessionStorage.getItem('marcas')){
                    this.marcas.options = JSON.parse(sessionStorage.getItem('marcas'))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/marcas').then(response => {
                    this.marcas.options = response.body
                    sessionStorage.setItem('marcas', JSON.stringify(response.body))
                })
            },
            initCombustiveis(){
                jQuery(this.$refs.valorKitGasBlock).hide()

                if(sessionStorage.getItem('combustiveis')){
                    this.combustiveis = JSON.parse(sessionStorage.getItem('combustiveis'))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/combustiveis').then(response => {
                    this.combustiveis = response.body
                    sessionStorage.setItem('combustiveis', JSON.stringify(response.body))
                })
            },
            initTiposVeiculos(){
                if(sessionStorage.getItem('tiposVeiculos')){
                    this.tiposVeiculos = JSON.parse(sessionStorage.getItem('tiposVeiculos'))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/tipos_veiculos').then(response => {
                    this.tiposVeiculos = response.body
                    sessionStorage.setItem('tiposVeiculos', JSON.stringify(response.body))
                })
            },
            initCategoriasAntiFurto(){
                if(sessionStorage.getItem('categoriasAntiFurto')){
                    this.categoriasAntiFurto = JSON.parse(sessionStorage.getItem('categoriasAntiFurto'))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/categorias_antifurto').then(response => {
                    this.categoriasAntiFurto = response.body
                    sessionStorage.setItem('categoriasAntiFurto', JSON.stringify(response.body))
                })
            },
            initVeiculoBlindado(){
                jQuery(this.$refs.valorBlindado).hide()
            },
            buscarVeiculoPorPlaca(event){
                if(/^\D{3}-?\d{4}$/.test(event.target.value) === false)
                    return

                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-veiculo-placa')

                let licensePlateStorage = sessionStorage.getItem(event.target.value)

                if(licensePlateStorage){
                    licensePlateStorage  = JSON.parse(licensePlateStorage)
                    this.veiculoPorPlaca = licensePlateStorage.id ? licensePlateStorage : null

                    if(licensePlateStorage.id)
                        this.resetVehicle()

                    return
                }

                this.$store.dispatch('exibeMensagemCarregamento', 'Aguarde, localizando veículo através da placa...')

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/busca_veiculo_por_placa', {
                    params: {
                        placa: event.target.value
                    }
                }).then(response => {
                    if(response.status === 401){
                        this.$store.dispatch('redirecionaLogin')
                        return
                    }

                    sessionStorage.setItem(event.target.value, JSON.stringify(response.body))

                    this.veiculoPorPlaca = response.body.id ? response.body : null
                    this.$store.dispatch('closeLoading', 1000)

                    if(response.body.id)
                        this.resetVehicle()
                })
            },
            updateVehicleByLicensePlate(){
                let veiculoPorPlaca = this.veiculoPorPlaca

                this.ultimoChassiAtribuido = veiculoPorPlaca.chassis
                this.chassi                = veiculoPorPlaca.chassis
                this.zeroKm                = veiculoPorPlaca.zero_km ? veiculoPorPlaca.zero_km.toString() : 'false'
                this.marca                 = veiculoPorPlaca.modelo.marca_id
                this.anoFabricacao         = veiculoPorPlaca.ano_fab.toString()
                this.anoModelo             = veiculoPorPlaca.ano_modelo.toString()
                this.tipoCombustivel       = veiculoPorPlaca.tipo_combustivel
                this.modelo                = veiculoPorPlaca.modelo_id
                this.veiculoPorPlaca       = null
            },
            updateVehicleModels(){
                if( ! this.marca || ! this.anoModelo )
                    return

                this.modelos.options     = []
                this.modelos.placeholder = 'Carregando...'
                this.modelos.disabled    = true

                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-veiculo-ano-modelo')

                let vehicleModelsStorage = sessionStorage.getItem('ano' + this.anoModelo + 'marca' + this.marca)

                if(vehicleModelsStorage){
                    vehicleModelsStorage = JSON.parse(vehicleModelsStorage)

                    if(vehicleModelsStorage.length === 0){
                        this.vehicleModelsNotFound()
                        return
                    }

                    this.modelos.options     = vehicleModelsStorage
                    this.modelos.placeholder = '- Selecione um modelo -'
                    this.modelos.disabled    = false

                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/buscar_modelos', {
                    params: {
                        ano_modelo: this.anoModelo,
                        marca_id: this.marca
                    }
                }).then(response => {
                    if(response.body.length === 0){
                        this.vehicleModelsNotFound()
                        sessionStorage.setItem('ano' + this.anoModelo + 'marca' + this.marca, JSON.stringify(this.modelos.options))

                        return
                    }

                    sessionStorage.setItem('ano' + this.anoModelo + 'marca' + this.marca, JSON.stringify(response.body))

                    this.modelos.options     = response.body
                    this.modelos.placeholder = '- Selecione um modelo -'
                    this.modelos.disabled    = false
                })
            },
            updateCodigoFipe(vehicleModel){
                this.fipe = 'Carregando...'

                if( ! vehicleModel ) {
                    this.fipe = ''
                    return;
                }

                buscaFipePorModelo(this.$http, vehicleModel)
                    .then(response => {
                        if( response.error ){
                            this.fipe = ''
                            this.$store.dispatch('exibeMensagemCarregamento', response.error)
                            this.$store.dispatch('closeLoading', 3000)
                            return
                        }

                        this.fipe = response.data.fipe
                    })
            },
            decodificarChassi(event){
                if(
                    /^[a-zA-Z0-9]{17}$/.test(event.target.value) === false ||
                    this.ultimoChassiAtribuido === event.target.value
                ) return

                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-veiculo-ano-modelo')

                this.resetVehicle()
                this.chassi                = event.target.value
                this.ultimoChassiAtribuido = event.target.value

                let chassiTextStorage = 'chassi' + event.target.value
                let chassiStorage     = sessionStorage.getItem(chassiTextStorage)

                if(chassiStorage){
                    this.updateChassiDecodificado(JSON.parse(chassiStorage))
                    return
                }

                this.$store.dispatch('exibeMensagemCarregamento', 'Aguarde, decodificando o chassi...')

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/decodificar-chassi', {
                    params: {
                        chassi: event.target.value
                    },
                    timeout: 10000
                }).then(response => {
                    jQuery(this.$refs.veiculoManual).slideDown('slow')

                    if(!response.body || response.body.erro){
                        this.$store.dispatch('exibeMensagemCarregamento', !response.body ? response.bodyText : response.body.erro)
                        this.$store.dispatch('closeLoading', 3000)

                        return
                    }

                    if(
                        response.body.marcas.length === 0 ||
                        response.body.modelos.length === 0 ||
                        response.body.ano === '0'
                    ) {
                        this.$store.dispatch('exibeMensagemCarregamento', 'Chassi não encontrado')
                        this.$store.dispatch('closeLoading', 1500)

                        return
                    }

                    this.$store.dispatch('closeLoading', 1000)
                    this.updateChassiDecodificado(response.body)

                    sessionStorage.setItem(chassiTextStorage, JSON.stringify(response.body))
                }).catch(err => {
                    this.$store.dispatch('exibeMensagemCarregamento', 'Não foi possível decodificar o chassi. Por favor, preencha os dados manualmente')
                    this.$store.dispatch('closeLoading', 2500)
                })
            },
            updateChassiDecodificado(data){
                this.marcas.disabled = true
                this.marca           = data.marcas[0].id

                this.anoFabricacao = this.anoModelo = data.ano

                this.modelos.disabled    = false
                this.modelos.placeholder = '- Selecione um modelo -'

                this.modelos.options = []
                data.modelos.forEach(item => this.modelos.options.push({ id: item.id, text: item.descricao + ' - ' + item.codigo_fipe, fipe: item.codigo_fipe }))

                this.modelo = this.modelos.options[0].id

                jQuery(this.$refs.anoModelo).prop('readonly', true)
                jQuery(this.$refs.veiculoManual).slideDown('slow')
            },
            onVeiculoManual(){
                this.checkboxVeiculoManual = false
                this.ultimoChassiAtribuido = null
                this.marcas.disabled       = false

                this.updateVehicleModels()

                jQuery(this.$refs.anoModelo).prop('readonly', false)
                jQuery(this.$refs.veiculoManual).slideUp('slow')
            },
            updateMarcasAntiFurto(category){
                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-marcas-anti-furto')

                this.marcasAntiFurto.disabled    = true
                this.marcasAntiFurto.placeholder = 'Carregando...'
                this.marcasAntiFurto.options     = []

                if(!category){
                    this.marcasAntiFurto.placeholder = '- Selecione uma marca anti-furto -'
                    return
                }

                if(sessionStorage.getItem('marcasAntiFurtoByCategory' + category)){
                    this.updateOptionsMarcasAntiFurto(JSON.parse(sessionStorage.getItem('marcasAntiFurtoByCategory' + category)))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/busca_marcas_anti_furto', {
                    params: {
                        categoria: category
                    }
                }).then(response => {
                    this.updateOptionsMarcasAntiFurto(response.body)
                    sessionStorage.setItem('marcasAntiFurtoByCategory' + category, JSON.stringify(response.body))
                })
            },
            updateIsencaoFiscal(){
                if(this.tiposVeiculos.length === 0)
                    return

                this.isencaoFiscal = 'Não se aplica'
            },
            updateTipoCombustivel(value){
                let valorKitGasBlock = jQuery(this.$refs.valorKitGasBlock)

                if(value && value.indexOf("GNV") > 0){
                    valorKitGasBlock.slideDown('slow')
                } else {
                    this.valorKitGas = 0
                    valorKitGasBlock.slideUp('slow')
                }
            },
            vehicleModelsNotFound(){
                this.modelos.options     = []
                this.modelos.placeholder = 'Nenhum modelo encontrado!'
                this.modelos.disabled    = true
                this.modelo              = ''
            },
            updateOptionsMarcasAntiFurto(options){
                this.marcasAntiFurto.disabled    = false
                this.marcasAntiFurto.placeholder = '- Selecione uma marca anti-furto -'
                this.marcasAntiFurto.options     = options
            },
            updateByQuotation(data){
                this.ultimoChassiAtribuido = data.chassis || null

                this.placa              = data.placa || ''
                this.chassi             = data.chassis || ''
                this.zeroKm             = data.zero_km ? data.zero_km.toString() : 'false'
                this.marca              = data.marca ? parseInt(data.marca) : ''
                this.anoFabricacao      = data.ano_fab ? parseInt(data.ano_fab) : ''
                this.anoModelo          = data.ano_modelo ? parseInt(data.ano_modelo) : ''
                this.modelo             = data.modelo_id ? parseInt(data.modelo_id) : ''
                this.tipoCombustivel    = data.tipo_combustivel || 'FLEX'
                this.valorKitGas        = data.valor_kit_gas || '0'

                if(data.tipo_veiculo)
                    this.tipoVeiculo = data.tipo_veiculo

                this.categoriaAntiFurto = data.categoria || ''
                this.marcaAntiFurto     = data.anti_furto_id || ''
                this.veiculoAlienado    = data.alienado || 'false'
                this.chassiRemarcado    = data.chassi_remarcado ? data.chassi_remarcado.toString() : 'false'
                this.veiculoBlindado    = data.blindado || 'false'
                this.valorBlindagem     = data.valor_blindado || 0

                this.$nextTick(() => {
                    let isencaoFiscal = data.isencao_fiscal ? data.isencao_fiscal.toString() : 'Não se aplica'

                    this.isencaoFiscal = ['Não se aplica', 'PCD com isenção', 'PCD sem isenção', 'Táxi sem isenção', 'Táxi com isenção'].includes(isencaoFiscal) === false
                        ? 'Não se aplica'
                        : isencaoFiscal
                })
            },
            resetVehicle(){
                if(this.veiculoPorPlaca) return

                this.modelos.options     = []
                this.modelos.placeholder = '- Selecione um modelo -'
                this.modelos.disabled    = true
                this.modelo              = ''
                this.chassi              = ''
                this.zeroKm              = 'false'
                this.marca               = ''
                this.anoFabricacao       = ''
                this.anoModelo           = ''
                this.tipoCombustivel     = 'FLEX'
            }
        }
    }
</script>
