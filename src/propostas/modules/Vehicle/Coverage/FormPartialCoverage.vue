<template>
    <section>
        <div id='cobertura-section'>
            <div id="sessao_cobertura">
                <div class="row" id="cobertura">
                    <div class="col-xs-12">
                        <h3><icon name="bar-chart"></icon> Coberturas</h3>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[tipo]') }">
                            <label for="cobertura_tipo">Coberturas predefinidas</label>
                            <form-help
                                title="Coberturas predefinidas"
                                description="Parametrização de coberturas de acordo com as preferências do usuário.">
                            </form-help>
                            <select class="form-control cobertura-tipo" id="cobertura_tipo" name="cobertura[tipo]" v-model="coberturaPredefinida">
                                <option value="minima">Cobertura 1</option>
                                <option value="mediana">Cobertura 2</option>
                                <option value="maxima">Cobertura 3</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[tipo]')">{{ errors.first('cobertura[tipo]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[tipo_cobertura]') }">
                            <label for="cobertura_tipo_cobertura">Cobertura</label>
                            <form-help
                                title="Cobertura"
                                description="O tipo de risco que se deseja garantir para o veículo.">
                            </form-help>
                            <select class="form-control" id="cobertura_tipo_cobertura" name="cobertura[tipo_cobertura]" v-model="tipoCobertura">
                                <option value="compreensiva">Compreensiva/RCFV</option>
                                <option value="exclusiva">Exclusiva/RCFV</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[tipo_cobertura]')">{{ errors.first('cobertura[tipo_cobertura]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[franquia]') }">
                            <label for="cobertura_franquia">Franquia</label>
                            <form-help
                                title="Tipo da Franquia"
                                description="Participação obrigatória do Segurado em caso de sinistro. <br><br><p>Reduzida: 50% da franquia.<br><p> Reduzida I: 75% da franquia.<br><p>Normal: Franquia padrão.<br><p>Facultativa I: 1,5 x Franquia.<br><p>Facultativa II: 2 x Franquia.</p>">
                            </form-help>
                            <select class="form-control" id="cobertura_franquia" name="cobertura[franquia]" v-model="franquia">
                                <option value="reduzida">Reduzida</option>
                                <option value="reduzida1">Reduzida I</option>
                                <option value="normal">Normal</option>
                                <option value="facultativa1">Facultativa I</option>
                                <option value="facultativa2">Facultativa II</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[franquia]')">{{ errors.first('cobertura[franquia]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[isencao_franquia]') }">
                            <label for="cobertura_isencao_franquia">Isenção franquia 1º sinistro</label>
                            <form-help
                                title="Isenção franquia 1º sinistro"
                                description="Esta cobertura isenta o segurado do pagamento da franquia do 1º sinistro indenizável durante a vigência da apólice.">
                            </form-help>
                            <select class="form-control" id="cobertura_isencao_franquia" name="cobertura[isencao_franquia]" v-model="isencaoFranquia">
                                <option value="false">Não</option>
                                <option value="true">Sim</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[isencao_franquia]')">{{ errors.first('cobertura[isencao_franquia]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[danos_materiais]') }">
                            <label for="cobertura_danos_materiais">RCFV Danos Materiais</label>
                            <form-help
                                title="Cobertura Danos Materiais"
                                description="Garante indenização dos prejuízos que o Segurado possa causar caso ele se envolva em acidente e cause prejuízos materiais a terceiros.">
                            </form-help>
                            <div class="input-group">
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="cobertura_danos_materiais" name="cobertura[danos_materiais]" type="text" v-money="money" v-model.lazy="danosMateriais" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[danos_materiais]')">{{ errors.first('cobertura[danos_materiais]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[danos_corporais]') }">
                            <label for="cobertura_danos_corporais">RCFV Danos Corporais</label>
                            <form-help
                                title="Cobertura Danos Corporais"
                                description="Garante indenização dos prejuízos que o Segurado possa causar caso ele se envolva em acidente e cause danos corporais a terceiros.">
                            </form-help>
                            <div class="input-group">
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="cobertura_danos_corporais" name="cobertura[danos_corporais]" type="text" v-money="money" v-model.lazy="danosCorporais" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[danos_corporais]')">{{ errors.first('cobertura[danos_corporais]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[danos_morais]') }">
                            <label for="cobertura_danos_morais">RCFV Danos Morais</label>
                            <form-help
                                title="Cobertura Danos Morais"
                                description="Garante indenização até o limite máximo estipulado no contrato – apólice - a uma pessoa que se sinta ofendida pelo Segurado em um acidente de trânsito e o acione judicialmente.">
                            </form-help>
                            <div class="input-group">
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="cobertura_danos_morais" name="cobertura[danos_morais]" type="text" v-money="money" v-model.lazy="danosMorais" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[danos_morais]')">{{ errors.first('cobertura[danos_morais]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[morte_invalidez]') }">
                            <label for="cobertura_morte_invalidez">APP Morte / Invalidez</label>
                            <form-help
                                title="Cobertura APP Morte / Invalidez"
                                description="Cobertura que garante indenização em caso de morte ou invalidez permanente dos passageiros do veículo segurado em eventual sinistro. A Cobertura de APP deve ser contratada em conjunto com a cobertura Casco e/ou de Danos Materiais (DM) e Danos Corporais (DC). <br><br><p>Caso a seguradora tenha os campos Morte/Invalidez separados, o valor será dividido igualmente entre os dois campos.</p>">
                            </form-help>
                            <div class="input-group">
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="cobertura_morte_invalidez" name="cobertura[morte_invalidez]" type="text" v-money="money" v-model.lazy="morteInvalidez" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[morte_invalidez]')">{{ errors.first('cobertura[morte_invalidez]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[despesas_extraordinarias]') }">
                            <label for="cobertura_despesas_extraordinarias">Despesas extraordinarias</label>
                            <form-help
                                title="Cobertura Despesas extraordinárias"
                                description="Garante ao segurado, exclusivamente em caso de indenização integral, o pagamento das despesas extras que estejam diretamente relacionadas ao veículo segurado.">
                            </form-help>
                            <div class="input-group">
                                <span class="input-group-addon">R$</span>
                                <input class="form-control" id="cobertura_despesas_extraordinarias" name="cobertura[despesas_extraordinarias]" type="text" v-money="money" v-model.lazy="despesasExtraordinarias" />
                                <span class="input-group-addon">,00</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[despesas_extraordinarias]')">{{ errors.first('cobertura[despesas_extraordinarias]') }}</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group" :class="{'has-error': errors.has('cobertura[percentual_fipe]')}">
                            <label for="cobertura_percentual_fipe">Fator Tabela Fipe <span class="text-danger">*</span></label>
                            <form-help
                                title="Reposição Garantida"
                                description="% do valor do casco (baseado na tabela de referência do mês do sinistro) que será indenizado ao cliente na indenização integral. O valor monetário do veículo pode variar mensalmente - Válido para modalidade 'Valor de Mercado Referenciado'.">
                            </form-help>
                            <div class="input-group">
                                <input type="text" class="form-control" id="cobertura_percentual_fipe" name="cobertura[percentual_fipe]" v-validate="{ rules: { required: true, numeric: true } }" data-vv-as="Fator Tabela Fipe" v-model="percentualFipe" />
                                <span class="input-group-addon">%</span>
                            </div>
                            <div class="error-message" v-if="errors.has('cobertura[percentual_fipe]')">{{ errors.first('cobertura[percentual_fipe]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[assistencia_24h]') }">
                            <label for="cobertura_assistencia_24h">Assistência 24Hrs /Reboque</label>
                            <form-help
                                title="Assistência 24Hrs/Reboque"
                                description="São serviços oferecidos ao Segurado e aos ocupantes do carro, quando acontecerem pane mecânica ou elétrica, roubo, furto, incêndio ou acidente.">
                            </form-help>
                            <select class="form-control" id="cobertura_assistencia_24h" name="cobertura[assistencia_24h]" v-model="assistencia24h">
                                <option value="semassistencia">Sem Assistência 24Hrs</option>
                                <option value="100km">Até 100km</option>
                                <option value="200km">Até 200km</option>
                                <option value="500km">Até 500km</option>
                                <option selected="selected" value="semlimite">Sem Limites</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[assistencia_24h]')">{{ errors.first('cobertura[assistencia_24h]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[oficina]') }">
                            <label for="cobertura_oficina">Oficina</label>
                            <form-help
                                title="Cobertura para Oficina"
                                description="Tipo de oficina escolhido para melhor atender as necessidades do cliente, podendo ser:<br><br><p>Referenciada: Oficinas referenciadas na seguradora. </p><p>Livre: Livre escolha do segurado.</p>">
                            </form-help>
                            <select class="form-control" id="cobertura_oficina" name="cobertura[oficina]" v-model="oficina">
                                <option value="referenciada">Referenciada</option>
                                <option value="livre">Livre</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[oficina]')">{{ errors.first('cobertura[oficina]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[carro_reserva]') }">
                            <label for="cobertura_carro_reserva">Carro Reserva (Diárias)</label>
                            <form-help
                                title="Diárias carro reserva"
                                description="Serviço de carro reserva com três opções de diárias.">
                            </form-help>
                            <select class="form-control" id="cobertura_carro_reserva" name="cobertura[carro_reserva]" v-model="carroReservaDiarias">
                                <option value="semcarro">Sem carro reserva</option>
                                <option value="30dias">30 Diárias</option>
                                <option value="15dias">15 Diárias</option>
                                <option value="07dias">07 Diárias</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[carro_reserva]')">{{ errors.first('cobertura[carro_reserva]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[perfil_carro_reserva]') }">
                            <label for="cobertura_perfil_carro_reserva">Carro reserva (Veículo)</label>
                            <form-help
                                title="Perfil carro reserva"
                                description="Perfil do carro reserva podendo ser: <br><br><p>Basico: Contempla um veículo popular, sem ar condicionado. </p><p>Essencial: Contempla um veículo popular com ar-condicionado. </p><p>Executivo: Contempla um veículo intermediário com direção hidráulica e ar-condicionado</p>">
                            </form-help>
                            <select class="form-control" :disabled="carroReservaDiarias == 'semcarro'" id="cobertura_perfil_carro_reserva" name="cobertura[perfil_carro_reserva]" v-model="carroReservaVeiculo">
                                <option value="" disabled :selected="carroReservaDiarias == 'semcarro'">Sem Carro Reserva ou Não Possui</option>
                                <option value="basico">Básico (1.0 sem AR)</option>
                                <option value="essencial">Essencial (1.0 com AR)</option>
                                <option value="executivo">Executivo (1.4/1.6 com AR)</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[perfil_carro_reserva]')">{{ errors.first('cobertura[perfil_carro_reserva]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[reposicao_zero_km]') }">
                            <label for="cobertura_reposicao_zero_km">Reposição Zero Km</label>
                            <form-help
                                title="Reposição Zero Km"
                                description="Garante em caso de indenização integral a soma indenizada corresponderá ao valor de mercado de veículo 0 km de mesmas características do veículo segurado.">
                            </form-help>
                            <select class="form-control" :disabled="zeroKm == 'false'" id="cobertura_reposicao_zero_km" name="cobertura[reposicao_zero_km]" v-model="reposicaoZeroKm">
                                <option value="semzerokm">Sem Cobertura</option>
                                <option value="06meses">06 Meses</option>
                                <option value="12meses">12 Meses</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[reposicao_zero_km]')">{{ errors.first('cobertura[reposicao_zero_km]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('cobertura[vidros]') }">
                            <label for="cobertura_vidros">Vidros</label>
                            <form-help
                                title="Cobertura de vidros"
                                description="Serviço de vidros com diferentes planos</br></br><p>Básico: será selecionado a opção mais básica da seguradora.</p><p>Completo: será seleciona a opção que abrange todos os vidros do veiculo inclusive de milha/neblina e xênom, lanternas e retrovisores.</p><p>VIP: será selecionado a melhor opção de vidros em cada seguradora.</p>">
                            </form-help>
                            <select class="form-control" id="cobertura_vidros" name="cobertura[vidros]" v-model="vidros">
                                <option value="sem">Sem Cobertura</option>
                                <option value="basico">Básico</option>
                                <option value="completo">Completo</option>
                                <option selected="selected" value="vip">VIP</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cobertura[vidros]')">{{ errors.first('cobertura[vidros]') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import FormHelp from './../../Help/FormHelp.vue'
    import { VMoney } from 'v-money'
    import { AppConfig } from '../../../../config/app-config.js'

    export default {
        components: {
            FormHelp
        },
        data(){
            return {
                coberturaPredefinida: '',
                tipoCobertura: '',
                franquia: '',
                isencaoFranquia: '',
                danosMateriais: '',
                danosCorporais: '',
                danosMorais: '',
                morteInvalidez: '',
                despesasExtraordinarias: '',
                percentualFipe: '',
                assistencia24h: '',
                oficina: '',
                carroReservaDiarias: '',
                carroReservaVeiculo: '',
                reposicaoZeroKm: '',
                vidros: '',
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 0,
                    masked: false
                }
            }
        },
        directives: {
            money: VMoney
        },
        computed: {
            zeroKm(){
                return this.$store.state.Vehicle.zeroKm
            },
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            },
        },
        mounted(){
            this.coberturaPredefinida = 'mediana'
        },
        watch: {
            coberturaPredefinida(value){
                this.onCoberturaPredefinida(value)
            },
            quotation(quotation){
                if( ! quotation.coberturas )
                    return

                if( quotation.coberturas.tipo )
                    this.coberturaPredefinida = quotation.coberturas.tipo

                this.updateCoberturaPredefinida(quotation.coberturas)
                this.$once('canUpdateQuotation', () => {
                    this.updateCoberturaPredefinida(quotation.coberturas)
                })
            },
        },
        methods: {
            onCoberturaPredefinida(coverage){
                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/busca_cobertura', {
                    params: {
                        cobertura: coverage
                    }
                }).then(response => {
                    this.updateCoberturaPredefinida(response.body)
                    this.$emit('canUpdateQuotation')
                })

                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-cobertura')
            },
            updateCoberturaPredefinida(data){
                if( data.tipo_cobertura )
                    this.tipoCobertura = data.tipo_cobertura

                if( data.franquia )
                    this.franquia = data.franquia

                if( data.isencao_franquia )
                    this.isencaoFranquia = data.isencao_franquia

                if( data.danos_materiais )
                this.danosMateriais = data.danos_materiais

                if( data.danos_corporais )
                    this.danosCorporais = data.danos_corporais

                if( data.danos_morais )
                    this.danosMorais = data.danos_morais

                if( data.morte_invalidez )
                    this.morteInvalidez = data.morte_invalidez

                if( data.despesas_extraordinarias )
                    this.despesasExtraordinarias = data.despesas_extraordinarias

                if( data.percentual_fipe )
                    this.percentualFipe = data.percentual_fipe

                if( data.assistencia_24h )
                    this.assistencia24h = data.assistencia_24h

                if( data.oficina )
                    this.oficina = data.oficina

                if( data.carro_reserva )
                    this.carroReservaDiarias = data.carro_reserva

                if( data.perfil_carro_reserva )
                    this.carroReservaVeiculo = data.perfil_carro_reserva

                this.reposicaoZeroKm = data.reposicao_zero_km || 'semzerokm'

                if( data.vidros )
                    this.vidros = data.vidros
            }
        }
    }
</script>
