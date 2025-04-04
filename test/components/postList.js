import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import { useRouter } from "next/router";

const PostList = ({ posts }) => {
    const router = useRouter();

    const handleEdit = (postId) => {
        router.push(`/posts/${postId}/edit`);
    };

    const handleDelete = (postId) => {
        if (confirm("¿Estás seguro de que deseas eliminar este post?")) {
            // Obtenemos los posts locales actuales
            const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
            
            // Filtramos el post a eliminar
            const updatedLocalPosts = localPosts.filter(post => post.id !== postId);
            
            // Guardamos los posts actualizados
            localStorage.setItem('localPosts', JSON.stringify(updatedLocalPosts));
            
            // Recargamos la página para ver los cambios
            window.location.reload();
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Publicaciones</h2>
            {posts.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 italic">No hay publicaciones disponibles.</p>
                </div>
            ) : (
                <ul className="space-y-6">
                    {posts.map(post => {
                        // Verificamos si es un post local
                        const isLocalPost = post.createdAt !== undefined;
                        
                        return (
                            <li key={post.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                                    {isLocalPost && (
                                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            Local
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-700 mb-5 leading-relaxed">{post.body}</p>
                                <div className="flex space-x-3 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </button>
                                    {isLocalPost && (
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                                {!isLocalPost && (
                                    <p className="text-xs text-gray-500 mt-3 italic flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Nota: Los posts de la API no se pueden eliminar
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PostList;
