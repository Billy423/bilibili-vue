<script setup>
import { ref, computed} from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import {Clock, Search, Star, Upload} from "@element-plus/icons-vue";

// State
const dialogVisible = ref(false);
const searchTxt = ref("");

const isUserLoggedIn = computed(() => localStorage.getItem('token'))

// Router & Route
const router = useRouter();
const route = useRoute();

// Navigation Entries
const entries = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Anime Series", path: "/" },
  { id: 3, name: "Live Streaming", path: "/" },
  { id: 4, name: "Game Center", path: "/" }
];

// Functions
const jumpWithLoginUser = (path) => {
  if (!isUserLoggedIn.value) {
    dialogVisible.value = true;
  } else {
    if (route.path !== path) {
      router.push(path);
    } else {
      location.reload();
    }
  }
};

const jumpToPath = (path) => {
  if (route.path !== path) {
    router.push(path);
  } else {
    location.reload();
  }
};

const searchContents = () => {
  if (!searchTxt.value) {
    ElMessage.warning("Please enter search content");
    return;
  }
  if (decodeURIComponent(route.fullPath) === `/searchContents?searchTxt=${searchTxt.value}`) {
    location.reload();
    return;
  }
  router.push({ path: "/searchContents", query: { searchTxt: searchTxt.value } });
};

</script>

<template>
  <div class="bili-header">
    <div class="header-nav-container">
      <div class="left-entry">
        <div v-for="entry in entries" :key="entry.id">
          <span @click="jumpToPath(entry.path)">{{ entry.name }}</span>
        </div>
      </div>

      <div class="center-search-bar">
        <form class="nav-search-form">
          <div class="nav-search-content">
            <input class="nav-search-input" type="text" autocomplete="off" maxlength="100" placeholder="Please enter search content" v-model="searchTxt" />
          </div>
          <div class="nav-search-btn">
            <el-button :icon="Search" circle size="small" @click="searchContents"></el-button>
          </div>
        </form>
      </div>

      <div class="right-entry">
        <div v-if="isUserLoggedIn" class="user-center">
          <el-dropdown>
            <template #default>
              <img style="height: 50px; width: 50px; border-radius: 50%" :src="require('@/assets/bilibiliavatar.png')" alt="" />
            </template>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="jumpToPath('/mySpace')">Profile</el-dropdown-item>
                <el-dropdown-item @click="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-else class="user-center">
          <el-button class="login-button" type="text" @click="dialogVisible = true">Login</el-button>
          <el-dialog v-model="dialogVisible" title="Login" width="30%">
            <!--            <LoginDialog />-->
          </el-dialog>
        </div>

        <!-- Moments -->
        <div class="right-entry-moments">
          <el-popover placement="top-start" width="300" trigger="hover">
            <template #reference>
              <el-button :icon="Star" class="el-btn-moments" type="warning" circle></el-button>
            </template>
            <div v-if="isUserLoggedIn">
              <div class="moment-list">
                <div v-for="moment in moments" :key="moment.id" class="moment-list-item">
                  <div class="moment-list-item-txt">{{ moment.content.contentDetail.txt }}</div>
                  <div v-if="moment.type === '1' " class="moment-list-item-img">
                    <img :src="moment.content.contentDetail.img" alt="" class="moment-img" />
                  </div>
                  <div v-if="moment.type === '0' " class="moment-list-item-video">
                    <img :src="moment.content.contentDetail.thumbnail" alt="" class="moment-thumbnail" />
                    <div class="moment-list-item-video-detail">
                      <div class="moment-list-item-video-detail-title">{{ moment.content.contentDetail.title }}</div>
                      <div class="moment-list-item-video-detail-description">{{ moment.content.contentDetail.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <el-button v-if="isUserLoggedIn" type="info" style="width: 100%" @click="jumpToPath('/userMoments')">Load more</el-button>

            </div>
            <div v-else>
              <div class="login-message">Login to view moments</div>
              <el-button type="info" style="width: 100%" @click="dialogVisible = true">Login</el-button>
            </div>
          </el-popover>
          <span class="entry-text">Moments</span>
        </div>

        <!-- History -->
        <div class="right-entry-content">
          <el-popover placement="top-start" width="300" trigger="hover">
            <template #reference>
              <el-button :icon="Clock" class="right-entry-button" type="warning" circle></el-button>
            </template>
              <div class="history-list">
                <div v-for="(history, index) in histories" :key="index" class="history-list-item">
                  <div class="history-list-item-video">
                    <img :src="history.thumbnail" alt="" class="history-thumbnail" />
                    <div class="history-list-item-video-detail">
                      <div class="history-list-item-video-detail-title">{{ history.title }}</div>
                      <div class="history-list-item-video-detail-description">{{ history.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
            <el-button v-if="isUserLoggedIn" type="info" style="width: 100%" @click="jumpToPath('/userHistory')">Load more</el-button>
            <div v-else>
              <div class="login-message">Login to view history</div>
              <el-button type="info" style="width: 100%" @click="dialogVisible = true">Login</el-button>
            </div>
          </el-popover>
          <span class="entry-text">History</span>
        </div>

        <!-- Upload -->
        <div class="right-entry-content">
          <el-button type="warning" :icon="Upload" circle @click="jumpWithLoginUser('postContent')"></el-button>
          <span class="entry-text">Upload</span>
        </div>
      </div>
    </div>

    <div class="header-banner-container">
      <img class="banner" :src="require('@/assets/header/header-banner.png')" alt="" />
    </div>
  </div>
</template>


<style scoped lang="less">
.bili-header {
  .header-nav-container {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-entry {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 40px;
      span {
        margin-right: 20px;
        color: white;
        font-weight: bolder;
        cursor: pointer;
      }
    }

    .center-search-bar {
      flex: 1 auto;
      min-width: 181px;
      max-width: 500px;
      .nav-search-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
        height: 40px;
        background-color: white;
        border-radius: 8px;
        opacity: 0.8;
        .nav-search-content {
          display: flex;
          align-items: center;
          width: 100%;
          height: 36px;
          border-radius: 6px;
          .nav-search-input {
            width: 100%;
            font-size: 14px;
            padding-right: 8px;
            background-color: transparent;
            border: none;
            outline: none;
          }
        }
        .nav-search-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

