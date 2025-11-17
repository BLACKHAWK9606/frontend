'use client';
import { useEffect, useState } from 'react';

export default function RightSidebar() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts.slice(0, 7))); // Limit to 7 posts
  }, []);

  return (
    <aside className="w-72 xl:w-72 lg:w-64 md:w-56 sm:w-48 bg-white text-black shadow-md p-6 xl:p-6 lg:p-4 md:p-3 sm:p-2 overflow-y-auto h-screen">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Latest Posts</h2>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post.id} className="border-b border-blue-100 pb-4">
            <h3 className="text-blue-900 font-semibold text-md">{post.title}</h3>
            <p className="text-sm text-blue-700 mt-1">{post.body.slice(0, 80)}...</p>
            <div className="text-xs text-blue-600 mt-2">
              <span>Tags: {post.tags.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </aside>
  );
}
