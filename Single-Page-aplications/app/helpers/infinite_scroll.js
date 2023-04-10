import api from "./wp_api.js";
import { searchCard } from "../components/searchCard.js";
import { postCard } from "../components/postCard.js";
import { ajax } from "./ajax.js";

export async function infiniteScroll() {
    let query = localStorage.getItem("wpSearch"),
        apiURL,
        Component;

        window.addEventListener("scroll", async e => {
            let {scrollTop, clientHeight, scrollHeight} = document.documentElement,
                {hash} = window.location;

                if (scrollTop + clientHeight >= scrollHeight - 1) {
                    api.page ++;

                    if(!hash || hash === "#/") {
                        apiURL = `${api.POSTS}&page=${api.page}`;
                        Component = postCard;
                    } else if (hash.includes("#/search")) {
                        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
                        Component = searchCard;
                    } else {
                        return false;
                    }

                    document.querySelector(".loader").style.display = "block";

                    await ajax({
                        url: apiURL,
                        cbSuccess: (posts) => {
                            let html = "";
                            posts.forEach(post => html += Component(post));
                            document.getElementById("main").insertAdjacentHTML("beforeend", html);
                            document.querySelector(".loader").style.display = "none";
                        }
                    })
                }
        });
}