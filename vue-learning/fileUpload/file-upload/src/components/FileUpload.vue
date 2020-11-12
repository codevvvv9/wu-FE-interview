<template>
  <div class="hello">
    <input type="file" name="upload" id="" @change="handleFileChange" />
    <el-button @click="handleUpload"> 上传 </el-button>
  </div>
</template>

<script>
const SIZE = 10 * 1024 * 1024;

export default {
  name: "FileUpload",
  props: {
    msg: String,
  },
  data() {
    return {
      container: {
        file: null,
      },
      data: [],
    };
  },
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      console.log("handleFileChange -> [file]", [file]);
      console.log("handleFileChange -> file", file);
      if (!file) return;
      console.log("0 handleFileChange -> this.$data", this.$data);
      Object.assign(this.$data, this.$options.data());
      console.log(
        "handleFileChange -> this.$options.data()",
        this.$options.data()
      );
      console.log("1 handleFileChange -> this.$data", this.$data);
      this.container.file = file;
    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: `${this.container.file.name}-${index}`, //文件名+数组下标
      }));
      await this.uploadChunks();
    },
    request({ url, method = "post", data, headers = {}}) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(data);
        xhr.onload = (e) => {
          resolve({
            data: e.target.response,
          });
        };
      });
    },
    //生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return fileChunkList;
    },
    //上传文件切片
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk, hash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(async ({ formData }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData,
          })
        );
      await Promise.all(requestList); //并发切片
      //合并切片
      // await this.mergeRequest();
    },
    async mergeRequest() {
      await this.request({
        url: "http://localhost:3000/merge",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          size: SIZE,
          filename: this.container.file.name,
        }),
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
