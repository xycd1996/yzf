<template>
  <div class="content">
    <van-tabs v-model="active" :ellipsis="false">
      <van-tab :name="index" v-for="(tab, index) in tabList" :key="index" :title="tab.title" />
    </van-tabs>
    <van-list finished-text="没有更多了" v-model="loading" :finished="finished" @load="onLoad">
      <ul class="list">
        <li class="item" v-for="article in articleList" :key="article.id">
          <div class="container">
            <div class="coverPath">
              <van-image height="160" fit="cover" :src="article.coverPath" lazy-load />
            </div>
            <div class="info">
              <div class="title">{{ article.title }}</div>
              <div class="merchant">
                <img class="logo" :src="article.merchant.logo" />
                <div class="span">{{ article.merchant.name }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { Image, List, Tab, Tabs } from 'vant'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List,
    'van-image': Image,
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 2,
      loading: false,
      finished: false,
      articleList: [
        {
          id: 1,
          title: '带你了解易视致富商学院',
          coverPath: 'https://qnm.hunliji.com/o_1fjsrhlfhtpe7itbgjko43lj.jpg',
          merchant: {
            name: '易视致富',
            logo: 'https://qnm.hunliji.com/o_1fjsrdvk018kthv5b7116ni1577t.png',
          },
        },
        {
          id: 2,
          title: '我和我的家乡',
          coverPath: 'https://qnm.hunliji.com/o_1fjsrgiat1n4v15f82ehhg11gkd9.jpg',
          merchant: {
            name: '易视致富',
            logo: 'https://qnm.hunliji.com/o_1fjsrdvk018kthv5b7116ni1577t.png',
          },
        },
        {
          id: 3,
          title: '如何进行视频制作',
          coverPath: 'https://qnm.hunliji.com/o_1fjsrjdbh1u5417ib9ll1lq41au3o.jpg',
          merchant: {
            name: '易视致富',
            logo: 'https://qnm.hunliji.com/o_1fjsrdvk018kthv5b7116ni1577t.png',
          },
        },
      ],
    }
  },

  methods: {
    onLoad() {
      this.loading = false
      this.finished = true
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 4px 8px;
    .item {
      box-sizing: border-box;
      padding: 4px;
      flex: 0 0 50%;
      width: 50%;
      .container {
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        .info {
          padding: 4px;
          .title {
            font-size: 16px;
            font-weight: 500;
            display: inline-block;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .merchant {
            margin-top: 4px;
            display: flex;
            align-items: center;
            .logo {
              margin-right: 6px;
              border-radius: 50%;
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
