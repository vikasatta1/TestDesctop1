import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {UserType} from "../store/reducers/auth/authReducers";
import {EventCalendarType} from "./EventCalendar";
import {formatDate} from "../utils/date";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";




type EventFormPropsType = {
    guests: UserType[];
    submit:(event:EventCalendarType)=> void
}

const EventForm = (props: EventFormPropsType) => {
    /* console.log(props.guests)*/
    const [event, setEvent] = useState<EventCalendarType>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as EventCalendarType)
    const user = useSelector<RootState,UserType>(state => state.auth.user)

    const selectDate = (date: any) => {
        if(date){
            setEvent({...event,date:formatDate(date.toDate())})
        }

    }
    const submitForm =()=>{
        props.submit({...event,author:user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description event"
                name="description"
                rules={[rules.required()]}>
                <Input onChange={e => setEvent({...event, description: e.target.value})}
                       value={event.description}/>
            </Form.Item>
            <Form.Item label="Date event"
                       name="date"
                       rules={[rules.required()]}>
                <DatePicker
                    onChange={(date) => selectDate(date)}

                />
            </Form.Item>
            <Form.Item label="Guest"
                       name="guest"
                       rules={[rules.required()]}>
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>)}
                </Select>
            </Form.Item>
            <Row justify={'end'}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );

};

export default EventForm;