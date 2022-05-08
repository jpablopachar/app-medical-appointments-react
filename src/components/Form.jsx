import { useEffect, useState } from 'react'
import Error from './Error'

const Form = ({ patients, setPatients, patient, setPatient }) => {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      const { name, owner, email, date, symptoms } = patient

      setName(name)
      setOwner(owner)
      setEmail(email)
      setDate(date)
      setSymptoms(symptoms)
    }
  }, [patient])

  const idGenerate = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)

    return random + date
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if ([name, owner, email, date, symptoms].includes('')) {
      setError(true)

      return
    }

    setError(false)

    const currentPatient = { name, owner, email, date, symptoms }

    if (patient.id) {
      currentPatient.id = patient.id

      const patientsUpdated = patients.map((patientObj) =>
        patientObj.id === patient.id ? currentPatient : patientObj
      )

      setPatients(patientsUpdated)
      setPatient({})
    } else {
      currentPatient.id = idGenerate()

      setPatients([...patients, currentPatient])
    }

    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}{' '}
        <span className="text-indigo-600 font-bold">Administra</span>
      </p>
      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        onSubmit={handleSubmit}
      >
        {error && (
          <Error>
            <p>Todos los campos son necesarios</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Mascota
          </label>
          <input
            type="text"
            id="mascota"
            className="border-2 w-full p-2 pt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre de la mascota"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Propietario
          </label>
          <input
            type="text"
            id="propietario"
            className="border-2 w-full p-2 pt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del propietario"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 w-full p-2 pt-2 placeholder-gray-400 rounded-md"
            placeholder="Email del propietario"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            type="date"
            id="alta"
            className="border-2 w-full p-2 pt-2 placeholder-gray-400 rounded-md"
            placeholder="Fecha del alta"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="síntomas"
          >
            Síntomas
          </label>
          <textarea
            id="síntomas"
            className="border-2 w-full p-2 pt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={patient.id ? 'Editar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

export default Form
