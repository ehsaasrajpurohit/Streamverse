import axios from "axios";
import { useState } from "react";

export default function AdminVideoCard(props) {
    const [display,setDisplay] = useState(1);
    const {id, videoPath,thumbnailPath,title,description, userName,tags, views, userId} = props;
    
    const deleteVideo = () => {
      axios.post("http://localhost:9002/admin/deleteVideo",{id:id})
      .then((res) => {
          // console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
      setDisplay(0);
    }

    if(display)
      return (
        <>
         <div class="w-64 m-4 cursor-pointer">
          <div class="h-36 w-full rounded-lg shadow-md dark:shadow-black">
            <img class="w-64 h-36 object-cover" src={`http://localhost:9002/file/image/${thumbnailPath}`} alt="" />
          </div>
          <div class="mt-3 flex items-start space-x-2">
            <div class="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-white">
              <img src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt="" />
            </div>
            <div class="flex flex-col text-md tracking-tighter leading-tight">
              <div class="text-black dark:text-white font-semibold overflow-ellipsis">{title}</div>
              <div class="mt-1 flex items-baseline space-x-1">
                <div class="text-gray-400 text-xs">{userName}</div>
                <div class="w-3 h-3 pt-0.5">
                  <svg viewBox="0 0 24 24" class="text-gray-400" fill="currentColor">
                    <g><path fill-rule="evenodd" clip-rule="evenodd" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10 S17.52,2,12,2z M9.92,17.93l-4.95-4.95l2.05-2.05l2.9,2.9l7.35-7.35l2.05,2.05L9.92,17.93z"></path></g>
                  </svg>
                </div>
              </div>
              <div class="text-gray-400 text-xs">{views} Views</div>
              <button onClick={deleteVideo} class="bg-red-500 hover:bg-red-700 text-white text-sm w-fit p-1 relative left-[80%] rounded">
                DELETE
              </button>
            </div>
          </div>
        </div>
        </>
      );
    else return <></>
}