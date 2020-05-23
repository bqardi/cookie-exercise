document.addEventListener("DOMContentLoaded", event => {
    const cookieContainer = document.getElementById("cookie-container");
    const cookieAccept = document.getElementById("accept-cookie");
    const cookieDeny = document.getElementById("deny-cookie");
    const cookieDelete = document.getElementById("delete-cookie");
    const scrollable = document.getElementById("js-scrollable");

    cookieAccept.addEventListener("click", acceptCookies);
    cookieDeny.addEventListener("click", denyCookies);
    cookieDelete.addEventListener("click", function(evt) {
        evt.preventDefault();
        deleteCookie("userxp");
    });

    checkCookies();

    function acceptCookies() {
        setCookie("userxp", "true", 1);
        enableScroll();
    }

    function denyCookies() {
        enableScroll();
    }

    function deleteCookie(name) {
        setCookie(name, "", -1);
        location.href = "index.html";
    }

    function disableScroll() {
        cookieContainer.classList.remove("js-hidden");
        scrollable.classList.remove("js-scrollable");
    }

    function enableScroll() {
        cookieContainer.classList.add("js-hidden");
        scrollable.classList.add("js-scrollable");
    }

    function checkCookies() {
        const cookieString = getCookie("userxp");
        if (!cookieString) {
            disableScroll();
        }
    }

    function setCookie(name, value, expirationDays) {
        let d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString().toString()};path=/`;
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //#region LOCAL STORAGE
    const localStorage = document.getElementById("local-storage");
    const localStorageSet = document.getElementById("local-storage-set");
    const localStorageButton = document.getElementById("local-storage-button");
    const deleteLocalStorage = document.getElementById("delete-local-storage");

    localStorageButton.addEventListener("click", function() {
        window.localStorage.setItem("userxp", "true");
        localStorage.classList.remove("js-active");
        localStorageSet.classList.add("js-active");
    });
    deleteLocalStorage.addEventListener("click", removeLocalStorage);

    checkLocalStorage();

    function checkLocalStorage() {
        const loclStor = window.localStorage.getItem("userxp");
        if (loclStor == null) {
            localStorage.classList.add("js-active");
        } else {
            localStorageSet.classList.add("js-active");
        }
    }

    function removeLocalStorage() {
        window.localStorage.removeItem("userxp");
        location.href = "index.html";
    }
    //#endregion LOCAL STORAGE
});