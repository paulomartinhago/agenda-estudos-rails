<template>
    <section>
        <div id="cliente-section">
            <div id="sessao_dados_do_cliente">
                <div class='row' id="cliente">
                    <div class="col-xs-12">
                        <h3><icon name="male"></icon> Dados do cliente</h3>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[cpf_cnpj]') }">
                            <label for="cliente_cpf_cnpj">CPF/CNPJ <span class="text-danger">*</span></label>
                            <input type="text" class="form-control update-driver" id="cliente_cpf_cnpj" name="cliente[cpf_cnpj]" v-mask="['###.###.###-##', '##.###.###/####-##']" data-vv-as="CPF/CNPJ" v-validate="{ rules: { required: true, regex: /^(\d{3}.\d{3}.\d{3}-\d{2}|\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})$/ } }" v-model="cpfCnpj" @blur="consultaCPF" />
                            <div class="error-message" v-if="errors.has('cliente[cpf_cnpj]')">{{ errors.first('cliente[cpf_cnpj]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[pessoa]') }">
                            <label for="cliente_pessoa">Pessoa <span class="text-danger">*</span></label>
                            <select class="form-control" id="cliente_pessoa" name="cliente[pessoa]" data-vv-as="Pessoa" v-validate="{ rules: { required: true } }" v-model="pessoa">
                                <option value=""> - Selecione - </option>
                                <option value="F">Física</option>
                                <option value="J">Juridica</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cliente[pessoa]')">{{ errors.first('cliente[pessoa]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[nome]') }">
                            <label for="cliente_nome">Nome/Razão Social <span class="text-danger">*</span></label>
                            <input type="text" class="form-control update-driver" id="cliente_nome" name="cliente[nome]" v-validate="{ rules: { required: true } }" data-vv-as="Nome/Razão Social" v-model="name" />
                            <div class="error-message" v-if="errors.has('cliente[nome]')">{{ errors.first('cliente[nome]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row campos-pf' v-if="isPF">
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[data_nascimento]') }">
                            <label for="cliente_data_nascimento">Data de Nascimento <span class="text-danger">*</span></label>
                            <input type="text" class="form-control update-driver" id="cliente_data_nascimento" name="cliente[data_nascimento]" v-mask="'##/##/####'" v-validate="{ rules: { required: true, date_valid: true } }" data-vv-as="Data de Nascimento" v-model="birthDate" />
                            <div class="error-message" v-if="errors.has('cliente[data_nascimento]')">{{ errors.first('cliente[data_nascimento]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[sexo]') }">
                            <label for="cliente_sexo">Sexo <span class="text-danger">*</span></label>
                            <select class="form-control update-driver" id="cliente_sexo" name="cliente[sexo]" v-validate="{ rules: { required: true } }" data-vv-as="Sexo" v-model="sex">
                                <option value=""> - Selecione - </option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                            <div class="error-message" v-if="errors.has('cliente[sexo]')">{{ errors.first('cliente[sexo]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[email]') }">
                            <label for="cliente_email">E-mail <span class="text-danger" v-if="contactValidate">*</span></label>
                            <input type="text" class="form-control" id="cliente_email" name="cliente[email]" v-validate="{ rules: { required: contactValidate, email: true } }" data-vv-as="E-mail" v-model="email" />
                            <div class="error-message" v-if="errors.has('cliente[email]')">{{ errors.first('cliente[email]') }}</div>
                        </div>
                    </div>
                </div>

                <div class='row'>
                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[fone_fixo]') }">
                            <label for="cliente_fone_fixo">Telefone <span class="text-danger" v-if="contactValidate">*</span></label>
                            <input type="text" class="form-control" id="cliente_fone_fixo" name="cliente[fone_fixo]" v-validate="{ rules: { required: contactValidate, regex: /^(\(\d{2}\) \d{4}-\d{4}|\(\d{2}\) \d{5}-\d{4})$/ } }" data-vv-as="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" v-model="phone" />
                            <div class="error-message" v-if="errors.has('cliente[fone_fixo]')">{{ errors.first('cliente[fone_fixo]') }}</div>
                        </div>
                    </div>

                    <div class='col-xs-12 col-md-6'>
                        <div class="form-group" :class="{ 'has-error': errors.has('cliente[celular]') }">
                            <label for="cliente_celular">Celular para contato <span class="text-danger" v-if="contactValidate">*</span></label>
                            <input type="text" class="form-control" id="cliente_celular" name="cliente[celular]" v-validate="{ rules: { required: contactValidate, regex: /^(\(\d{2}\) \d{4}-\d{4}|\(\d{2}\) \d{5}-\d{4})$/ } }" data-vv-as="Celular para contato" v-mask="['(##) ####-####', '(##) #####-####']" v-model="celPhone" />
                            <div class="error-message" v-if="errors.has('cliente[celular]')">{{ errors.first('cliente[celular]') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { Validator } from 'vee-validate'
    import { AppConfig } from '../../../config/app-config.js'
    import { EventBus } from '../EventBus/event-bus.js'

    export default {
        props: [
            'type'
        ],
        computed: {
            cpfCnpj: {
                get(){
                    return this.$store.state.Customer.cpfCnpj
                },
                set(value){
                    this.$store.commit('Customer/updateCpfCnpj', value)
                }
            },
            pessoa: {
                get(){
                    return this.$store.state.Customer.pessoa
                },
                set(value){
                    this.$store.commit('Customer/updatePessoa', value)
                }
            },
            name: {
                get(){
                    return this.$store.state.Customer.name
                },
                set(value){
                    this.$store.commit('Customer/updateName', value)
                }
            },
            birthDate: {
                get(){
                    return this.$store.state.Customer.birthDate
                },
                set(value){
                    this.$store.commit('Customer/updateBirthDate', value)
                }
            },
            sex: {
                get(){
                    return this.$store.state.Customer.sex
                },
                set(value){
                    this.$store.commit('Customer/updateSex', value)
                }
            },
            email: {
                get(){
                    return this.$store.state.Customer.email
                },
                set(value){
                    this.$store.commit('Customer/updateEmail', value)
                }
            },
            phone: {
                get(){
                    return this.$store.state.Customer.phone
                },
                set(value){
                    this.$store.commit('Customer/updatePhone', value)
                }
            },
            celPhone: {
                get(){
                    return this.$store.state.Customer.celPhone
                },
                set(value){
                    this.$store.commit('Customer/updateCelPhone', value)
                }
            },
            isPF(){
                return this.pessoa === 'F'
            },
            contactValidate(){
                return AppConfig.$options.contactValidate
            },
            quotation(){
                return this.$store.getters[this.type == 'RESIDENCE' ? 'ResidenceForm/quotation' : 'VehicleForm/quotation']
            },
        },
        watch: {
            cpfCnpj(value){
                this.errors.remove('cliente[cpf_cnpj]')
                this.$store.dispatch('Customer/resetCustomer')
            },
            quotation(quotation){
                if( ! quotation.cliente )
                    return

                this.cpfCnpj = quotation.cliente.cpf_cnpj || ''

                this.$nextTick(() => {
                    this.pessoa    = quotation.cliente.pessoa || ''
                    this.name      = quotation.cliente.nome || ''
                    this.birthDate = quotation.cliente.data_nascimento || ''
                    this.sex       = quotation.cliente.sexo || ''
                    this.email     = quotation.cliente.email || ''
                    this.phone     = quotation.cliente.fone_fixo || ''
                    this.celPhone  = quotation.cliente.celular || ''
                })
            }
        },
        methods: {
            consultaCPF(e){
                this.$store.dispatch('googleAnalytics', '/propostas?etapa=buscar-cliente')

                let cpfCnpj  = e.target.value.replace(/\D/g,'')

                if(cpfCnpj.length == 11)
                    this.pessoa = 'F'

                if(cpfCnpj.length == 14)
                    this.pessoa = 'J'

                if(cpfCnpj.length != 11 && cpfCnpj.length != 14)
                    return

                let valueInSessionStorage = sessionStorage.getItem(cpfCnpj)

                if(valueInSessionStorage){
                    valueInSessionStorage = JSON.parse(valueInSessionStorage)

                    if(valueInSessionStorage.msg || valueInSessionStorage.erro){
                        this.addCpfError(valueInSessionStorage)
                        return
                    }

                    this.$store.dispatch('Customer/setUpdateCustomer', valueInSessionStorage)
                    this.validateFields()

                    EventBus.$emit('updatedCustomer')

                    return
                }

                this.$store.dispatch('exibeMensagemCarregamento', 'Aguarde, buscando dados...')

                this.$http.get(AppConfig.$options.environment.applicationUrl + '/propostas/consulta_cpf', {
                    params: {
                        cpf: cpfCnpj
                    },
                    timeout: 10000
                }).then(response => {
                    this.$store.dispatch('closeLoading', 1000)

                    sessionStorage.setItem(cpfCnpj, JSON.stringify(response.body))

                    if(response.body.msg || response.body.erro){
                        this.addCpfError(response.body)
                        return
                    }

                    this.$store.dispatch('Customer/setUpdateCustomer', response.body)
                    this.validateFields()

                    EventBus.$emit('updatedCustomer')
                }).catch(err => {
                    this.$store.dispatch('exibeMensagemCarregamento', 'Não foi possível buscar dados pelo CPF/CNPJ. Por favor, preencha os dados manualmente')
                    this.$store.dispatch('closeLoading', 3000)
                })
            },
            validateFields(){
                this.$nextTick(() => {
                    this.$validator.validate('cliente[nome]', this.name)
                    this.$validator.validate('cliente[cpf_cnpj]', this.cpfCnpj)
                })
            },
            addCpfError(value){
                this.errors.add('cliente[cpf_cnpj]', (value.msg || value.erro), 'cpfError')
            }
        }
    }
</script>
