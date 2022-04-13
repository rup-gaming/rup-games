<template>
  <div class="avatar-container">
    <div
      class="avatar-img-container"
      :style="{
        height: size,
        width: size,
        'border-color': store.darkMode ? '#3c3f41fd' : '#e0e0e6',
      }"
    >
      <img
        v-if="src"
        :src="src"
        alt="Avatar"
        :style="{
          height: size,
          width: size,
        }"
        class="avatar-img"
      />
      <div
        v-else
        :style="{
          height: size,
          width: size,
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        }"
        class="avatar"
      >
        <span>Could not load image :(</span>
      </div>
    </div>

    <n-upload
      type="file"
      accept="image/*"
      @on-change="uploadAvatar"
      class="upload-container"
    >
      <n-button
        size="large"
        :disabled="uploading"
        :loading="uploading"
        icon-placement="left"
        style="width: 178px"
      >
        {{ uploading ? "Uploading" : "Upload" }}
      </n-button>
    </n-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { NButton, NUpload } from "naive-ui";
import { useStore } from "../store/store";
import { supabase } from "../supabase";

const props = defineProps<{
  path: string | null;
}>();
const emit = defineEmits<{
  (e: "upload"): void;
  (e: "update:path", value: string): void;
}>();

const store = useStore();
const { path } = toRefs(props);
const size = ref("10rem");
const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
  try {
    const copyPath: any = path.value;
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(copyPath);
    if (error) throw error;
    const thing: any = data;
    src.value = URL.createObjectURL(thing);
  } catch (error: any) {
    console.error("Error downloading image: ", error.message);
  }
};

const uploadAvatar = async (evt: any) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
  } catch (error: any) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

watch(path, () => {
  if (path.value) downloadImage();
});
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.avatar-img {
  border-radius: 3px;
  object-fit: cover;
}

.avatar-img-container {
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 3px;
}

.upload-container {
  width: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0rem 0.5rem 0rem;
}
</style>
