<template>
  <div class="index_box">
    <!-- top-start  -->
    <div class="index_top">
      <input type="text" class="search" placeholder="Montagne jeunesse" />
    </div>
    <!-- top-end  -->
    <!-- banner-start -->
    <div class="banner"></div>
    <!-- banner-end -->
    <!-- today-start  -->
    <div class="center">
      <div class="block" v-for="(item,index) in plist" :key="index">
        <div >
                <div class="title">
          <img :src="tit_img[0]" alt />
          {{item.name}}
        </div>
        <div class="content clearfix">
          <ul>
            <li @click="gosee(ite.id)" v-for="(ite,i) in item.list" :key="i">
              <div class="top">
                <img :src="ite.thumbnail" alt />
              </div>
              <div class="bottom">
                <p class="first">
                  <span>¥{{ite.original_price}}</span>
                  <i>¥{{ite.reduct_price}}</i>
                </p>
                <p class="second">{{ite.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    <!-- today-end  -->
    <!-- <tabbar></tabbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tit_img: [require("../assets/images/hot.png")],
      plist: []
    };
  },methods: {
    gosee(id){
      // console.log(id)
      this.$router.push({path:'/detail',query:{id:id}})
    }
  },
  mounted() {
    this.$http({
      url: "http://yd.msword.top/getIndexData"
    }).then(res => {
      console.log(res.data.data,'11111111111111111');
      this.plist = res.data.data;
    });
  }
};
</script>

<style lang="less">
.index_box {
  width: 7.5rem;
  .index_top {
    height: 1.4-0.65rem;
    width: 7.5rem;
    background: url("../assets/images/top-1.png") no-repeat;
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
  .banner {
    height: 3.8rem;
    width: 7.5rem;
    background: url("../assets/images/top-2.png") no-repeat;
    background-size: 100% 100%;
  }
  .block {
    width: 7.5rem;
    background-color: #fafafa;
    .title {
      width: 7.5rem;
      height: 0.95rem;
      font-size: 0.2813rem;
      line-height: 0.95rem;
      color: #333333;
      img {
        display: inline-block;
        width: 0.29rem;
        height: 0.38rem;
        margin-left: 0.23rem;
        margin-top: 0.27rem;
        margin-right: 0.2rem;
      }
    }
    .content {
      padding-left: 0.18rem;
      ul {
        li {
          width: 3.24rem;
          height: 4.65rem;
          border: 1px solid #eee;
          background-color: #fff;
          margin-right: 0.16rem;
          float: left;
          .top {
            padding-top: 0.36rem;
            img {
              width: 1.64rem;
              height: 2.63rem;
              display: block;
              margin: 0 auto;
            }
          }
          .bottom {
            padding-top: 0.3rem;
            padding-left: 0.3rem;
            padding-right: 0.4rem;
            .first {
              margin-bottom: 0.2rem;
              span {
                color: #e60012;
                font-size: 0.3rem;
              }
              i {
                color: #666666;
                text-decoration: line-through;
                float: right;
              }
            }
            .second {
              color: #666666;
              font-size: 0.2813rem;
            }
          }
        }
      }
    }
  }
}
.center {
}
.block:nth-of-type(6) {
  padding-bottom: 0.2+1.1rem;
}
</style>
