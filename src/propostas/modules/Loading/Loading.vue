<template lang="html">
    <div v-if="showLoading" class="pg-loading-screen" :class="showScreen ? 'pg-loading-screen-show' : ''">
        <div class="pg-loading-center-outer">
            <div class="pg-loading-center-middle">
                <!-- <div class="pg-loading-logo-header" :class="showLogo ? 'pg-loading-logo-header-show' : ''">
                    <img src="data:image/png;base64,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" alt="">
                </div> -->
                <div class="pg-loading-html" :class="showMessage ? 'pg-loading-html-show' : ''">
                    <p class="loading-message">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AppConfig } from '../../../config/app-config.js'

    export default {
        name: 'Loading',
        data(){
            return {
                showLoading: false,
                showScreen: false,
                showLogo: false,
                showMessage: false
            }
        },
        computed: {
            show(){
                return this.$store.state.Loading.show
            },
            message(){
                return this.$store.state.Loading.message
            }
        },
        watch: {
            show(value){
                if(value){
                    this.showLoading = true
                    return
                }

                this.showScreen = this.showLogo = this.showMessage = false
                setTimeout(() => this.showLoading = false, 700)
            },
            showLoading(value){
                if( ! value )
                    return

                setTimeout(() => this.showScreen = !this.showScreen, 10)
                setTimeout(() => this.showLogo = !this.showLogo, 500)
                setTimeout(() => this.showMessage = !this.showMessage, 700)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pg-loading-screen {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        z-index: 16000002;
        background: rgba(0, 0, 0, 0);
        -webkit-transition: background .3s ease-out;
        -moz-transition: background .3s ease-out;
        -o-transition: background .3s ease-out;
        transition: background .3s ease-out;
    }

    .pg-loading-screen-show {
        background: rgba(0, 0, 0, 0.7);
    }

    .pg-loading-center-outer {
        width: 100%;
        padding: 0;
        display: table !important;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
    }

    .pg-loading-center-middle {
        padding: 0;
        vertical-align: middle;
        display: table-cell  !important;
        margin: 0;
        text-align: center;
    }

    .pg-loading-logo-header {
        opacity: 0;
        -webkit-transition: opacity 1s ease-out;
        -moz-transition: opacity 1s ease-out;
        -o-transition: opacity 1s ease-out;
        transition: opacity 1s ease-out;
    }

    .pg-loading-logo-header img {
        display: inline-block !important;
    }

    .pg-loading-logo-header-show {
        opacity: 1;
    }

    .pg-loading-html {
        opacity: 0;
        -webkit-transition: opacity 1s ease-out;
        -moz-transition: opacity 1s ease-out;
        -o-transition: opacity 1s ease-out;
        transition: opacity 1s ease-out;
    }

    .pg-loading-html-show {
        opacity: 1;
    }

    .loading-message {
        margin-top: 40px;
        color: #fff;
        font-size: 24px;
        font-weight: 100;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .2s
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>
