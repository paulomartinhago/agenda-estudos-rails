<template>
    <bootstrap-modal id="captcha-porto" ref="captchaPortoModal" :need-header="false" :need-footer="true" :opened="openedModal" :closed="closedModal" size="full">
        <div slot="body">
            <div class="row">
                <div class="col-md-12">
                    <iframe src="https://corretor.portoseguro.com.br/portal/site/corretoronline/template.LOGIN/" width="100%" height="100%"></iframe>
                </div>
            </div><!-- end row -->
        </div><!-- end body -->

        <div slot="footer">
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-danger" @click="canOpenModal = false">Fechar</button>
                </div>
            </div>
        </div><!-- end footer -->
    </bootstrap-modal>
</template>

<script>
    import BootstrapModal from 'vue2-bootstrap-modal'

    export default {
        components: {
            BootstrapModal,
        },
        props: [
            'openModal',
        ],
        mounted(){
            window.addEventListener('resize', this.resizeModal)
        },
        data(){
            return {
                canOpenModal: false,
                modalWidth: 0,
                modalHeight: 0,
            }
        },
        watch: {
            openModal(value){
                this.canOpenModal = value
            },
            canOpenModal(value){
                if(value){
                    this.$refs.captchaPortoModal.open()
                    return
                }

                this.$refs.captchaPortoModal.close()
            }
        },
        methods: {
            openedModal(){
                this.resizeModal()
            },
            closedModal(){
                this.canOpenModal = false
            },
            resizeModal(){
                // this.modalWidth  = window.innerWidth * 0.8 + 'px'
                this.modalHeight = window.innerHeight * 0.8 + 'px'

                // document.getElementById('captcha-porto').querySelector('.modal-dialog').style.width = this.modalWidth
                document.getElementById('captcha-porto').querySelector('.modal-body').style.minHeight = this.modalHeight
                // document.getElementById('captcha-porto').querySelector('.modal-body iframe').style.width = this.modalWidth
                document.getElementById('captcha-porto').querySelector('.modal-body iframe').style.minHeight = this.modalHeight
            },
        }
    }
</script>
