<template>
  <div>
    <!-- 顶部-start -->
    <div class="index_top">
      <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    </div>
    <!-- 顶部-end -->
    <div class="product" v-for="(item,i) in carlist" :key="i" v-if='carlist != ""'>
      <h5 class="domain">
        <img :src="require('../assets/images/store.png')" alt /> 杭州保税区仓
      </h5>
      <van-swipe-cell class="vanswipe">
        <div class="cont">
          <div class="car_con">
            <div class="btn">
              <!-- // -->
              <label>
                <input type="checkbox" v-model="item.check" @click="checkOne(i)" />
                <div class="show-box" />
              </label>
              <!-- // -->
            </div>
            <div class="img">
              <img :src="item.swiperImgArr" alt />
            </div>
            <div class="info">
              <p>{{item.name}}</p>
              <div class="btns">
                <button @click="inc(i)">-</button>
                <button>{{item.value}}</button>
                <button @click="add(i)">+</button>
              </div>
            </div>
            <div class="price">￥{{total(i)}}</div>
          </div>
        </div>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="del(i)" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="empty" v-if='carlist==""'>
      <div class="car_i"><img :src="require('../assets/images/shopping_wu.png')" alt=""></div>
      <div class="word_i"><img :src="require('../assets/images/em.png')" alt=""></div>
    </div>
    <div class="fix"></div>
    <!-- 底部 -->

    <van-submit-bar class="select" :price="allPrice" button-text="去结算">
      <van-checkbox v-model="checkAll" @click="checkA">全选</van-checkbox>&nbsp;
      <van-checkbox v-model="edited">编辑</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: true,
      edited: true,
      tag: true,
      carlist: [

      ]
    };
  },
  methods: {
    del(i) {
      if (localStorage.getItem("car")) {
        let arr = JSON.parse(localStorage.getItem("car"));
        this.$delete(arr, i, "");
        this.$delete(this.carlist, i, "");
        localStorage.setItem("car", JSON.stringify(arr));
        this.$toast('删除成功')
        if(this.carlist == ''){
                this.checkAll=false;
                this.edited=false;
        }
      }
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    add(i) {
      this.carlist[i].value++;
    },
    inc(i) {
      this.carlist[i].value--;
      if (this.carlist[i].value < 1) {
        this.carlist[i].value = 1;
        this.$toast("至少选择一件");
      }
    },
    checkA() {
      if (this.checkAll) {
        this.carlist.map((item, i) => {
          item.check = false;
        });
      } else {
        this.carlist.map((item, i) => {
          item.check = true;
        });
      }
    },
    checkOne(i) {
      //
      this.carlist[i].check = !this.carlist[i].check;
      let result = this.carlist.map((item, i) => {
        return item.check;
      });
      let bool = result.every((item, i) => {
        return item == true;
      });
      if (bool) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      //
    }
  },
  computed: {
    total() {
      return function comput(i) {
        return this.carlist[i].value * this.carlist[i].reduct_price;
      };
    },
    allPrice() {
      let sum = 0;
      this.carlist.map((item, i) => {
        if (item.check) {
          sum += item.reduct_price * item.value * 100;
        }
      });
      return sum;
    }
  },
  mounted() {
    if (localStorage.getItem("car")) {
      this.carlist = JSON.parse(localStorage.getItem("car"));
    }
            if(this.carlist == ''){
                this.checkAll=false;
                this.edited=false;
        }
  }
};
</script>
<style lang="less">
.index_top {
  height: 1.4rem;
  width: 7.5rem;
  .van-nav-bar {
    background: url("../assets/images/classify_top.png") no-repeat;
    background-size: 100% 100%;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
}
.product {
  height: 3.17rem;
  .domain {
    line-height: 0.36rem;
    height: 0.2813rem;
    color: #999;
    padding-left: 0.38rem;
    img {
      width: 0.36rem;
      height: 0.35rem;
    }
  }
}
.vanswipe {
  height: 3.28rem;
  .van-button--normal {
    height: 2.11rem;
    background: #ff9900;
    color: #fff;
    line-height: 2.11rem;
    border: none;
    width: 0.98rem;
    font-size: 0.2rem;
    padding: 0;
  }
  .van-swipe-cell__right {
    right: 0;
  }
  .cont {
    padding-left: 0.38rem;
    .car_con {
      display: flex;
      height: 1.6rem;
      margin-top: 0.51rem;
      .btn {
        width: 0.63rem;
        label {
          top: 0.5rem;
          left: 0.2rem;
          position: relative;
          cursor: pointer;

          input {
            cursor: pointer;
            width: 0;
            height: 0;
          }

          input:checked + .show-box {
            background-image: url("../assets/images/radio_hig.png");
            display: block;
            width: 0.42rem;
            height: 0.42rem;
            background-size: contain;
          }

          .show-box {
            background-image: url("../assets/images/radio_nor.png");
            background-size: 0.42rem 0.42rem;
            position: absolute;
            top: 0;
            left: 0;
            width: 0.42rem;
            height: 0.42rem;
            border-radius: 20%;
            &:before {
              content: "";
              position: absolute;
              top: 2px;
              left: 6px;
              width: 3px;
              height: 8px;
              border: solid white;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
          }
        }
      }
      .img {
        width: 1.6rem;
        height: 1.6rem;
        img {
          width: 1.57rem;
          height: 1.57rem;
          vertical-align: middle;
        }
      }
      .info {
        width: 3.42rem;
        p {
          font-size: 0.3282rem;
          color: #333;
        }
        i {
          color: #999;
          font-size: 0.2813rem;
          line-height: 0.3282rem;
          padding-left: 0.3282rem;
        }
        .btns {
          button {
            height: 0.43rem;
            width: 0.76rem;
            border: 1px solid #ccc;
            background-color: #fff;
            margin-top: 0.4rem;
          }
        }
      }
      .price {
        width: 1.25rem;
        line-height: 1.6rem;
      }
    }
  }
}
.select {
  border: 1px solid #eeeeee;
  border-left: none;
  border-right: none;
  position: fixed;
  bottom: 1.01rem;
  width: 7.2rem;
  margin-left: 0.3rem;
  height: 1.13rem;
  line-height: 1.13rem;
  .van-button--danger {
    background-color: #ff5500;
    border: 1px solid #ff5500;
  }
  .van-submit-bar__price {
    font-size: 0.2344rem;
    color: #999;
  }
}
.fix {
  height: 1.01+1.13rem;
}
.empty{
  margin-top: 3.28rem;
  .car_i{
      width: 0.83rem;
    margin: 0 auto;
    img{
      width: 0.83rem;
      height: 0.88rem;
    }
  }
  .word_i{
    width: 2.26rem;
    margin: 0 auto;
    img{
      width: 2.26rem;
      height: 0.76rem;
    }
  }
}
</style>