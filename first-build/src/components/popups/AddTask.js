import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "./Popup.css";

function AddTask(props) {
    const [title, setTitle ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The Title you entered was: ${title}`)
    }

    //Needs a ProjectID(No.), Title(Text20), DueDate(DateTime), Status(Completed, Pending, Late), Description(Text), AM1(No.)
    return (
        <div className="popup">
            <p><b>AddTask Form</b></p>
            <form>
                <label> ProjectID: 
                    <input type="text" />
                </label> <br />
                <label> Title: 
                    <input type="text" />
                </label> <br />
                <label> Due Date: 
                    <DateTimePicker />
                </label> <br />
                <label> Status: 
                    <select>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Late">Late</option>
                    </select>
                </label> <br />
                <label> Description: 
                    <input type="textarea" />
                </label> <br />
                <label> Assigned Member 1: 
                    <input type="text" />
                </label> <br />
                <label> Assigned Member 2: 
                    <input type="text" />
                </label> <br />
                <label> Assigned Member 3: 
                    <input type="text" />
                </label> <br />
                <label> Assigned Member 4: 
                    <input type="text" />
                </label> <br />
                <label> Assigned Member 5: 
                    <input type="text" />
                </label> <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddTask;