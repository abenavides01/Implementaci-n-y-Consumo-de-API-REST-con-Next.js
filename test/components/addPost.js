import { useState } from "react";
import { createPost } from "../services/api";

const AddPost = ({onPostAdded}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Creamos un post con un ID temporal basado en la fecha actual
            const tempId = Date.now();
            const newPost = {
                id: tempId,
                title,
                body,
                userId: 1,
                createdAt: new Date().toISOString()
            };
            
            // Simulamos la creación en la API (en una aplicación real, esto llamaría a createPost)
            // const newPost = await createPost({title, body});
            
            onPostAdded(newPost);
            setTitle("");
            setBody("");
        } catch (error) {
            alert(`Error al crear el post: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <input 
                        id="title"
                        type="text"
                        placeholder="Ingresa el título del post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <textarea
                        id="body"
                        placeholder="Ingresa el contenido del post"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        rows="5"
                        required
                    />
                </div>
            </div>
            <button 
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creando...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Post
                    </>
                )}
            </button>
        </form>
    )
}

export default AddPost;
