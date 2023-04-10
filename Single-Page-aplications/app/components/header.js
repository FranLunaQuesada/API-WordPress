import { menu } from "./menu.js";
import { searchForm } from "./searchForm.js";
import { title } from "./title.js";

export function header() {
    const $header = document.createElement("header");
    $header.classList.add("header");
    $header.appendChild(title());
    $header.appendChild(menu());
    $header.appendChild(searchForm());
    return $header;
}