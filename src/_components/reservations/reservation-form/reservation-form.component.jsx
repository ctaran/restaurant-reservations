import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { getDateFormatted, getTimeFormatted } from '../../../_helpers';
import { reservationService } from '../../../_services/reservation.service';

const timeSlots = ["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"]

const ReservationForm = ( { reservation, onSubmit, onDelete, onClose, tableID }) => {
    const [timeOptions, setTimeOptions] = React.useState(timeSlots);

    let initialVals = reservation ?
                                    {
                                        date: getDateFormatted(reservation.date_time),
                                        time: getTimeFormatted(reservation.date_time),
                                        customerName: reservation.customer_name,
                                        customerEmail: reservation.customer_email,
                                        customerPhone: reservation.customer_phone
                                    } :
                                    {
                                        date: null,
                                        time: '',
                                        customerName: '',
                                        customerEmail: '',
                                        customerPhone: ''
                                    };
                                    
    return (
        <Formik
            initialValues={initialVals}
            enableReinitialize
            validationSchema={Yup.object().shape({
                date: reservation ? Yup.date().required('Date is required') : Yup.date().min(new Date()).required('Date is required'),
                time: Yup.string().required('Time is required'),
                customerName: Yup.string().required('Customer name is required'),
                customerEmail: Yup.string().email().required('Customer email is required'),
                customerPhone: Yup.string().required('Customer phone is required')
            })}
            onSubmit={({ date, time, customerName, customerEmail, customerPhone }, { setStatus, setSubmitting }) => {            
                const datetime = date + " " + time + ":00"; 
                onSubmit(datetime, customerName, customerEmail, customerPhone)
                    .then(
                        error => {
                            setSubmitting(false);
                            setStatus(error);
                        }
                    );
            }}
            onReset={() => onClose()}
            render={({ errors, status, touched, isSubmitting, handleChange, setFieldValue }) => (
                <Form>
                    <Segment>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} 
                                onChange={(e) => {
                                    handleChange(e);
                                    reservationService.getByTableIDandDate(tableID, e.target.value)
                                        .then((data) => {
                                            const bookedTimeSlots = data.reservations.map(reservation => reservation.date_time.split(" ")[1].substring(0,5));
                                            const availableTimeSlots = timeSlots.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
                                            setTimeOptions(availableTimeSlots);
                                            setFieldValue("time", availableTimeSlots[0]);
                                        })    
                                }}
                            />
                            <ErrorMessage name="date" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time:</label>
                            <Field name="time" className={'form-control' + (errors.time && touched.time ? ' is-invalid' : '')} as="select">
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                    {time}
                                    </option>
                                ))}             
                            </Field>
                            <ErrorMessage name="time" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerName">Customer name:</label>
                            <Field name="customerName" type="text" className={'form-control' + (errors.customerName && touched.customerName ? ' is-invalid' : '')} />
                            <ErrorMessage name="customerName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerEmail">Customer email:</label>
                            <Field name="customerEmail" type="email" className={'form-control' + (errors.customerEmail && touched.customerEmail ? ' is-invalid' : '')} />
                            <ErrorMessage name="customerEmail" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerPhone">Customer phone:</label>
                            <Field name="customerPhone" type="text" className={'form-control' + (errors.customerPhone && touched.customerPhone ? ' is-invalid' : '')} />
                            <ErrorMessage name="customerPhone" component="div" className="invalid-feedback" />
                        </div>
                    </Segment>      
                    <div className="form-group" align="right">
                        <Button type="submit" primary disabled={isSubmitting}>Submit</Button>
                        {isSubmitting &&
                            <img alt="No img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {reservation && <Button onClick={onDelete} negative>Delete</Button>}
                        <Button type="reset" secondary>Close</Button>                   
                    </div>                
                    {status &&
                        <div className={'alert alert-danger'}>{status}</div>
                    }
                </Form>
            )}
        />
    );
};

export default ReservationForm;