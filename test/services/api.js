const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) {
        throw new Error("Error al obtener los posts");
    }
    const allPosts = await res.json();
    console.log("Todos los posts de la API (sin limitar):", allPosts);
    // Limitar a 10 posts
    const limitedPosts = allPosts.slice(0, 10);
    console.log("Posts limitados a 10:", limitedPosts);
    return limitedPosts;
};

export const createPost = async (post) => {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post),
    });
    if (!res.ok) {
        throw new Error("Error al crear el post");
    }
    return res.json();
};

export const updatePost = async (id, post) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post),
    });
    if (!res.ok) {
        throw new Error("Error al actualizar el post");
    }
    return res.json();
};

