var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    files: [],
  },
  filters: {
    kb(val) {
      return Math.floor(val / 1024);
    }
  },
  methods: {
    addFile(e) {
      let files = e.dataTransfer.files;
      [...files].forEach(file => {
        this.files.push(file);
        console.log(this.files)
      });
    },
    removeFile(file) {
      this.files = this.files.filter(f => {
        return f != file;
      });
    },
  }
})