import { c as countWords, d as debounce, r as removeFLSpaces, t as throttle, _ as __unplugin_components_1, b as bookApi, g as getOrder, a as __unplugin_components_0$1 } from "./Dialog.73ac8b55.js";
import { _ as _export_sfc, d as defineComponent, i as inject, o as openBlock, c as createElementBlock, a as createBaseVNode, u as unref, h as http, b as defineStore, r as ref, e as onMounted, f as onUnmounted, w as withDirectives, v as vShow, g as vModelText, t as toDisplayString, n as normalizeClass, j as nextTick, k as watch, l as createTextVNode, m as createVNode, p as withCtx, q as normalizeStyle, F as Fragment, s as renderList, x as createCommentVNode, T as Transition, y as createBlock, z as useRoute, A as useRouter, B as provide } from "./index.499cdc49.js";
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("div", {
  border: "1 blue-100",
  rounded: "1/2",
  "p-6": ""
}, [
  /* @__PURE__ */ createBaseVNode("div", {
    "btn-logo": "",
    "i-ph:plus": "",
    text: "gray-400"
  })
], -1);
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("span", { text: "gray-600" }, "\u65B0\u5EFA\u7AE0\u8282", -1);
const _hoisted_3$2 = [
  _hoisted_1$3,
  _hoisted_2$3
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const openNewChapterDialog = inject("openNewChapterDialog");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", null, [
        createBaseVNode("div", {
          "rounded-3xl": "",
          bg: "white",
          h: "[80vh]",
          w: "4/5",
          "m-auto": "",
          flex: "~ col gap-4",
          "justify-center": "",
          "items-center": "",
          "cursor-pointer": "",
          onClick: _cache[0] || (_cache[0] = (...args) => unref(openNewChapterDialog) && unref(openNewChapterDialog)(...args))
        }, _hoisted_3$2)
      ]);
    };
  }
});
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "BlankArticle.vue"]]);
function create(data) {
  return http.request({ url: `newChapter`, method: "post", data });
}
function getChapterContent(data) {
  return http.request({ url: `getChapterContent?id=${data.id}` });
}
function updateChapterName(data) {
  return http.request({ url: `updateChapterName`, method: "post", data });
}
function updateChapterContent(data) {
  return http.request({ url: `updateChapterContent`, method: "post", data });
}
function deleteChapter(data) {
  return http.request({ url: `deletechapter`, method: "post", data });
}
var chapterApi = { create, getChapterContent, updateChapterName, updateChapterContent, deleteChapter };
const useCurrentArticle = defineStore("main", {
  state: () => {
    return {
      article: {
        id: "",
        title: "",
        content: ""
      }
    };
  },
  getters: {
    id: (state) => {
      return state.article.id;
    },
    title: (state) => {
      return state.article.title;
    },
    content: (state) => {
      return state.article.content;
    },
    contentWordsCount: (state) => {
      return countWords(state.article.content);
    }
  },
  actions: {
    setTitle(title) {
      this.article.title = title;
    },
    setContent(content) {
      this.article.content = content;
    },
    updateChapter(id, title, content) {
      this.article.id = id;
      this.article.title = title;
      this.article.content = content;
    }
  }
});
const _hoisted_1$2 = {
  "md:mt-10": "",
  "mt-4": "",
  "min-h": "4/5",
  bg: "white",
  "whitespace-pre-wrap": "",
  "rounded-3xl": "",
  p: "x-3 md:x-10 y-6",
  relative: "",
  font: "sans"
};
const _hoisted_2$2 = {
  p: "y-2 x-2",
  text: "sm gray-400",
  flex: "",
  justify: "between"
};
const _hoisted_3$1 = { text: "right" };
const _hoisted_4 = ["contenteditable"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  emits: ["updateTitle"],
  setup(__props, { expose, emit }) {
    const store = useCurrentArticle();
    const titleEdited = ref(store.title);
    const saveInfo = ref(" ");
    const titleEditable = ref(false);
    const contentEditable = ref(false);
    const titleInput = ref(null);
    const contentEditor = ref(null);
    const content = ref("");
    content.value = store.content;
    const contentWordsCount = ref(0);
    const setTitleEditable = () => {
      titleEdited.value = store.title;
      titleEditable.value = true;
      window.addEventListener("click", clickExceptInput, true);
    };
    const setUnTitleEditable = () => {
      titleEditable.value = false;
    };
    const changeContentEditable = async () => {
      contentEditable.value = !contentEditable.value;
      if (!contentEditable.value) {
        await saveContent(contentEditor.value, false);
        preventAutoSave();
      }
    };
    const handlePaste = (e) => {
      e.preventDefault();
      if (!contentEditable.value)
        return;
      let txt = "";
      let range = null;
      txt = e.clipboardData.getData("text/plain");
      range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      let pasteTxt = document.createTextNode(txt);
      range.insertNode(pasteTxt);
      range.collapse(false);
      saveContentDebounce(e.target, true);
      changeContentWordsCount();
    };
    async function saveContent(contentEditor2, isAutoSave) {
      try {
        let content2 = contentEditor2.innerText;
        await chapterApi.updateChapterContent({ id: store.id, content: content2 });
        store.setContent(content2);
        let now = new Date();
        saveInfo.value = `\u6587\u7AE0${isAutoSave ? "\u81EA\u52A8" : ""}\u4FDD\u5B58\u4E8E${now.toLocaleTimeString()}`;
      } catch (error) {
        alert(error);
      }
    }
    async function saveTitle(title) {
      try {
        title = title ? title : " ";
        store.setTitle(title);
        emit("updateTitle", store.id, title);
        await chapterApi.updateChapterName({ id: store.id, title });
      } catch (error) {
        alert(error);
      }
    }
    const changeContentWordsCount = async () => {
      var _a;
      await nextTick();
      contentWordsCount.value = countWords((_a = contentEditor.value) == null ? void 0 : _a.innerText);
    };
    const { fnDebounced: saveContentDebounce, clearTime: preventAutoSave } = debounce(saveContent, 2e3);
    const clickExceptInput = (e) => {
      if (titleEditable.value && e.target != titleInput.value) {
        setUnTitleEditable();
        titleEdited.value = removeFLSpaces(titleEdited.value);
        saveTitle(titleEdited.value);
        e.stopPropagation();
        window.removeEventListener("click", clickExceptInput);
      }
    };
    const updateContentEditor = (str) => {
      content.value = str;
      contentEditor.value.innerHTML = str;
      changeContentWordsCount();
    };
    expose({
      changeContentWordsCount,
      contentEditor,
      updateContentEditor
    });
    onMounted(() => {
      var _a;
      contentWordsCount.value = countWords((_a = contentEditor.value) == null ? void 0 : _a.innerText);
    });
    onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("article", null, [
        createBaseVNode("div", {
          "w-full": "",
          onDblclick: setTitleEditable,
          text: "lg center",
          "font-bold": ""
        }, [
          withDirectives(createBaseVNode("input", {
            w: "full",
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => titleEdited.value = $event),
            border: "0 gray-500 b-2",
            outline: "none",
            bg: "transparent",
            text: "lg center",
            font: "bold sans",
            ref_key: "titleInput",
            ref: titleInput
          }, null, 512), [
            [vShow, titleEditable.value],
            [vModelText, titleEdited.value]
          ]),
          withDirectives(createBaseVNode("div", {
            "font-sans": "",
            border: "0 b-2 transparent",
            "whitespace-pre-wrap": ""
          }, toDisplayString(unref(store).title ? unref(store).title : " "), 513), [
            [vShow, !titleEditable.value]
          ])
        ], 32),
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", {
            class: normalizeClass(contentEditable.value ? "i-mdi:content-save" : "i-mdi:pen"),
            absolute: "",
            "top-3": "",
            "right-5": "",
            "btn-logo": "",
            text: "gray-600",
            onClick: changeContentEditable
          }, null, 2),
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("span", null, "\u672C\u7AE0\u5B57\u6570\uFF1A" + toDisplayString(contentWordsCount.value), 1),
            createBaseVNode("span", _hoisted_3$1, toDisplayString(saveInfo.value), 1)
          ]),
          createBaseVNode("div", {
            "min-h": "[68vh]",
            "w-full": "",
            "inline-block": "",
            "outline-none": "",
            contenteditable: contentEditable.value,
            text: "base",
            ref_key: "contentEditor",
            ref: contentEditor,
            onInput: _cache[1] || (_cache[1] = ($event) => {
              unref(saveContentDebounce)($event.target, true);
              changeContentWordsCount();
            }),
            onPaste: handlePaste
          }, toDisplayString(content.value), 41, _hoisted_4)
        ])
      ]);
    };
  }
});
var MyArticle = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "MyArticle.vue"]]);
var Menu_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = ["onClick"];
const _hoisted_2$1 = ["onClick"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    name: null,
    logo: null,
    menuItems: null,
    duration: { default: 0.5 },
    menuScrollIndex: null
  },
  emits: ["clickMe"],
  setup(__props, { emit }) {
    const props = __props;
    const menu = ref(null);
    const dialogVisible = ref(false);
    const wantToDelete = ref("");
    const openNewChapterDialog = inject("openNewChapterDialog");
    const deleteCatalogItem = inject("deleteCatalogItem");
    const showDeleteDialog = (id) => {
      dialogVisible.value = true;
      wantToDelete.value = id;
    };
    const isShowItems = ref(false);
    const expand = throttle(() => {
      if (props.menuItems) {
        isShowItems.value = !isShowItems.value;
        nextTick().then(() => {
          const index = props.menuItems.findIndex((menu2) => menu2.selected === true);
          menuScrollTo(index);
        });
      }
    }, props.duration * 1e3);
    const getbgColor = (menuItem) => {
      if (!menuItem.selected)
        return "hover:bg-blue-100/20";
      return "bg-blue-100/50 hover:bg-blue-100/50";
    };
    const select = (menuItem) => {
      var _a;
      (_a = props.menuItems) == null ? void 0 : _a.forEach((item) => item.selected = false);
      menuItem.selected = true;
    };
    const deleteChapter2 = async (id) => {
      dialogVisible.value = false;
      try {
        await chapterApi.deleteChapter({ id });
        if (deleteCatalogItem) {
          await deleteCatalogItem(id);
        }
      } catch (error) {
        alert(error);
      }
    };
    const menuScrollTo = (index) => {
      nextTick().then(function() {
        var _a;
        (_a = menu.value) == null ? void 0 : _a.scrollTo(0, index <= 3 ? 0 : (index - 3) * 32.7);
      });
    };
    watch(() => props.menuScrollIndex, (menuScrollIndex) => {
      menuScrollTo(menuScrollIndex);
    });
    return (_ctx, _cache) => {
      const _component_Dialog = __unplugin_components_1;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          "menu-item": "",
          onClick: _cache[0] || (_cache[0] = ($event) => {
            unref(expand)();
            emit("clickMe");
          }),
          class: normalizeClass({ "bg-blue-200/400": isShowItems.value, "hover:bg-blue-200/400": isShowItems.value }),
          "mb-1": ""
        }, [
          createBaseVNode("div", {
            class: normalizeClass(__props.logo),
            text: "base"
          }, null, 2),
          createTextVNode(" " + toDisplayString(__props.name), 1)
        ], 2),
        createVNode(Transition, {
          appear: "",
          name: "itemList"
        }, {
          default: withCtx(() => [
            isShowItems.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              style: normalizeStyle({ "transition-duration": __props.duration + "s" }),
              "max-h": "[38vh]",
              shadow: "sm gray-200",
              "rounded-lg": "",
              "box-border": "",
              "overflow-hidden": ""
            }, [
              createBaseVNode("div", {
                p: "l-4 r-2 y-2",
                text: "xs center",
                cursor: "pointer",
                "border-gray-100": "",
                border: "0 b-1",
                onClick: _cache[1] || (_cache[1] = (...args) => unref(openNewChapterDialog) && unref(openNewChapterDialog)(...args)),
                bg: "red-100/40 hover:red-100/70 active:red-100"
              }, " \u65B0\u5EFA\u7AE0\u8282 "),
              createBaseVNode("div", {
                "max-h": "[33vh]",
                "overflow-y-auto": "",
                class: "hideScrollbar",
                ref_key: "menu",
                ref: menu
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.menuItems, (item) => {
                  return openBlock(), createElementBlock("div", {
                    p: "l-4 r-2 y-2",
                    text: "xs",
                    cursor: "pointer",
                    "border-gray-100": "",
                    border: "0 b-1",
                    truncate: "",
                    relative: "",
                    key: item.id,
                    onClick: ($event) => {
                      item.clickMe();
                      select(item);
                    },
                    class: normalizeClass([getbgColor(item), "item"])
                  }, [
                    createTextVNode(toDisplayString(item.itemName) + " ", 1),
                    item.canDelete ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "delete",
                      hidden: "",
                      "btn-logo": "",
                      "i-mdi:trash-can-outline": "",
                      absolute: "",
                      right: "1",
                      top: "1/2",
                      "translate-y": "-1/2",
                      onClick: ($event) => showDeleteDialog(item.id)
                    }, null, 8, _hoisted_2$1)) : createCommentVNode("", true)
                  ], 10, _hoisted_1$1);
                }), 128))
              ], 512)
            ], 4)) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_Dialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialogVisible.value = $event),
          tips: "\u662F\u5426\u5220\u9664\u8BE5\u7AE0\u8282\uFF1F",
          onClickEnter: _cache[3] || (_cache[3] = ($event) => deleteChapter2(wantToDelete.value))
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
var Menu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-586428e5"], ["__file", "Menu.vue"]]);
var MyAside_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = {
  key: 0,
  "w-65": "",
  "h-screen": "",
  "rounded-r-3xl": "",
  "bg-white": "",
  fixed: "",
  "z-10": "",
  flex: "~ col gap-8",
  "items-center": ""
};
const _hoisted_2 = {
  "m-y-25": "",
  h: "[70vh]",
  "w-53": "",
  font: "sans semibold",
  text: "sm gray-600",
  flex: "~ col gap-3",
  "select-none": ""
};
const _hoisted_3 = {
  key: 0,
  h: "20",
  shadow: "lg blue-500/50",
  "bg-white": "",
  "rounded-r-xl": "",
  top: "[40vh]",
  flex: "",
  justify: "center",
  "items-center": "",
  fixed: ""
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    novelId: null,
    menuList: null,
    menuScrollIndex: null
  },
  emits: ["expand", "close"],
  setup(__props, { emit }) {
    const menuModal = ref(null);
    const isExpand = ref(false);
    const expand = () => {
      isExpand.value = true;
      emit("expand");
    };
    const close = () => {
      isExpand.value = false;
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", null, [
        createVNode(Transition, { name: "menu" }, {
          default: withCtx(() => [
            isExpand.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.menuList, (menu, index) => {
                  return openBlock(), createBlock(Menu, {
                    key: index,
                    name: menu.name,
                    logo: menu.logo,
                    menuScrollIndex: __props.menuScrollIndex,
                    "menu-items": menu.menuItems,
                    duration: menu.duration,
                    onClickMe: ($event) => menu.clickMe ? menu.clickMe() : null,
                    ref_for: true,
                    ref_key: "menuModal",
                    ref: menuModal
                  }, null, 8, ["name", "logo", "menuScrollIndex", "menu-items", "duration", "onClickMe"]);
                }), 128))
              ]),
              createBaseVNode("div", {
                "i-mdi:close": "",
                "btn-logo": "",
                absolute: "",
                "top-3": "",
                "right-3": "",
                text: "gray-600",
                onClick: close
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "expand" }, {
          default: withCtx(() => [
            !isExpand.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createBaseVNode("div", {
                btn: "",
                "i-mdi:menu": "",
                "px-2": "",
                onClick: expand
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
var MyAside = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0ca8fd82"], ["__file", "MyAside.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const modal = ref(null);
    const menuScrollIndex = ref(0);
    const w = ref("0");
    const route = useRoute();
    const router = useRouter();
    const novelName = ref(route.params.name);
    const store = useCurrentArticle();
    const novelId = ref(route.params.id);
    const chapters = ref();
    const MenuList = ref();
    const dialogVisible = ref(false);
    document.title = novelName.value;
    const setLoading = inject("setLoading");
    const loading = inject("loading");
    const createCatalogItem = (id, title, selected) => {
      return {
        id,
        itemName: title,
        selected,
        canDelete: true,
        clickMe: async function() {
          var _a, _b;
          if (this.selected)
            return;
          setLoading(true);
          try {
            let content = (await chapterApi.getChapterContent({ id: this.id })).result.content;
            store.updateChapter(this.id, this.itemName, content);
            (_a = modal.value) == null ? void 0 : _a.updateContentEditor(content);
            window.scrollTo(0, 0);
            await ((_b = modal.value) == null ? void 0 : _b.changeContentWordsCount());
          } catch (error) {
            alert(error);
          }
          setLoading(false);
        }
      };
    };
    const initData = async () => {
      var _a;
      try {
        setLoading(true);
        chapters.value = (await bookApi.getChapters({ id: novelId.value })).result.chapters;
        chapters.value.sort((a, b) => getOrder(a.title) - getOrder(b.title));
        if (chapters.value.length > 0) {
          let content = (await chapterApi.getChapterContent({ id: chapters.value[0].id })).result.content;
          store.updateChapter(chapters.value[0].id, chapters.value[0].title, content);
          (_a = modal.value) == null ? void 0 : _a.updateContentEditor(content);
        }
        setLoading(false);
        MenuList.value = [
          {
            name: "\u4E3B\u9875",
            logo: "i-ph:house",
            clickMe: () => {
              router.push("/home");
            }
          },
          {
            name: "\u76EE\u5F55",
            logo: "i-mdi:format-align-right",
            menuItems: chapters.value.map((chapter, index) => createCatalogItem(chapter.id, chapter.title, index === 0 ? true : false))
          },
          { name: "\u8BBE\u7F6E", logo: "i-ph:nut-bold" },
          { name: "\u5173\u4E8E", logo: "i-mdi:information-outline" }
        ];
      } catch (error) {
        setLoading(false);
        alert(error);
        router.push("/home");
      }
    };
    const updateCatalogItemTitle = (id, title) => {
      if (MenuList.value) {
        const menuItems = MenuList.value[1].menuItems;
        if (menuItems) {
          let index = menuItems.findIndex((item) => item.id === id);
          menuItems[index].itemName = title;
          menuItems.sort((a, b) => getOrder(a.itemName) - getOrder(b.itemName));
          index = menuItems.findIndex((item) => item.id === id);
          menuScrollIndex.value = index;
        }
      }
    };
    const addCatalogItem = (id, title) => {
      if (MenuList.value) {
        const menuItems = MenuList.value[1].menuItems;
        if (menuItems) {
          let index = menuItems.findIndex((item) => getOrder(item.itemName) > getOrder(title));
          if (index === -1)
            index = menuItems.length;
          menuItems.forEach((item) => item.selected = false);
          menuItems.splice(index, 0, createCatalogItem(id, title, true));
          menuScrollIndex.value = index;
        }
      }
    };
    const openNewChapterDialog = () => {
      dialogVisible.value = true;
    };
    const deleteCatalogItem = async (id) => {
      var _a, _b, _c;
      if (MenuList.value) {
        const menuItems = MenuList.value[1].menuItems;
        if (menuItems) {
          let index = menuItems.findIndex((item2) => item2.id === id);
          menuItems.splice(index, 1);
          if (menuItems.length === 0) {
            store.updateChapter("", "", "");
            (_a = modal.value) == null ? void 0 : _a.updateContentEditor("");
            return;
          } else if (index === menuItems.length) {
            index--;
          }
          const item = menuItems[index];
          setLoading(true);
          let content = (await chapterApi.getChapterContent({ id: item.id })).result.content;
          setLoading(false);
          menuItems.forEach((item2) => item2.selected = false);
          item.selected = true;
          store.updateChapter(item.id, item.itemName, content);
          (_b = modal.value) == null ? void 0 : _b.updateContentEditor(content);
          window.scrollTo(0, 0);
          await ((_c = modal.value) == null ? void 0 : _c.changeContentWordsCount());
        }
      }
    };
    const newChapter = async (name) => {
      var _a, _b;
      try {
        setLoading(true);
        name = removeFLSpaces(name);
        const chapterId = (await chapterApi.create({ bookId: novelId.value, chapterName: name })).result.id;
        setLoading(false);
        addCatalogItem(chapterId, name);
        store.updateChapter(chapterId, name, "");
        window.scrollTo(0, 0);
        await ((_a = modal.value) == null ? void 0 : _a.changeContentWordsCount());
        (_b = modal.value) == null ? void 0 : _b.updateContentEditor("");
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    provide("openNewChapterDialog", openNewChapterDialog);
    provide("deleteCatalogItem", deleteCatalogItem);
    const addWidth = () => {
      w.value = 16.25 + "rem";
    };
    const reduceWidth = () => {
      w.value = "0";
    };
    onMounted(() => {
      initData();
    });
    return (_ctx, _cache) => {
      var _a, _b;
      const _component_blank_article = __unplugin_components_0;
      const _component_input_dialog = __unplugin_components_0$1;
      return openBlock(), createElementBlock("div", {
        bg: "light-600",
        "min-h": "full",
        flex: "",
        class: normalizeClass(unref(loading) ? "blur-sm" : "")
      }, [
        createVNode(MyAside, {
          onExpand: addWidth,
          onClose: reduceWidth,
          novelId: novelId.value,
          menuList: MenuList.value,
          menuScrollIndex: menuScrollIndex.value,
          "z-10": ""
        }, null, 8, ["novelId", "menuList", "menuScrollIndex"]),
        createBaseVNode("div", {
          style: normalizeStyle({ width: w.value }),
          "min-h": "full",
          "duration-500": "",
          "ease-in-out": ""
        }, null, 4),
        (MenuList.value ? (_b = (_a = MenuList.value[1]) == null ? void 0 : _a.menuItems) == null ? void 0 : _b.length : false) ? (openBlock(), createBlock(MyArticle, {
          key: 0,
          "md:my-8": "",
          "md:mx-16": "",
          "my-4": "",
          "mx-1": "",
          flex: "1",
          ref_key: "modal",
          ref: modal,
          onUpdateTitle: updateCatalogItemTitle
        }, null, 512)) : (openBlock(), createBlock(_component_blank_article, {
          key: 1,
          my: "[10vh]",
          "mx-16": "",
          flex: "1"
        })),
        createVNode(_component_input_dialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
          onClickEnter: newChapter,
          title: "\u65B0\u5EFA\u7AE0\u8282",
          placeholder: "\u8BF7\u8F93\u5165\u65B0\u7AE0\u8282\u540D"
        }, null, 8, ["modelValue"])
      ], 2);
    };
  }
});
var Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "Edit.vue"]]);
export { Edit as default };
