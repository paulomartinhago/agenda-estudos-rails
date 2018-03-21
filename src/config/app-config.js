import Vue from 'vue'
import { CustomOptionsBus } from '../propostas/modules/CustomOptionsBus/custom-options-bus.js'

/**
 * Detectar ambiente (development, production, ...)
 */
const environments = {
    production: {
        applicationUrl: 'https://multicalculo.leosoft.com.br',
        fayeUrl: 'https://faye.leosoft.com.br'
    },
    productionSegfy: {
        applicationUrl: 'https://multicalculo.segfy.com',
        fayeUrl: 'https://faye.leosoft.com.br'
    },
    development: {
        applicationUrl: 'http://localhost:3001',
        fayeUrl: 'http://localhost:9292'
    },
    homologation: {
        applicationUrl: 'http://192.168.1.54:3012',
        fayeUrl: 'https://faye.leosoft.com.br'
    },
    externalHomologation: {
        applicationUrl: 'http://191.32.60.22:3012',
        fayeUrl: 'https://faye.leosoft.com.br'
    },
    test: {
        applicationUrl: 'http://localhost:3001',
        fayeUrl: 'http://localhost:9292'
    }
}

let environment = environments.production

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-environment'))
{
    let env = CustomOptionsBus.$options.currentScript.getAttribute('data-environment')

    if(env === 'productionSegfy') environment = environments.productionSegfy
    if(env === 'development') environment = environments.development
    if(env === 'homologation') environment = environments.homologation
    if(env === 'externalHomologation') environment = environments.externalHomologation
    if(env === 'test') environment = environments.test
}

/**
 * Detectar se foi passado um token de usuário
 */
let token;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-token'))
{
    token = CustomOptionsBus.$options.currentScript.getAttribute('data-token')
}

/**
 * Detectar elemento para carregar app
 */
let container;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-container'))
{
    container = CustomOptionsBus.$options.currentScript.getAttribute('data-container')
}

/**
 * Mostrar formulário de veículo
 */
let showFormVehicle = true;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-show-form-vehicle'))
{
    showFormVehicle = CustomOptionsBus.$options.currentScript.getAttribute('data-show-form-vehicle') === 'true'
}

/**
 * Mostrar formulário residencial
 */
let showFormResidence = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-show-form-residence'))
{
    showFormResidence = CustomOptionsBus.$options.currentScript.getAttribute('data-show-form-residence') === 'true'
}

/**
 * Mostrar formulário de veículo para o cliente
 */
let showFormVehicleCustomer = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-show-form-vehicle-customer'))
{
    showFormVehicleCustomer = CustomOptionsBus.$options.currentScript.getAttribute('data-show-form-vehicle-customer') === 'true'
}

/**
 * Mostrar formulário residencial para o cliente
 */
let showFormResidenceCustomer = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-show-form-residence-customer'))
{
    showFormResidenceCustomer = CustomOptionsBus.$options.currentScript.getAttribute('data-show-form-residence-customer') === 'true'
}

/**
 * Detectar se foi passado um ID de cotação para Veículo
 */
let vehicleQuotationId;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-vehicle-quotation-id'))
{
    vehicleQuotationId = CustomOptionsBus.$options.currentScript.getAttribute('data-vehicle-quotation-id')
}

/**
 * Trazer o resultado da cotação
 */
let vehicleLoadResult = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-vehicle-load-result'))
{
    vehicleLoadResult = CustomOptionsBus.$options.currentScript.getAttribute('data-vehicle-load-result') === 'true'
}

/**
 * Detectar se foi passado um ID de cotação para Residência
 */
let residenceQuotationId;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-residence-quotation-id'))
{
    residenceQuotationId = CustomOptionsBus.$options.currentScript.getAttribute('data-residence-quotation-id')
}

/**
 * Path das imagens
 */
let imagesPath;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-images-path'))
{
    imagesPath = CustomOptionsBus.$options.currentScript.getAttribute('data-images-path')
}

/**
 * Opção para mostrar botões de impressão
 */
let printResults = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-print-results'))
{
    printResults = CustomOptionsBus.$options.currentScript.getAttribute('data-print-results') === 'true'
}

/**
 * Opção para deixar os campos e-mail, telefone e celular obrigatórios
 */
let contactValidate = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-contact-validate'))
{
    contactValidate = CustomOptionsBus.$options.currentScript.getAttribute('data-contact-validate') === 'true'
}

/**
 * Opção para deixar o formulário centralizado
 */
let centeredFormVehicle = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-centered-form-vehicle'))
{
    centeredFormVehicle = CustomOptionsBus.$options.currentScript.getAttribute('data-centered-form-vehicle') === 'true'
}

/**
 * Opção para deixar os botões de calcular/imprimir centralizado
 */
let centeredButtonsFormVehicle = false;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-centered-buttons-form-vehicle'))
{
    centeredButtonsFormVehicle = CustomOptionsBus.$options.currentScript.getAttribute('data-centered-buttons-form-vehicle') === 'true'
}

/**
 * Opção para deixar o formulário centralizado
 */
let widthFormVehicle = '100%';

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-width-form-vehicle'))
{
    const dataWidthFormVehicle = CustomOptionsBus.$options.currentScript.getAttribute('data-width-form-vehicle')

    widthFormVehicle = /^[0-9]+$/.test(dataWidthFormVehicle) === true
        ? dataWidthFormVehicle + 'px'
        : dataWidthFormVehicle
}

/**
 * Opção para permitir ou não acesso a comissão
 */
let commissionAccess = true;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-commission-access'))
{
    commissionAccess = CustomOptionsBus.$options.currentScript.getAttribute('data-commission-access') === 'true'
}

/**
 * Opção para permitir ou não acesso a seguradora
 */
let insurerAccess = true;

if(CustomOptionsBus.$options.currentScript.hasAttribute('data-insurer-access'))
{
    insurerAccess = CustomOptionsBus.$options.currentScript.getAttribute('data-insurer-access') === 'true'
}

/**
 * Export config...
 */
export const AppConfig = new Vue({
    currentScript: CustomOptionsBus.$options.currentScript,
    environments,
    environment,
    token,
    container,
    showFormVehicle,
    showFormResidence,
    showFormVehicleCustomer,
    showFormResidenceCustomer,
    vehicleQuotationId,
    vehicleLoadResult,
    residenceQuotationId,
    imagesPath,
    printResults,
    contactValidate,
    centeredFormVehicle,
    centeredButtonsFormVehicle,
    widthFormVehicle,
    commissionAccess,
    insurerAccess
})
