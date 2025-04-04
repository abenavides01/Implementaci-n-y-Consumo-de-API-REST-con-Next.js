import { useState, useEffect } from "react";
import PostList from "../components/postList";
import AddPost from "../components/addPost";
import { getPosts } from "../services/api";
import '../styles/globals.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [localPosts, setLocalPosts] = useState([]);

    useEffect(() => {
        loadPosts();
        loadLocalPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await getPosts();
            console.log("Datos cargados desde la API:", fetchedPosts);
            setPosts(fetchedPosts);
            setError(null);
        } catch (err) {
            console.error("Error al cargar posts:", err);
            setError("Error al cargar los posts. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const loadLocalPosts = () => {
        try {
            const savedLocalPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
            console.log("Posts locales cargados:", savedLocalPosts);
            setLocalPosts(savedLocalPosts);
        } catch (err) {
            console.error("Error al cargar posts locales:", err);
        }
    };

    const handlePostAdded = (newPost) => {
        // Añadimos el post a nuestra lista local y al localStorage
        const updatedLocalPosts = [newPost, ...localPosts];
        setLocalPosts(updatedLocalPosts);
        localStorage.setItem('localPosts', JSON.stringify(updatedLocalPosts));
        alert("Post creado correctamente (Nota: Este post es temporal y no se almacenará en la API)");
    };

    // Combinamos los posts de la API con los posts locales
    const allPosts = [...localPosts, ...posts];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800">
            <div className="container mx-auto p-6 max-w-4xl">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                        Blog de Posts
                    </h1>
                    <p className="text-gray-600">Crea, edita y gestiona tus publicaciones</p>
                </header>
                
                {/* Formulario de AddPost primero */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 transform transition-all hover:shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Nuevo Post
                    </h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
                        <p className="text-yellow-700">
                            <span className="font-bold">Nota:</span> Los posts que crees son temporales y no se almacenarán en la API.
                        </p>
                    </div>
                    <AddPost onPostAdded={handlePostAdded} />
                </div>
                
                {/* Lista de posts después */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Posts
                        </h2>
                        <button 
                            onClick={loadPosts}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualizar Posts
                        </button>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-lg">
                        <p className="text-blue-700">
                            <span className="font-bold">Información:</span> Los posts marcados como "Local" pueden ser editados y eliminados. 
                            Los posts de la API no se pueden eliminar.
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-gray-600">Cargando posts...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg text-red-700">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            <PostList posts={allPosts} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Posts;
