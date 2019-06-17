export default {
    namespaced: true,
    state: {

    },
    actions: {
        getApiData({rootState}, payload){
            return new Promise((resolve, rejects) => {
                this.api.get(`https://api.coincap.io/v2/assets?limit=15`).then(res => {
                    resolve(res)
                }, error => {
                    rejects(error)
                })
            })
        }
    }
}