import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import VideoCard from "../../Components/VideoCard";
import AdminVideoCard from "../Admin/adminVideoCard"

const VideoDashboard = (props) => {
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState(null);
    const [status, setStatus] = useState(false);
    useEffect(() => {
            const data = null;
            axios.post("http://localhost:9002/videolist", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
            .then((res) => {
                // console.log(res.data);
                setVideoList(res.data)
            }).then(() => {
                setStatus(true)
            }).catch((err)=>{
                console.log(err);
            })
    }, [])

    if (!status) return (
        <>
            <div className="flex item-center">
                Loading..
            </div>
        </>
    )
    return (
        <>
            <div className="flex" >
                <div className="flex flex-wrap">
                    {
                        Array.isArray(videoList) ?
                            videoList.map((val, index) => {
                                return (
                                <>
                                    <AdminVideoCard id={val._id} videoPath={val.videoPath} thumbnailPath={val.thumbnailPath} title={val.title} description={val.description} userName={val.userName} tags={val.tags} views={val.views} userId={val.userId}/>
                                </>
                                )
                            })
                            : null
                    }
                </div>
            </div>
        </>
    )
}

export default VideoDashboard