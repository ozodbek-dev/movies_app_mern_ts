import {
    FavoriteBorderOutlined,
    HomeOutlined,
    LiveTvOutlined, LockResetOutlined, RateReviewOutlined,
    SearchOutlined,
    SlideshowOutlined,
    SvgIconComponent
} from "@mui/icons-material";
import {SvgIconTypeMap} from "@mui/material";

type routType = {
    display:string,
    path:string,
    icon:SvgIconComponent,
    state:string,
}

const main:Array<routType> = [
    {
        display:"home",
        path:"/",
        icon: HomeOutlined,
        state:"home"
    },

    {
        display:"movies",
        path:"/movie",
        icon: SlideshowOutlined,
        state:"movie"
    },
    {
        display:"tv series",
        path:"/tv",
        icon: LiveTvOutlined,
        state:"homtve"
    },
    {
        display:"search",
        path:"/search",
        icon: SearchOutlined,
        state:"search"
    },
]
const user:Array<routType> = [
    {
        display:"favorites",
        path:"/favorites",
        icon: FavoriteBorderOutlined,
        state:"favorite"
    },

    {
        display:"reviews",
        path:"/reviews",
        icon: RateReviewOutlined,
        state:"reviews"
    },
    {
        display:"password update",
        path:"/password-update",
        icon: LockResetOutlined,
        state:"password.update"
    },
    {
        display:"search",
        path:"/search",
        icon: SearchOutlined,
        state:"search"
    },
]

const menuConfigs = {user, main}

export  default  menuConfigs