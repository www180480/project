<template>
  <div class="detail_box">
    <!-- // -->
    <div class="top"></div>
    <!-- // -->
    <!-- 轮播 -->
    <div class="swiper">
      <!-- 返回 -->
      <div
        @click="backto()"
        style="width:0.56rem;height:0.56rem;background:#b2b2b2;border-radius:50%;text-align:center;position:absolute;top:0.1rem;left:0.1rem;z-index:999"
      >
        <img
          :src="require('../assets/images/detail_back.png')"
          alt
          style="width:0.16rem;height:0.28rem;margin-top:0.15rem"
        />
      </div>
      <!-- 购物车 -->
      <div
        @click="backcar()"
        style="width:0.56rem;height:0.56rem;background:#b2b2b2;border-radius:50%;text-align:center;position:absolute;top:0.1rem;left:6rem;z-index:999"
      >
        <img
          :src="require('../assets/images/detail_car.png')"
          alt
          style="width:0.29rem;height:0.27rem;margin-top:0.15rem"
        />
      </div>
      <!-- 更多 -->
      <div
        style="width:0.56rem;height:0.56rem;background:#b2b2b2;border-radius:50%;text-align:center;position:absolute;top:0.1rem;left:6.9rem;z-index:999"
      >
        <img
          :src="require('../assets/images/detail_more.png')"
          alt
          style="width:0.26rem;height:0.06rem;margin-top:0.25rem"
        />
      </div>
      <!-- // -->
      <van-swipe indicator-color="#ff9900" class="swip">
        <van-swipe-item v-for="(item,index) in this.productlist.swiperImgArr" :key="index">
          <img :src="item" alt class="img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播 -->
    <div class="detail">
      <div class="first">
        <div class="first_left">{{this.productlist.name}}</div>
        <div class="first_right">
          <img :src="require('../assets/images/收藏.png')" alt />
          <p>收藏</p>
        </div>
      </div>
      <div class="second">
        <p class="second_left">
          <span>￥{{this.productlist.reduct_price}}</span>
          <i>￥{{this.productlist.original_price}}</i>
        </p>
        <div class="second_right">
          <ul class="clearfix" style="margin-bottom:0.1rem">
            <li class="second_right_one">{{this.productlist.allowance*10}}折</li>
            <li class="second_right_one">{{this.productlist.isFreeShip?'包邮':'不包邮'}}</li>
          </ul>
          <ul>
            <li class="zp" v-for="(item,index) in this.productlist.describe" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="tit">
        <div :class="[tag?'active':'unactive']" @click="tag = true">商品详情</div>
        <div :class="[!tag?'active':'unactive']" @click="tag = false">买家口碑</div>
      </div>
      <div class="con">
        <div class="pro_detail" v-if="tag == true">
          <img :src="item" alt v-for="(item,index) in this.productlist.shopDes" :key="index" />
        </div>
        <!-- 口碑 -->
        <div class="praise" v-if="tag == false">
          <div class="praise_top">
            <ul>
              <li :class="[flag[0]?'praise_active':'']" @click="getcolor(0);change(0)">全部评价</li>
              <li :class="[flag[1]?'praise_active':'']" @click="getcolor(1);change(1)">好评</li>
              <li :class="[flag[2]?'praise_active':'']" @click="getcolor(2);change(2)">差评</li>
              <li :class="[flag[3]?'praise_active':'']" @click="getcolor(3);change(3)">晒单</li>
            </ul>
          </div>
          <div class="praise_content">
            <ul>
              <li v-for="(item,i) in this.productlist.buyerReviews[num]" :key="i">
                <div class="praise_content_top">
                  <span>{{item.buyerName}}</span>
                  <i>{{getTime(item.createTime)}}</i>
                </div>
                <div class="praise_content_photos">
                  <img v-for="(ite,ia) in item.postImg" :key="ia" class="photo" :src="ite" alt />
                </div>
                <p>{{item.postDescribe}}</p>
                <div class="praise_content_respo">管理员：{{item.adminReviews}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="buy">
      <p>
        总价：
        <span>￥0.00</span>
      </p>
      <div class="buy_now buy_add"@click="showBottom = true">立即购买</div>
      <div class="add_car buy_add" @click="showBottom = true">加入购物车</div>
    </div>
    <div class="car">
      <van-popup
        v-model="showBottom"
        position="bottom"
        :style="{ height: '6.73rem' }"
        class="car_content"
      >
        <div class="product">
          <img :src="this.productlist.swiperImgArr[0]" alt class="img" />
          <div class="msg">
            <p>￥{{this.productlist.reduct_price}}</p>
            <p>库存{{this.productlist.total}}件</p>
            <p>请选择商品属性</p>
          </div>
          <span @click="showBottom = false"></span>
        </div>
        <div class="number">
          <span>购买数量</span>
          <van-stepper v-model="value" class="add" />
        </div>
        <div class="size">
          <h5>{{this.productlist.buySelect[0].name}}</h5>
          <p>
            <span
              @click="issize=index"
              :class="[issize==index?'issize':'']"
              v-for="(item,index) in this.productlist.buySelect[0].list"
              :key="index"
            >{{item}}</span>
          </p>
        </div>
        <div class="age">
          <h5>{{this.productlist.buySelect[1].name}}</h5>
          <p>
            <span
              @click="iscolor=index"
              :class="[iscolor==index?'iscolor':'']"
              v-for="(item,index) in this.productlist.buySelect[1].list"
              :key="index"
            >{{item}}</span>
          </p>
        </div>
        <div class="total">
          <p>
            总价：
            <span>￥{{tota}}</span>
          </p>
          <p @click="gobuy()">加入购物车</p>
          <p @click="gobuy()">立即购买</p>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      issize: 0,
      iscolor: 0,
      num: "all",
      flag: [true, false, false, false],
      productlist: {
        swiperImgArr: [],
        reduct_price: "",
        total: "",
        buySelect: [
          {
            name: ""
          },
          {
            name: ""
          }
        ]
      },
      tag: true,
      show: false,
      pid: "",
      showBottom: false,
      value: 1
    };
  },
  computed: {
    tota: {
      get() {
        return this.productlist.reduct_price * this.value;
      }
    }
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.$http
      .get("http://yd.msword.top/getDetails?pid=" + this.pid)
      .then(res => {
        this.productlist = res.data.data;
      });
  },
  methods: {
    backcar() {
      this.$router.push("/shop");
    },
    backto() {
      this.$router.go(-1);
    },
    gobuy() {
      let obj = {
        swiperImgArr: this.productlist.swiperImgArr[0],
        name: this.productlist.name,
        reduct_price: this.productlist.reduct_price,
        value: this.value,
        check:true
      };
      if (localStorage.getItem("car")) {
        let car = JSON.parse(localStorage.getItem("car"));
        car.push(obj);
        localStorage.setItem("car", JSON.stringify(car));
        this.$toast("加入购物车成功");
        this.$router.push('/shop')
      } else {
        localStorage.setItem("car", JSON.stringify([obj]));
        this.$toast("加入购物车成功");
                this.$router.push('/shop')
      }
    },
    getcolor(n) {
      for (let i = 0; i < this.flag.length; i++) {
        this.flag[i] = false;
      }
      this.$set(this.flag, n, true);
    },
    change(n) {
      if (n == 0) {
        this.num = "all";
      } else if (n == 1) {
        this.num = "bad";
      } else if (n == 2) {
        this.num = "good";
      } else if (n == 3) {
        this.num = "postForm";
      }
    },
    getTime(nS) {
      var date = new Date(parseInt(nS));
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minu = date.getMinutes();
      var sec = date.getSeconds();

      return (
        year + "/" + mon + "/" + day + " " + hours + ":" + minu + ":" + sec
      );
    }
  }
};
</script>
<style lang="less" scoped>
.detail_box {
  background-color: #eeeeee;
  padding-bottom: 1.29rem;
  width: 7.5rem;
  .top {
    height: 0.47rem;
    background: url("../assets/images/top_self.png") no-repeat;
  }
  .swiper {
    position: relative;
  }
  .swip {
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }
  .img {
    width: 5.74rem;
    height: 4.99rem;
    margin: 5.43-4.99rem auto 0;
    display: block;
  }
  .detail {
    background-color: #fff;
    height: 1.8-0.08rem;
    padding-top: 0.08rem;
    padding-left: 0.24rem;
    padding-right: 0.31rem;
    .first {
      height: 0.7rem;
      margin-bottom: 0.12rem;
      .first_left {
        font-size: 0.2999rem;
        line-height: 0.2999rem;
        color: #333;
        width: 5.5rem;
        display: inline-block;
        vertical-align: top;
      }
      .first_right {
        display: inline-block;
        border-left: 1px solid #dddddd;
        padding: 0.02rem 0 0 0.34rem;
        text-align: center;
        img {
          width: 0.36rem;
          height: 0.36rem;
          margin-bottom: 0.13rem;
        }
        p {
          font-size: 0.16rem;
          color: #e71f19;
        }
      }
    }
    .second {
      height: 0.7rem;
      .second_left {
        float: left;
        display: block;
        width: 1.8rem;
        height: 100%;
        span {
          display: inline-block;
          font-size: 0.3399rem;
          color: #eb2222;
          line-height: 0.3rem;
          margin-bottom: 0.1rem;
        }
        i {
          display: block;
          font-size: 0.24rem;
          color: #999999;
          text-decoration: line-through;
          line-height: 0.3rem;
        }
      }
      .second_right {
        width: 7.5-1.8-0.24-0.31rem;
        float: right;
        display: block;
        ul {
          li {
            float: left;
            margin-right: 0.15rem;
          }
        }
        .second_right_one {
          width: 0.7rem;
          height: 0.3rem;
          background-color: #ff9900;
          font-size: 0.2rem;
          color: #fff;
          line-height: 0.3rem;
          text-align: center;
        }
        .zp {
          border: 1px solid #ff9900;
          width: 1.05rem;
          height: 0.3rem;
          font-size: 0.2rem;
          line-height: 0.3rem;
          color: #ff9900;
          text-align: center;
        }
      }
    }
  }
  .content {
    margin-top: 0.32rem;
    background-color: #fff;
    padding-left: 0.46rem;
    padding-right: 0.46rem;
    padding-top: 0.12rem;
    .tit {
      display: flex;
      justify-content: space-around;
      padding-bottom: 0.26rem;
      .active {
        border-bottom: 1px solid #ff9900;
        color: #ff9900;
        font-size: 0.26rem;
        line-height: 0.46rem;
      }
      .unactive {
        color: #999999;
        font-size: 0.26rem;
        line-height: 0.46rem;
      }
    }
    .con {
      .pro_detail {
        text-align: center;
      }
      .praise {
        background-color: #fff;
        .praise_top {
          height: 0.7rem;
          ul {
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #dddddd;
            li {
              margin-top: 0.1rem;
              width: 1.35rem;
              height: 0.5rem;
              background-color: #999999;
              color: #fff;
              text-align: center;
              line-height: 0.5rem;
              border-radius: 0.22rem;
            }
            .praise_active {
              background-color: #ff9900;
            }
          }
        }
        .praise_content {
          border-top: 1px solid #dddddd;
          .praise_content_top {
            line-height: 0.62rem;
            font-size: 0.2396rem;
            color: #ff9900;
            i {
              color: #999999;
              font-size: 0.1797rem;
              float: right;
            }
          }
          .praise_content_photos {
            .photo {
              width: 1.51rem;
              height: 1.51rem;
            }
          }
          p {
            line-height: 0.38rem;
            font-size: 0.1997rem;
            color: #999999;
          }
          .praise_content_respo {
            height: 0.75rem;
            background-color: #dddddd;
            padding: 0.1rem 0.15rem 0 0.1rem;
            line-height: 0.32rem;
            border-radius: 0.09rem;
          }
        }
      }
    }
  }
  .buy {
    width: 7.5rem;
    height: 0.98rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    .buy_add {
      width: 2rem;
      height: 0.97rem;
      font-size: 0.2985rem;
      line-height: 0.97rem;
      text-align: center;
      float: right;
      color: #fff;
    }
    .buy_now {
      background-color: #eb2222;
    }
    .add_car {
      background-color: #ff9900;
    }
    p {
      display: inline-block;
      line-height: 0.98rem;
      text-indent: 0.3rem;
      color: #666666;
      font-size: 0.2985rem;
      span {
        color: #eb2222;
      }
    }
  }
  .car {
    position: relative;
    .car_content {
      width: 7.5-0.43rem;
      padding-left: 0.42rem;
    }
    .van-popup {
      overflow-y: visible;
    }
    .product {
      width: 100%;
      height: 1.88rem;
      .img {
        width: 2.02rem;
        height: 2.02rem;
        border: 0.07rem solid #dddddd;
        margin: 0;
        position: absolute;
        top: -0.21rem;
        z-index: 99999;
      }
      .msg {
        margin-left: 2.38rem;
        padding-top: 0.55rem;
        p:nth-of-type(1) {
          line-height: 0.44rem;
          color: #eb2222;
          font-size: 0.3rem;
        }
        p:nth-of-type(2) {
          line-height: 0.42rem;
          color: #333333;
          font-size: 0.25rem;
        }
        p:nth-of-type(3) {
          line-height: 0.42rem;
          color: #333333;
          font-size: 0.25rem;
        }
      }
      span {
        display: block;
        width: 0.56rem;
        height: 0.56rem;
        background-image: url("../assets/images/关闭.png");
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.29rem;
        right: 0.29rem;
      }
    }
    .number {
      height: 0.93rem;
      width: 100%;
      span {
        line-height: 0.91rem;
        color: #333;
        font-size: 0.3rem;
      }
      .add {
        display: inline-block;
        vertical-align: middle;
        margin-left: 3.48rem;
      }
    }
    .size {
      height: 1.55rem;
      width: 100%;
      h5 {
        height: 0.62rem;
        line-height: 0.62rem;
        color: #333;
        font-size: 0.3rem;
        margin-bottom: 0.03rem;
      }
      p {
        span {
          display: inline-block;
          width: 1.2rem;
          height: 0.45rem;
          background-color: #ccc;
          color: #fff;
          line-height: 0.45rem;
          text-align: center;
          border-radius: 0.09rem;
          margin-right: 0.1rem;
        }
        .issize {
          background-color: #ff9900;
        }
      }
    }
    .age {
      height: 1.38rem;
      width: 100%;
      h5 {
        color: #333;
        font-size: 0.3rem;
        line-height: 0.3rem;
        padding-bottom: 0.2rem;
        color: #333333;
      }
      p {
        span {
          display: inline-block;
          width: 1.75rem;
          height: 0.45rem;
          background-color: #ccc;
          color: #fff;
          line-height: 0.45rem;
          text-align: center;
          border-radius: 0.09rem;
          margin-right: 0.1rem;
        }
        .iscolor {
          background-color: #ff9900;
        }
      }
    }
    .total {
      border-top: 1px solid #dddddd;
      height: 0.98rem;
      width: 100%;
      display: flex;
      background-color: green;
      p:nth-of-type(1) {
        width: 7.5-1.98-1.98-0.42rem;
        height: 0.98rem;
        background-color: #ffffff;
        text-align: center;
        line-height: 0.98rem;
        font-size: 0.2999rem;
        color: #666666;
        span {
          color: #eb2222;
        }
      }
      p:nth-of-type(2) {
        width: 1.98rem;
        height: 0.98rem;
        background-color: #ff9900;
        text-align: center;
        line-height: 0.98rem;
        font-size: 0.2999rem;
        color: #fff;
        // display: inline-block;
      }
      p:nth-of-type(3) {
        width: 1.98rem;
        height: 0.98rem;
        background-color: #eb2222;
        text-align: center;
        line-height: 0.98rem;
        font-size: 0.2999rem;
        color: #fff;
        // display: inline-block;
      }
    }
  }
}
</style>