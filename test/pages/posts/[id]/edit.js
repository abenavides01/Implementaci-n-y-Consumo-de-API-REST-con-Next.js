import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPosts } from "../../../services/api";
import "../../../styles/globals.css";

const EditPostPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLocalPost, setIsLocalPost] = useState(false);

    useEffect(() => {
        if (id) {
            // Primero intentamos obtener el post del localStorage (si es un post local)
            const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
            const localPost = localPosts.find(p => p.id === Number(id));
            
            if (localPost) {
                setPost(localPost);
                setTitle(localPost.title);
                setBody(localPost.body);
                setIsLocalPost(true);
                setLoading(false);
            } else {
                // Si no es un post local, lo buscamos en la API
                getPosts()
                    .then(posts => {
                        const postToEdit = posts.find(p => p.id === Number(id));
                        if (postToEdit) {
                            setPost(postToEdit);
                            setTitle(postToEdit.title);
                            setBody(postToEdit.body);
                        } else {
                            setError("Post no encontrado");
                        }
                        setLoading(false);
                    })
                    .catch(err => {
                        setError("Error al cargar el post");
                        setLoading(false);
                    });
            }
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Creamos el post actualizado
            const updatedPost = {
                ...post,
                title,
                body
            };
            
            if (isLocalPost) {
                // Si es un post local, actualizamos en localStorage
                const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
                const updatedLocalPosts = localPosts.map(p => 
                    p.id === Number(id) ? updatedPost : p
                );
                localStorage.setItem('localPosts', JSON.stringify(updatedLocalPosts));
            } else {
                // Si es un post de la API, lo guardamos como local
                const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
                localStorage.setItem('localPosts', JSON.stringify([...localPosts, updatedPost]));
            }
            
            alert("Post actualizado correctamente (Nota: Esta actualización es temporal)");
            router.push("/posts");
        } catch (error) {
            alert(`Error al actualizar el post: ${error.message}`);
        }
    };

    const handleCancel = () => {
        router.push("/posts");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-700">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-700">Post no encontrado</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Editar Post</h1>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-yellow-700">
                        <span className="font-bold">Nota:</span> Las ediciones son temporales y no se almacenarán en la API. 
                        Desaparecerán si recargas la página.
                    </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input 
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="8"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Actualizar
                            </button>
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostPage; 