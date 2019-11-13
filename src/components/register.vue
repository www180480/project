<template>
  <div class="login_box">
    <!-- // -->
    <div class="top"></div>
    <!-- // -->
    <!-- // -->
    <div class="nav">
      <van-nav-bar
        class="nav"
        title="注册"
        right-text="登录"
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
      <div class="name">
        昵称：
        <input type="text" v-model="name" />
      </div>
      <div class="check">
        验证码：
        <input type="text" v-model="check" />
        <input type="button" value="点击获取验证码" class="cget" v-model="number" @click="times()" />
      </div>
      <p></p>
      <div class="enter" @click="register()">下一步</div>
      <div class="prot">
        <!-- <van-checkbox v-model="checked" checked-color="#ccc" shape="square">复选框</van-checkbox> -->
        <input
          type="checkbox"
          name
          id="chec"
          v-model="flag"
          checked
          :class="[flag?'inbg':'']"
          @click="flag = !flag"
        />
        <label for="chec">我已阅读并同意使用条款和隐私政策</label>
      </div>
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
      password: "",
      name: "",
      check: "",
      flag: false,
      number: "点击获取验证码",
      istime: false
    };
  },
  methods: {
    times() {
      if (this.username == "") {
        this.$toast("请填写手机号 ");
        return;
      } else {
        if (this.istime == true) {
          return;
        }
        this.istime = true;
        this.number = 60;
        let timer = setInterval(() => {
          this.number--;
          if (this.number == 0) {
            this.number = "点击获取验证码";
            this.istime = false;
            clearInterval(timer);
          }
        }, 1000);
        // 发送验证码start
        this.$http
          .get("http://localhost:3000/captcha/sent?phone=" + this.username)
          .then(res => {
            if (res.data.code == 200) {
              this.$toast("发送成功");
            } else {
              this.$toast("发送失败");
            }
          });
        // 发送验证码end
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/login");
    },
    register() {
      if (
        this.username == "" ||
        this.password == "" ||
        this.check == "" ||
        this.name == ""
      ) {
        this.$toast("请填写完整信息 ");
        return;
      } else {
        // 密码强度验证-start
        var regex = new RegExp(
          "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-ZW_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-zW_!@#$%^&*`~()-+=]+$)(?![0-9W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9W_!@#$%^&*`~()-+=]{8,30}$"
        );
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.username)) {
          this.$toast("手机号码有误，请重填");
          return false;
        }
        if (!regex.test(this.password)) {
          this.$toast("输入错误：密码不符合规则，请重新输入 ");
          return;
        }

        // 密码强度验证-end
        if (this.flag == false) {
          this.$toast("请阅读勾选条款和隐私政策 ");
          return;
        }
        // 判断手机号是否已存在-start
        this.$http
          .get(
            "http://localhost:3000/cellphone/existence/check?phone=" +
              this.username
          )
          .then(res => {
            console.log(res);
            if (res.data.exist == 1) {
              this.$toast("手机号已存在");
              return;
            } else {
              // 注册-start

              // 校验验证码start
              this.$http
                .get(
                  "http://localhost:3000/captcha/verify?phone=" +
                    this.username +
                    "&captcha=" +
                    this.check
                )
                .then(res => {
                  console.log(res);
                  if (res.data.code == 200) {
                    this.$http
                      .get(
                        "http://localhost:3000/register/cellphone?phone=" +
                          this.username +
                          "&password=" +
                          this.password +
                          "&nickname=" +
                          this.name +
                          "&captcha=" +
                          this.check
                      )
                      .then(res => {
                        if (res.data.code == 200) {
                          this.$toast(res.data.msg + "请返回登录");
                          this.$router.push("/login");
                        } else {
                          this.$toast("注册失败");
                        }
                      });
                  }
                });
              // 校验验证码end

              // 注册-end
            }
          });
        // 判断手机号是否已存在-end
      }
    }
  },
  mounted() {}
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
    padding-top: 0.92rem;
    width: 6rem;
    margin: 0 auto;
    .phone,
    .password,
    .check,
    .name {
      height: 1.31rem;
      line-height: 1.31rem;
      border-bottom: 1px solid #666666;
    }
    .cget {
      height: 0.6rem;
      line-height: 0.6rem;
      color: #666;
      padding: 0 0.1rem 0 0.1rem;
      width: 2rem;
    }
    p {
      height: 0.49rem;
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
      margin-bottom: 0.49rem;
    }
    .prot {
      font-size: 0.2799rem;
      color: #666;
      input[type="checkbox"] {
        width: 0.28rem;
        height: 0.28rem;
        border: 1px solid #6f6f6f;
        margin-right: 0.19rem;
        vertical-align: top;
        line-height: 0.2799rem;
        background-size: contain;
      }
      .inbg {
        background: url("../assets/images/check.jpg") no-repeat;
      }
    }
  }
}
</style>