<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="true">
    <el-submenu
      v-for="(item,index1) in goodsNavData"
      :key="index1"
      :index="index1.toString()"
      class="el-submenu-lowHeight"
    >
      <template slot="title">{{item.title}}</template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(item1,index2) in item.options"
          :key="item1.name"
          :index="index1+'-'+index2"
        >
          <router-link
            :to="{name:'goods',params:{name:item1.cid}}"
            style="text-decoration:none;color:black;"
          >{{item1.name}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import cookieAbout from "@/cookieAbout.js";
export default {
  data() {
    return {
      goodsNavData: [
        {
          title: "美妆护肤",
          options: [
            {
              name: "面部护肤",
              cid: null
            },
            {
              name: "时尚彩妆",
              cid: null
            }
          ]
        },
        {
          title: "服饰内衣",
          options: [
            {
              name: "男士西服",
              cid: 71
            },
            {
              name: "品牌女装",
              cid: 68
            },
            {
              name: "男表",
              cid: 73
            },
            {
              name: "女表",
              cid: 74
            },
            {
              name: "太阳镜",
              cid: 64
            }
          ]
        },
        {
          title: "个护清洁",
          options: [
            { name: "纸品湿巾", cid: null },
            { name: "衣物清洁", cid: null },
            { name: "洗发沐浴", cid: null },
            { name: "家庭清洁", cid: null }
          ]
        },
        {
          title: "食品饮料",
          options: [
            { name: "休闲食品", cid: null },
            { name: "饮料冲调", cid: null },
            { name: "粮油调味", cid: null },
            { name: "茗茶", cid: null }
          ]
        },
        {
          title: "母婴玩具",
          options: [
            { name: "童装", cid: null },
            { name: "童鞋", cid: null },
            { name: "教娱玩具", cid: null },
            { name: "营养辅食", cid: null },
            { name: "奶粉尿裤", cid: null }
          ]
        },
        {
          title: "家用电器",
          options: [
            {
              name: "空调",
              cid: 75
            },
            {
              name: "冰箱",
              cid: 76
            },
            {
              name: "平板电视",
              cid: 83
            },
            {
              name: "电热水器",
              cid: 80
            },
            {
              name: "扫地机器人",
              cid: 78
            }
          ]
        },
        {
          title: "鞋靴箱包",
          options: [
            { name: "女鞋", cid: null },
            { name: "女包", cid: null },
            { name: "男鞋", cid: 69 },
            { name: "男士手拿包", cid: 72 }
          ]
        },
        {
          title: "手机数码",
          options: [
            { name: "手机电脑", cid: null },
            { name: "数码配件", cid: null }
          ]
        },
        {
          title: "家具家装",
          options: [
            { name: "沙发", cid: 81 },
            { name: "马桶", cid: 82 }
          ]
        },
        {
          title: "日用家纺",
          options: [
            { name: "床上用品", cid: null },
            { name: "居家布艺", cid: null }
          ]
        }
      ],
      uid: ""
    };
  },
  mounted() {
    this.uid = cookieAbout.getCookie("uid");
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 设置左侧导航栏 */
.el-menu {
  border: 0;
}
.el-menu--collapse {
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  line-height: 400px;
}
.el-submenu-lowHeight {
  height: 30px;
  line-height: 30px;
}
.el-submenu-lowHeight >>> .el-submenu__title {
  height: 30px;
  line-height: 30px;
}
.el-menu-item,
.el-submenu__title {
  height: 30px;
  line-height: 30px;
}
</style>
