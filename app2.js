import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'keeeei-wearex',
            products: [],
            temp: {}
        }
    },
    methods: {

        // 檢查登入狀態
        checkLogin() {
            axios.post(`${this.url}/api/user/check`)
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'index.html'
                })
        },
        // 取得產品資訊
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    created() {
        // 將儲存在 cookie 的 token 取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mizuToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        // 檢查登入
        this.checkLogin()

    }
})
app.mount('#app')