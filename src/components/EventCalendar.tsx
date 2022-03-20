import {Badge, Calendar} from "antd";
import {FC} from "react";
import {formatDate} from "../utils/date";

export type EventCalendarType = {
    author:string
    date:string
    guest:string
    description:string
}
export type EventCalendarPropsType = {
    events:EventCalendarType[]
}
const EventCalendar:FC<EventCalendarPropsType> = (props:EventCalendarPropsType) => {
    function dateCellRender(value:any) {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map((ev,index) => <div key={index}>{ev.description}</div>)}


            </div>
        );
    }
    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;