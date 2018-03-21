<template>
    <div class="row form-actions">
        <div class="col-xs-12 buttons">
            <hr>

            <div class="calcular-imprimir">
                <input class="btn btn-primary" type="submit" value="Calcular em todas" @click.prevent="$emit('sendForm')" :disabled="disableButtonQuote">
                <a href="#" class="btn btn-warning" @click.prevent="$emit('printResultQuotation')" :disabled="showedQuotationCount === 0" v-if="canPrintResults">Imprimir</a>
            </div>

            <div v-if="result.acesso_comissao && commissionAccess" class="comissoes">
                <label class="label-comissao">Comissão:</label>
                <div class="campo-comissao input-group" v-if="showCommission" :class="{'has-error': errors.has('commission')}">
                    <input type="text" class="form-control" ref="commission" name="commission" v-validate="{ rules: { numeric: true, min_value: 0, max_value: 100 } }"/>
                    <span class="input-group-addon">%</span>
                </div>
                <button class="btn btn-primary botoes" v-if="showCommission" @click.prevent="setCommissionToAll">Aplicar em todas</button><button class="btn btn-primary botoes" @click.prevent="$emit('canSeeCommission')">{{ showCommission ? 'Ocultar' : 'Exibir' }}</button>
                <div class="error-message" v-if="errors.has('commission')">Informe uma comissão válida!</div>
            </div>

            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'showedQuotationCount', 
            'canPrintResults', 
            'result', 
            'commissionAccess',
            'showCommission'
        ],
        data() {
            return {
                disableButtonQuote: false
            }
        },
        methods: {
            setCommissionToAll(){
                if (!this.errors.has('commission'))
                    this.$emit('setCommissionToAll', this.$refs.commission.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.form-actions {

        .calcular-imprimir {
            display: inline-block;
        }

        .comissoes {
            display: inline-block;
            margin-left: 35px;
        }

        .label-comissao {
            float:left;
            margin:0;
            line-height: 35px;
        }

        .campo-comissao {
            float:left;
            width:90px;
            margin-left: 5px;
        }

        .botoes {
            margin-left: 5px;
        }

        .error-message {
            display: inline-block;
            margin-left: 10px;
            color: #a94542;
        }

    }
</style>