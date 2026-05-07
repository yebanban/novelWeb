import { _ as _export_sfc, d as defineComponent, r as ref, E as ElInput, C as ElButton, D as ElDialog, o as openBlock, y as createBlock, p as withCtx, a as createBaseVNode, m as createVNode, l as createTextVNode, h as http, t as toDisplayString } from "./index.e963b1f1.js";
var base = "";
var elDialog = "";
var elOverlay = "";
var elButton = "";
var elInput = "";
const _hoisted_1$1 = { class: "dialog-footer" };
const _hoisted_2$1 = /* @__PURE__ */ createTextVNode("\u53D6\u6D88");
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode(" \u786E\u5B9A ");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: { type: Boolean },
    title: null,
    placeholder: null
  },
  emits: ["update:modelValue", "clickEnter"],
  setup(__props, { emit }) {
    const input = ref("");
    const enter = () => {
      emit("clickEnter", input.value);
      emit("update:modelValue", false);
      window.removeEventListener("keydown", keydownEnter);
      input.value = "";
    };
    const keydownEnter = (e) => {
      if (/^\s*$/.test(input.value))
        return;
      var e = e || window.event;
      var key = e.code;
      if (key == "NumpadEnter" || key == "Enter") {
        enter();
      }
    };
    const addEnterEventListener = () => {
      window.addEventListener("keydown", keydownEnter);
    };
    const clearInput = () => {
      input.value = "";
      window.removeEventListener("keydown", keydownEnter);
      emit("update:modelValue", false);
    };
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: __props.modelValue,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = (newValue) => emit("update:modelValue", newValue)),
        "destroy-on-close": "",
        onOpen: addEnterEventListener,
        "before-close": clearInput,
        title: __props.title,
        width: "50%",
        draggable: ""
      }, {
        footer: withCtx(() => [
          createBaseVNode("span", _hoisted_1$1, [
            createVNode(_component_el_button, { onClick: clearInput }, {
              default: withCtx(() => [
                _hoisted_2$1
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              type: "primary",
              disabled: /^\s*$/.test(input.value) ? true : false,
              onClick: enter
            }, {
              default: withCtx(() => [
                _hoisted_3$1
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ]),
        default: withCtx(() => [
          createVNode(_component_el_input, {
            modelValue: input.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
            placeholder: __props.placeholder
          }, null, 8, ["modelValue", "placeholder"])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
var __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "InputDialog.vue"]]);
function create(data) {
  return http.request({ url: `newBook`, method: "post", data });
}
function getAllBook() {
  return http.request({ url: `getbooks` });
}
function getChapters(data) {
  return http.request({ url: `getChapters?id=${data.id}` });
}
function updateBookName(data) {
  return http.request({ url: `updateBookName`, method: "post", data });
}
function deleteBook(data) {
  return http.request({ url: `deleteBook`, method: "post", data });
}
var bookApi = { create, getAllBook, getChapters, updateBookName, deleteBook };
const removeFLSpaces = (s) => {
  return s.replace(/^\s*(.+?)\s*$/, `$1`);
};
const countWords = (words) => {
  words = removeFLSpaces(words);
  let wordArray = words.split(/[\s\n]+/);
  let count = 0;
  for (let word of wordArray) {
    word = word.replace(/[\x00-\xff]+/g, "m");
    count += word.length;
  }
  return count;
};
const getOrder = (title) => {
  let regArray = /(?<=第)\d+(?=章)/.exec(title);
  return regArray ? +regArray[0] : -1;
};
const getScroll = () => {
  return {
    scrollY: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    scrollX: document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
  };
};
const throttle = (fn, delay) => {
  let isRun = false;
  const throttleFn = function(...args) {
    if (isRun)
      return;
    isRun = true;
    setTimeout(() => {
      isRun = false;
    }, delay);
    fn.apply(args);
  };
  return throttleFn;
};
const debounce = (fn, delay) => {
  let timer = null;
  return {
    fnDebounced: function(...args) {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    },
    clearTime: function() {
      if (timer)
        clearTimeout(timer);
    }
  };
};
const _hoisted_1 = { class: "dialog-footer" };
const _hoisted_2 = /* @__PURE__ */ createTextVNode("\u53D6\u6D88");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("\u786E\u5B9A");
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: { type: Boolean },
    tips: null
  },
  emits: ["update:modelValue", "clickEnter"],
  setup(__props, { emit }) {
    const enter = () => {
      emit("clickEnter");
      emit("update:modelValue", false);
      removeEnterEventListener();
    };
    const keydownEnter = (e) => {
      var e = e || window.event;
      var key = e.code;
      if (key == "NumpadEnter" || key == "Enter") {
        enter();
      }
    };
    const addEnterEventListener = () => {
      window.addEventListener("keydown", keydownEnter);
    };
    const removeEnterEventListener = () => {
      emit("update:modelValue", false);
      window.removeEventListener("keydown", keydownEnter);
    };
    return (_ctx, _cache) => {
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: __props.modelValue,
        "destroy-on-close": "",
        onOpen: addEnterEventListener,
        "before-close": removeEnterEventListener,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (newValue) => emit("update:modelValue", newValue)),
        title: "\u63D0\u793A",
        width: "50%",
        draggable: ""
      }, {
        footer: withCtx(() => [
          createBaseVNode("span", _hoisted_1, [
            createVNode(_component_el_button, { onClick: removeEnterEventListener }, {
              default: withCtx(() => [
                _hoisted_2
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              type: "primary",
              onClick: enter
            }, {
              default: withCtx(() => [
                _hoisted_3
              ]),
              _: 1
            })
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("span", null, toDisplayString(__props.tips), 1)
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
var __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "Dialog.vue"]]);
export { __unplugin_components_1 as _, __unplugin_components_0 as a, bookApi as b, countWords as c, debounce as d, getScroll as e, getOrder as g, removeFLSpaces as r, throttle as t };
