<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container modal-container-result-insurer">
                    <div class="modal-header modal-header-result-insurer">
                        <div class="logo">
                            <img :src="(imagesPath || 'images/login-seguradoras') + '/' + seguradora.seguradora + '.png'" :alt="seguradora.nome" width="30">
                        </div>
                        <h3>{{ seguradora.nome_abreviado }}</h3>
                        <button type="button" @click="$emit('close')">&times;</button>
                        <div class="clearfix"></div>
                    </div>

                    <div class="modal-body modal-body-result-insurer">
                        <h4><icon name="money"></icon> Valores</h4>
                        <b>Prêmio:</b> R$ {{ quotationResult.value }} <br>
                        <b>Franquia:</b> R$ {{ quotationResult.franchise }} <br>
                        <b>Tempo de cálculo:</b> {{ quotationResult.time }} segundos <br>
                        <hr>

                        <h4><icon name="bar-chart"></icon> Coberturas</h4>
                        <div v-html="quotationResult.coverages"></div>
                        <hr>

                        <h4><icon name="bar-chart"></icon> Outras Coberturas</h4>
                        <div v-html="quotationResult.otherCoveragesHover"></div>
                        <hr>

                        <h4><icon name="info-circle"></icon> Veículo/Produto/ID</h4>
                        <b>Veículo:</b> {{ quotationResult.vehicleHover || quotationResult.vehicle }} <br>
                        <b>Produto:</b> {{ quotationResult.product }} <br>
                        <b>ID:</b> <a href="javascript:void(0)" :data-preco-id="quotationResult.priceId" class="open-quotation">{{ quotationResult.code }}</a> <br>
                        <hr>

                        <h4><icon name="money"></icon> Parcelamento</h4>
                        <div class="payments" v-for="(payments, paymentType) in quotationResult.paymentForms">
                            <h5>{{ paymentTypesPreDefinition[paymentType] || paymentType }}</h5>
                            <div v-for="(value, key) in payments">
                                {{ key }} - {{ value }}
                            </div>
                        </div>
                        <hr>

                        <h4><icon name="comments"></icon> Ajustes</h4>
                        <div v-html="quotationResult.adjustmentsHover || quotationResult.adjustments || '<em>Nenhuma informação</em>'"></div>
                        <hr>

                        <h4><icon name="comments"></icon> Mensagens da seguradora</h4>
                        <div v-html="quotationResult.messageHover || quotationResult.message || '<em>Nenhuma informação</em>'"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['imagesPath', 'seguradora', 'quotationResult'],
        data(){
            return {
                modalBodySize: 0,
            }
        },
        computed: {
            paymentTypesPreDefinition(){
                return this.$store.state.VehicleResult.paymentTypesPreDefinition
            },
        },
        mounted() {
            this.adjustmentsModalBodySize()
        },
        methods: {
            resizeModalBody(){
                window.addEventListener('resize', this.adjustmentsModalBodySize)
            },
            adjustmentsModalBodySize(){
                this.modalBodySize = (
                    document.querySelector('.modal-container-result-insurer').offsetHeight - document.querySelector('.modal-header-result-insurer').offsetHeight - 65
                ) + 'px'

                document.querySelector('.modal-body-result-insurer').style.height = this.modalBodySize
            },
        }
    }
</script>

<style scoped>
    h4 {
        font-size: 16px;
        color: #194E92;
    }

    .clearfix {
        clear: both;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        text-align: left;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 93%;
        height: 93%;
        margin: 0px auto;
        padding: 25px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header {
        padding: 0;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
    }

    .modal-header .logo {
        padding-right: 10px;
        float: left;
    }

    .modal-header .logo img {
        max-width: 100%;
    }

    .modal-header h3 {
        line-height: 30px;
        margin-top: 0;
        float: left;
        color: #194E92;
        font-size: 14px;
    }

    .modal-header button {
        font-size: 25px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
        background: none;
        border: 0;
        position: absolute;
        top: -15px;
        right: -15px;
    }

    .modal-body {
        margin: 20px 0;
        padding: 0;
        height: 1px;
        max-height: inherit;
        overflow-y: auto;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }
</style>
