import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArchievePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(location.state?.image || null);
  const [post, setPost] = useState(location.state?.post || null);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const userInfo = {
    avatar: "/Miguel-O-Hara.png",
    username: "mystic_warrior",
  };

  const initials = userInfo.username
    ? userInfo.username
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "MW";

  const [comments, setComments] = useState([
    { id: 1, user: "pixel_mage", text: "Absolutely stunning shot! The vibes are 🔥🔥🔥" },
    { id: 2, user: "coder_nerd", text: "This reminds me of our old projects 😂 Such nostalgia!" },
    { id: 3, user: "wanderlust_queen", text: "Where was this taken? The background looks magical 🌌" },
  ]);

  useEffect(() => {
    const fetchImageAndPost = async () => {
      try {
        let img = image;

        if (!img) {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images/imagekit/${id}`, {
            withCredentials: true,
          });
          img = res.data.image;
          setImage(img);
        }

        if (img && !post) {
          const postId = img.name.split("_")[0];
          const postRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images/mongo/${postId}`, {
            withCredentials: true,
          });
          setPost(postRes.data.post);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImageAndPost();
  }, [id, image, post]);

  if (!image) {
    return (
      <div className="text-center mt-10 text-gray-400 dark:text-gray-500">
        Loading image...
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to All Posts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 md:p-6 flex justify-center items-center">
      <div className="w-full max-w-6xl border border-gray-700 rounded-lg shadow-lg md:shadow-[0_0_20px_rgba(59,130,246,0.4)] p-2 md:p-4 flex flex-col md:flex-row gap-4 max-h-screen overflow-hidden">
        {/* Left image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={image.url}
            alt={image.name}
            className="max-h-full max-w-full object-contain rounded-md"
          />
        </div>

        {/* Right details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-gray-800 p-3 rounded-md overflow-y-auto max-h-full">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border">
                {userInfo.avatar ? (
                  <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
              <span className="font-semibold">{userInfo.username}</span>
            </div>

            {post ? (
              <>
                <div className="mb-2 text-gray-300 break-words leading-relaxed">
                  <strong className="text-blue-400">@{userInfo.username}</strong>{" "}
                  {showFullCaption || post.caption.length < 120 ? (
                    <span className="italic text-white">{post.caption}</span>
                  ) : (
                    <>
                      <span className="italic text-white">
                        {post.caption.slice(0, 120)}...
                      </span>
                      <button
                        onClick={() => setShowFullCaption(true)}
                        className="ml-1 text-blue-400 hover:underline"
                      >
                        See more
                      </button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-3 text-lg">
                  <span>❤️ 123</span>
                  <span>💬 {comments.length}</span>
                  <span>🔥 10</span>
                  <span>👍 78</span>
                </div>

                {/* Comments hidden on mobile */}
                <div className="hidden md:block max-h-40 overflow-y-auto border-t border-gray-700 pt-2 pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-2 break-words">
                      <span className="font-medium text-blue-300">{comment.user}:</span>{" "}
                      <span className="text-gray-300">{comment.text}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500">Loading post details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchievePage;





// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ArchievePage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [image, setImage] = useState(location.state?.image || null);
//   const [post, setPost] = useState(location.state?.post || null);

//   useEffect(() => {
//     const fetchImageAndPost = async () => {
//       try {
//         let img = image;

//         if (!img) {
//           const res = await axios.get(`http://localhost:4000/api/images/imagekit/${id}`, {
//             withCredentials: true,
//           });
//           img = res.data.image;
//           setImage(img);
//         }

//         if (img && !post) {
//           const postId = img.name.split("_")[0];
//           const postRes = await axios.get(`http://localhost:4000/api/images/mongo/${postId}`, {
//             withCredentials: true,
//           });
//           setPost(postRes.data.post);
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchImageAndPost();
//   }, [id, image, post]);


//   if (!image) {
//     return (
//       <div className="text-center mt-10 text-gray-500">
//         Loading image...
//         <br />
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Back to All Posts
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-6 flex flex-col items-center">
//       <h1 className="text-xl font-semibold mb-4">{image.name}</h1>
//       <img
//         src={image.url}
//         alt={image.name}
//         className="max-w-full max-h-[80vh] rounded shadow-md"
//       />
//       <div className="mt-4">
//         <p><strong>ID:</strong> {image.fileId}</p>
//         <p><strong>Name:</strong> {image.name}</p>
//         <p><strong>Path:</strong> {image.filePath}</p>
//         <p><strong>Type:</strong> {image.fileType}</p>
//         <p><strong>Size:</strong> {(image.size / 1024).toFixed(2)} KB</p>
//         <p><strong>Dimensions:</strong> {image.width} x {image.height}</p>
//         <p><strong>Uploaded:</strong> {new Date(image.createdAt).toLocaleString()}</p>
//       </div>


//       {post ? (
//         <div className="mt-6 w-full max-w-2xl bg-gray-100 p-4 rounded shadow">
//           <h2 className="text-lg font-bold mb-2">Post Details</h2>
//           <p><strong>Caption:</strong> {post.caption}</p>
//           <p><strong>Visibility:</strong> {post.visibility}</p>
//           <p><strong>Author:</strong> {post.author}</p>
//         </div>
//       ) : (
//         <div className="mt-6 text-gray-500">Loading post details...</div>
//       )}
      
//     </div>
//   );
// };

// export default ArchievePage;
