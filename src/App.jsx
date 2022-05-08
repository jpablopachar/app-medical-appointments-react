import { useEffect, useState } from 'react'
import Form from './components/Form'
import Header from './components/Header'
import PatientList from './components/PatientList'

const App = () => {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})

  const removePatient = (id) => {
    const patientsUpdated = patients.filter((patient) => patient.id !== id)

    setPatients(patientsUpdated)
  }

  useEffect(() => {
    const getLocalStorage = () => {
      const currentPatient = JSON.parse(localStorage.getItem('patients')) ?? []

      setPatients(currentPatient)
    }

    getLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  }, [patients])

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList
          patients={patients}
          setPatient={setPatient}
          removePatient={removePatient}
        />
      </div>
    </div>
  )
}

export default App
