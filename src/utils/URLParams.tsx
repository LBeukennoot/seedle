export default class URLParams {

    queryString: string
    urlParams : URLSearchParams

    constructor() {
        this.queryString = window.location.search
        this.urlParams = new URLSearchParams(this.queryString)
    }

    getParam(param: string): any {
        return this.urlParams.get(param)
    }
}