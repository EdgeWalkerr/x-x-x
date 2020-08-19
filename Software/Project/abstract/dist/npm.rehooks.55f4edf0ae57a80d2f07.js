(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.rehooks"],{

/***/ "L0xn":
/*!*************************************************************************!*\
  !*** ./node_modules/@rehooks/local-storage/lib/local-storage-events.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Used for creating new events for LocalStorage. This enables us to\n * have the ability of updating the LocalStorage from outside of the component,\n * but still update the component without prop drilling or creating a dependency\n * on a large library such as Redux.\n *\n * @class LocalStorageChanged\n * @extends {CustomEvent<KVP<string, string>>}\n */\nclass LocalStorageChanged extends CustomEvent {\n    constructor(payload) {\n        super(LocalStorageChanged.eventName, { detail: payload });\n    }\n}\nLocalStorageChanged.eventName = 'onLocalStorageChange';\nexports.LocalStorageChanged = LocalStorageChanged;\n/**\n * Checks if the event that is passed in is the same type as LocalStorageChanged.\n *\n * @export\n * @template TValue\n * @param {*} evt the object you wish to assert as a LocalStorageChanged event.\n * @returns {evt is LocalStorageChanged<TValue>} if true, evt is asserted to be LocalStorageChanged.\n */\nfunction isTypeOfLocalStorageChanged(evt) {\n    return (!!evt) && (evt instanceof LocalStorageChanged || (evt.detail && evt.type === LocalStorageChanged.eventName));\n}\nexports.isTypeOfLocalStorageChanged = isTypeOfLocalStorageChanged;\n/**\n * Use this instead of directly using localStorage.setItem\n * in order to correctly send events within the same window.\n *\n * @example\n * ```js\n * writeStorage('hello', JSON.stringify({ name: 'world' }));\n * const { name } = JSON.parse(localStorage.getItem('hello'));\n * ```\n *\n * @export\n * @param {string} key The key to write to in the localStorage.\n * @param {string} value The value to write to in the localStorage.\n */\nfunction writeStorage(key, value) {\n    try {\n        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : `${value}`);\n        window.dispatchEvent(new LocalStorageChanged({ key, value }));\n    }\n    catch (err) {\n        if (err instanceof TypeError && err.message.includes('circular structure')) {\n            throw new TypeError('The object that was given to the writeStorage function has circular references.\\n' +\n                'For more information, check here: ' +\n                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value');\n        }\n        throw err;\n    }\n}\nexports.writeStorage = writeStorage;\n/**\n * Use this function to delete a value from localStorage.\n *\n * @example\n * ```js\n * const user = { name: 'John', email: 'John@fakemail.com' };\n *\n * // Add a user to your localStorage\n * writeStorage('user', JSON.stringify(user));\n *\n * // This will also trigger an update to the state of your component\n * deleteFromStorage('user');\n * ```\n *\n * @export\n * @param {string} key The key of the item you wish to delete from localStorage.\n */\nfunction deleteFromStorage(key) {\n    localStorage.removeItem(key);\n    window.dispatchEvent(new LocalStorageChanged({ key, value: '' }));\n}\nexports.deleteFromStorage = deleteFromStorage;\n//# sourceMappingURL=local-storage-events.js.map\n\n//# sourceURL=webpack:///./node_modules/@rehooks/local-storage/lib/local-storage-events.js?");

/***/ }),

/***/ "NRRR":
/*!**********************************************************!*\
  !*** ./node_modules/@rehooks/local-storage/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst use_localstorage_1 = __webpack_require__(/*! ./use-localstorage */ \"v5dc\");\nexports.useLocalStorage = use_localstorage_1.useLocalStorage;\nvar local_storage_events_1 = __webpack_require__(/*! ./local-storage-events */ \"L0xn\");\nexports.writeStorage = local_storage_events_1.writeStorage;\nexports.deleteFromStorage = local_storage_events_1.deleteFromStorage;\nexports.default = use_localstorage_1.useLocalStorage;\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./node_modules/@rehooks/local-storage/lib/index.js?");

/***/ }),

/***/ "v5dc":
/*!*********************************************************************!*\
  !*** ./node_modules/@rehooks/local-storage/lib/use-localstorage.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst local_storage_events_1 = __webpack_require__(/*! ./local-storage-events */ \"L0xn\");\nconst react_1 = __webpack_require__(/*! react */ \"q1tI\");\nfunction tryParse(value) {\n    try {\n        return JSON.parse(value);\n    }\n    catch (_a) {\n        return value;\n    }\n}\nfunction useLocalStorage(key, initialValue) {\n    const [localState, updateLocalState] = react_1.useState(localStorage.getItem(key) === null ? initialValue : tryParse(localStorage.getItem(key)));\n    const onLocalStorageChange = (event) => {\n        if (local_storage_events_1.isTypeOfLocalStorageChanged(event)) {\n            if (event.detail.key === key) {\n                updateLocalState(event.detail.value);\n            }\n        }\n        else {\n            if (event.key === key) {\n                if (event.newValue) {\n                    updateLocalState(tryParse(event.newValue));\n                }\n            }\n        }\n    };\n    // when the key changes, update localState to reflect it.\n    react_1.useEffect(() => {\n        updateLocalState(localStorage.getItem(key) === null ? initialValue : tryParse(localStorage.getItem(key)));\n    }, [key]);\n    react_1.useEffect(() => {\n        // The custom storage event allows us to update our component\n        // when a change occurs in localStorage outside of our component\n        const listener = (e) => onLocalStorageChange(e);\n        window.addEventListener(local_storage_events_1.LocalStorageChanged.eventName, listener);\n        // The storage event only works in the context of other documents (eg. other browser tabs)\n        window.addEventListener('storage', listener);\n        const canWrite = localStorage.getItem(key) === null;\n        // Write initial value to the local storage if it's not present or contains invalid JSON data.\n        if (initialValue !== undefined && canWrite) {\n            local_storage_events_1.writeStorage(key, initialValue);\n        }\n        return () => {\n            window.removeEventListener(local_storage_events_1.LocalStorageChanged.eventName, listener);\n            window.removeEventListener('storage', listener);\n        };\n    }, [key]);\n    const writeState = react_1.useCallback((value) => local_storage_events_1.writeStorage(key, value), [key]);\n    const deleteState = react_1.useCallback(() => local_storage_events_1.deleteFromStorage(key), [key]);\n    return [localState === null ? initialValue : localState, writeState, deleteState];\n}\nexports.useLocalStorage = useLocalStorage;\n//# sourceMappingURL=use-localstorage.js.map\n\n//# sourceURL=webpack:///./node_modules/@rehooks/local-storage/lib/use-localstorage.js?");

/***/ })

}]);