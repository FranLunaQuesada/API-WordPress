import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { ContactForm } from "./ContactForm.js";
import { Post } from "./post.js";
import { postCard } from "./postCard.js";
import { searchCard } from "./searchCard.js";

export async function router() {
    const w = window,
        $main = document.getElementById("main");

    let {hash} = location;
    console.log(hash);

    $main.innerHTML = null;

    if(!hash || hash === "#/") {
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
            //   console.log(posts);
              let html ="";
              posts.forEach(post=> {
                html += postCard(post);
              }); 
              $main.innerHTML = html;
            }
          });
    } else if (hash.includes("#/search")) {
        let query = localStorage.getItem("wpSearch");

        if(!query){
          document.querySelector(".loader").style.display = "none";
           return false;
        }

        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) => {
                console.log(search);
                let html = "";

                if(search.length === 0) {
                  html = `
                  <p class = "error">
                    No existen resultados de búsqueda para el término <mark>${query}</mark>
                  </p>
                  `; 
                } else {
                  search.forEach(post => html += searchCard(post));
                }
                $main.innerHTML = html;
            }
        })

    } else if (hash === "#/contacto") {
        $main.appendChild(ContactForm());
    } else {
        $main.innerHTML = `<h2>Aquí cargará el contenido del Post previamente seleccionado</h2>`;
        await ajax({
            url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
            cbSuccess: (post) => {
              $main.innerHTML = Post(post);
            }
          });
    }

    document.querySelector(".loader").style.display = "none";
}