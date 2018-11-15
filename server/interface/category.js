import Router from 'koa-router'
import axios from './utils/axios'
import Provice from '../dbs/models/province'

let router = new Router({prefix:'/category'})

const sign = 'e2b14fb869097f398ef7215df681b778'

router.get('/crumbs',async (ctx)=>{

  // let result = await Category.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }

  let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params:{
      city:ctx.query.city.replace('市','') || "广州",
      sign
    }
  })
  ctx.body={
    areas: status===200?areas:[],
    types: status===200?types:[]
  }
})

export default router