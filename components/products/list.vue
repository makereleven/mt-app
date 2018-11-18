<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="(item,index) in nav"
        :key="item.name"
        :class="[item.name,item.acitve?'s-nav-active':'']"
        @click="navSelect(item,index)"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  async asyncData({app}) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function (item,index) {
      switch(item.name){
        case "s-comment":
          if(item.txt === '评价最高'){
            this.nav[index].txt = '评价最低'
            this.list.sort((a,b)=>a.rate-b.rate)
          }else{
            this.nav[index].txt = '评价最高'
            this.list.sort((a,b)=>b.rate-a.rate)
          }
          break
      }
    }
  }
}
</script>
