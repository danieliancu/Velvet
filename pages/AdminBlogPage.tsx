import React from 'react';
import AdminPageHeader from '../components/AdminPageHeader';

const AdminBlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <AdminPageHeader active="blog" />
          <main className="w-full space-y-6">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <h1 className="text-2xl font-semibold text-white mb-2">Blog</h1>
              <p className="text-sm text-gray-400">Content coming soon.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;
