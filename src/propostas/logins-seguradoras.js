import { AppConfig } from '../config/app-config.js'

window.Multicalculo = {
    loginInvalid: data => {},
    loginValid: data => {},
    activeToggle: data => {}
}

window.loginInvalid = Multicalculo.loginInvalid
window.loginValid   = Multicalculo.loginValid
window.activeToggle = Multicalculo.activeToggle

const insurers = AppConfig.$options.currentScript.hasAttribute('data-insurers')
    ? AppConfig.$options.currentScript.getAttribute('data-insurers').split(',').map(Function.prototype.call, String.prototype.trim)
    : []

jQuery.ajax({
    type: 'GET',
    url: AppConfig.$options.environment.applicationUrl + "/integracao/logins",
    data: {
        token: AppConfig.$options.token,
        seguradoras: insurers,
        images: AppConfig.$options.imagesPath
    },
    async: false,
    success: response => {
        jQuery('#' + AppConfig.$options.container).append(response)

        setTimeout(() => {
            document.getElementById('token').value = AppConfig.$options.token
        }, 100)
    }
})

jQuery.getScript(AppConfig.$options.environment.fayeUrl + '/faye.js', () => {
    jQuery.getScript(AppConfig.$options.environment.fayeUrl + '/faye/client.js', () => {
        jQuery.getScript(AppConfig.$options.environment.applicationUrl + '/integracao/login_seguradoras.js')
    })
})