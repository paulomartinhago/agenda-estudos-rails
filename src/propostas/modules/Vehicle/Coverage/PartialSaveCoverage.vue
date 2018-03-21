<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Cobertura Predefinida</h3>
                        <button type="button" @click="$emit('close')">&times;</button>
                        <div class="clearfix"></div>
                    </div>

                    <div class="modal-body">
                        <input type="text" class="form-control" placeholder="Nome da cobertura..." v-model="title">
                        <button class="btn btn-success" @click.prevent="saveCoverage" :disabled="loading">{{ loading ? 'SALVANDO' : 'SALVAR' }}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { EventBus } from '../../EventBus/event-bus.js'

    export default {
        props: ['coverageTitle'],
        data(){
            return {
                title: null,
                loading: false
            }
        },
        mounted() {
            this.title = this.coverageTitle
            EventBus.$on('onLoadingSaveCoverage', isLoading => this.loading = isLoading)
        },
        methods: {
            saveCoverage(){
                this.loading = true
                this.$emit('saveCoverage', this.title)
            }
        }
    }
</script>

<style scoped>
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
        background-color: rgba(0, 0, 0, .7);
        display: table;
        transition: opacity .3s ease;
        text-align: left;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        height: auto;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header {
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        padding: 25px;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        color: #8b8b8b;
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
        top: 20px;
        right: 20px;
    }

    .modal-body {
        padding: 20px;
        height: auto;
        max-height: inherit;
        overflow-y: auto;
        text-align: center;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .form-control {
        width: 75%;
        display: inline;
    }

    .btn {
        width: 24%;
    }
</style>