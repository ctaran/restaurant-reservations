import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { getDateFormatted } from '../../_helpers';
import { reservationService } from '../../_services/reservation.service';

class ReservationReport extends React.Component {
    constructor(props) {
        super(props);

        this.generateReport = this.generateReport.bind(this);
    }

    generateHTML(reservationGroups) {
        let table = document.createElement("TABLE");
        table.setAttribute("id", "reservations");
        table.style.display = 'none';
        document.body.appendChild(table);

        for (const tableGroup of reservationGroups) {

            let row = document.createElement("TR");
            row.setAttribute("id", tableGroup["table_index"]);
            document.getElementById("reservations").appendChild(row);

            let table_index = document.createElement("TD");
            table_index.setAttribute("style", "font-weight:bold");
            let index = document.createTextNode(tableGroup["table_index"]);
            table_index.appendChild(index);
            document.getElementById(tableGroup["table_index"]).appendChild(table_index);            

            row = document.createElement("TR");
            row.setAttribute("id", "Reservations"+tableGroup["table_index"]);
            document.getElementById("reservations").appendChild(row);

            let td_reservations = document.createElement("TD");
            let reservations = document.createTextNode("Reservations: ");
            td_reservations.appendChild(reservations);
            document.getElementById("Reservations"+tableGroup["table_index"]).appendChild(td_reservations);

            for (const reservation of tableGroup["reservations"]) {
                let row = document.createElement("TR");
                row.setAttribute("id", "Reservation" + reservation["id"]);
                document.getElementById("reservations").appendChild(row);

                let td_reservation = document.createElement("TD");
                let reservation_time = document.createTextNode(" - at " + reservation["time"]);
                td_reservation.appendChild(reservation_time);
                let reservation_customer_name = document.createTextNode(", Name: " + reservation["customer_name"]);
                td_reservation.appendChild(reservation_customer_name);
                let reservation_customer_email = document.createTextNode(", Email: " + reservation["customer_email"]);
                td_reservation.appendChild(reservation_customer_email);
                let reservation_customer_phone = document.createTextNode(", Phone: " + reservation["customer_phone"]);
                td_reservation.appendChild(reservation_customer_phone);

                document.getElementById("Reservation" + reservation["id"]).appendChild(td_reservation);
            };
        };

        return document.getElementById("reservations").outerHTML;
    }    

    generateReport(tables, date) {
        var reservations = [];
        const promises = [];        
        
        for (const table of tables) {
            promises.push(reservationService.getByTableIDandDate(table.id, date)
                .then((data) => {  
                    var reservationsForTable = [];

                    for (const res of data.reservations) {
                        const time = res.date_time.split(" ")[1].substring(0,5);
                        
                        const reservation = {};
                        reservation["id"] = res.id;
                        reservation["time"] = time;
                        reservation["customer_name"] = res.customer_name;
                        reservation["customer_email"] = res.customer_email;
                        reservation["customer_phone"] = res.customer_phone;
                        
                        reservationsForTable.push(reservation);
                    };                  

                    var tableReservations = {};
                    tableReservations["table_index"] = "Table #" + table.index;
                    tableReservations["reservations"] = reservationsForTable;

                    reservations.push(tableReservations);
                }));                        
        };     

        Promise.all(promises).then(() => {
            const filename = "Reservations.html";
            const content = this.generateHTML(reservations).replace("style=\"display: none;\"","");

            const table_element = document.getElementById("reservations");
            if (table_element) table_element.parentNode.removeChild(table_element);

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            element.setAttribute('download', filename);
        
            element.style.display = 'none';
            document.body.appendChild(element);
        
            element.click();
        
            document.body.removeChild(element);
        })        
    }

    render() {
        return (
            <Formik
                initialValues={new Date()}
                validationSchema={Yup.object().shape({
                date: Yup.date().required('Date is required')})}
                onSubmit={({ date }, { setStatus, setSubmitting }) => {                            
                   this.generateReport(this.props.tables, date);
                   setSubmitting(false);
                }}
                render={({ errors, status, touched, isSubmitting, handleChange, setFieldValue }) => (
                <Form style={{ display: 'flex' }}>
                    <div className="form-group">                        
                        <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')}/>
                        <ErrorMessage name="date" component="div" className="invalid-feedback" />
                    </div>                        
                    <div className="form-group">
                        <Button type="submit" primary disabled={isSubmitting}>Generate report</Button>
                        {isSubmitting &&
                            <img alt="No img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }                                  
                    </div>                
                    {status &&
                        <div className={'alert alert-danger'}>{status}</div>
                    }
                </Form>
            )}       
            />
        );
    }
}

export default ReservationReport;