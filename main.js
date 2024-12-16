(()=>{"use strict";function e(e){var t=e.card,r=e.cardTemplate,n=e.deleteCard,o=e.addLike,a=e.openModalImage,c=e.userId,u=r.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__like-button"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-count");return i.src=t.link,i.alt=t.name,i.addEventListener("click",(function(){return a(i)})),u.querySelector(".card__title").textContent=t.name,t.owner._id===c?s.addEventListener("click",(function(){n(t).then((function(){return function(e){e.remove()}(u)})).catch(console.error)})):s.style.display="none",d.textContent=t.likes.length,l.addEventListener("click",(function(){o(t,c).then((function(e){t.likes=e.likes,d.textContent=e.likes.length,function(e){e.classList.toggle("card__like-button_is-active")}(l)})).catch(console.error)})),t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),u}function t(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)}var o=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),t.classList.remove(r.invalidInputClass),n.classList.remove(r.errorClass),n.textContent=""},a=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},c=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){o(e,r,t)}));var r=e.querySelector(t.submitButtonSelector);a(r,t)},u=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):a(t,r)},i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"2ce07d2c-6a68-45be-8e63-bd0f31432b5b","Content-Type":"application/json"}};function l(e,t){return fetch(e,t).then(p)}var s=function(e){return l("".concat(i.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:i.headers})},d=function(e,t){var r=e.likes.some((function(e){return e._id===t}))?"DELETE":"PUT";return l("".concat(i.baseUrl,"/cards/likes/").concat(e._id),{method:r,headers:i.headers})},p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function f(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var m,y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",invalidInputClass:"popup__input_invalid"},v=document.querySelector("#card-template").content,h=document.querySelector(".places__list"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),C=q.querySelector(".popup__image"),k=q.querySelector(".popup__caption"),L=document.querySelector(".popup_type_avatar"),E=document.querySelector(".profile__image"),g=document.querySelector(".profile__title"),x=document.querySelector(".profile__description");!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);u(r,n,t),r.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,r){t.validity.valid?o(e,t,r):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),t.classList.add(r.invalidInputClass),n.classList.add(r.errorClass),t.validity.patternMismatch?n.textContent=t.dataset.errorMessage:n.textContent=t.validationMessage}(e,t,r)}(e,a,t),u(r,n,t)}))}))}(t,e)}))}(y),document.querySelector(".profile__edit-button").addEventListener("click",(function(){r(S),U.value=g.textContent,w.value=x.textContent,c(S,y)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){r(b),I.reset(),c(b,y)})),document.querySelector(".profile__image").addEventListener("click",(function(){r(L),T.reset(),c(L,y)})),document.querySelectorAll(".popup").forEach((function(e){return function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return n(e)})),e.addEventListener("click",(function(t){return function(e,t){t.target===e&&n(e)}(e,t)}))}(e)}));var A=document.forms["edit-profile"],I=document.forms["new-place"],T=document.forms["avatar-change"],U=A.querySelector(".popup__input_type_name"),w=A.querySelector(".popup__input_type_description"),j=T.querySelector(".popup__input_type_avatar");A.addEventListener("submit",(function(e){var t,r;e.preventDefault(),f(S,!0),(t=U.value,r=w.value,l("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:"".concat(t),about:"".concat(r)})})).then((function(){n(S),g.textContent=U.value,x.textContent=w.value})).catch(console.error).finally((function(){f(S,!1)}))}));var M=b.querySelector(".popup__input_type_card-name"),O=b.querySelector(".popup__input_type_url");function B(e){r(q),C.src=e.src,C.alt=e.alt,k.textContent=e.alt}I.addEventListener("submit",(function(t){t.preventDefault(),f(b,!0);var r=[];r.name=M.value,r.link=O.value,function(e){return l("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:"".concat(e.name),link:"".concat(e.link)})})}(r).then((function(t){var r=e({card:t,cardTemplate:v,deleteCard:s,addLike:d,openModalImage:B,userId:m});h.prepend(r),n(b)})).catch(console.error).finally((function(){f(b,!1)}))})),T.addEventListener("submit",(function(e){var t;e.preventDefault(),f(L,!0),(t=j.value,l("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:t})})).then((function(e){n(L),E.style.backgroundImage="url(".concat(e.avatar,")")})).catch(console.error).finally((function(){f(L,!1)}))})),Promise.all([l("".concat(i.baseUrl,"/users/me"),{headers:i.headers}),l("".concat(i.baseUrl,"/cards"),{headers:i.headers})]).then((function(t){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,u=[],i=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=a.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(r,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],c=o[1];m=a._id,g.textContent=a.name,E.style.backgroundImage="url(".concat(a.avatar,")"),x.textContent=a.about,c.forEach((function(t){h.append(e({card:t,cardTemplate:v,deleteCard:s,addLike:d,openModalImage:B,userId:m}))}))})).catch(console.error)})();
//# sourceMappingURL=main.js.map