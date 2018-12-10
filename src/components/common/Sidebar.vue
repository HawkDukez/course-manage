<template>
  <div class="sidebar">
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      active-text-color="#9F7D64"
      @select="fetchCourse"
    >
      <el-menu-item index="home" class="el-menu-item" route="home">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item
        v-for="course in courses"
        :key="course.section_id"
        :index="course.section_id"
        class="el-menu-item"
      >
        <i class="fa fa-book fa-2x" aria-hidden="true"></i>
        <span>{{course.course_title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      identity: this.$route.params.identity
    };
  },
  props: ["courses"],

  methods: {
    fetchCourse(key, keyPath) {
      if (key != "home") {
        if (this.$route.params.identity == "student") {
          this.$router.push({
            name: "studentcoursehome",
            params: {
              course: key,
              identity: "student"
            }
          });
        } else {
          this.$router.push({
            name: "teachercoursehome",
            params: {
              course: key,
              identity: "teacher"
            }
          });
        }
      } else {
        this.$router.push("/home");
      }
    }
  }
};
</script>
<style scoped>
.el-menu-vertical-demo {
  text-align: left;
}
.sidebar {
  width: 220px;
  height: 100%;
  position: absolute;
  top: 100px;
  background: #fff;
  align-items: center;
}
.el-menu-item {
  padding-left: 30px;
  font-size: 14px;
  margin-top: 5px;
}
</style>
