import { useState } from 'react';
import supabase from '../supabaseClient';

function UploadPortfolio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    if (!image) {
      setMessage('❌ Please select an image.');
      setUploading(false);
      return;
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`; // no subfolder to avoid path errors

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, image);

    if (uploadError) {
      console.error(uploadError);
      setMessage(`❌ Image upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    // Get public URL for uploaded image
    const { data: urlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    const imageUrl = urlData?.publicUrl;

    // Insert new portfolio item into Supabase table
    const { error: insertError } = await supabase
      .from('portfolio')
      .insert([{ title, description, image_url: imageUrl, link }]);

    if (insertError) {
      console.error(insertError);
      setMessage(`❌ Failed to save: ${insertError.message}`);
    } else {
      setMessage('✅ Portfolio item uploaded successfully!');
      setTitle('');
      setDescription('');
      setLink('');
      setImage(null);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Portfolio Item</h1>

      <form onSubmit={handleUpload} className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          required
        />
        <input
          type="url"
          placeholder="Project Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white transition w-full"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Portfolio'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>
      )}
    </div>
  );
}

export default UploadPortfolio;
