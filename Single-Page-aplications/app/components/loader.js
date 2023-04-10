export function loader() {
    const $loader = document.createElement("img");
    $loader.src = "./app/assets/oval.svg";
    $loader.alt = "Cargando..."
    $loader.classList.add("loader");

    return $loader;
}