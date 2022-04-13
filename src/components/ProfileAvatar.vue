<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      :style="{ height: size, width: size }"
    />
    <div v-else :style="{ height: size, width: size }" />

    <div :style="{ width: size }">
      <label class="button primary block" for="single">
        {{ uploading ? "Uploading ..." : "Upload" }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { supabase } from "../supabase";

const props = defineProps<{
  path: string | null;
}>();
const emit = defineEmits<{
  (e: "upload"): void;
  (e: "update:path", value: string): void;
}>();

const { path } = toRefs(props);
const size = ref("10em");
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
