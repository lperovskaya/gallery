import React, {useEffect, useState, useContext} from 'react';
import MySelect from "../UI/Select/MySelect";
import {current_year, years} from "../../consts";
import axios from "axios";
import {AppContext} from "../AppContext";

const Seleclor = ({setSearchParams}) => {

    const [events, setEvents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [people, setPeople] = useState([]);

    const {event, setEvent, team, setTeam, person, setPerson, year, setYear, setText} = useContext(AppContext);


    useEffect(() => {
        if (year !== "") {
            getMenu()
        }
    }, [year]);

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function parseOptions(a) {
        return a.split(',').filter(x => x.length > 0).filter(onlyUnique);
    }

    function getOptionObj(a) {
        return a.map(x => {return {label: x}});
    }

    function setPersonLocal(s) {
        setPerson(s);

    }

    function setYearLocal(s) {
        setYear(s);
    }

    function setEventLocal(s) {
        setEvent(s);
    }

    function setTeamLocal(s) {
        setTeam(s);
    }

    function setTextLocal(s) {
        setText(s);
    }

    async function getMenu() {
        const response = await axios.get(`http://localhost:3000/${year}.html`);
        const menu = response.data;
        const split = menu.split("\n", 3);
        setTeamLocal("");
        if (event === "" && team === "" && person === "") {
            setEvent("Photo Tour");
        }
        setText("");
        setEvents(parseOptions(split[0]));
        setTeams(parseOptions(split[1]));
        setPeople(parseOptions(split[2]));
    }


    return (
        <div>
            <div>
                {year}
                {event}
                {team}
            </div>
            <MySelect options={getOptionObj(years)} onChange={selectedYear => {
                setYearLocal(selectedYear.label);
                if (event !== "") {
                    setSearchParams({
                        album: selectedYear.label,
                        event: event
                    });
                } else if (team !== "") {
                    setSearchParams({
                        album: selectedYear.label,
                        team: team
                    });
                } else if (person !== "") {
                    setSearchParams({
                        album: selectedYear.label,
                        person: person
                    });
                } else {
                    setSearchParams({
                        album: selectedYear.label
                    });
                }
            }} name={"Select year"} value={year}/>
            <MySelect options={getOptionObj(events)} onChange={selectedEvent => {
                setEventLocal(selectedEvent.label)
                setTeamLocal("");
                setPersonLocal("");
                setTextLocal("");
                setSearchParams({
                    album: year,
                    event: selectedEvent.label
                });
            }} name={"Select event"} value={event}/>
            <MySelect options={getOptionObj(teams)} onChange={selectedTeam => {
                setTeamLocal(selectedTeam.label)
                setEventLocal("");
                setPersonLocal("");
                setTextLocal("");
                setSearchParams({
                    album: year,
                    team: selectedTeam.label
                });
            }} name={"Select team"} value={team}/>
            <MySelect options={getOptionObj(people)} onChange={selectedPerson => {
                setPersonLocal(selectedPerson.label)
                setTeamLocal("");
                setEventLocal("");
                setTextLocal("");
                setSearchParams({
                    album: year,
                    person: selectedPerson.label
                });
            }} name={"Select person"} value={person}/>
        </div>
    );
};

export default Seleclor;