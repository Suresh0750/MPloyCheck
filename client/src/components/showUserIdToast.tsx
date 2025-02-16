import toast from "react-hot-toast";


export const showUserIdToast = (userId: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-2">
          <span>User ID: {userId}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => copyToClipboard(userId)}
          >
            Copy
          </button>
        </div>
      ),    
      { duration: 5000 }
    );
  };


export const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
      return 
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };
