import Vue from 'vue'
// vux
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        myinfo:'',
        carlist:''
    },
    mutations:{
        add(state,info){
            state.myinfo = info;
        },
        addcar(state,car){
            state.carlist = car
        }
    }
})
export default store;