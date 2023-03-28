import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import MediaSearch from "../pages/MediaSearch";
import ProtectedPage from "../components/common/ProtectedPage";
import PasswordUpdate from "../pages/PasswordUpdate";
import FavoriteList from "../pages/FavoriteList";
import ReviewList from "../pages/ReviewList";
import MediaList from "../pages/MediaList";
import MediaDetail from "../pages/MediaDetail";

export const routesGen = {
    home:"/",
    mediaList:(type:string)=> `/${type}`,
    mediaDetail:(type:string,id:string)=>`/${type}/${id}`,
    mediaSearch: "/search",
    person: (id:string)=>`/person/${id}`,
    favoriteList:"/favorites",
    reviewList:"/reviews",
    passwordUpdate:"password-update"
}

type RouteType = {
    index?:boolean,
    state?:string,
    path?:string,
    element:JSX.Element
}
export const routes:Array<RouteType> = [
    {
        index:true,
        element:<HomePage/>,
        state:"home"
    },
    {
        path:"/person/:personId",
        element:<PersonDetail/>,
    }  ,
    {
        path:"/search",
        element:<MediaSearch/>,
        state:"search"
    },
    {
        path:"/password-update",
        element:(
            <ProtectedPage>
                <PasswordUpdate/>
            </ProtectedPage>
        ),
        state:"password.update"
    },
    {
        path:"/favorites",
        element:(
            <ProtectedPage>
                <FavoriteList/>
            </ProtectedPage>
        ),
        state:"favorites"
    },
    {
        path:'/reviews',
        element:(
            <ProtectedPage>
                <ReviewList/>
            </ProtectedPage>
        ),
        state:"reviews"
    },
     {
        path:'/:mediaType',
        element: <MediaList/>
    },
    {
        path:"/:mediaType/:mediaId",
        element: <MediaDetail/>
    },

]