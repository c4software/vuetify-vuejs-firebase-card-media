import firebaseCardMedia from './component/firebaseCardMedia';

export default {
    install(Vue) {
        Vue.component('firebaseCardMedia', firebaseCardMedia);
    },
};

export { firebaseCardMedia };