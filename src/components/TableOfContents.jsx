import "../styles/TableOfContents.css"
import {places, years} from "../consts";
import {AppContext} from "./AppContext";
import {useContext} from "react";

const TableOfContents = ({setSearchParams}) => {
    const {data, setData} = useContext(AppContext);


    const setDataType = (type, element, year) => {
        if (element !== undefined) {
            setSearchParams({
                album: year,
                [type]: element
            });
            return true;
        }
        return false;
    }

    const handleClick = (event, selectedYear) => {
        console.log("select", selectedYear);
        let obj = data;
        obj["year"] = selectedYear;
        if (!setDataType("event", data.event, selectedYear) &&
            !setDataType("team", data.team, selectedYear) &&
            !setDataType("person", data.person, selectedYear)) {
            setDataType("event", "Photo Tour", selectedYear);
            obj["event"] = "Photo Tour";
            delete obj.text;
        }
        setData(obj);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
    console.log(places);
    return (
        <nav aria-label="Table of contents">
            {years.map(year => {
                if (year !== data.year) {
                    return <div className="year-wrapper" key={year} onClick={event => handleClick(event, year)}>
                        <div className="year">{year}</div>
                        <div className="place">{places[year]}</div>
                    </div>
                } else {
                    return <div className="year-wrapper" key={year} onClick={event => handleClick(event, year)}>
                        <div className="year big-year">World Finals {year}</div>
                        <div className="place big-place">{places[year]}</div>
                    </div>
                }
            })}
        </nav>
    );
};

export default TableOfContents;