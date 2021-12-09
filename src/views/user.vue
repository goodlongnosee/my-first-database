<template>
    <div class="user">
        我的
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    name:"User",
    computed:{
        ...mapState(['userInfo'])
    },
    beforeRouteEnter(to,from,next){
        // console.log(to,)
        next(vm=>{
            if(vm.userInfo){
                next("/home/user")
            }else {
                next("/login")
            }
        })
    }
}
</script>