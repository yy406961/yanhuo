import { ajax } from 'common'

export function getNationPsNumData (payload) {
    return ajax.post(`/countrywide/getPsNumData`, payload)
}

export function getPartPsNumData (payload) {
    return ajax.post(`/areaPsNum/getPsNumData`, payload)
}
