/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper/checkImgImage.ts":
/*!*************************************!*\
  !*** ./src/helper/checkImgImage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.checkImgImage = void 0;
var PathNewLogoEnum_1 = __webpack_require__(/*! ../utils/PathNewLogoEnum */ "./src/utils/PathNewLogoEnum.ts");
var createImage_1 = __webpack_require__(/*! ./createImage */ "./src/helper/createImage.ts");
var uploadToLocalStorage_1 = __webpack_require__(/*! ./uploadToLocalStorage */ "./src/helper/uploadToLocalStorage.ts");
function checkImgImage(path_runtime) {
    var images_medium = document.querySelectorAll("img");
    if (images_medium.length > 0) {
        var images_mediumArr = Array.from(images_medium);
        // *Перевіряємо на співпадіння з перемінною const imgPathEnds і imgPath1
        var filtered_images_mediumArr = images_mediumArr.filter(function (it) {
            if (it.src.endsWith(PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_1))
                return it;
            if (it.src.endsWith(PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_4))
                return it;
            if (it.src === PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_2)
                return it;
            if (it.src === PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_3)
                return it;
            return false;
        });
        if (filtered_images_mediumArr.length > 0) {
            filtered_images_mediumArr.forEach(function (imageElem) {
                if (!imageElem.parentNode)
                    return;
                var images_medium__img = (0, createImage_1.createImage)(path_runtime, imageElem);
                if (imageElem.src === PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_2 ||
                    imageElem.src === PathNewLogoEnum_1.PathNewLogoEnum.IMG_PATH_3) {
                    images_medium__img.classList.add("medium-bg-white");
                }
                imageElem.parentNode.replaceChild(images_medium__img, imageElem);
            });
            (0, uploadToLocalStorage_1.uploadToLocalStorage)(path_runtime);
            return;
        }
    }
}
exports.checkImgImage = checkImgImage;


/***/ }),

/***/ "./src/helper/checkOurImg.ts":
/*!***********************************!*\
  !*** ./src/helper/checkOurImg.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.checkOurImg = void 0;
var createImage_1 = __webpack_require__(/*! ./createImage */ "./src/helper/createImage.ts");
var uploadToLocalStorage_1 = __webpack_require__(/*! ./uploadToLocalStorage */ "./src/helper/uploadToLocalStorage.ts");
function checkOurImg(path_runtime) {
    var images_prev = document.querySelectorAll(".old-image");
    if (images_prev.length > 0) {
        images_prev.forEach(function (elem) {
            if (elem.src === path_runtime)
                return;
            if (!elem)
                return;
            if (!elem.parentNode)
                return;
            var srcElemArr = elem.src.split("/");
            var patElem = srcElemArr[srcElemArr.length - 1];
            if (path_runtime.includes(patElem))
                return;
            var newImg = (0, createImage_1.createImage)(path_runtime, elem);
            elem.parentNode.replaceChild(newImg, elem);
        });
        (0, uploadToLocalStorage_1.uploadToLocalStorage)(path_runtime);
    }
}
exports.checkOurImg = checkOurImg;


/***/ }),

/***/ "./src/helper/checkSvgImage.ts":
/*!*************************************!*\
  !*** ./src/helper/checkSvgImage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.checkSvgImage = void 0;
var PathNewLogoEnum_1 = __webpack_require__(/*! ../utils/PathNewLogoEnum */ "./src/utils/PathNewLogoEnum.ts");
var createImage_1 = __webpack_require__(/*! ./createImage */ "./src/helper/createImage.ts");
var recursiveSeekSvg_1 = __webpack_require__(/*! ./recursiveSeekSvg */ "./src/helper/recursiveSeekSvg.ts");
var uploadToLocalStorage_1 = __webpack_require__(/*! ./uploadToLocalStorage */ "./src/helper/uploadToLocalStorage.ts");
function checkSvgImage(path_runtime) {
    var paths = document.querySelectorAll("path");
    if (paths.length > 0) {
        var arr = Array.from(paths);
        var filter = arr.filter(function (it) {
            console.log(it, "item");
            if (it.getAttribute("d").includes(PathNewLogoEnum_1.PathNewLogoEnum.LOGO_PATH_1) ||
                it.getAttribute("d").includes(PathNewLogoEnum_1.PathNewLogoEnum.LOGO_PATH_2)) {
                return true;
            }
            return false;
        });
        if (filter.length > 0) {
            filter.forEach(function (elem) {
                var recursiveSvg = (0, recursiveSeekSvg_1.recursiveSeekSvg)(elem);
                var img = (0, createImage_1.createImage)(path_runtime, recursiveSvg);
                recursiveSvg.parentNode.replaceChild(img, recursiveSvg);
            });
            (0, uploadToLocalStorage_1.uploadToLocalStorage)(path_runtime);
        }
    }
}
exports.checkSvgImage = checkSvgImage;


/***/ }),

/***/ "./src/helper/createImage.ts":
/*!***********************************!*\
  !*** ./src/helper/createImage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.createImage = void 0;
function createImage(path_runtime, prevImage) {
    var converted_path = path_runtime;
    if (!path_runtime.startsWith("chrome-extension")) {
        converted_path = chrome.runtime.getURL(path_runtime);
    }
    var newImg = document.createElement("img");
    newImg.src = converted_path;
    var prevValueSize = parseInt(getComputedStyle(prevImage).height);
    if (prevImage.classList.contains("old-image")) {
        if (prevImage.classList.contains("medium-bg-white")) {
            newImg.classList.add("medium-bg-white");
        }
        newImg.style.height = prevValueSize + "px";
        newImg.style.width = prevValueSize + "px";
    }
    else {
        newImg.style.height = prevValueSize + 5 + "px";
        newImg.style.width = prevValueSize + 5 + "px";
    }
    newImg.classList.add("old-image");
    return newImg;
}
exports.createImage = createImage;


/***/ }),

/***/ "./src/helper/getFromLocalStorage.ts":
/*!*******************************************!*\
  !*** ./src/helper/getFromLocalStorage.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.getFromLocalStorage = void 0;
var StorageKeysEnum_1 = __webpack_require__(/*! ../utils/StorageKeysEnum */ "./src/utils/StorageKeysEnum.ts");
var replaceLogo_1 = __webpack_require__(/*! ./replaceLogo */ "./src/helper/replaceLogo.ts");
function getFromLocalStorage() {
    chrome.storage.local.get([StorageKeysEnum_1.StorageKeysEnum.LOGO_KEY], function (result) {
        if (result[StorageKeysEnum_1.StorageKeysEnum.LOGO_KEY]) {
            (0, replaceLogo_1.replaceLogo)(result[StorageKeysEnum_1.StorageKeysEnum.LOGO_KEY]);
        }
    });
}
exports.getFromLocalStorage = getFromLocalStorage;


/***/ }),

/***/ "./src/helper/recursiveSeekSvg.ts":
/*!****************************************!*\
  !*** ./src/helper/recursiveSeekSvg.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.recursiveSeekSvg = void 0;
function recursiveSeekSvg(pathElem) {
    if (pathElem.tagName === "svg" || pathElem.tagName === "div") {
        return pathElem;
    }
    return recursiveSeekSvg(pathElem.parentNode);
}
exports.recursiveSeekSvg = recursiveSeekSvg;


/***/ }),

/***/ "./src/helper/replaceLogo.ts":
/*!***********************************!*\
  !*** ./src/helper/replaceLogo.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.replaceLogo = void 0;
var checkImgImage_1 = __webpack_require__(/*! ./checkImgImage */ "./src/helper/checkImgImage.ts");
var checkOurImg_1 = __webpack_require__(/*! ./checkOurImg */ "./src/helper/checkOurImg.ts");
var checkSvgImage_1 = __webpack_require__(/*! ./checkSvgImage */ "./src/helper/checkSvgImage.ts");
var getFromLocalStorage_1 = __webpack_require__(/*! ./getFromLocalStorage */ "./src/helper/getFromLocalStorage.ts");
function replaceLogo(path_runtime) {
    //!Перевіряємо ми чи є у нас вже встановлена картинка і як є міняємо її.
    (0, checkOurImg_1.checkOurImg)(path_runtime);
    // !Перевіряємо тепер svg картинку і її path
    (0, checkSvgImage_1.checkSvgImage)(path_runtime);
    // !Перевіряємо image
    (0, checkImgImage_1.checkImgImage)(path_runtime);
    setTimeout(function () {
        (0, getFromLocalStorage_1.getFromLocalStorage)();
    }, 2000);
}
exports.replaceLogo = replaceLogo;


/***/ }),

/***/ "./src/helper/uploadToLocalStorage.ts":
/*!********************************************!*\
  !*** ./src/helper/uploadToLocalStorage.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.uploadToLocalStorage = void 0;
var StorageKeysEnum_1 = __webpack_require__(/*! ../utils/StorageKeysEnum */ "./src/utils/StorageKeysEnum.ts");
function uploadToLocalStorage(path) {
    var _a;
    chrome.storage.local.set((_a = {}, _a[StorageKeysEnum_1.StorageKeysEnum.LOGO_KEY] = path, _a));
}
exports.uploadToLocalStorage = uploadToLocalStorage;


/***/ }),

/***/ "./src/utils/PathNewLogoEnum.ts":
/*!**************************************!*\
  !*** ./src/utils/PathNewLogoEnum.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.PathNewLogoEnum = void 0;
var PathNewLogoEnum;
(function (PathNewLogoEnum) {
    PathNewLogoEnum["LOGO_PATH_1"] = "M594.79 308.2c0 163.76-131.85 296.52-294.5 296.52S5.8 472 5.8 308.2 137.65 11.69 300.29 11.69s294.5 132.75 294.5 296.51";
    PathNewLogoEnum["LOGO_PATH_2"] = "M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 ";
    PathNewLogoEnum["IMG_PATH_1"] = "//theme.zdassets.com/theme_assets/224203/4a55138e21ad44a9c72c8295181c79fe938a2ae6.svg";
    PathNewLogoEnum["IMG_PATH_2"] = "https://miro.medium.com/fit/c/96/96/1*sHhtYhaCe2Uc3IU0IgKwIQ.png";
    PathNewLogoEnum["IMG_PATH_3"] = "https://miro.medium.com/fit/c/176/176/1*sHhtYhaCe2Uc3IU0IgKwIQ.png";
    PathNewLogoEnum["IMG_PATH_4"] = "Medium-Logo-Black-RGB-1.svg";
})(PathNewLogoEnum = exports.PathNewLogoEnum || (exports.PathNewLogoEnum = {}));
// endPath1 M917.86 308.2c0 154.16-65.93 279.12-147.25 279.12s-147.25-125-147.25-279.12S689.29 29.08 770.61 29.08s147.25 125 147.25 279.12M1050 308.2c0 138.12-23.19 250.08-51.79 250.08s-51.79-112-51.79-250.08 23.19-250.08 51.8-250.08S1050 170.09 1050 308.2M1862.77 37.4l.82-.18v-6.35h-167.48l-155.51 365.5-155.51-365.5h-180.48v6.35l.81.18c30.57 6.9 46.09 17.19 46.09 54.3v434.45c0 37.11-15.58 47.4-46.15 54.3l-.81.18V587H1327v-6.35l-.81-.18c-30.57-6.9-46.09-17.19-46.09-54.3V116.9L1479.87 587h11.33l205.59-483.21V536.9c-2.62 29.31-18 38.36-45.68 44.61l-.82.19v6.3h213.3v-6.3l-.82-.19c-27.71-6.25-43.46-15.3-46.08-44.61l-.14-445.2h.14c0-37.11 15.52-47.4 46.08-54.3m97.43 287.8c3.49-78.06 31.52-134.4 78.56-135.37 14.51.24 26.68 5 36.14 14.16 20.1 19.51 29.55 60.28 28.09 121.21zm-2.11 22h250v-1.05c-.71-59.69-18-106.12-51.34-138-28.82-27.55-71.49-42.71-116.31-42.71h-1c-23.26 0-51.79 5.64-72.09 15.86-23.11 10.7-43.49 26.7-60.45 47.7-27.3 33.83-43.84 79.55-47.86 130.93-.13 1.54-.24 3.08-.35 4.62s-.18 2.92-.25 4.39a332.64 332.64 0 0 0-.36 21.69C1860.79 507 1923.65 600 2035.3 600c98 0 155.07-71.64 169.3-167.8l-7.19-2.53c-25 51.68-69.9 83-121 79.18-69.76-5.22-123.2-75.95-118.35-161.63m532.69 157.68c-8.2 19.45-25.31 30.15-48.24 30.15s-43.89-15.74-58.78-44.34c-16-30.7-24.42-74.1-24.42-125.51 0-107 33.28-176.21 84.79-176.21 21.57 0 38.55 10.7 46.65 29.37zm165.84 76.28c-30.57-7.23-46.09-18-46.09-57V5.28L2424.77 60v6.7l1.14-.09c25.62-2.07 43 1.47 53.09 10.79 7.9 7.3 11.75 18.5 11.75 34.26v71.14c-18.31-11.69-40.09-17.38-66.52-17.38-53.6 0-102.59 22.57-137.92 63.56-36.83 42.72-56.3 101.1-56.3 168.81C2230 518.72 2289.53 600 2378.13 600c51.83 0 93.53-28.4 112.62-76.3V588h166.65v-6.66zm159.29-505.33c0-37.76-28.47-66.24-66.24-66.24-37.59 0-67 29.1-67 66.24s29.44 66.24 67 66.24c37.77 0 66.24-28.48 66.24-66.24m43.84 505.33c-30.57-7.23-46.09-18-46.09-57h-.13V166.65l-166.66 47.85v6.5l1 .09c36.06 3.21 45.93 15.63 45.93 57.77V588h166.8v-6.66zm427.05 0c-30.57-7.23-46.09-18-46.09-57V166.65L3082 212.92v6.52l.94.1c29.48 3.1 38 16.23 38 58.56v226c-9.83 19.45-28.27 31-50.61 31.78-36.23 0-56.18-24.47-56.18-68.9V166.66l-166.66 47.85V221l1 .09c36.06 3.2 45.94 15.62 45.94 57.77v191.27a214.48 214.48 0 0 0 3.47 39.82l3 13.05c14.11 50.56 51.08 77 109 77 49.06 0 92.06-30.37 111-77.89v66h166.66v-6.66zM3934.2 588v-6.67l-.81-.19c-33.17-7.65-46.09-22.07-46.09-51.43v-243.2c0-75.83-42.59-121.09-113.93-121.09-52 0-95.85 30.05-112.73 76.86-13.41-49.6-52-76.86-109.06-76.86-50.12 0-89.4 26.45-106.25 71.13v-69.87l-166.66 45.89v6.54l1 .09c35.63 3.16 45.93 15.94 45.93 57V588h155.5v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66V255.72c7-16.35 21.11-35.72 49-35.72 34.64 0 52.2 24 52.2 71.28V588h155.54v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66v-248a160.45 160.45 0 0 0-2.2-27.68c7.42-17.77 22.34-38.8 51.37-38.8 35.13 0 52.2 23.31 52.2 71.28V588z",


/***/ }),

/***/ "./src/utils/StorageKeysEnum.ts":
/*!**************************************!*\
  !*** ./src/utils/StorageKeysEnum.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.StorageKeysEnum = void 0;
var StorageKeysEnum;
(function (StorageKeysEnum) {
    StorageKeysEnum["LOGO_KEY"] = "medium_ext_logo";
})(StorageKeysEnum = exports.StorageKeysEnum || (exports.StorageKeysEnum = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./src/foreground/foreground.ts ***!
  \**************************************/

exports.__esModule = true;
var getFromLocalStorage_1 = __webpack_require__(/*! ../helper/getFromLocalStorage */ "./src/helper/getFromLocalStorage.ts");
var replaceLogo_1 = __webpack_require__(/*! ../helper/replaceLogo */ "./src/helper/replaceLogo.ts");
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        (0, getFromLocalStorage_1.getFromLocalStorage)();
    }
};
// *Тут ми звязуємось з content скриптом і слухаємо чи є нам якісь повідомлення------------------------------------------------------
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.reason == "change_logo") {
        console.log(request.path, "path message");
        (0, replaceLogo_1.replaceLogo)(request.path);
        sendResponse(true);
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLDZCQUFXLEVBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQjtBQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVkaXVtbG9nb2V4dGVuc2lvbi8uL3NyYy9oZWxwZXIvY2hlY2tJbWdJbWFnZS50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL2hlbHBlci9jaGVja091ckltZy50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL2hlbHBlci9jaGVja1N2Z0ltYWdlLnRzIiwid2VicGFjazovL21lZGl1bWxvZ29leHRlbnNpb24vLi9zcmMvaGVscGVyL2NyZWF0ZUltYWdlLnRzIiwid2VicGFjazovL21lZGl1bWxvZ29leHRlbnNpb24vLi9zcmMvaGVscGVyL2dldEZyb21Mb2NhbFN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vbWVkaXVtbG9nb2V4dGVuc2lvbi8uL3NyYy9oZWxwZXIvcmVjdXJzaXZlU2Vla1N2Zy50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL2hlbHBlci9yZXBsYWNlTG9nby50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL2hlbHBlci91cGxvYWRUb0xvY2FsU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL1BhdGhOZXdMb2dvRW51bS50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL1N0b3JhZ2VLZXlzRW51bS50cyIsIndlYnBhY2s6Ly9tZWRpdW1sb2dvZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lZGl1bWxvZ29leHRlbnNpb24vLi9zcmMvZm9yZWdyb3VuZC9mb3JlZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhdGhOZXdMb2dvRW51bSB9IGZyb20gXCIuLi91dGlscy9QYXRoTmV3TG9nb0VudW1cIjtcbmltcG9ydCB7IGNyZWF0ZUltYWdlIH0gZnJvbSBcIi4vY3JlYXRlSW1hZ2VcIjtcbmltcG9ydCB7IHVwbG9hZFRvTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vdXBsb2FkVG9Mb2NhbFN0b3JhZ2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSW1nSW1hZ2UocGF0aF9ydW50aW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgaW1hZ2VzX21lZGl1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIik7XG4gIGlmIChpbWFnZXNfbWVkaXVtLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBpbWFnZXNfbWVkaXVtQXJyID0gQXJyYXkuZnJvbShpbWFnZXNfbWVkaXVtKTtcbiAgICAvLyAq0J/QtdGA0LXQstGW0YDRj9GU0LzQviDQvdCwINGB0L/RltCy0L/QsNC00ZbQvdC90Y8g0Lcg0L/QtdGA0LXQvNGW0L3QvdC+0Y4gY29uc3QgaW1nUGF0aEVuZHMg0ZYgaW1nUGF0aDFcbiAgICBjb25zdCBmaWx0ZXJlZF9pbWFnZXNfbWVkaXVtQXJyID0gaW1hZ2VzX21lZGl1bUFyci5maWx0ZXIoKGl0KSA9PiB7XG4gICAgICBpZiAoaXQuc3JjLmVuZHNXaXRoKFBhdGhOZXdMb2dvRW51bS5JTUdfUEFUSF8xKSkgcmV0dXJuIGl0O1xuICAgICAgaWYgKGl0LnNyYy5lbmRzV2l0aChQYXRoTmV3TG9nb0VudW0uSU1HX1BBVEhfNCkpIHJldHVybiBpdDtcbiAgICAgIGlmIChpdC5zcmMgPT09IFBhdGhOZXdMb2dvRW51bS5JTUdfUEFUSF8yKSByZXR1cm4gaXQ7XG4gICAgICBpZiAoaXQuc3JjID09PSBQYXRoTmV3TG9nb0VudW0uSU1HX1BBVEhfMykgcmV0dXJuIGl0O1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIGlmIChmaWx0ZXJlZF9pbWFnZXNfbWVkaXVtQXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGZpbHRlcmVkX2ltYWdlc19tZWRpdW1BcnIuZm9yRWFjaCgoaW1hZ2VFbGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFpbWFnZUVsZW0ucGFyZW50Tm9kZSkgcmV0dXJuO1xuICAgICAgICBsZXQgaW1hZ2VzX21lZGl1bV9faW1nID0gY3JlYXRlSW1hZ2UocGF0aF9ydW50aW1lLCBpbWFnZUVsZW0pO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaW1hZ2VFbGVtLnNyYyA9PT0gUGF0aE5ld0xvZ29FbnVtLklNR19QQVRIXzIgfHxcbiAgICAgICAgICBpbWFnZUVsZW0uc3JjID09PSBQYXRoTmV3TG9nb0VudW0uSU1HX1BBVEhfM1xuICAgICAgICApIHtcbiAgICAgICAgICBpbWFnZXNfbWVkaXVtX19pbWcuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS1iZy13aGl0ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlRWxlbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpbWFnZXNfbWVkaXVtX19pbWcsIGltYWdlRWxlbSk7XG4gICAgICB9KTtcbiAgICAgIHVwbG9hZFRvTG9jYWxTdG9yYWdlKHBhdGhfcnVudGltZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVJbWFnZSB9IGZyb20gXCIuL2NyZWF0ZUltYWdlXCI7XG5pbXBvcnQgeyB1cGxvYWRUb0xvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3VwbG9hZFRvTG9jYWxTdG9yYWdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja091ckltZyhwYXRoX3J1bnRpbWUpIHtcbiAgY29uc3QgaW1hZ2VzX3ByZXY6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub2xkLWltYWdlXCIpO1xuICBpZiAoaW1hZ2VzX3ByZXYubGVuZ3RoID4gMCkge1xuICAgIGltYWdlc19wcmV2LmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIGlmIChlbGVtLnNyYyA9PT0gcGF0aF9ydW50aW1lKSByZXR1cm47XG4gICAgICBpZiAoIWVsZW0pIHJldHVybjtcbiAgICAgIGlmICghZWxlbS5wYXJlbnROb2RlKSByZXR1cm47XG4gICAgICBjb25zdCBzcmNFbGVtQXJyID0gZWxlbS5zcmMuc3BsaXQoXCIvXCIpO1xuICAgICAgY29uc3QgcGF0RWxlbSA9IHNyY0VsZW1BcnJbc3JjRWxlbUFyci5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChwYXRoX3J1bnRpbWUuaW5jbHVkZXMocGF0RWxlbSkpIHJldHVybjtcbiAgICAgIGxldCBuZXdJbWcgPSBjcmVhdGVJbWFnZShwYXRoX3J1bnRpbWUsIGVsZW0pO1xuICAgICAgZWxlbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdJbWcsIGVsZW0pO1xuICAgIH0pO1xuICAgIHVwbG9hZFRvTG9jYWxTdG9yYWdlKHBhdGhfcnVudGltZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBhdGhOZXdMb2dvRW51bSB9IGZyb20gXCIuLi91dGlscy9QYXRoTmV3TG9nb0VudW1cIjtcbmltcG9ydCB7IGNyZWF0ZUltYWdlIH0gZnJvbSBcIi4vY3JlYXRlSW1hZ2VcIjtcbmltcG9ydCB7IHJlY3Vyc2l2ZVNlZWtTdmcgfSBmcm9tIFwiLi9yZWN1cnNpdmVTZWVrU3ZnXCI7XG5pbXBvcnQgeyB1cGxvYWRUb0xvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3VwbG9hZFRvTG9jYWxTdG9yYWdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1N2Z0ltYWdlKHBhdGhfcnVudGltZTogc3RyaW5nKSB7XG4gIGNvbnN0IHBhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInBhdGhcIik7XG4gIGlmIChwYXRocy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShwYXRocyk7XG4gICAgY29uc3QgZmlsdGVyID0gYXJyLmZpbHRlcigoaXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGl0LCBcIml0ZW1cIik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgaXQuZ2V0QXR0cmlidXRlKFwiZFwiKS5pbmNsdWRlcyhQYXRoTmV3TG9nb0VudW0uTE9HT19QQVRIXzEpIHx8XG4gICAgICAgIGl0LmdldEF0dHJpYnV0ZShcImRcIikuaW5jbHVkZXMoUGF0aE5ld0xvZ29FbnVtLkxPR09fUEFUSF8yKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpbHRlci5sZW5ndGggPiAwKSB7XG4gICAgICBmaWx0ZXIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBsZXQgcmVjdXJzaXZlU3ZnID0gcmVjdXJzaXZlU2Vla1N2ZyhlbGVtKTtcbiAgICAgICAgbGV0IGltZyA9IGNyZWF0ZUltYWdlKHBhdGhfcnVudGltZSwgcmVjdXJzaXZlU3ZnKTtcbiAgICAgICAgcmVjdXJzaXZlU3ZnLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGltZywgcmVjdXJzaXZlU3ZnKTtcbiAgICAgIH0pO1xuICAgICAgdXBsb2FkVG9Mb2NhbFN0b3JhZ2UocGF0aF9ydW50aW1lKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbWFnZShwYXRoX3J1bnRpbWU6IHN0cmluZywgcHJldkltYWdlOiBhbnkpIHtcbiAgbGV0IGNvbnZlcnRlZF9wYXRoID0gcGF0aF9ydW50aW1lO1xuICBpZiAoIXBhdGhfcnVudGltZS5zdGFydHNXaXRoKFwiY2hyb21lLWV4dGVuc2lvblwiKSkge1xuICAgIGNvbnZlcnRlZF9wYXRoID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKHBhdGhfcnVudGltZSk7XG4gIH1cbiAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIG5ld0ltZy5zcmMgPSBjb252ZXJ0ZWRfcGF0aDtcbiAgY29uc3QgcHJldlZhbHVlU2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUocHJldkltYWdlKS5oZWlnaHQpO1xuICBpZiAocHJldkltYWdlLmNsYXNzTGlzdC5jb250YWlucyhcIm9sZC1pbWFnZVwiKSkge1xuICAgIGlmIChwcmV2SW1hZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVkaXVtLWJnLXdoaXRlXCIpKSB7XG4gICAgICBuZXdJbWcuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS1iZy13aGl0ZVwiKTtcbiAgICB9XG4gICAgbmV3SW1nLnN0eWxlLmhlaWdodCA9IHByZXZWYWx1ZVNpemUgKyBcInB4XCI7XG4gICAgbmV3SW1nLnN0eWxlLndpZHRoID0gcHJldlZhbHVlU2l6ZSArIFwicHhcIjtcbiAgfSBlbHNlIHtcbiAgICBuZXdJbWcuc3R5bGUuaGVpZ2h0ID0gcHJldlZhbHVlU2l6ZSArIDUgKyBcInB4XCI7XG4gICAgbmV3SW1nLnN0eWxlLndpZHRoID0gcHJldlZhbHVlU2l6ZSArIDUgKyBcInB4XCI7XG4gIH1cbiAgbmV3SW1nLmNsYXNzTGlzdC5hZGQoXCJvbGQtaW1hZ2VcIik7XG4gIHJldHVybiBuZXdJbWc7XG59XG4iLCJpbXBvcnQgeyBTdG9yYWdlS2V5c0VudW0gfSBmcm9tIFwiLi4vdXRpbHMvU3RvcmFnZUtleXNFbnVtXCI7XG5pbXBvcnQgeyByZXBsYWNlTG9nbyB9IGZyb20gXCIuL3JlcGxhY2VMb2dvXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcm9tTG9jYWxTdG9yYWdlKCkge1xuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1N0b3JhZ2VLZXlzRW51bS5MT0dPX0tFWV0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0W1N0b3JhZ2VLZXlzRW51bS5MT0dPX0tFWV0pIHtcbiAgICAgIHJlcGxhY2VMb2dvKHJlc3VsdFtTdG9yYWdlS2V5c0VudW0uTE9HT19LRVldKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlY3Vyc2l2ZVNlZWtTdmcocGF0aEVsZW06IGFueSkge1xuICBpZiAocGF0aEVsZW0udGFnTmFtZSA9PT0gXCJzdmdcIiB8fCBwYXRoRWxlbS50YWdOYW1lID09PSBcImRpdlwiKSB7XG4gICAgcmV0dXJuIHBhdGhFbGVtO1xuICB9XG4gIHJldHVybiByZWN1cnNpdmVTZWVrU3ZnKHBhdGhFbGVtLnBhcmVudE5vZGUpO1xufVxuIiwiaW1wb3J0IHsgY2hlY2tJbWdJbWFnZSB9IGZyb20gXCIuL2NoZWNrSW1nSW1hZ2VcIjtcbmltcG9ydCB7IGNoZWNrT3VySW1nIH0gZnJvbSBcIi4vY2hlY2tPdXJJbWdcIjtcbmltcG9ydCB7IGNoZWNrU3ZnSW1hZ2UgfSBmcm9tIFwiLi9jaGVja1N2Z0ltYWdlXCI7XG5pbXBvcnQgeyBnZXRGcm9tTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vZ2V0RnJvbUxvY2FsU3RvcmFnZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUxvZ28ocGF0aF9ydW50aW1lOiBzdHJpbmcpIHtcbiAgLy8h0J/QtdGA0LXQstGW0YDRj9GU0LzQviDQvNC4INGH0Lgg0ZQg0YMg0L3QsNGBINCy0LbQtSDQstGB0YLQsNC90L7QstC70LXQvdCwINC60LDRgNGC0LjQvdC60LAg0ZYg0Y/QuiDRlCDQvNGW0L3Rj9GU0LzQviDRl9GXLlxuICBjaGVja091ckltZyhwYXRoX3J1bnRpbWUpO1xuICAvLyAh0J/QtdGA0LXQstGW0YDRj9GU0LzQviDRgtC10L/QtdGAIHN2ZyDQutCw0YDRgtC40L3QutGDINGWINGX0ZcgcGF0aFxuICBjaGVja1N2Z0ltYWdlKHBhdGhfcnVudGltZSk7XG4gIC8vICHQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+IGltYWdlXG4gIGNoZWNrSW1nSW1hZ2UocGF0aF9ydW50aW1lKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBnZXRGcm9tTG9jYWxTdG9yYWdlKCk7XG4gIH0sIDIwMDApO1xufVxuIiwiaW1wb3J0IHsgU3RvcmFnZUtleXNFbnVtIH0gZnJvbSBcIi4uL3V0aWxzL1N0b3JhZ2VLZXlzRW51bVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBsb2FkVG9Mb2NhbFN0b3JhZ2UocGF0aDogc3RyaW5nKSB7XG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtTdG9yYWdlS2V5c0VudW0uTE9HT19LRVldOiBwYXRoIH0pO1xufVxuIiwiZXhwb3J0IGVudW0gUGF0aE5ld0xvZ29FbnVtIHtcbiAgTE9HT19QQVRIXzEgPSBcIk01OTQuNzkgMzA4LjJjMCAxNjMuNzYtMTMxLjg1IDI5Ni41Mi0yOTQuNSAyOTYuNTJTNS44IDQ3MiA1LjggMzA4LjIgMTM3LjY1IDExLjY5IDMwMC4yOSAxMS42OXMyOTQuNSAxMzIuNzUgMjk0LjUgMjk2LjUxXCIsXG4gIExPR09fUEFUSF8yID0gXCJNNTg4LjY3IDI5Ni4zNmMwIDE2My42Ny0xMzEuNzggMjk2LjM1LTI5NC4zMyAyOTYuMzVTMCA0NjAgMCAyOTYuMzYgMTMxLjc4IDAgMjk0LjM0IDBzMjk0LjMzIDEzMi42OSAyOTQuMzMgXCIsXG4gIElNR19QQVRIXzEgPSBcIi8vdGhlbWUuemRhc3NldHMuY29tL3RoZW1lX2Fzc2V0cy8yMjQyMDMvNGE1NTEzOGUyMWFkNDRhOWM3MmM4Mjk1MTgxYzc5ZmU5MzhhMmFlNi5zdmdcIixcbiAgSU1HX1BBVEhfMiA9IFwiaHR0cHM6Ly9taXJvLm1lZGl1bS5jb20vZml0L2MvOTYvOTYvMSpzSGh0WWhhQ2UyVWMzSVUwSWdLd0lRLnBuZ1wiLFxuICBJTUdfUEFUSF8zID0gXCJodHRwczovL21pcm8ubWVkaXVtLmNvbS9maXQvYy8xNzYvMTc2LzEqc0hodFloYUNlMlVjM0lVMElnS3dJUS5wbmdcIixcbiAgSU1HX1BBVEhfNCA9IFwiTWVkaXVtLUxvZ28tQmxhY2stUkdCLTEuc3ZnXCIsXG59XG5cbi8vIGVuZFBhdGgxIE05MTcuODYgMzA4LjJjMCAxNTQuMTYtNjUuOTMgMjc5LjEyLTE0Ny4yNSAyNzkuMTJzLTE0Ny4yNS0xMjUtMTQ3LjI1LTI3OS4xMlM2ODkuMjkgMjkuMDggNzcwLjYxIDI5LjA4czE0Ny4yNSAxMjUgMTQ3LjI1IDI3OS4xMk0xMDUwIDMwOC4yYzAgMTM4LjEyLTIzLjE5IDI1MC4wOC01MS43OSAyNTAuMDhzLTUxLjc5LTExMi01MS43OS0yNTAuMDggMjMuMTktMjUwLjA4IDUxLjgtMjUwLjA4UzEwNTAgMTcwLjA5IDEwNTAgMzA4LjJNMTg2Mi43NyAzNy40bC44Mi0uMTh2LTYuMzVoLTE2Ny40OGwtMTU1LjUxIDM2NS41LTE1NS41MS0zNjUuNWgtMTgwLjQ4djYuMzVsLjgxLjE4YzMwLjU3IDYuOSA0Ni4wOSAxNy4xOSA0Ni4wOSA1NC4zdjQzNC40NWMwIDM3LjExLTE1LjU4IDQ3LjQtNDYuMTUgNTQuM2wtLjgxLjE4VjU4N0gxMzI3di02LjM1bC0uODEtLjE4Yy0zMC41Ny02LjktNDYuMDktMTcuMTktNDYuMDktNTQuM1YxMTYuOUwxNDc5Ljg3IDU4N2gxMS4zM2wyMDUuNTktNDgzLjIxVjUzNi45Yy0yLjYyIDI5LjMxLTE4IDM4LjM2LTQ1LjY4IDQ0LjYxbC0uODIuMTl2Ni4zaDIxMy4zdi02LjNsLS44Mi0uMTljLTI3LjcxLTYuMjUtNDMuNDYtMTUuMy00Ni4wOC00NC42MWwtLjE0LTQ0NS4yaC4xNGMwLTM3LjExIDE1LjUyLTQ3LjQgNDYuMDgtNTQuM205Ny40MyAyODcuOGMzLjQ5LTc4LjA2IDMxLjUyLTEzNC40IDc4LjU2LTEzNS4zNyAxNC41MS4yNCAyNi42OCA1IDM2LjE0IDE0LjE2IDIwLjEgMTkuNTEgMjkuNTUgNjAuMjggMjguMDkgMTIxLjIxem0tMi4xMSAyMmgyNTB2LTEuMDVjLS43MS01OS42OS0xOC0xMDYuMTItNTEuMzQtMTM4LTI4LjgyLTI3LjU1LTcxLjQ5LTQyLjcxLTExNi4zMS00Mi43MWgtMWMtMjMuMjYgMC01MS43OSA1LjY0LTcyLjA5IDE1Ljg2LTIzLjExIDEwLjctNDMuNDkgMjYuNy02MC40NSA0Ny43LTI3LjMgMzMuODMtNDMuODQgNzkuNTUtNDcuODYgMTMwLjkzLS4xMyAxLjU0LS4yNCAzLjA4LS4zNSA0LjYycy0uMTggMi45Mi0uMjUgNC4zOWEzMzIuNjQgMzMyLjY0IDAgMCAwLS4zNiAyMS42OUMxODYwLjc5IDUwNyAxOTIzLjY1IDYwMCAyMDM1LjMgNjAwYzk4IDAgMTU1LjA3LTcxLjY0IDE2OS4zLTE2Ny44bC03LjE5LTIuNTNjLTI1IDUxLjY4LTY5LjkgODMtMTIxIDc5LjE4LTY5Ljc2LTUuMjItMTIzLjItNzUuOTUtMTE4LjM1LTE2MS42M201MzIuNjkgMTU3LjY4Yy04LjIgMTkuNDUtMjUuMzEgMzAuMTUtNDguMjQgMzAuMTVzLTQzLjg5LTE1Ljc0LTU4Ljc4LTQ0LjM0Yy0xNi0zMC43LTI0LjQyLTc0LjEtMjQuNDItMTI1LjUxIDAtMTA3IDMzLjI4LTE3Ni4yMSA4NC43OS0xNzYuMjEgMjEuNTcgMCAzOC41NSAxMC43IDQ2LjY1IDI5LjM3em0xNjUuODQgNzYuMjhjLTMwLjU3LTcuMjMtNDYuMDktMTgtNDYuMDktNTdWNS4yOEwyNDI0Ljc3IDYwdjYuN2wxLjE0LS4wOWMyNS42Mi0yLjA3IDQzIDEuNDcgNTMuMDkgMTAuNzkgNy45IDcuMyAxMS43NSAxOC41IDExLjc1IDM0LjI2djcxLjE0Yy0xOC4zMS0xMS42OS00MC4wOS0xNy4zOC02Ni41Mi0xNy4zOC01My42IDAtMTAyLjU5IDIyLjU3LTEzNy45MiA2My41Ni0zNi44MyA0Mi43Mi01Ni4zIDEwMS4xLTU2LjMgMTY4LjgxQzIyMzAgNTE4LjcyIDIyODkuNTMgNjAwIDIzNzguMTMgNjAwYzUxLjgzIDAgOTMuNTMtMjguNCAxMTIuNjItNzYuM1Y1ODhoMTY2LjY1di02LjY2em0xNTkuMjktNTA1LjMzYzAtMzcuNzYtMjguNDctNjYuMjQtNjYuMjQtNjYuMjQtMzcuNTkgMC02NyAyOS4xLTY3IDY2LjI0czI5LjQ0IDY2LjI0IDY3IDY2LjI0YzM3Ljc3IDAgNjYuMjQtMjguNDggNjYuMjQtNjYuMjRtNDMuODQgNTA1LjMzYy0zMC41Ny03LjIzLTQ2LjA5LTE4LTQ2LjA5LTU3aC0uMTNWMTY2LjY1bC0xNjYuNjYgNDcuODV2Ni41bDEgLjA5YzM2LjA2IDMuMjEgNDUuOTMgMTUuNjMgNDUuOTMgNTcuNzdWNTg4aDE2Ni44di02LjY2em00MjcuMDUgMGMtMzAuNTctNy4yMy00Ni4wOS0xOC00Ni4wOS01N1YxNjYuNjVMMzA4MiAyMTIuOTJ2Ni41MmwuOTQuMWMyOS40OCAzLjEgMzggMTYuMjMgMzggNTguNTZ2MjI2Yy05LjgzIDE5LjQ1LTI4LjI3IDMxLTUwLjYxIDMxLjc4LTM2LjIzIDAtNTYuMTgtMjQuNDctNTYuMTgtNjguOVYxNjYuNjZsLTE2Ni42NiA0Ny44NVYyMjFsMSAuMDljMzYuMDYgMy4yIDQ1Ljk0IDE1LjYyIDQ1Ljk0IDU3Ljc3djE5MS4yN2EyMTQuNDggMjE0LjQ4IDAgMCAwIDMuNDcgMzkuODJsMyAxMy4wNWMxNC4xMSA1MC41NiA1MS4wOCA3NyAxMDkgNzcgNDkuMDYgMCA5Mi4wNi0zMC4zNyAxMTEtNzcuODl2NjZoMTY2LjY2di02LjY2ek0zOTM0LjIgNTg4di02LjY3bC0uODEtLjE5Yy0zMy4xNy03LjY1LTQ2LjA5LTIyLjA3LTQ2LjA5LTUxLjQzdi0yNDMuMmMwLTc1LjgzLTQyLjU5LTEyMS4wOS0xMTMuOTMtMTIxLjA5LTUyIDAtOTUuODUgMzAuMDUtMTEyLjczIDc2Ljg2LTEzLjQxLTQ5LjYtNTItNzYuODYtMTA5LjA2LTc2Ljg2LTUwLjEyIDAtODkuNCAyNi40NS0xMDYuMjUgNzEuMTN2LTY5Ljg3bC0xNjYuNjYgNDUuODl2Ni41NGwxIC4wOWMzNS42MyAzLjE2IDQ1LjkzIDE1Ljk0IDQ1LjkzIDU3VjU4OGgxNTUuNXYtNi42NmwtLjgyLS4yYy0yNi40Ni02LjIyLTM1LTE3LjU2LTM1LTQ2LjY2VjI1NS43MmM3LTE2LjM1IDIxLjExLTM1LjcyIDQ5LTM1LjcyIDM0LjY0IDAgNTIuMiAyNCA1Mi4yIDcxLjI4VjU4OGgxNTUuNTR2LTYuNjZsLS44Mi0uMmMtMjYuNDYtNi4yMi0zNS0xNy41Ni0zNS00Ni42NnYtMjQ4YTE2MC40NSAxNjAuNDUgMCAwIDAtMi4yLTI3LjY4YzcuNDItMTcuNzcgMjIuMzQtMzguOCA1MS4zNy0zOC44IDM1LjEzIDAgNTIuMiAyMy4zMSA1Mi4yIDcxLjI4VjU4OHpcIixcbiIsImV4cG9ydCBlbnVtIFN0b3JhZ2VLZXlzRW51bSB7XG4gIExPR09fS0VZID0gXCJtZWRpdW1fZXh0X2xvZ29cIixcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBnZXRGcm9tTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4uL2hlbHBlci9nZXRGcm9tTG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQgeyByZXBsYWNlTG9nbyB9IGZyb20gXCIuLi9oZWxwZXIvcmVwbGFjZUxvZ29cIjtcblxuZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgZ2V0RnJvbUxvY2FsU3RvcmFnZSgpO1xuICB9XG59O1xuXG4vLyAq0KLRg9GCINC80Lgg0LfQstGP0LfRg9GU0LzQvtGB0Ywg0LcgY29udGVudCDRgdC60YDQuNC/0YLQvtC8INGWINGB0LvRg9GF0LDRlNC80L4g0YfQuCDRlCDQvdCw0Lwg0Y/QutGW0YHRjCDQv9C+0LLRltC00L7QvNC70LXQvdC90Y8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgaWYgKHJlcXVlc3QucmVhc29uID09IFwiY2hhbmdlX2xvZ29cIikge1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3QucGF0aCwgXCJwYXRoIG1lc3NhZ2VcIik7XG4gICAgcmVwbGFjZUxvZ28ocmVxdWVzdC5wYXRoKTtcbiAgICBzZW5kUmVzcG9uc2UodHJ1ZSk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9