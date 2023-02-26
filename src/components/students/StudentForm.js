import React, { useEffect, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useHistory, useParams } from "react-router";
import Input from "../layout/Input";

const StudentForm = () => {
  let history = useHistory();
  const firestore = useFirestore();
  const { id } = useParams();
  const docRef = id ? firestore.collection("students").doc(id) : null;
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    standard: "",
    address1: "",
    address2: "",
  });

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      loadstudent();
    }
  }, [id]);

  const loadstudent = async () => {
    try {
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        console.log("no such data");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (id) {
      await docRef.update({
        ...student,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      // alert("updated");
    } else {
      // alert("added");
      firestore
        .collection("students")
        .add({ ...student, createdAt: firestore.FieldValue.serverTimestamp() });
    }
    history.push("/");
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card card-body shadow">
              <form onSubmit={submitForm}>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Name"
                      name="name"
                      value={student.name}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student E-mail"
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group mb-4">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Phone"
                      name="phone"
                      type="number"
                      value={student.phone}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Class"
                      name="standard"
                      type="number"
                      value={student.standard}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="form-row form-group">
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Address Line 1"
                      name="address1"
                      value={student.address1}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      placeholder="Enter Student Address Line 2"
                      name="address2"
                      value={student.address2}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  {id ? "Update Student" : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
