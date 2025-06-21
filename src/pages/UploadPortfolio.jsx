import { useState } from 'react';
import supabase from '../supabaseClient';

function UploadPortfolio() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Select a file first');
    setUploading(true);

    const filePath = `portfolio/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) {
      alert('Failed to upload image');
      setUploading(false);
      return;
    }

    const image_url = `https://kxgvlgecatlbdekjvmvm.supabase.co/storage/v1/object/public/portfolio/${filePath}`;

    const { error: insertError } = await supabase.from('portfolio').insert([
      { title, description: desc, image_url },
    ]);

    if (insertError) {
      alert('Failed to insert portfolio item');
    } else {
      alert('Upload successful!');
      setTitle('');
      setDesc('');
      setFile(null);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Upload Portfolio</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}

export default UploadPortfolio;
