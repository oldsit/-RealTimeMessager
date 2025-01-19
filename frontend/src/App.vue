<template>
  <div class="app-container">
    <AppNavbar />

    <div class="main-content">
      <div class="left-side">
        <h2>Welcome to Mush.io</h2>
        <p>Join us and create your own server to connect with friends, collaborate, and more!</p>
      </div>

      <div class="right-side">
        <form class="registration-form" @submit.prevent="handleRegister">
          <h2>Sign Up</h2>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required autocomplete="off" />
          </div>

          <div class="form-group terms">
            <span>
              By registering and using Mush.io you agree to the
              <a href="javascript:void(0)" @click="openTOSModal">Terms of Service</a>
            </span>
          </div>

          <div class="form-group">
            <center>
              <button type="submit">Register</button>
            </center>
          </div>
        </form>
      </div>
    </div>

    <AppFooter />
    <TOSModal ref="tosModal" />

    <!-- Notification Area -->
    <div v-if="notification.message" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { registerUser } from './utils/auth/registerUser';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import TOSModal from './components/TOSModal.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    TOSModal,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      notification: {
        message: '',
        type: '', // 'success' or 'error'
      },
    };
  },
  methods: {
    openTOSModal() {
      this.$refs.tosModal.openModal();
    },
    async handleRegister() {
      try {
        await registerUser(this.email, this.password, this.username);

        // Show success notification
        this.showNotification('Registration successful! Welcome to Mush.io!', 'success');
      } catch (error) {
        let errorMessage = 'Registration failed. Please try again.';

        if (error.message === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered. Please use a different email.';
        } else if (error.message === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please use a stronger password.';
        } else if (error.message === 'auth/invalid-email') {
          errorMessage = 'Invalid email address. Please enter a valid email.';
        } else if (error.message.includes('Backend request failed')) {
          errorMessage = 'An error occurred while creating folders on the server. Please try again later.';
        }

        // Show error notification
        this.showNotification(errorMessage, 'error');
      }
    },
    showNotification(message, type) {
      this.notification.message = message;
      this.notification.type = type;

      // Automatically hide the notification after 5 seconds
      setTimeout(() => {
        this.notification.message = '';
        this.notification.type = '';
      }, 5000);
    },
  },
};
</script>

<style>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fb;
  margin: 0;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px; /* Navbar height */
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 20px auto;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.left-side {
  flex: 1;
  padding: 20px;
  margin-right: 40px;
}

.left-side h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2e3b4e;
}

.left-side p {
  font-size: 1.1rem;
  color: #636c77;
}

.right-side {
  width: 350px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.registration-form h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2e3b4e;
}

.registration-form label {
  margin-bottom: 5px;
  color: #4a5568;
}

.registration-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #333;
  transition: border 0.3s ease;
}

.registration-form input:focus {
  outline: none;
  border-color: #63b3ed;
  box-shadow: 0 0 5px rgba(99, 179, 237, 0.4);
}

.registration-form button {
  padding: 12px;
  background-color: #63b3ed;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.registration-form button:hover {
  background-color: #4fa3d1;
}

/* Notification Styles */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background-color: #4caf50; /* Green for success */
}

.notification.error {
  background-color: #f44336; /* Red for error */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 15px;
  }

  .left-side {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .right-side {
    width: 100%;
  }
}
</style>
