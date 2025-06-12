import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import {
  AgendaDataRequest,
  AgendaDataResponse,
  createAgendas,
  getAllAgendas,
  updateCurrentAgenda,
} from "@/api/agendaApi";
import Sidebar from "@/components/Sidebar";

const StartNewAgenda: React.FC = () => {
  const [agendaCount, setAgendaCount] = useState<number | "">("");
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      acc[`agenda_${index + 1}_title`] = "";
      acc[`agenda_${index + 1}_name`] = "";
      acc[`agenda_${index + 1}_info`] = "";
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
        acc[`agenda_${id}_title`] = Yup.string().required("Title is required");
        return acc;
      }, {} as Record<string, Yup.StringSchema>)
    ),
    onSubmit: async (values: Record<string, string>) => {
      const agendas: AgendaDataRequest[] = Array.from(
        { length: typeof agendaCount === "number" ? agendaCount : 0 },
        (_, index) => ({
          title: values[`agenda_${index + 1}_title`],
          name: values[`agenda_${index + 1}_name`],
          info: values[`agenda_${index + 1}_info`],
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
      } catch {
        setMessage({ text: "Failed to submit agendas.", type: "failure" });
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
    if (selectedId && window.confirm("Set this as the current agenda?")) {
      setCurrentAgenda(selectedId);
      try {
        await updateCurrentAgenda(selectedId);
        setMessage({
          text: "Current agenda updated successfully!",
          type: "success",
        });
      } catch {
        setMessage({
          text: "Failed to update current agenda.",
          type: "failure",
        });
      }
    }
  };

  return (
    <>
      {/* CSS to move modal to top, adjust 'top' value to move it down more */}
      <style>{`
        .modal-dialog {
          margin: 1rem auto auto auto !important;
          position: absolute !important;
          top: 150px !important; /* Adjust this to move modal down */
          left: 50% !important;
          transform: translateX(-50%) !important;
          max-width: 800px;
          width: 100%;
        }
      `}</style>

      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 ml-0 md:ml-64 p-6 relative">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-3xl fixed top-4 left-4 z-20 text-white bg-gray-700 rounded p-2"
              aria-label="Open sidebar"
            >
              &#9776;
            </button>
          )}

          <h1 className="text-2xl font-bold mb-6 text-center">
            Start New Agenda
          </h1>

          <div className="mb-6">
            <label className="block mb-2">
              How many plans do you want to create?
            </label>
            <input
              type="number"
              value={agendaCount}
              onChange={handleCountChange}
              className="w-full max-w-xs bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
            />
            <Button
              className="ml-2 mt-2"
              onClick={() => setShowModal(true)}
              disabled={!(typeof agendaCount === "number" && agendaCount > 0)}
            >
              Create Agendas
            </Button>
            {message && (
              <p
                className={`mt-2 ${
                  message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">Choose current agenda:</label>
            <select
              value={currentAgenda}
              onChange={handleCurrentAgendaChange}
              className="w-full max-w-xs bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
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
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            aria-labelledby="create-agendas-modal"
            backdrop="static" // disable closing by clicking outside
            keyboard={false} // disable closing by ESC key
          >
            <Modal.Header className="relative">
              <XCircle
                size={28}
                className="text-red-500 cursor-pointer absolute top-2 right-2"
                onClick={() => setShowModal(false)}
                title="Cancel"
                aria-label="Cancel and close modal"
              />
            </Modal.Header>

            <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
              <form id="agenda-form" onSubmit={formik.handleSubmit}>
                {Array.from(
                  { length: typeof agendaCount === "number" ? agendaCount : 0 },
                  (_, index) => {
                    const id = index + 1;
                    return (
                      <div
                        key={id}
                        className="mb-4 border border-gray-700 p-4 rounded bg-gray-800 text-white"
                      >
                        <h3 className="text-lg font-bold text-violet-400">
                          Agenda {id}
                        </h3>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-white">Title</Form.Label>
                          <Form.Control
                            type="text"
                            name={`agenda_${id}_title`}
                            className="bg-gray-700 text-white"
                            value={formik.values[`agenda_${id}_title`] || ""}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors[`agenda_${id}_title`]}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-white">Name</Form.Label>
                          <Form.Control
                            type="text"
                            name={`agenda_${id}_name`}
                            className="bg-gray-700 text-white"
                            value={formik.values[`agenda_${id}_name`] || ""}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-white">Info</Form.Label>
                          <Form.Control
                            type="text"
                            name={`agenda_${id}_info`}
                            className="bg-gray-700 text-white"
                            value={formik.values[`agenda_${id}_info`] || ""}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </div>
                    );
                  }
                )}
              </form>
            </Modal.Body>

            <Modal.Footer>
              {/* Cancel button removed */}
              <Button type="submit" form="agenda-form" variant="primary">
                Submit Agendas
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default StartNewAgenda;
