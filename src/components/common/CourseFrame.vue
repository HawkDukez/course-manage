<template>
    <div class="content-box">
      <vTabs :course_id="course_id" :identity="identity"></vTabs>
      <router-view></router-view>
    </div>
</template>

<script>
import vTabs from '../common/CourseTabs'
export default {
  data() {
    return {
      course_id: this.$route.params.course,
      identity: this.$route.params.identity
    };
  },
  components: {
    vTabs
  }
}
</script>
