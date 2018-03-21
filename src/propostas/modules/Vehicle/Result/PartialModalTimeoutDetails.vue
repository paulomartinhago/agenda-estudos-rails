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
                        <div class="timeout-icon">
                            <icon name="clock-o" scale="3"></icon>
                        </div>
                        <div v-html="message"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['imagesPath', 'seguradora', 'message'],
        data(){
            return {
                modalBodySize: 0,
            }
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
        text-align: center;
    }

    .timeout-icon i,
    .timeout-icon svg {
    	width: 100%;
    	color: orange;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }
</style>
