<template>
  <div class="content">
    <div>
      <el-button
        class="btn-return"
        icon="el-icon-back"
        circle
        style="align-content: left; float: left"
        @click="back"
      ></el-button>
      <h3
        class="title"
        style="font-size: 24px; margin-top: 10px; margin-bottom: 15px"
      >{{testInfo.title}}</h3>
    </div>
    <hr color="gold">
    <div class="desc">
      <div class="desc-title">内容：</div>
      <div class="desc-content">{{testInfo.content}}</div>
    </div>
    <div class="date">
      <p class="date-title">开始日期：</p>
      <p class="date-content">{{testInfo.start_time}}</p>
    </div>
    <div class="date">
      <p class="date-title">截止日期：</p>
      <p class="date-content">{{testInfo.end_time}}</p>
    </div>
    <div class="file">
      <p class="file-title">附件：</p>
      <!-- <a class='download' href='localhost:8080' download=""  title="下载">下载</a> -->
      <el-button type="text" class="btn-file">{{testInfo.file_name}}</el-button>
    </div>
    <div class="answer">
      <p class="answer-title">回答：</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5}"
        placeholder="请输入内容"
        v-model="postParams.content"
      ></el-input>
    </div>
    <div class="button">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        :file-list="fileList"
        :data="postParams"
        :auto-upload="false"
        :on-success="handleSuccess"
      >
        <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
        <el-button class="submit" size="small" @click="submitUpload">提交</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: "/hhh/v1/app/food/recognize",
      postParams: {
        action: "post",
        test_id: this.$route.params.test_id,
        content: ""
      },
      testInfo: {
        title: "",
        content: "",
        start_time: "",
        end_time: "",
        file_id: "",
        file_name: ""
      },
      fileList: []
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchTestInfo();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchTestInfo();
    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    fetchTestInfo() {
      this.$http("get", "/online_test/" + this.postParams.test_id, {
        test_id: this.postParams.test_id
      }).then(res => {
        console.log(res);
        this.testInfo.title = res.data.title;
        this.testInfo.content = res.data.content;
        this.testInfo.start_time = res.data.start_time;
        this.testInfo.end_time = res.data.end_time;
        this.testInfo.file_id = res.data.file_id;
        this.testInfo.file_name = res.data.file_name;
      });
    },
    // download() {
    //   this.$http(
    //     "get",
    //     "/file",
    //     (params = { file_id: this.testInfo.file_id }),
    //     (config = {
    //       contentType: "content-type:”application/x-download;charset=utf-8"
    //     })
    //   ).then(res => {});
    // },
    submitUpload() {
      this.fileList = this.$refs.upload.uploadFiles;
      if (this.fileList.length > 0) {
        let abc = this.$refs.upload.submit();
        console.log("abccc",abc)
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.postParams.content = "";
        this.fileList = [];
      } else if (this.postParams.content !== "") {
        this.$http("post", "/test_submit", this.postParams).then(res => {
          if (res.data.status == 0) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.postParams.content = "";
          }
        });
      } else {
        this.$message.error("真的要交白卷吗？~");
      }
    },
    handleSuccess(response, file, fileList){
      console.log(response, file, fileList)
    }
  }
};
</script>

<style scoped>
.btn-return,
.title {
  display: inline-block;
}
.btn-return {
  margin-top: 10px;
  margin-left: 5px;
}
.desc-title,
.desc-content {
  display: inline-block;
}
.file-title,
.btn-file {
  display: inline-block;
}
.btn-file {
  font-size: 15px;
}
.file,
.answer,
.date,
.desc {
  text-align: left;
  margin-top: 20px;
  margin-left: 220px;
  margin-right: 220px;
  font-size: 18px;
}
.desc-content {
  margin-top: 10px;
  margin-left: 5px;
}
.date-content,
.date-title {
  display: inline-block;
}
.date-content {
  padding-top: 4px;
}
.answer-title {
  margin-bottom: 10px;
}
.button {
  margin-top: 30px;
  text-align: right;
  margin-right: 220px;
}
.add-file,
.submit {
  background: cornflowerblue;
  color: #fff;
  font-size: 13px;
  margin-left: 10px;
}
</style>
