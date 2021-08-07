<template>
  <div>
    <Button type="primary" @click="showModal">
      Open Modal with async logic
    </Button>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <ExampleComponent />
    </a-modal>
  </div>
</template>
<script>
import ExampleComponent from "../../components/index.vue";
import { Button } from "ant-design-vue";
export default {
  components: {
    ExampleComponent,
    Button
  },
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>