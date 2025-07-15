<template>
  <div class='user-login-form-container'>
    <div class='user-login-form'>
      <div class='user-login-form-title'>
        Login - UserLogin
      </div>

      <div class='user-login-form-item'>
        <div class='user-login-form-item-title'>
          Account
        </div>
        <input placeholder='Enter your account' type='text' v-model='account' />
      </div>

      <div class='user-login-form-item'>
        <div class='user-login-form-item-title'>
          Password
        </div>
        <input placeholder='Enter your password' type='password' v-model='password' />
        <div class='forgetPwd'>
          Forgot password?
        </div>
      </div>

      <div class='user-login-form-footer'>
        <button @click='register' class='user-login-form-footer-btn'>
          Register
        </button>
        <button @click='login' class='user-login-form-footer-btn'>
          Login
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// Define reactive variables
const account = ref('')
const password = ref('')

// Define computed property for user authentication status
const isUserLoggedIn = computed(() => localStorage.getItem('token'))

// Methods
const register = () => {
  console.log('Account:', account.value)
  console.log('Password:', password.value)
  account.value++;
}

const login = () => {
  if (isUserLoggedIn.value) {
    console.log('User is already logged in')
  } else {
    console.log('User is not logged in')
  }
}

// Lifecycle Hooks (Vue 3)
onBeforeMount(() => console.log('beforeMount'))
onMounted(() => console.log('mounted'))
onBeforeUpdate(() => console.log('beforeUpdate', account.value))
onUpdated(() => console.log('updated', account.value))
onBeforeUnmount(() => console.log('beforeUnmount', account.value))
onUnmounted(() => console.log('unmounted'))

</script>


<style scoped lang="less">
.user-login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  margin: 0;

  .user-login-form {
    width: 100%;
    max-width: 450px;
    padding: 40px 32px;
    background: white;
    border-radius: 18px;
    box-shadow:
        0 12px 24px rgba(0, 0, 0, 0.05),
        0 6px 18px rgba(0, 0, 0, 0.03);

    .user-login-form-title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 40px;
      font-weight: 700;
      color: #2c3e50;
      letter-spacing: 0.5px;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        left: 25%;
        right: 25%;
        height: 3px;
        background: linear-gradient(to right, #4299e1, #3182ce);
        border-radius: 2px;
      }
    }

    .user-login-form-item {
      position: relative;
      margin-bottom: 28px;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
      flex-direction: column;
      align-items: flex-start;

      .user-login-form-item-title {
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 600;
        color: #2d3748;
        display: block;
        width: 100%;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 14px 16px;
        font-size: 16px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        transition: all 0.3s ease;

        &:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.15);
        }

        &::placeholder {
          color: #a0aec0;
          font-weight: 500;
        }
      }

      .forgetPwd {
        align-self: flex-end;
        margin-top: 10px;
        font-size: 14px;
        color: #4299e1;
        font-weight: 600;
        transition: all 0.2s ease;

        &:hover {
          color: #3182ce;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .user-login-form-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      gap: 15px;

      .user-login-form-footer-btn {
        padding: 14px 24px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: none;
        min-width: 110px;
        text-align: center;

        &:first-child {
          background: white;
          color: #4299e1;
          border: 1px solid #cbd5e0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

          &:hover {
            background: #f8fafc;
            border-color: #a0aec0;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          }
        }

        &:last-child {
          background: linear-gradient(to right, #4299e1, #3182ce);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.25);

          &:hover {
            box-shadow: 0 6px 16px rgba(66, 153, 225, 0.4);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}
</style>