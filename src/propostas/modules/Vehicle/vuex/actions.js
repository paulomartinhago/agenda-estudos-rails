import moment from 'moment'
moment.locale('pt-br')

export default {
    onSaveQuotation({ dispatch, commit }, payload){
        let quotation = {
            type: 'vehicle',
            cotacao: {
                id:                            payload.id,
                inicio_vigencia:               (moment(payload.inicio_vigencia).isValid() ? moment(payload.inicio_vigencia).format('DD/MM/YYYY') : ''),
                termino_vigencia:              (moment(payload.termino_vigencia).isValid() ? moment(payload.termino_vigencia).format('DD/MM/YYYY') : ''),
                renovacao:                     payload.renovacao,
                bonus:                         payload.bonus,
                qtd_sinistros:                 payload.qtd_sinistros,
                final_apolice:                 (moment(payload.final_apolice).isValid() ? moment(payload.final_apolice).format('DD/MM/YYYY') : ''),
                apolice_anterior:              payload.apolice_anterior,
                codigo_identificacao:          payload.codigo_identificacao,
                cep_circula:                   payload.cep_circula,
                cep_pernoite:                  payload.cep_pernoite,
                garagem_residencia:            payload.garagem_residencia,
                garagem_trabalho:              payload.garagem_trabalho,
                garagem_estudo:                payload.garagem_estudo,
                utilizacao_veiculo:            payload.utilizacao_veiculo,
                distancia_residencia_trabalho: payload.distancia_residencia_trabalho,
                km_mensal:                     payload.km_mensal,
                vitima_furto:                  payload.vitima_furto.toString(),
                relacao_cliente_condutor:      payload.relacao_cliente_condutor,
                cobertura_para_outro_condutor: payload.cobertura_para_outro_condutor,
                condutor_secundario_sexo:      payload.condutor_secundario_sexo,
                token:                         payload.token
            },
            cliente: {
                cpf_cnpj:        payload.cliente.cpf_cnpj,
                pessoa:          payload.cliente.pessoa,
                nome:            payload.cliente.nome,
                data_nascimento: (moment(payload.cliente.data_nascimento).isValid() ? moment(payload.cliente.data_nascimento).format('DD/MM/YYYY') : ''),
                sexo:            payload.cliente.sexo,
                email:           payload.cliente.email,
                fone_fixo:       payload.cliente.fone_fixo,
                celular:         payload.cliente.celular
            },
            veiculo: {
                placa:            payload.veiculo.placa,
                chassis:          payload.veiculo.chassis,
                zero_km:          payload.veiculo.zero_km.toString(),
                ano_fab:          payload.veiculo.ano_fab,
                ano_modelo:       payload.veiculo.ano_modelo,
                tipo_combustivel: payload.veiculo.tipo_combustivel,
                valor_kit_gas:    payload.veiculo.valor_kit_gas,
                tipo_veiculo:     payload.veiculo.tipo_veiculo,
                isencao_fiscal:   payload.veiculo.isencao_fiscal,
                chassi_remarcado: payload.veiculo.chassi_remarcado.toString(),
                blindado:         payload.veiculo.blindado.toString(),
                marca:            payload.veiculo.marca.descricao,
                modelo:           payload.veiculo.modelo.descricao
            }
        }

        if(payload.condutor_principal)
        {
            quotation.condutor_principal = {
                cpf:                payload.condutor_principal.cpf,
                nome:               payload.condutor_principal.nome,
                nascimento:         (moment(payload.condutor_principal.nascimento).isValid() ? moment(payload.condutor_principal.nascimento).format('DD/MM/YYYY') : ''),
                sexo:               payload.condutor_principal.sexo,
                estado_civil:       payload.condutor_principal.estado_civil,
                tipo_de_residencia: payload.condutor_principal.tipo_de_residencia,
                ano_habilitacao:    payload.condutor_principal.ano_habilitacao,
                profissao:          payload.condutor_principal.profissao.descricao
            }
        }

        if(payload.coberturas.length > 0)
        {
            const lastCoverageNumber = payload.coberturas.length - 1,
                  lastCoverage       = payload.coberturas[lastCoverageNumber]

            quotation.cobertura = {
                id:                   lastCoverage.id,
                tipo_cobertura:       lastCoverage.tipo_cobertura,
                tipo_cobertura:       lastCoverage.tipo_cobertura,
                franquia:             lastCoverage.franquia,
                danos_materiais:      lastCoverage.danos_materiais,
                danos_corporais:      lastCoverage.danos_corporais,
                danos_morais:         lastCoverage.danos_morais,
                morte_invalidez:      lastCoverage.morte_invalidez,
                percentual_fipe:      lastCoverage.percentual_fipe,
                assistencia_24h:      lastCoverage.assistencia_24h,
                carro_reserva:        lastCoverage.carro_reserva,
                perfil_carro_reserva: lastCoverage.perfil_carro_reserva,
                oficina:              lastCoverage.oficina,
                reposicao_zero_km:    lastCoverage.reposicao_zero_km,
                vidros:               lastCoverage.vidros
            }
        }

        commit('lastQuotationSaved', quotation)
        dispatch('onSaveQuotation', quotation, { root: true })
    },
    onSaveInsurerQuotation({ dispatch }, payload){
        const insurerQuotation = {
            preco_id:        payload.preco_id,
            cotacao_id:      payload.cotacao_id,
            seguradora:      payload.seguradora,
            codigo:          payload.codigo,
            status:          payload.status,
            mensagem:        payload.mensagem.replace(/\n/, '<br>') + '<br>' + payload.mensagem_ajuste.replace(/\n/, '<br>'),
            franquia:        payload.franquia,
            valor:           payload.valor,
            valor_parcelado: JSON.parse(payload.valor_parcelado)
        }

        dispatch('onSaveInsurerQuotation', insurerQuotation, { root: true })
    },
}
