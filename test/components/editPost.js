import { useState, useEffect } from "react";
import { updatePost } from "../services/api";

const EditPost = ({post, onPostUpdated}) => {
    console.log("EditPost renderizado con post:", post);
    
    const [title, setTitle] = useState(post?.title || "");
    const [body, setBody] = useState(post?.body || "");

    useEffect(() => {
        console.log("EditPost montado con post:", post);
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        }
        return () => {
            console.log("EditPost desmontado");
        };
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Actualizando post con ID:", post.id);
            const updatedPost = await updatePost(post.id, {title, body});
            alert("Post actualizado correctamente");
            onPostUpdated(updatedPost);
        } catch (error) {
            alert(`Error al actualizar el post: ${error.message}`);
        }
    };

    const handleCancel = () => {
        onPostUpdated(post);
    };

    if (!post) {
        console.log("EditPost: post es undefined");
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Editar Post</h2>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            />
            <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            />
            <div className="flex space-x-2">
                <button 
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Actualizar
                </button>
                <button 
                type="button"
                onClick={handleCancel}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EditPost;
