<template>
    <section>
        <div id="sessao_condutor_principal">
            <div class="row" id="condutor-principal">
                <div class="col-xs-12">
                    <h3>
                        <icon name="users"></icon> Principal Condutor
                        <form-help
                            title="Principal Condutor"
                            description="O PRINCIPAL CONDUTOR DO VEÍCULO SEGURADO é a pessoa legalmente habilitada, que utiliza por 5 OU MAIS DIAS DA SEMANA. Se o veículo for utilizado por mais de um condutor em dias diferentes ou em horários diferentes de um mesmo dia, será considerado como PRINCIPAL CONDUTOR A PESSOA MAIS JOVEM QUE UTILIZA O VEÍCULO POR 3 OU MAIS DIAS DA SEMANA. Para ser considerado um dos condutores do veículo, é necessário que o tempo de utilização diária seja superior à 1 hora. Entende-se como tempo de utilização o período que o condutor utiliza ou tem a disposição o veículo (período total que o veículo está em movimento ou estacionado). Quando não for possível identificar o principal condutor nos critérios acima, devem ser considerados os dados do condutor mais jovem.">
                        </form-help>
                    </h3>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group" :class="{ 'has-error': errors.has('cotacao[relacao_cliente_condutor]') }">
                        <label for="cotacao_relacao_cliente_condutor" title="Relação entre o condutor principal e o cliente segurado.">Relação com o cliente <span class="text-danger">*</span></label>
                        <select class="form-control" id="cotacao_relacao_cliente_condutor" name="cotacao[relacao_cliente_condutor]" data-vv-as="Relação com o cliente" v-validate="{ rules: { required: true } }" v-model="relacaoComCliente">
                            <option v-if="relacaoComCliente === ''" value="">Selecione</option>
                            <option v-if="customerIsPF" value="PROPRIO">Próprio</option>
                            <option v-if="customerIsPF" value="FILHO">Filho(a)</option>
                            <option v-if="customerIsPF" value="PAIS">Pai/Mãe</option>
                            <option v-if="customerIsPF" value="CONJUGE">Cônjuge</option>
                            <option v-if="customerIsPJ" value="EXCLUSIVO">Funcionário/usuário exclusivo do veículo</option>
                            <option v-if="customerIsPJ" value="VARIOS">Condutor indeterminado/sem perfil</option>
                            <option v-if="customerIsPJ" value="DIRETORES">Sócios e/ou Diretores</option>
                            <option v-if="customerIsPJ" value="PARENTES">Cônjuge/Filhos dos Sócios ou Diretores</option>
                            <option value="OUTROS">Outros</option>
                        </select>
                        <div class="error-message" v-if="errors.has('cotacao[relacao_cliente_condutor]')">{{ errors.first('cotacao[relacao_cliente_condutor]') }}</div>
                    </div>
                </div>
            </div>

            <div id='condutor-principal-section' v-if="relacaoComCliente != 'VARIOS'">
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[cpf]') }">
                            <label for="condutor_principal_cpf">CPF <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="condutor_principal_cpf" name="condutor_principal[cpf]" v-mask="'###.###.###-##'" data-vv-as="CPF" v-validate="{ rules: { required: true, regex: /^(\d{3}.\d{3}.\d{3}-\d{2})$/ } }" v-model="cpf" @blur="consultaCPF" />
                            <div class="error-message" v-if="errors.has('condutor_principal[cpf]')">{{ errors.first('condutor_principal[cpf]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[nome]') }">
                            <label for="condutor_principal_nome">Nome <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="condutor_principal_nome" name="condutor_principal[nome]" v-validate="{ rules: { required: true, alpha_spaces: true } }" data-vv-as="Nome" v-model="nome" />
                            <div class="error-message" v-if="errors.has('condutor_principal[nome]')">{{ errors.first('condutor_principal[nome]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[nascimento]') }">
                            <label for="condutor_principal_nascimento">Data de Nascimento <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="condutor_principal_nascimento" name="condutor_principal[nascimento]" v-mask="'##/##/####'" v-validate="{ rules: { required: true, date_valid: true } }" data-vv-as="Data de Nascimento" v-model="nascimento" @blur="checkDateCNH" />
                            <div class="error-message" v-if="errors.has('condutor_principal[nascimento]')">{{ errors.first('condutor_principal[nascimento]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[sexo]') }">
                            <label for="condutor_principal_sexo">Sexo <span class="text-danger">*</span></label>
                            <select class="form-control" id="condutor_principal_sexo" name="condutor_principal[sexo]" v-validate="{ rules: { required: true } }" data-vv-as="Sexo" v-model="sexo">
                                <option value=""> - Selecione - </option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                            <div class="error-message" v-if="errors.has('condutor_principal[sexo]')">{{ errors.first('condutor_principal[sexo]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[estado_civil]') }">
                            <label for="condutor_principal_estado_civil">Estado Civil <span class="text-danger">*</span></label>
                            <select class="form-control" id="condutor_principal_estado_civil" name="condutor_principal[estado_civil]" v-validate="{ rules: { required: true } }" data-vv-as="Estado Civil" v-model="estadoCivil">
                                <option value=""> - Selecione - </option>
                                <option value="C">Casado(a) e/ou residente com companheiro(a)</option>
                                <option value="S">Solteiro</option>
                                <option value="V">Viuvo(a)</option>
                                <option value="D">Divorciado(a)</option>
                            </select>
                            <div class="error-message" v-if="errors.has('condutor_principal[estado_civil]')">{{ errors.first('condutor_principal[estado_civil]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{'has-error': errors.has(occupations.name)}">
                            <label :for="occupations.id">{{ occupations.label }} <span class="text-danger">*</span></label>
                            <select2 :options="occupations.options" :name="occupations.name" :id="occupations.id" :disabled="occupations.disabled" :placeholder="occupations.placeholder" v-model="profissao" v-validate="{ rules: { required: true } }" :data-vv-as="occupations.label"></select2>
                            <div class="error-message" v-if="errors.has(occupations.name)">{{ errors.first(occupations.name) }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[tipo_de_residencia]') }">
                            <label for="condutor_principal_tipo_de_residencia">Tipo de Residência</label>
                            <select class="form-control" id="condutor_principal_tipo_de_residencia" name="condutor_principal[tipo_de_residencia]" v-model="tipoResidencia">
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="casa_condominio">Casa em condomínio</option>
                                <option value="chacara">Chacara</option>
                                <option value="outros">Outros</option>
                            </select>
                            <div class="error-message" v-if="errors.has('condutor_principal[tipo_de_residencia]')">{{ errors.first('condutor_principal[tipo_de_residencia]') }}</div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[data_habilitacao]') }">
                            <label for="condutor_principal_data_habilitacao">Data da habilitação</label>
                            <input type="text" class="form-control" id="condutor_principal_data_habilitacao" name="condutor_principal[data_habilitacao]" v-mask="'##/##/####'" v-validate="{ rules: { date_valid: true } }" data-vv-as="Data da habilitação" v-model="dataHabilitacao" @blur="checkDateCNH" />
                            <div class="error-message" v-if="errors.has('condutor_principal[data_habilitacao]')">{{ errors.first('condutor_principal[data_habilitacao]') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="form-group" :class="{ 'has-error': errors.has('condutor_principal[habilitacao]') }">
                            <label for="condutor_principal_habilitacao">Número da CNH</label>
                            <input type="text" class="form-control" id="condutor_principal_habilitacao" name="condutor_principal[habilitacao]" v-validate="{ rules: { numeric: true } }" data-vv-as="Número da CNH" v-model="numeroCnh" />
                            <div class="error-message" v-if="errors.has('condutor_principal[habilitacao]')">{{ errors.first('condutor_principal[habilitacao]') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import FormHelp from './../../Help/FormHelp.vue'
    import Select2 from './../../Select2/Select2.vue'
    import { AppConfig } from '../../../../config/app-config.js'
    import { EventBus } from '../../EventBus/event-bus.js'
    import moment from 'moment'

    moment.locale('pt-br')

    export default {
        components: {
            FormHelp,
            Select2
        },
        data(){
            return {
                occupations: {
                    id: 'condutor_principal_profissao_id',
                    name: 'condutor_principal[profissao_id]',
                    label: 'Profissão',
                    disabled: true,
                    placeholder: 'Carregando...',
                    options: []
                },
                relacaoComCliente: 'OUTROS',
                cpf: '',
                nome: '',
                nascimento: '',
                sexo: '',
                estadoCivil: '',
                profissao: '',
                tipoResidencia: 'casa',
                dataHabilitacao: '',
                numeroCnh: '',
            }
        },
        computed: {
            customer() {
                return this.$store.state.Customer
            },
            customerListener() {
                return {
                    cpfCnpj   : this.customer.cpfCnpj,
                    pessoa    : this.customer.pessoa,
                    name      : this.customer.name,
                    birthDate : this.customer.birthDate,
                    sex       : this.customer.sex,
                    email     : this.customer.email,
                    phone     : this.customer.phone,
                    celPhone  : this.customer.celPhone
                }
            },
            customerKindOfPerson(){
                return this.customer.pessoa
            },
            customerIsPF(){
                return this.customerKindOfPerson === 'F'
            },
            customerIsPJ(){
                return this.customerKindOfPerson === 'J'
            },
            customerIsPJAndNameEmpty(){
                return this.customerIsPJ && this.nome === ''
            },
            quotation(){
                return this.$store.getters['VehicleForm/quotation']
            },
        },
        watch: {
            customerListener(value) {
                if(this.relacaoComCliente === 'PROPRIO'){
                    this.cpf        = this.customer.cpfCnpj
                    this.nome       = this.customer.name
                    this.nascimento = this.customer.birthDate
                    this.sexo       = this.customer.sex
                }
            },
            relacaoComCliente(value){
                this.cpf             = ''
                this.nome            = ''
                this.nascimento      = ''
                this.sexo            = ''
                this.dataHabilitacao = ''
                this.profissao        = ''

                if(this.relacaoComCliente === 'PROPRIO'){
                    this.cpf        = this.customer.cpfCnpj
                    this.nome       = this.customer.name
                    this.nascimento = this.customer.birthDate
                    this.sexo       = this.customer.sex
                }
            },
            customerKindOfPerson(){
                if(this.customerKindOfPerson === ''){
                    this.relacaoComCliente = 'OUTROS'
                    return
                }

                this.relacaoComCliente = (this.customerIsPF)
                    ? 'PROPRIO'
                    : (this.customerIsPJAndNameEmpty ? 'VARIOS' : 'EXCLUSIVO')
            },
            cpf(){
                this.errors.remove('condutor_principal[cpf]')
            },
            quotation(quotation){
                if( ! quotation.principal_condutor )
                    return

                setTimeout(() => {
                    if( quotation.principal_condutor.relacao_cliente_condutor || quotation.principal_condutor.relacao_cliente_condutor === '' ) {
                        this.relacaoComCliente = quotation.principal_condutor.relacao_cliente_condutor
                    }

                    this.$nextTick(() => {
                        this.cpf               = quotation.principal_condutor.cpf || ''
                        this.nome              = quotation.principal_condutor.nome || ''
                        this.nascimento        = quotation.principal_condutor.nascimento || ''
                        this.sexo              = quotation.principal_condutor.sexo || ''
                        this.estadoCivil       = quotation.principal_condutor.estado_civil || ''
                        this.profissao          = quotation.principal_condutor.profissao_id || ''
                        this.tipoResidencia    = quotation.principal_condutor.tipo_de_residencia || 'casa'
                        this.dataHabilitacao   = quotation.principal_condutor.data_habilitacao || ''
                        this.numeroCnh         = quotation.principal_condutor.habilitacao || ''    
                    })
                }, 200)
            }
        },
        mounted() {
            this.initOccupations()

            EventBus.$on('updatedCustomer', () => {
                setTimeout(() => {
                    if(this.relacaoComCliente !== 'PROPRIO')
                        return

                    this.cpf        = this.customer.cpfCnpj
                    this.nome       = this.customer.name
                    this.nascimento = this.customer.birthDate
                    this.sexo       = this.customer.sex
                }, 200)
            })
        },
        methods: {
            initOccupations(){
                if(sessionStorage.getItem('occupations')){
                    this.applyOptionsInOccupations(JSON.parse(sessionStorage.getItem('occupations')))
                    return
                }

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/profissoes').then(response => {
                    sessionStorage.setItem('occupations', JSON.stringify(response.body))
                    this.applyOptionsInOccupations(response.body)
                })
            },
            applyOptionsInOccupations(occupations){
                this.$nextTick(() => {
                    this.occupations.placeholder = '- Selecione uma profissão -'
                    this.occupations.disabled    = false
                    this.occupations.options     = occupations
                })
            },
            consultaCPF(e){
                let cpfWithoutMask = e.target.value.replace(/\D/g,'')
                let cpfStorage     = sessionStorage.getItem(cpfWithoutMask)

                if(cpfWithoutMask.length != 11)
                    return

                if(cpfStorage){
                    cpfStorage = JSON.parse(cpfStorage)

                    if(cpfStorage.msg || cpfStorage.erro){
                        this.addCpfError(cpfStorage)
                        return
                    }

                    this.addValuesByCpf(cpfStorage)
                    return
                }

                this.$store.dispatch('exibeMensagemCarregamento', 'Aguarde, buscando dados...')

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas/consulta_cpf', {
                    params: {
                        cpf: cpfWithoutMask
                    },
                    timeout: 10000
                }).then(response => {
                    this.$store.dispatch('closeLoading', 1000)

                    sessionStorage.setItem(cpfWithoutMask, JSON.stringify(response.body))

                    if(response.body.msg || response.body.erro){
                        this.addCpfError(response.body)
                        return
                    }

                    this.addValuesByCpf(response.body)
                }).catch(err => {
                    this.$store.dispatch('exibeMensagemCarregamento', 'Não foi possível buscar dados pelo CPF/CNPJ. Por favor, preencha os dados manualmente')
                    this.$store.dispatch('closeLoading', 3000)
                })
            },
            checkDateCNH(){
                if(
                    ! moment(this.nascimento, 'DD/MM/YYYY', true).isValid() ||
                    ! moment(this.dataHabilitacao, 'DD/MM/YYYY', true).isValid()
                ) return

                this.$nextTick(() => {
                    this.errors.remove('condutor_principal[data_habilitacao]')

                    let startDate   = moment(this.nascimento, 'DD/MM/YYYY').add(18, 'years')
                    let endDate     = moment()
                    let compareDate = moment(this.dataHabilitacao, 'DD/MM/YYYY')

                    if( compareDate.isBetween(startDate, endDate) )
                        return

                    this.errors.add('condutor_principal[data_habilitacao]', 'Condutor(a) não é maior que 18 anos', 'cnhError')
                })
            },
            addCpfError(value){
                this.errors.add('condutor_principal[cpf]', (value.msg || value.erro), 'cpfError')
                this.resetFields()
            },
            resetFields(){
                this.nome       = ''
                this.nascimento = ''
                this.sexo       = ''
            },
            addValuesByCpf(values){
                this.nome       = values.name
                this.nascimento = values.birth_date
                this.sexo       = values.sex

                this.validateFields()
            },
            validateFields(){
                this.$nextTick(() => {
                    this.$validator.validate('condutor_principal[cpf]', this.cpf)
                    this.$validator.validate('condutor_principal[nome]', this.nome)
                    this.$validator.validate('condutor_principal[nascimento]', this.nascimento)
                })
            }
        }
    }
</script>
