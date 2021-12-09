<template>
  <div class="home">
    
    <Header />
    <Footer />
    <router-view/>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 48px;
}
</style>