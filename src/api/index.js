import config from '../config'
import {axios} from '../util/axios'
import {isUndefinedOrNull, isEmptyString} from '../util/helpers'

const queryBuilder = require('query-string')

export default {
  request (url) {
    return new Request(config.api + url)
  }
}

class Request {
  constructor (url) {
    this.url = url
    this.options = {}
    this.includes = []
    this.body = null
    this.params = null
  }
  
  withBody (body, suppressSanitizing = false) {
    this.body = suppressSanitizing ? body : Request._sanitizeData(body)
    return this
  }
  
  withIncludes (includes) {
    this.includes = includes
    return this
  }
  
  withHeaders (headers) {
    this.options.headers = headers
    return this
  }
  
  withParams (params) {
    this.params = Request._sanitizeData(params)
    return this
  }
  
  getUrl () {
    let queryParams = this._buildQueryParams()
    return this.url + (queryParams ? '?' + queryParams : '')
  }
  patch () {
    return axios.patch(this.getUrl(), this.body, this.options)
  }
  
  get () {
    return axios.get(this.getUrl(), this.options)
  }
  
  post () {
    return axios.post(this.getUrl(), this.body, this.options)
  }
  
  put () {
    return axios.put(this.getUrl(), this.body, this.options)
  }
  
  delete () {
    return axios.delete(this.getUrl(), this.body, this.options)
  }
  
  _buildQueryParams () {
    let build = ''
    if (this.params) {
      build += this._buildParams()
    }
    
    return build
  }
  
  _buildParams () {
    return queryBuilder.stringify(this.params, {arrayFormat: 'bracket'})
  }
  
  static _sanitizeData (data) {
    let output = {}
    for (let prop in data) {
      if (!isUndefinedOrNull(data[prop]) && !isEmptyString(data[prop])) {
        output[prop] = data[prop]
      }
    }
    return output
  }
}
