<template>
    <div>
        <router-view></router-view>
        <tabbar></tabbar>
    </div>
</template>
<script>
import tabbar from './tabbar'
import classify from './classify'
import shop from './shop'
import self from './self'
export default {
    components:{
        tabbar,
        classify,
        self,
        shop
    }
}
</script>