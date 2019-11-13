<template>
  <div class="classify_box">
    <!-- top-start  -->
    <div class="index_top">
      <input type="text" class="search" placeholder="Montagne jeunesse" />
    </div>
    <!-- top-end  -->
    <div class="">
      <!-- slidebar-start  -->
      <van-sidebar v-model="activeKey1">
        <van-sidebar-item :title="item.name" v-for="(item,index) in list" :key="index" @click="tag = index"/>
      </van-sidebar>
      <!-- slidebar-end  -->
        <div class="classify_content">
            <ul v-for="(item,index) in list" :key="index" v-if='index == tag'>
                <li v-for="(ite,i) in item.list" :key="i" >
                    <div class="top">
                        <img :src="ite.thumbnail" alt="">
                    </div>
                    <div class="bottom">{{ite.name}}</div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey1: 0,
      list: [],
      tag:0
    };
  },
  mounted() {
    this.$http({
      url: "http://yd.msword.top/getClassify"
    }).then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
  }
};
</script>
<style lang="less">
.classify_box {
  position: relative;
  width: 7.5rem;
  .index_top {
    height: 1.4-0.65rem;
    width: 7.5rem;
    background: url("../assets/images/classify_top.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 0.65rem;
    .search {
      color: #999999;
      text-indent: 0.23rem;
      font-size: 0.2813rem;
      display: block;
      height: 0.6rem;
      width: 5.16rem;
      background-color: #fed2de;
      border-radius: 12px;
      margin: 0 auto;
      background-image: url("../assets/images/search.png");
      background-repeat: no-repeat;
      background-position: 4.57rem 0.1rem;
      background-size: 0.37rem 0.39rem;
    }
  }
  .van-sidebar-item--select {
    border-color: #1d84a7;
  }    
  .van-sidebar{
        display: inline-block;
        width: 2.35rem;
    }
  .classify_content {
    width: 7.5-2.35rem;
    float: right;
    ul{
        li{ display: inline-block;
            width: 2.33rem;
            height: 2.35rem;
            border: 1px solid #1d84a7;
            border-radius: 0.06rem;
            margin-left: 0.18rem;
            margin-top: 0.22rem;
            .top{
                height: 2.35rem-0.5rem;
                img{
                    margin-left: 0.32rem;
                    margin-top: 0.14rem;
                    background-color: orange;
                    display: block;
                    width: 1.65rem;
                    height: 1.72rem;
                }
            }
            .bottom{
                height: 0.5rem;
                background-color: #1d84a7;
                line-height: 0.5rem;
                color: #fff;
                text-align: center;
            }
        }
    }
  }
}
//
</style>