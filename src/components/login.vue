<template>
  <div class="login_box">
    <!-- // -->
    <div class="top"></div>
    <!-- // -->
    <!-- // -->
    <div class="nav">
      <van-nav-bar
        class="nav"
        title="登录"
        right-text="注册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!--  -->
    <div class="login_main">
      <div class="phone">
        手机号：
        <input type="text" v-model="username" />
      </div>
      <div class="password">
        密码：
        <input type="password" v-model="password" />
      </div>
      <p>忘记密码</p>
      <div class="enter" @click="login()">登录</div>
    </div>
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
      username: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/register");
    },
    login() {
      if (this.username == "" || this.password == "") {
        this.$toast("请填写完整信息 ");
        return;
      } else {
        this.$http
          .get(
            "http://localhost:3000/login/cellphone?phone="+this.username+"&password="+this.password)
          .then(res => {
            console.log(res.data.account);
            if (res.data.code == 200) {
              sessionStorage.setItem("store",JSON.stringify(res.data));
              this.$toast('登陆成功');
              this.$router.push("/self");
            } else {
              this.$toast('登陆失败');
            }
          });
      }
    }
  },
  mounted() {

  }
};
</script>
<style lang="less" scoped>
.login_box {
  padding-bottom: 1.29rem;
  width: 7.5rem;
  .top {
    height: 0.47rem;
    background: url("../assets/images/top_self.png") no-repeat;
  }
  .nav {
    height: 0.95rem;
    background: url("../assets/images/self_top11.png") no-repeat 0 -2px;
  }
  .van-nav-bar__title,
  .van-nav-bar,
  .van-icon,
  .van-nav-bar__text {
    color: #fff;
    font-size: 0.3749rem;
  }
  .van-nav-bar {
    line-height: 0.95rem;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0px;
  }
  //
  .login_main {
    padding-top: 1.92rem;
    width: 6rem;
    margin: 0 auto;
    .phone,
    .password {
      height: 1.31rem;
      line-height: 1.31rem;
      border-bottom: 1px solid #666666;
    }
    p {
      line-height: 0.98rem;
      height: 0.98rem;
      color: #666;
      text-align: right;
    }
    .enter {
      width: 6rem;
      background-color: #ff9900;
      height: 1.01rem;
      border-radius: 0.09rem;
      color: #fff;
      line-height: 1.01rem;
      text-align: center;
      font-size: 0.3749rem;
    }
  }
}
</style>