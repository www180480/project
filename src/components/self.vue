<template>
  <div class="self_box">
    <!-- // -->
    <div class="top"></div>
    <!-- // -->
    <!-- // -->
    <div class="nav">
      <van-tabbar v-model="active" class="nav">
        <van-tabbar-item>
          <img slot="icon" :src="set" />
        </van-tabbar-item>
        <van-tabbar-item style="color:#fff;font-size:0.4169rem;margin-bottom:0.25rem">个人中心</van-tabbar-item>
        <van-tabbar-item :info="myinfo.profile.follows">
          <img slot="icon" :src="news" />
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- // -->
    <div class="center">
      <div class="circle_big">
        <div class="circle_small">
          <router-link to="/login">
            <van-image round width="1.82rem" height="1.82rem" :src="myinfo.profile.avatarUrl" />
          </router-link>
        </div>
      </div>
    </div>
    <!-- // -->
    <div class="fav">
      <p>{{myinfo.profile.nickname}}</p>
      <div>
        <img :src="require('../assets/images/keep.png')" alt />
        我的收藏
      </div>
    </div>
    <!-- // -->
    <!-- // -->
    <div class="order">
      <div class="my">
        <span>我的订单</span>
        <i>查看全部订单</i>
      </div>
      <div class="all">
        <ul>
          <li>
            <img :src="require('../assets/images/icon_boligation.png 拷贝.png')" alt />
            <p>待付款</p>
          </li>
          <li>
            <img :src="require('../assets/images/prepare.png')" alt />
            <p>待发货</p>
          </li>
          <li>
            <img :src="require('../assets/images/icon_consignee.png')" alt />
            <p>待收货</p>
          </li>
          <li>
            <img :src="require('../assets/images/icon_evaluate.png')" alt />
            <p>待评价</p>
          </li>
          <li>
            <img :src="require('../assets/images/icon_refund.png')" alt />
            <p>退款/售后</p>
          </li>
        </ul>
      </div>
    </div>
    <!--  //-->
    <!--  -->
    <div class="address">收货地址管理</div>
    <!--  -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      set: require("../assets/images/set.png"),
      news: require("../assets/images/news.png"),
      active: 0,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      },
      myinfo: {
        profile: {
          avatarUrl: require("../assets/images/tx.jpg"),
          nickname: "点击登录",
          follows: ""
        }
      }
    };
  },
  mounted() {
    console.log(JSON.parse(sessionStorage.getItem("store")));
    if (sessionStorage.getItem("store")) {
      this.$store.state.myinfo = JSON.parse(sessionStorage.getItem("store"));
      if (this.$store.state.myinfo != "") {
        this.myinfo = this.$store.state.myinfo;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.self_box {
  padding-bottom: 1.29rem;
  background-color: #efeeee;
  width: 7.5rem;
  .top {
    height: 0.47rem;
    background: url("../assets/images/top_self.png") no-repeat;
  }
  .nav {
    height: 0.92-0.25rem;
    background: url("../assets/images/self_top11.png") no-repeat 0 -2px;
    padding-top: 0.25rem;
  }

  .van-tabbar--fixed {
    position: relative;
    top: 0;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0px;
  }
  .center {
    height: 2.3rem;
    background: url("../assets/images/nav.png") no-repeat;
    position: relative;
    .circle_big {
      width: 2.08rem;
      height: 2.08rem;
      background-color: #fff;
      border-radius: 50%;
      text-align: center;
      position: absolute;
      bottom: -0.72rem;
      left: 50%;
      margin-left: -1.04rem;
      line-height: 2.08rem;
      .circle_small {
        height: 1.82rem;
        width: 1.82rem;
        background-color: #e6dfdf;
        border-radius: 50%;
        margin: 0.13rem auto;
      }
    }
  }
  .fav {
    background-color: #fafafa;
    height: 2.6rem;
    p {
      font-size: 0.3281rem;
      line-height: 0.3281rem;
      color: #333;
      height: 1.8-0.95rem;
      padding-top: 0.95rem;
      text-align: center;
    }
    div {
      font-size: 0.3335rem;
      color: #333;
      img {
        width: 0.38rem;
        height: 0.36rem;
        margin-left: 0.35rem;
        margin-right: 0.2rem;
      }
    }
  }
  .order {
    height: 3.12rem;
    margin-top: 0.15rem;
    background-color: #fafafa;
    .my {
      height: 1.25rem;
      border-bottom: 1px solid #b3b3b3;
      padding-left: 0.47rem;
      padding-right: 1.27rem;
      span,
      i {
        font-size: 0.3335rem;
        line-height: 1.25rem;
      }
      i {
        float: right;
        color: #999999;
      }
    }
    .all {
      ul {
        display: flex;
        justify-content: space-around;
        li {
          img {
            display: block;
            width: 0.57rem;
            margin: 0.45rem auto 0.28rem;
          }
          p {
            font-size: 0.2343rem;
            color: #6666;
            text-align: center;
          }
        }
      }
    }
  }
  .address {
    height: 1.29rem;
    margin: 0.14rem 0 0 0;
    background-color: #fafafa;
    line-height: 1.29rem;
    font-size: 0.3335rem;
    color: #999;
    text-indent: 0.46rem;
  }
}
</style>