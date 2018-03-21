<template>
    <select :name="name" :id="id" :disabled="disabled">
        <option></option>
    </select>
</template>

<script>
    import jQuery from 'jquery'
    import select2 from 'select2'

    export default {
        props: [
            'name',
            'id',
            'disabled',
            'placeholder',
            'options',
            'value',
        ],
        mounted: function () {
            var self = this

            jQuery(this.$el)
                .select2({
                    theme: 'bootstrap',
                    width: '100%',
                    placeholder: this.placeholder,
                    data: this.options
                })
                .val(this.value)
                .on('change', function(){
                    self.$emit('input', this.value)
                })
                .on('select2:close', function(){
                    jQuery(self.$el).focus()
                })
        },
        watch: {
            value: function (value) {
                this.$nextTick(() => {
                    jQuery(this.$el).val(value).trigger('change.select2')
                })
            },
            options: function (options) {
                jQuery(this.$el).select2().html('<option></option>')
                jQuery(this.$el).select2({
                    theme: 'bootstrap',
                    width: '100%',
                    placeholder: this.placeholder,
                    data: options
                })
                .val(this.value)
                .trigger('change.select2')
            }
        }
    }
</script>
