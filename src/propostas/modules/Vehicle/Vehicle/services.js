import { AppConfig } from 'config/app-config.js'

export const decodificarChassi = (http, chassi) => {
    return http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/decodificar-chassi', {
        params: {
            chassi
        }
    }).then(response => {
        let errorMessage

        if( ! response.body || response.body.erro )
            errorMessage = ! response.body ? response.bodyText : response.body.erro
        else if( response.body.marcas.length === 0 || response.body.modelos.length === 0 || response.body.ano === '0' )
            errorMessage = 'Chassi não encontrado'

        if( errorMessage )
            return { error: errorMessage }

        return { data: response.body }
    })
}

export const buscaModeloPorFipe = (http, fipe) => {
    return http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/busca_modelo_por_fipe', {
        params: {
            fipe
        }
    }).then(response => {
        let errorMessage

        if( ! response.body || response.body.error )
            errorMessage = ! response.body ? response.bodyText : response.body.error

        if( errorMessage )
            return { error: errorMessage }

        return { data: response.body }
    })
}

export const buscaFipePorModelo = (http, modelo_id) => {
    return http.get(AppConfig.$options.environment.applicationUrl + '/propostas_veiculos/busca_fipe_por_modelo', {
        params: {
            modelo_id
        }
    }).then(response => {
        let errorMessage

        if( ! response.body || response.body.error )
            errorMessage = ! response.body ? response.bodyText : response.body.error

        if( errorMessage )
            return { error: errorMessage }

        return { data: response.body }
    })
}
