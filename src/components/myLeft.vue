<template>
  <div class="my-left">
    <!-- 汇总标题 -->
    <div class="title">{{ title }}</div>
    <ul class="lis">
      <!-- 一级导航 -->
      <li
        v-for="li in lis"
        :key="li.id"
        @mouseenter="showTitle(li.id, li.text)"
        @mouseleave="hideTitle"
      >
        <img class="img" :src="li.ico" />
        <div class="text">{{ li.text }}</div>
        <el-badge value="hot" v-if="li.id === 1" />
        <i class="el-icon-arrow-right" />
      </li>
    </ul>
    <!-- 二级导航 -->
    <div class="detail-wrapper" @mouseenter="flag = true">
      <div class="detail" v-show="flag" @mouseleave="hideTitle">
        <template v-for="title in titleMsg">
          <!-- 热门城市 -->
          <div class="content" :key="title" v-if="title.includes('热门城市')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('热门城市', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 热门房源 -->
          <div class="content" :key="title" v-else-if="title.includes('热门房源')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('热门房源', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 机票 -->
          <div class="content" :key="title" v-else-if="title.includes('机票')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('机票', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 火车票 -->
          <div class="content" :key="title" v-else-if="title.includes('火车票')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('火车票', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 休闲娱乐 -->
          <div class="content" :key="title" v-else-if="title.includes('休闲娱乐')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('休闲娱乐', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- KTV -->
          <div class="content" :key="title" v-else-if="title.includes('KTV')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('KTV', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 儿童乐园 -->
          <div class="content" :key="title" v-else-if="title.includes('儿童乐园')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('儿童乐园', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 幼儿教育 -->
          <div class="content" :key="title" v-else-if="title.includes('幼儿教育')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('幼儿教育', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 亲子摄影 -->
          <div class="content" :key="title" v-else-if="title.includes('亲子摄影')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[2]" :key="li.id" @mousedown="handleClick('亲子教育', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 孕产护理 -->
          <div class="content" :key="title" v-else-if="title.includes('孕产护理')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[3]" :key="li.id" @mousedown="handleClick('孕产护理', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 装修设计 -->
          <div class="content" :key="title" v-else-if="title.includes('装修设计')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('装修设计', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 装修建材 -->
          <div class="content" :key="title" v-else-if="title.includes('装修建材')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('装修建材', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 家居家居 -->
          <div class="content" :key="title" v-else-if="title.includes('家具家居')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[2]" :key="li.id" @mousedown="handleClick('家居家居', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 家庭卖场 -->
          <div class="content" :key="title" v-else-if="title.includes('家庭卖场')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[3]" :key="li.id" @mousedown="handleClick('家庭卖场', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 音乐培训 -->
          <div class="content" :key="title" v-else-if="title.includes('音乐培训')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('音乐培训', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 职业技术 -->
          <div class="content" :key="title" v-else-if="title.includes('职业技术')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('职业技术', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 外语培训 -->
          <div class="content" :key="title" v-else-if="title.includes('外语培训')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[2]" :key="li.id" @mousedown="handleClick('外语培训', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 美术培训 -->
          <div class="content" :key="title" v-else-if="title.includes('美术培训')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[3]" :key="li.id" @mousedown="handleClick('美术培训', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 医疗健康 -->
          <div class="content" :key="title" v-else-if="title.includes('医疗健康')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[0]" :key="li.id" @mousedown="handleClick('医疗健康', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 爱车 -->
          <div class="content" :key="title" v-else-if="title.includes('爱车')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[1]" :key="li.id" @mousedown="handleClick('爱车', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 宠物 -->
          <div class="content" :key="title" v-else-if="title.includes('宠物')">
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail[2]" :key="li.id" @mousedown="handleClick('宠物', li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
          <!-- 其他 -->
          <div class="content" :key="title" v-else>
            <div class="detail-title">
              <el-row :gutter="10">
                <el-col :span="12">{{ title }}</el-col>
                <el-col :span="12">
                  更多
                  <i class="el-icon-arrow-right" />
                </el-col>
              </el-row>
            </div>
            <ul class="detail-content">
              <li v-for="li in detail" :key="li.id" @mousedown="handleClick(title, li.id)">
                {{ li.text }}
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.my-left {
  width: 230px;
  position: relative;
  height: 473px;
  text-align: left;
  box-sizing: border-box;
  margin-top: -50px;
  color: #646464;
  background: #fff;
  border: 1px solid #e5e5e5;
  .title {
    height: 50px;
    padding-top: 15px;
    box-sizing: border-box;
    color: #222;
    font-weight: 700;
    margin-left: 15px;
    cursor: default;
  }
  .lis {
    .img {
      width: 20px;
    }
    li {
      font-size: 13px;
      line-height: 25.5px;
      color: #646464;
      box-sizing: border-box;
      padding: 2px 12px;
      height: 25.5px;
      position: relative;
      .text {
        display: inline-block;
        padding-left: 10px;
        cursor: pointer;
      }
      .el-badge {
        margin-left: 8px;
        height: 25.8px;
        line-height: 25.8px;
      }
      &:hover {
        background-color: rgba(255, 150, 0, 0.08);
        color: #fe8c00;
        transform: scale(0.95);
      }
      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        color: #bfbfbf;
        font-size: 10px;
      }
    }
  }
  .detail-wrapper {
    width: 50px;
    height: 421.5px;
    position: absolute;
    top: 50px;
    left: 190px;
    .detail {
      background-color: #fff;
      width: 400px;
      height: 421.5px;
      position: absolute;
      line-height: 20.8px;
      color: #666;
      left: 40px;
      z-index: 10;
      .content {
        padding: 0 30px;
        .detail-title {
          padding: 15px 0px;
          border-bottom: 1px solid #e5e5e5;
          cursor: default;
          .el-col {
            color: #222;
            font-weight: 500;
            font-size: 14px;
          }
          .el-col:last-child {
            text-align: right;
            font-size: 12px;
            color: #999;
            cursor: pointer;
          }
        }
        .detail-content {
          margin: 5px auto 0;
          li {
            color: #999;
            font-size: 12px;
            line-height: 15px;
            display: inline-block;
            margin-right: 16px;
            margin-top: 10px;
            cursor: pointer;
            &:hover {
              color: #fe8c00;
              transform: scale(0.95);
            }
          }
        }
      }
    }
  }
}
</style>

<script>
/* eslint-disable global-require */
export default {
  data() {
    return {
      title: '全部分类',
      lis: [
        {
          id: 1,
          text: '美食',
          ico: require('../assets/img/美食.svg'),
        },
        {
          id: 2,
          text: '外卖',
          ico: require('../assets/img/外卖.svg'),
        },
        {
          id: 3,
          text: '酒店',
          ico: require('../assets/img/酒店.svg'),
        },
        {
          id: 4,
          text: '民宿',
          ico: require('../assets/img/民宿.svg'),
        },
        {
          id: 5,
          text: '猫眼电影',
          ico: require('../assets/img/猫眼电影.svg'),
        },
        {
          id: 6,
          text: '机票 / 火车票',
          ico: require('../assets/img/车票.svg'),
        },
        {
          id: 7,
          text: '休闲娱乐 / KTV',
          ico: require('../assets/img/休闲娱乐.svg'),
        },
        {
          id: 8,
          text: '生活服务',
          ico: require('../assets/img/生活服务.svg'),
        },
        {
          id: 9,
          text: '丽人 / 婚纱摄影 / 婚宴',
          ico: require('../assets/img/丽人.svg'),
        },
        {
          id: 10,
          text: '结婚 / 美发 / 婚宴',
          ico: require('../assets/img/婚宴定制.svg'),
        },
        {
          id: 11,
          text: '亲子 / 儿童乐园 / 幼教',
          ico: require('../assets/img/亲子.svg'),
        },
        {
          id: 12,
          text: '运动健身 / 健身中心',
          ico: require('../assets/img/运动健身.svg'),
        },
        {
          id: 13,
          text: '家庭 / 建材 / 家居',
          ico: require('../assets/img/家庭.svg'),
        },
        {
          id: 14,
          text: '学习培训 / 音乐培训',
          ico: require('../assets/img/学习培训.svg'),
        },
        {
          id: 15,
          text: '医疗健康 / 爱车 / 宠物',
          ico: require('../assets/img/医疗健康.svg'),
        },
        {
          id: 16,
          text: '酒吧 / 迷失逃脱',
          ico: require('../assets/img/酒吧.svg'),
        },
      ],
      titleMsg: '',
      detail: '',
      flag: false,
      // 美食模块
      detail1: [
        { id: 1, text: '代金券' },
        { id: 2, text: '甜点饮品' },
        { id: 3, text: '火锅' },
        { id: 4, text: '自助餐' },
        { id: 5, text: '小吃快餐' },
        { id: 6, text: '日韩料理' },
        { id: 7, text: '西餐' },
        { id: 8, text: '聚餐宴请' },
        { id: 9, text: '烧烤烤肉' },
        { id: 10, text: '东北菜' },
        { id: 11, text: '川湘菜' },
        { id: 12, text: '江浙菜' },
        { id: 13, text: '香锅烤鱼' },
        { id: 14, text: '奥港菜' },
        { id: 15, text: '中式烧烤/烤串' },
        { id: 16, text: '西北菜' },
        { id: 17, text: '咖啡酒吧茶馆' },
        { id: 18, text: '云贵菜' },
        { id: 19, text: '东南亚菜' },
        { id: 20, text: '海鲜' },
        { id: 21, text: '素食' },
        { id: 22, text: '台湾/客家菜' },
        { id: 23, text: '创意菜' },
        { id: 24, text: '汤/粥/炖菜' },
        { id: 25, text: '蒙餐' },
        { id: 26, text: '新疆菜' },
        { id: 28, text: '京菜鲁菜' },
      ],
      // 外卖模块
      detail2: [{ id: 1, text: '外卖配送' }],
      // 酒店模块
      detail3: [
        { id: 1, text: '经济型' },
        { id: 2, text: '舒适/三星' },
        { id: 3, text: '高档/四星' },
        { id: 4, text: '豪华/五星' },
      ],
      // 热门城市
      detail4: [
        { id: 1, text: '上海' },
        { id: 2, text: '成都' },
        { id: 3, text: '北京' },
        { id: 4, text: '重庆' },
        { id: 5, text: '杭州' },
        { id: 6, text: '广州' },
        { id: 7, text: '西安' },
        { id: 8, text: '武汉' },
        { id: 9, text: '厦门' },
        { id: 10, text: '长沙' },
        { id: 11, text: '青岛' },
        { id: 12, text: '深圳' },
        { id: 13, text: '天津' },
        { id: 14, text: '苏州' },
      ],
      // 热门房源
      detail5: [
        { id: 1, text: '复式Loft' },
        { id: 2, text: '别墅' },
      ],
      // 猫眼电影
      detail6: [],
      // 车票
      detail7: [
        { id: 1, text: '国内机票' },
        { id: 2, text: '国际/港澳台机票' },
      ],
      // 火车票
      detail8: [{ id: 1, text: '火车票' }],
      // 休闲娱乐
      detail9: [
        { id: 1, text: '足疗按摩' },
        { id: 2, text: '洗浴/汗蒸' },
        { id: 3, text: '酒吧' },
        { id: 4, text: '密室逃脱' },
        { id: 5, text: '轰趴馆' },
        { id: 6, text: '茶馆' },
        { id: 7, text: '私人影院' },
        { id: 8, text: 'DIY手工坊' },
        { id: 9, text: '采摘/农家乐' },
        { id: 10, text: '网吧网咖' },
        { id: 11, text: '游乐游艺' },
        { id: 12, text: 'VR' },
        { id: 13, text: '桌面游戏' },
        { id: 14, text: '真人CS' },
        { id: 15, text: '棋牌室' },
      ],
      // KTV
      detail10: [{ id: 1, text: 'KTV' }],
      // 生活服务
      detail11: [
        { id: 1, text: '衣物/皮具洗护' },
        { id: 2, text: '家政' },
        { id: 3, text: '搬家运输' },
        { id: 4, text: '送水' },
        { id: 5, text: '充值缴费' },
        { id: 6, text: '服饰/鞋包养护' },
        { id: 7, text: '开锁换锁' },
        { id: 8, text: '居家维修' },
        { id: 9, text: '管道疏通' },
        { id: 10, text: '家电维修清洗' },
        { id: 11, text: '电脑维修' },
        { id: 12, text: '手机送修' },
        { id: 13, text: '证件照/肖像摄影' },
        { id: 14, text: '照片冲印/图文文印' },
        { id: 15, text: '商务服务/法律服务' },
        { id: 16, text: '文化传媒机构' },
        { id: 17, text: '成人用品/情趣用品' },
      ],
      // 丽人
      detail12: [
        { id: 1, text: '美发' },
        { id: 2, text: '美甲美瞳' },
        { id: 3, text: '美容美体' },
        { id: 4, text: '医学医疗' },
        { id: 5, text: '瑜伽舞蹈' },
        { id: 6, text: '瘦身纤体' },
        { id: 7, text: '韩式定妆' },
        { id: 8, text: '祛痘' },
        { id: 9, text: '纹身' },
        { id: 10, text: '化妆品' },
        { id: 11, text: '养发' },
      ],
      // 结婚
      detail13: [
        { id: 1, text: '婚纱摄影' },
        { id: 2, text: '旅拍' },
        { id: 3, text: '个性写真' },
        { id: 4, text: '婚宴' },
        { id: 5, text: '婚庆公司' },
        { id: 6, text: '婚纱礼服' },
        { id: 7, text: '西服定制' },
        { id: 8, text: '婚戒首饰' },
        { id: 9, text: '婚车租赁' },
        { id: 10, text: '司仪主持' },
        { id: 11, text: '彩妆造型' },
        { id: 12, text: '婚礼跟拍' },
        { id: 13, text: '婚礼小礼品' },
      ],
      // 儿童乐园
      detail14: [{ id: 1, text: '婴儿游泳' }],
      // 幼儿教育
      detail15: [
        { id: 1, text: '早教中心' },
        { id: 2, text: '少儿英语' },
        { id: 3, text: '智力开发' },
        { id: 4, text: '托班/幼儿园' },
        { id: 5, text: '幼儿教育' },
      ],
      // 亲子摄影
      detail16: [
        { id: 1, text: '儿童摄影' },
        { id: 2, text: '孕妇写真' },
        { id: 3, text: '上门拍' },
      ],
      // 孕产护理
      detail17: [
        { id: 1, text: '月子会所' },
        { id: 2, text: '产后恢复' },
        { id: 3, text: '妇幼医院' },
        { id: 4, text: '孕产用品' },
        { id: 5, text: '开奶催乳' },
        { id: 6, text: '月嫂' },
        { id: 7, text: '亲子购物' },
        { id: 8, text: '宝宝排队' },
        { id: 9, text: '亲子服务' },
      ],
      // 运动健身
      detail18: [
        { id: 1, text: '健身中心' },
        { id: 2, text: '武士场馆' },
        { id: 3, text: '游泳馆' },
        { id: 4, text: '羽毛球馆' },
        { id: 5, text: '溜冰场' },
        { id: 6, text: '射箭场' },
        { id: 7, text: '篮球场' },
        { id: 8, text: '网球馆' },
        { id: 9, text: '台球馆' },
        { id: 10, text: '乒乓球' },
        { id: 11, text: '足球场' },
        { id: 12, text: '高尔夫场' },
        { id: 13, text: '保龄球场' },
        { id: 14, text: '体育场' },
        { id: 15, text: '马术场' },
        { id: 16, text: '壁球馆' },
      ],
      // 装修设计
      detail19: [
        { id: 1, text: '半包装修' },
        { id: 2, text: '全包装修' },
        { id: 3, text: '清包装修' },
      ],
      // 装修建材
      detail20: [
        { id: 1, text: '地板' },
        { id: 2, text: '瓷砖石材' },
        { id: 3, text: '橱柜' },
        { id: 4, text: '灯饰照明' },
        { id: 5, text: '厨卫洁具' },
        { id: 6, text: '油漆涂料' },
        { id: 7, text: '集成吊顶' },
        { id: 8, text: '墙纸墙艺' },
        { id: 9, text: '门窗' },
        { id: 10, text: '木材板材' },
        { id: 11, text: '家用五金' },
        { id: 12, text: '电工电料' },
        { id: 13, text: '楼梯' },
        { id: 14, text: '管材管件' },
      ],
      // 家居家居
      detail21: [
        { id: 1, text: '家具' },
        { id: 2, text: '床上用品/家纺' },
        { id: 3, text: '家居饰品' },
        { id: 4, text: '厨具餐具' },
        { id: 5, text: '智能家居' },
      ],
      // 家庭卖场
      detail22: [
        { id: 1, text: '建材卖场' },
        { id: 2, text: '家居卖场' },
        { id: 3, text: '灯饰卖场' },
      ],
      // 音乐培训
      detail23: [
        { id: 1, text: '钢琴' },
        { id: 2, text: '吉他' },
        { id: 3, text: '小提琴' },
        { id: 4, text: '古筝' },
        { id: 5, text: '架子鼓' },
        { id: 6, text: '声乐' },
      ],
      // 职业技术
      detail24: [
        { id: 1, text: '美容化妆' },
        { id: 2, text: '会计' },
        { id: 3, text: 'IT' },
        { id: 4, text: '厨艺' },
        { id: 5, text: '管理培训' },
        { id: 6, text: '摄影培训' },
        { id: 7, text: '司法考试' },
        { id: 8, text: '公务员培训' },
      ],
      // 外语培训
      detail25: [
        { id: 1, text: '英语' },
        { id: 2, text: '日语' },
        { id: 3, text: '韩语' },
        { id: 4, text: '法语' },
        { id: 5, text: '德语' },
        { id: 6, text: '汉语' },
        { id: 7, text: '俄语' },
        { id: 8, text: '西班牙语' },
      ],
      // 美术培训
      detail26: [
        { id: 1, text: '绘画' },
        { id: 2, text: '书法' },
      ],
      // 医疗健康
      detail27: [
        { id: 1, text: '医院' },
        { id: 2, text: '齿科口腔' },
        { id: 3, text: '体验中心' },
        { id: 4, text: '药店' },
        { id: 5, text: '中医' },
      ],
      // 爱车
      detail28: [
        { id: 1, text: '洗车' },
        { id: 2, text: '租车' },
        { id: 3, text: '加油站' },
        { id: 4, text: '维修保养' },
        { id: 5, text: '驾校' },
        { id: 6, text: '汽车美容' },
        { id: 7, text: '陪练' },
        { id: 8, text: '汽车用品' },
        { id: 9, text: '停车场' },
        { id: 10, text: '汽车保险' },
        { id: 11, text: '4S店/汽车销售' },
        { id: 12, text: '机油保养' },
        { id: 13, text: '汽车报价' },
        { id: 14, text: '二手车' },
        { id: 15, text: '广告驾校' },
        { id: 16, text: '交警队' },
        { id: 17, text: '汽车改装' },
        { id: 18, text: '汽车配件' },
      ],
      // 宠物
      detail29: [
        { id: 1, text: '宠物店' },
        { id: 2, text: '宠物医院' },
      ],
      // 玩乐
      detail30: [
        { id: 1, text: 'KTV' },
        { id: 2, text: '酒吧' },
        { id: 3, text: '密室逃脱' },
        { id: 4, text: '游乐游艺' },
        { id: 5, text: '网吧网咖' },
        { id: 6, text: '私人影院' },
        { id: 7, text: 'DIY手工坊' },
        { id: 8, text: '桌面游戏' },
        { id: 9, text: '采摘/农家乐' },
        { id: 10, text: '棋牌室' },
        { id: 11, text: '轰趴馆' },
        { id: 12, text: '真人CS' },
        { id: 13, text: 'VR' },
      ],
    };
  },
  methods: {
    // 二级菜单展示
    showTitle(id, msg) {
      // 鼠标移入后，加入内容
      this.titleMsg = { msg };
      if (msg.includes('/')) {
        const arr = msg.split('/');
        this.titleMsg = arr;
      }
      this.showMessage(id);
      this.flag = true;
    },
    // 隐藏二级菜单
    hideTitle() {
      this.flag = false;
    },
    // 处理对应的二级菜单中的内容
    handleClick(msg, id) {
      if (msg === '猫眼电影') {
        // 将电影id保存到store中，并进入到对应的详情页
        this.$store.commit('changeMovieId', id);
        this.$message({
          type: 'info',
          duration: 1500,
          message: '即将进入电影详情页',
          center: true,
        });
        this.$router.push('/movie');
      }
    },
    // 处理对应的二级菜单
    showMessage(id) {
      if (id === 1) {
        this.detail = this.detail1;
      } else if (id === 2) {
        this.detail = this.detail2;
      } else if (id === 3) {
        this.detail = this.detail3;
      } else if (id === 4) {
        this.titleMsg = ['热门城市', '热门房源'];
        this.detail = [this.detail4, this.detail5];
      } else if (id === 5) {
        this.detail = this.detail6;
      } else if (id === 6) {
        this.detail = [this.detail7, this.detail8];
      } else if (id === 7) {
        this.detail = [this.detail9, this.detail10];
      } else if (id === 8) {
        this.detail = this.detail11;
      } else if (id === 9) {
        this.titleMsg = { msg: '丽人' };
        this.detail = this.detail12;
      } else if (id === 10) {
        this.titleMsg = { msg: '结婚' };
        this.detail = this.detail13;
      } else if (id === 11) {
        this.titleMsg = ['儿童乐园', '幼儿教育', '亲子摄影', '孕产护理'];
        this.detail = [this.detail14, this.detail15, this.detail16, this.detail17];
      } else if (id === 12) {
        this.titleMsg = { msg: '运动健身' };
        this.detail = this.detail18;
      } else if (id === 13) {
        this.titleMsg = ['装修设计', '装修建材', '家具家居', '家庭卖场'];
        this.detail = [this.detail19, this.detail20, this.detail21, this.detail22];
      } else if (id === 14) {
        this.titleMsg = ['音乐培训', '职业技术', '外语培训', '美术培训'];
        this.detail = [this.detail23, this.detail24, this.detail25, this.detail26];
      } else if (id === 15) {
        this.detail = [this.detail27, this.detail28, this.detail29];
      } else if (id === 16) {
        this.titleMsg = { msg: '玩乐' };
        this.detail = this.detail30;
      }
    },
  },
  props: ['movieData'],
  created() {
    this.$props.movieData.forEach((arr) => {
      this.detail6.push({ id: arr.id, text: arr.movieName });
    });
  },
};
</script>
