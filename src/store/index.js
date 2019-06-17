import Vue from 'vue'
import Vuex from 'vuex'
import mainPage from './mainPage'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    modules: {
        mainPage
    }
})

export default store