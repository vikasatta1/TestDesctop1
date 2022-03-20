import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useDispatch, useSelector} from "react-redux";
import {CreateEventAction, fetchEventAction, fetchGuests} from "../store/reducers/event/eventReducer";
import {RootState} from "../store/store";
import {UserType} from "../store/reducers/auth/authReducers";

const Event: FC = () => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const guests = useSelector<RootState, UserType[]>(state => state.event.guest)
    const events = useSelector<RootState, any>(state => state.event.event)
    const user = useSelector<RootState, UserType>(state => state.auth.user)
    const addNewEvent = (event:any) => {

        setModalVisible(false)
        dispatch(CreateEventAction(event))
    }
    useEffect(() => {
        dispatch(fetchGuests())
        dispatch(fetchEventAction(user.username))
    }, [])

    return (
        <Layout>

            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={() => {
                    setModalVisible(true)
                }}>Add</Button>
            </Row>
            <Modal
                title={'Add event'}
                visible={modalVisible}
                footer={null}
                onCancel={() => {
                    setModalVisible(false)
                }}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;