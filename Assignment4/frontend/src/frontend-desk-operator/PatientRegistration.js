import "@progress/kendo-theme-default/dist/all.css";
import Cookies from "js-cookie";

function PatientRegistration(prop){

    function addPatient(e){
        e.preventDefault();

        var name = e.target.name.value;
        var age = e.target.age.value;
        var address = e.target.address.value;
        var phone = e.target.phone.value;
        var symptoms = e.target.symptoms.value;

        var data = {
            name: name,
            age: age,
            address: address,
            phone: phone,
            symptoms: symptoms
        };

        fetch(process.env.REACT_APP_BACKEND_URL.concat('api/add_patient/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            if(data.hasOwnProperty('Error')){
                alert("Error: " + data.Error);
            }else{
                alert("Patient Added Successfully");
                prop.setPatientData({patients: [...prop.patientData.patients, data]});
            }
        });
        console.log(process.env.REACT_APP_BACKEND_URL);
    }

    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Patient Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit= {addPatient}>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                            <input type="text" name = "name" class="form-control" placeholder="Name" aria-label="Name" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Age</span>
                            <input type="text" name = "age" class="form-control" placeholder="Age" aria-label="Age" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Address</span>
                            <input type="text" name="address" class="form-control" placeholder="Address" aria-label="Address" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Phone</span>
                            <input type="text" name="phone" class="form-control" placeholder="Phone" aria-label="Phone" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Symptoms</span>
                            <input type="text" name="symptoms" class="form-control" placeholder="Symptoms" aria-label="Symptoms" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save Data</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default PatientRegistration;