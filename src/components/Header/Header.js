import React from "react";
import Seleclor from "./Seleclor";
import Search from "./Search";
import "../../styles/Header.css"


export const Header = ({setSearchParams}) => {
    return <div>
        <div className={"header-input-wrapper"}>
            <Seleclor setSearchParams={setSearchParams}/>
            <Search setSearchParams={setSearchParams}/>
        </div>
    </div>
}
export default Header;