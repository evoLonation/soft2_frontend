<template>
  <el-upload
      action="#"
      accept="img/jpeg, img/jpg, img/png"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="uploadFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="2"
      :file-list="fileList"
      :class="{ hide: hideUploadBtn }"
      style="margin: 30px 0 auto 225px"
  >
    <el-icon><Plus /></el-icon>
    <template v-slot:fileList="{ file }"  >
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>
import {Plus, Delete} from "@element-plus/icons-vue";

export default {
  components: {
    Delete,
    Plus,
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      hideUploadBtn: false,
    };
  },
  methods: {
    uploadFile(file, fileList) {
      // fileList为添加后的图片数组 赋值给this.fileList 则展示正确
      this.fileList = fileList;
      this.hideUploadBtn = fileList.length >= 2;
    },
    handleRemove(file, fileList) {
      // fileList为移除后剩余的图片数组 赋值给this.fileList 则展示正确
      this.fileList = fileList;
      this.hideUploadBtn = fileList.length >= 2;
    },
    // eslint-disable-next-line no-unused-vars
    handlePictureCardPreview (file, fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible= true;
    },
  }
}
</script>

<style lang="scss">
.hide {
  .el-upload--picture-card {
    display: none !important;
  }
}

.el-upload-list__item.is-ready {
  margin-right: 40px;
}
</style>