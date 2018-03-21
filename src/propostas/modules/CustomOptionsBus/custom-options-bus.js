import Vue from 'vue'

let currentScript = document.currentScript || (function() {
    let scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
})()

export const CustomOptionsBus = new Vue({
    currentScript
})
