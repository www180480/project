<template>
    <!-- tabbar-satrt -->
      <van-tabbar v-model="active" active-color="#fb9b00" class="tabbar">
        <van-tabbar-item @click="toind()">
          <template #icon="{ active }">
            <img :src="active ? icon.active[0] : icon.inactive[0]" />
          </template>
          首页
        </van-tabbar-item>
        <van-tabbar-item @click="tocla()">
          <template #icon="{ active }">
            <img :src="active ? icon.active[1] : icon.inactive[1]" />
          </template>
          分类
        </van-tabbar-item>
        <van-tabbar-item @click="togo()">
          <template #icon="{ active }">
            <img :src="active ? icon.active[2] : icon.inactive[2]" />
          </template>
          购物车
        </van-tabbar-item>
        <van-tabbar-item @click="tosel()">
          <template #icon="{ active }">
            <img :src="active ? icon.active[3] : icon.inactive[3]" />
          </template>
          我
        </van-tabbar-item>
      </van-tabbar>
    <!-- tabbar-end  -->
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      activeName: "home",
      icon: {
        active: [
          require("../assets/images/tab_home_hig.png"),
          require("../assets/images/tab_menu_hig.png"),
          require("../assets/images/tab_shopping_hig.png"),
          require("../assets/images/tab_me_hig.png")
        ],
        inactive: [
          require("../assets/images/tab_home_nor.png"),
          require("../assets/images/tab_menu_nor.png"),
          require("../assets/images/tab_shopping_nor.png"),
          require("../assets/images/tab_me_nor.png")
        ]
      }
    };
  },
  methods: {
    toind(){
      this.$router.push('/')
    },
    tocla(){
      this.$router.push('/classify')
    },
    togo(){
      this.$router.push('/shop')
    },
    tosel(){
      this.$router.push('/self')
    }
  },
  mounted() {
    let hash = window.location.hash.split('/')
    let arr = hash[1]
    console.log(arr)
    if(arr == 'self'){
      this.active = 3;
    }
    if(arr == 'shop'){
      this.active = 2;
    }
    if(arr == 'classify'){
      this.active = 1;
    }
    if(arr == 'index'){
      this.active = 0;
    }
  },
};
</script>

<style lang="less">
.demo-tabbar {
  .van-tabbar {
    position: relative;
    &-item {
      cursor: pointer;
    }
  }
}
.tabbar{
  left: 50%;
  margin-left: -3.75rem;
  width: 7.5rem;
  height: 1.01rem;
}
</style>
