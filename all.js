var app = new Vue({
  el: "#app",
  data: {
    productList: [
      {
        type: "風景",
        title: "風景攝影課程",
        price: 7000,
        salePrice: 3500,
        isActive: false,
        img:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        unit: "",
        description: "",
        content: "",
        id: 111,
      },
      {
        type: "人像",
        title: "人像攝影課程",
        price: 7999,
        salePrice: 4500,
        isActive: true,
        img:
          "https://images.unsplash.com/flagged/photo-1557823334-1cb96d97a297?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        unit: "",
        description: "",
        content: "",
        id: 222,
      },
    ],
    modal: {
      type: null,
      title: "",
      bgColor: "",
      item: {
        type: null,
        title: null,
        price: null,
        salePrice: null,
        isActive: false,
        img: null,
        unit: null,
        description: null,
        content: null,
      },
    },
  },
  methods: {
    //打開modal時判斷
    openModal(modalType, id) {
      var vm = this;
      switch (modalType) {
        case "new":
          vm.modal.title = "新增產品";
          vm.modal.bgColor = "bg-dark";
          break;
        case "edit":
          vm.modal.title = "編輯產品";
          vm.modal.bgColor = "bg-dark";
          vm.productList.forEach((element) => {
            if (element.id === id) {
              vm.modal.item = element;
            }
          });
          break;
        case "delete":
          vm.modal.title = "刪除產品";
          vm.modal.bgColor = "bg-danger";
          vm.modal.item.id = id;
          vm.productList.forEach((element) => {
            if (element.id === id) {
              vm.modal.item = element;
            }
          });
          break;
      }
      vm.modal.type = modalType;
      $("#Modal").modal("show");
    },
    //檢查是甚麼狀態的確認鍵
    checkBtnType(type) {
      if (type === "new") {
        this.updateProduct(type, null);
      } else if (type === "edit") {
        this.updateProduct(type, this.modal.item);
      }
    },
    //更新資料
    updateProduct(type, id) {
      var vm = this;
      if (type === "new") {
        this.modal.item.id = new Date().getTime();
        this.productList.push(this.modal.item);
      } else if (type === "edit") {
        vm.productList.forEach((element) => {
          if (element.id === id) {
            element = vm.modal.item;
          }
        });
      }
      $("#Modal").modal("hide");
      this.modal.item = {};
    },
    //刪除資料
    deleteProduct() {
      const vm = this;
      vm.productList.forEach((element, index) => {
        if (element.id === vm.modal.item.id) {
          vm.productList.splice(index, 1);
        }
      });
      $("#Modal").modal("hide");
      this.modal.item = {};
    },
  },
});
