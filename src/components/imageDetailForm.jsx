import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@/context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ImageDetailForm = ({ frozen = false, onSubmit, image, imageURL }) => {
  const navigate = useNavigate();
  
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState('followers');
  const [localImageURL, setLocalImageURL] = useState(imageURL || '');
  const [localImageFile, setLocalImageFile] = useState(image || null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    setLocalImageURL(imageURL || '');
    setLocalImageFile(image || null);
  }, [image, imageURL]);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUserId(data.user._id);  // Set ObjectId
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  fetchUser();
}, []);

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);  // only base64 part
    reader.onerror = error => reject(error);
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!localImageFile) {
    alert("Please select an image");
    return;
  }

  if (!currentUserId) {
    alert("User ID not loaded. Please try again.");
    return;
  }
  
  try {
    const base64 = await fileToBase64(localImageFile);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images/upload`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        fileName: localImageFile.name,
        fileData: `data:${localImageFile.type};base64,${base64}`,
        caption: caption,
        visibility: visibility,
        author: currentUserId,

        // author: user._id
      }),
    });

    const data = await response.json();
    if (response.ok && data.post && data.post.media && data.post.media.length > 0) {
      alert("Upload Successful ✅");
      if (onSubmit) onSubmit(data.post, localImageFile);
      navigate("/dashboard/image-upload")
    } else {
      const errorMsg = data?.error || data?.message || 'Unknown error';
      alert(`Upload failed ❌: ${errorMsg}`);
      console.error("Upload failed:", errorMsg);
    }

  } catch (err) {
    console.error("Error submitting post:", err);
  }
};


  return (
    <div>
      <form className="space-y-4 p-4" onSubmit={handleSubmit}>
        
        {localImageURL && (
          <div className="space-y-1">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="text"
              value={localImageURL}
              readOnly
              className="text-gray-500"
            />
          </div>
        )}

        <div className="space-y-1">
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            placeholder="Write something about this memory..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none"
            maxLength={1000}
            disabled={frozen}
          />
          <div className="text-sm text-gray-500 text-right">{caption.length}/1000</div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="visibility">Visibility</Label>
          <Select
            value={visibility}
            onValueChange={setVisibility}
            disabled={frozen}
          >
            <SelectTrigger id="visibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="favourite">Favourite</SelectItem>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" placeholder="Tag friends (coming soon)" disabled={frozen} />
        </div>

        <Button type="submit" className="w-full" disabled={frozen}>
          POST
        </Button>
      </form>
    </div>
  );
};

export default ImageDetailForm;
