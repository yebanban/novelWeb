import { b as bookApi, r as removeFLSpaces, a as __unplugin_components_0, _ as __unplugin_components_1, e as getScroll } from "./Dialog.73ac8b55.js";
import { _ as _export_sfc, d as defineComponent, A as useRouter, r as ref, i as inject, e as onMounted, G as onBeforeUnmount, o as openBlock, c as createElementBlock, a as createBaseVNode, F as Fragment, s as renderList, m as createVNode, n as normalizeClass, u as unref, q as normalizeStyle, x as createCommentVNode, H as withModifiers, t as toDisplayString } from "./index.499cdc49.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h2", null, "\u4E66\u67B6", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", {
  "btn-logo": "",
  "i-ph:magnifying-glass": ""
}, null, -1);
const _hoisted_3 = {
  "mt-10": "",
  bg: "light-100/50",
  "min-h": "[78.5vh]",
  "rounded-2xl": "",
  font: "sans",
  shadow: "xl blue-100",
  w: "full",
  "box-border": "",
  p: "y-10 x-15",
  grid: "~ sm:cols-1 md:cols-2 lg:cols-3 xl:cols-4 2xl:cols-5 gap-8"
};
const _hoisted_4 = ["onClick", "onContextmenu"];
const _hoisted_5 = {
  shadow: "sm blue-100",
  "w-full": "",
  rounded: "",
  "overflow-hidden": ""
};
const _hoisted_6 = {
  bg: "gray-400/20",
  "h-40": "",
  "text-lg": "",
  p: "x-3 y-1"
};
const _hoisted_7 = {
  p: "x-3 y-2",
  truncate: ""
};
const _hoisted_8 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const router = useRouter();
    const books = ref();
    const setLoading = inject("setLoading");
    const loading = inject("loading");
    const dialogVisible = ref(false);
    const updateDialogVisible = ref(false);
    const deleteDialogVisible = ref(false);
    const currentSelectedId = ref("");
    const isShowMenu = ref(false);
    const menuTop = ref("");
    const menuLeft = ref("");
    document.title = "\u591C\u534A\u5C0F\u8BF4\u7F51";
    const initData = async () => {
      try {
        setLoading(true);
        books.value = (await bookApi.getAllBook()).result.books;
        console.log(books.value);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    console.log("home");
    const openInputDialog = () => {
      dialogVisible.value = true;
    };
    const openUpdateDialog = () => {
      updateDialogVisible.value = true;
    };
    const openDeleteDialog = () => {
      deleteDialogVisible.value = true;
    };
    const addBook = (book) => {
      var _a;
      (_a = books.value) == null ? void 0 : _a.push(book);
    };
    const updateBookItem = (book) => {
      var _a;
      const index = (_a = books.value) == null ? void 0 : _a.findIndex((b) => b.id === book.id);
      books.value[index].name = book.name;
    };
    const removeBook = (id) => {
      var _a, _b;
      const index = (_a = books.value) == null ? void 0 : _a.findIndex((book) => book.id === id);
      if (index >= 0)
        (_b = books.value) == null ? void 0 : _b.splice(index, 1);
    };
    const updateBook = async (name) => {
      try {
        setLoading(true);
        name = removeFLSpaces(name);
        await bookApi.updateBookName({ id: currentSelectedId.value, name });
        updateBookItem({ id: currentSelectedId.value, name });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    const newBook = async (name) => {
      try {
        setLoading(true);
        name = removeFLSpaces(name);
        const bookId = (await bookApi.create({ name })).result.id;
        addBook({ id: bookId, name });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    const showDeleteMenu = (e, id) => {
      isShowMenu.value = true;
      let { scrollX, scrollY } = getScroll();
      menuTop.value = e.clientY + scrollY + "px";
      menuLeft.value = e.clientX + scrollX + "px";
      currentSelectedId.value = id;
    };
    const hiddenDeleteMenu = (e) => {
      e.preventDefault();
      isShowMenu.value = false;
    };
    const deleteBook = async () => {
      deleteDialogVisible.value = false;
      try {
        setLoading(true);
        await bookApi.deleteBook({ id: currentSelectedId.value });
        removeBook(currentSelectedId.value);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    const openBook = (book) => {
      router.push({ name: "edit", params: { name: book.name, id: book.id } });
    };
    const menus = ref([{ name: "\u4FEE\u6539\u540D\u5B57", clickMe: openUpdateDialog }, { name: "\u5220\u9664\u672C\u4E66", clickMe: openDeleteDialog }]);
    onMounted(() => {
      initData();
      window.addEventListener("click", hiddenDeleteMenu);
      window.addEventListener("contextmenu", hiddenDeleteMenu);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", hiddenDeleteMenu);
      window.removeEventListener("contextmenu", hiddenDeleteMenu);
    });
    return (_ctx, _cache) => {
      const _component_input_dialog = __unplugin_components_0;
      const _component_Dialog = __unplugin_components_1;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          "py-10": "",
          "mx-10": "",
          "md:m-x-60": "",
          class: normalizeClass(unref(loading) ? "blur-sm" : "")
        }, [
          createBaseVNode("div", {
            flex: "",
            justify: "between",
            "px-3": ""
          }, [
            _hoisted_1,
            createBaseVNode("div", { flex: "~ gap-5" }, [
              _hoisted_2,
              createBaseVNode("div", {
                "btn-logo": "",
                "i-ph:plus": "",
                onClick: openInputDialog
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(books.value, (book) => {
              return openBlock(), createElementBlock("div", null, [
                createBaseVNode("div", {
                  border: "1 gray-300",
                  "rounded-md": "",
                  "p-2": "",
                  flex: "",
                  justify: "center",
                  "items-center": "",
                  "cursor-pointer": "",
                  hover: "transition-300 shadow-light-500 shadow-xl -translate-y-1",
                  onClick: ($event) => openBook(book),
                  onContextmenu: withModifiers(($event) => showDeleteMenu($event, book.id), ["prevent", "stop"])
                }, [
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("div", _hoisted_6, toDisplayString(book.name), 1)
                  ])
                ], 40, _hoisted_4),
                createBaseVNode("p", _hoisted_7, toDisplayString(book.name), 1)
              ]);
            }), 256))
          ]),
          createVNode(_component_input_dialog, {
            modelValue: dialogVisible.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
            onClickEnter: newBook,
            title: "\u65B0\u5EFA\u5C0F\u8BF4",
            placeholder: "\u8BF7\u8F93\u5165\u65B0\u5C0F\u8BF4\u540D"
          }, null, 8, ["modelValue"])
        ], 2),
        isShowMenu.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          p: "y-1 ",
          "w-25": "",
          border: "1 gray-400",
          shadow: "sm gray-900/10",
          "rounded-md": "",
          absolute: "",
          "z-10": "",
          bg: "white",
          style: normalizeStyle({ top: menuTop.value, left: menuLeft.value })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(menus.value, (item) => {
            return openBlock(), createElementBlock("div", {
              "font-mono": "",
              text: "sm center gray-900",
              "p-y-1": "",
              "p-x-3": "",
              "hover-bg": "blue-500/20",
              onClick: item.clickMe,
              "select-none": "",
              "cursor-pointer": ""
            }, toDisplayString(item.name), 9, _hoisted_8);
          }), 256))
        ], 4)) : createCommentVNode("", true),
        createVNode(_component_input_dialog, {
          modelValue: updateDialogVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => updateDialogVisible.value = $event),
          onClickEnter: updateBook,
          title: "\u4FEE\u6539\u5C0F\u8BF4\u540D",
          placeholder: "\u8BF7\u8F93\u5165\u5C0F\u8BF4\u540D"
        }, null, 8, ["modelValue"]),
        createVNode(_component_Dialog, {
          modelValue: deleteDialogVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => deleteDialogVisible.value = $event),
          tips: "\u662F\u5426\u5220\u9664\u672C\u4E66\uFF1F",
          onClickEnter: deleteBook
        }, null, 8, ["modelValue"])
      ], 64);
    };
  }
});
var Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "Home.vue"]]);
export { Home as default };
