I have 2 compoment, pages/admin/ for admin pages and pages/ for user view. In admin view I have 2 pages. I want a side bar that can switch between two. import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import {
AgendaDataRequest,
AgendaDataResponse,
createAgendas,
getAllAgendas,
updateCurrentAgenda,
} from "@/api/agendaApi";

const StartNewAgenda: React.FC = () => {
const [agendaCount, setAgendaCount] = useState<number | "">("");
const [showModal, setShowModal] = useState(false);
const [message, setMessage] = useState<{
text: string;
type: "success" | "failure";
} | null>(null);
const [agendas, setAgendas] = useState<AgendaDataResponse[]>([]);
const [currentAgenda, setCurrentAgenda] = useState<number | "">("");

useEffect(() => {
const fetchAgendas = async () => {
try {
const response = await getAllAgendas();
setAgendas(response);
} catch (error) {
console.error("Error fetching agendas:", error);
}
};
fetchAgendas();
}, []);

const generateInitialValues = () => {
return Array.from({
length: typeof agendaCount === "number" ? agendaCount : 0,
}).reduce((acc: Record<string, any>, _, index) => {
acc[agenda_${index + 1}_title] = "";
      acc[agenda_${index + 1}_name] = "";
acc[agenda_${index + 1}\_info] = "";
return acc;
}, {});
};

const formik = useFormik({
initialValues: generateInitialValues(),
enableReinitialize: true,
validationSchema: Yup.object().shape(
Array.from(
{ length: typeof agendaCount === "number" ? agendaCount : 0 },
(_, index) => index + 1
).reduce((acc, id) => {
acc[agenda_${id}_title] = Yup.string().required("Title is required");
        return acc;
      }, {} as Record<string, Yup.StringSchema>)
    ),
    onSubmit: async (values: Record<string, string>) => {
      const agendas: AgendaDataRequest[] = Array.from(
        { length: typeof agendaCount === "number" ? agendaCount : 0 },
        (_, index) => ({
          title: values[agenda_${index + 1}_title],
name: values[agenda_${index + 1}_name],
          info: values[agenda_${index + 1}\_info],
})
);
try {
await createAgendas(agendas);
setMessage({
text: "Agendas submitted successfully!",
type: "success",
});
setAgendas(await getAllAgendas());
setShowModal(false);
} catch (error) {
setMessage({
text: "Failed to submit agendas. Please try again.",
type: "failure",
});
setShowModal(false);
}
},
});

const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const count = parseInt(e.target.value, 10);
setAgendaCount(isNaN(count) || count <= 0 ? "" : count);
};

const handleCurrentAgendaChange = async (
e: React.ChangeEvent<HTMLSelectElement>
) => {
const selectedId = parseInt(e.target.value, 10);

    if (
      selectedId &&
      window.confirm("Are you sure you want to set this as the current agenda?")
    ) {
      setCurrentAgenda(selectedId);

      try {
        await updateCurrentAgenda(selectedId);
        setMessage({
          text: "Current agenda updated successfully!",
          type: "success",
        });
      } catch (error) {
        setMessage({
          text: "Failed to update current agenda. Please try again.",
          type: "failure",
        });
      }
    }

};

return (
<div
style={{
        padding: "20px",
        backgroundColor: "#121212",
        color: "#f5f5f5",
        minHeight: "100vh",
      }} >
<style>{
input, select {
background: #1e1e1e;
border: 2px solid transparent;
padding: 10px;
color: #f5f5f5;
font-size: 16px;
border-radius: 8px;
transition: all 0.3s;
}

        input:focus, select:focus {
          border-color: #6c63ff;
          box-shadow: 0 0 8px #6c63ff;
          outline: none;
        }

        button {
          background: linear-gradient(45deg, #ff6f61, #6c63ff);
          border: none;
          padding: 10px 20px;
          color: #fff;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(108, 99, 255, 0.4);
        }

        label {
          font-weight: bold;
        }
      }</style>
      <h1>Start New Agenda</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="agendaCount">
          How many plans do you want to create in your agenda?
        </label>
        <input
          type="number"
          id="agendaCount"
          min="1"
          value={agendaCount}
          onChange={handleCountChange}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        />
        <Button
          onClick={() => setShowModal(true)}
          disabled={!(typeof agendaCount === "number" && agendaCount > 0)}
          style={{ marginLeft: "10px" }}
        >
          Create Agendas
        </Button>
        {message && (
          <div
            style={{
              color: message.type === "success" ? "#4caf50" : "#f44336",
              marginTop: "10px",
            }}
          >
            {message.text}
          </div>
        )}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="currentAgenda">Choose the current agenda:</label>
        <select
          id="currentAgenda"
          value={currentAgenda}
          onChange={handleCurrentAgendaChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select an agenda</option>
          {agendas.map((agenda) => (
            <option key={agenda.id} value={agenda.id}>
              {agenda.title}
            </option>
          ))}
        </select>
      </div>
      <Modal
        dialogClassName="modal-dialog-scrollable"
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Agendas</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
          <form onSubmit={formik.handleSubmit}>
            {Array.from(
              { length: typeof agendaCount === "number" ? agendaCount : 0 },
              (_, index) => {
                const id = index + 1;
                return (
                  <div
                    key={id}
                    style={{
                      border: "1px solid #444",
                      borderRadius: "8px",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <h3 style={{ color: "#6c63ff" }}>Agenda {id}</h3>
                    <Form.Group>
                      <Form.Label>Title : </Form.Label>
                      <Form.Control
                        type="text"
                        name={agenda_${id}_title}
                        value={formik.values[agenda_${id}_title]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          !!formik.errors[agenda_${id}_title] &&
                          !!formik.touched[agenda_${id}_title]
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        name={agenda_${id}_name}
                        value={formik.values[agenda_${id}_name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          !!formik.errors[agenda_${id}_name] &&
                          !!formik.touched[agenda_${id}_name]
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label> Infor : </Form.Label>
                      <Form.Control
                        type="text"
                        name={agenda_${id}_info}
                        value={formik.values[agenda_${id}_info]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          !!formik.errors[agenda_${id}_info] &&
                          !!formik.touched[agenda_${id}_info]
                        }
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                );
              }
            )}
            <Button type="submit">Submit Agendas</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>

);
};

export default StartNewAgenda; import { getVoteCounts, VoteCountsResponseDto } from '@/api/adminApi';
import React, { useEffect, useState } from 'react';

const VoteDisplay: React.FC = () => {
const [voteData, setVoteData] = useState<VoteCountsResponseDto | null>(null);

useEffect(() => {
// Simulate fetching data (replace this with your API call)
const fetchVoteCounts = async () => {
// Replace with actual API call
const data = await getVoteCounts();
setVoteData(data);
};

    fetchVoteCounts();

}, []);

if (!voteData) return <p>Loading...</p>;

return (
<div className="min-h-screen py-6 flex flex-col justify-center items-center sm:py-12">
<h2 className='text-2xl font-bold m-4'>Male Votes</h2>
<ul>
{voteData.maleVotes.map((vote) => (
<li key={vote.selectionId} className='font-poppins mb-2 text-lg'>
{vote.selectionName}: <span className='text-violet-600'>{vote.voteCount}</span>
</li>
))}
</ul>
<h2 className='text-2xl font-bold m-4'>Female Votes</h2>
<ul>
{voteData.femaleVotes.map((vote) => (
<li key={vote.selectionId} className='font-poppins mb-2 text-lg'>
{vote.selectionName}: <span className='text-violet-600'>{vote.voteCount}</span>
</li>
))}
</ul>
</div>
);
};

export default VoteDisplay;
{/_ Add all admin protected routes here _/}
<Route element={<ProtectedAdminLayout />}>
<Route path="/admin" element={<AdminPage />} />
<Route path="/admin/agenda" element={<StartNewAgenda />} />
</Route>

ChatGPT said:
