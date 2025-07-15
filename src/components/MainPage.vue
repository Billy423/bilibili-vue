<script setup>
import { ref, onMounted } from "vue";
import { getRsaPublicKey} from "@/api/userApi";
import CommonHeader from "@/components/CommonHeader.vue";

// Demo get request
// Define reactive state
const pk = ref('');

// Fetch RSA public key
const fetchRsaPublicKey = async () => {
  try {
    let response = await getRsaPublicKey();
    if (response.data) {
      pk.value = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch RSA public key:", error);
  }
};

// Call function when component mounts
onMounted(() => {
  fetchRsaPublicKey();
});

</script>

<template>
  <div>
    <common-header/>
  </div>
</template>

<style scoped lang="less">

</style>