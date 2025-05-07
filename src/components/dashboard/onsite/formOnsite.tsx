import { useState } from 'react';
import { userService } from '../../../Services/user.Service';

const ClientSearchForm = () => {
  const [clientForm, setClientForm] = useState({ phoneNumber: '', name: '', birthDate: '' });
  const [userId, setUserId] = useState(0);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const searchClient = async () => {
    setLoading(true);
    setAlertMessage('');
    try {
      const res = await userService.consultUser(clientForm.phoneNumber);
      if (res.status === 200 && res.data) {
        if (res.data.name) {
          setUserId(res.data.id);
          setClientForm({ ...clientForm, name: res.data.name, birthDate: res.data.birth_date });
        } else if (res.data.id) {
          setShowRegisterButton(true);
          setUserId(res.data.id);
        }
      }
    } catch (err) {
      setAlertMessage('Error al buscar cliente.');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    const { name, birthDate } = clientForm;
    try {
      await userService.registerUser(userId, { name, birth_date: birthDate });
      setAlertMessage('Cliente registrado exitosamente.');
      setShowRegisterButton(false);
    } catch (err) {
      setAlertMessage('Error al registrar cliente.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buscar Cliente</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <div className="flex">
            <input
              type="tel"
              value={clientForm.phoneNumber}
              onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })}
              className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={searchClient}
              className="px-4 bg-gray-200 text-sm text-gray-700 rounded-r-md border border-l-0"
            >
              Buscar
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={clientForm.name}
            onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            value={clientForm.birthDate}
            onChange={(e) => setClientForm({ ...clientForm, birthDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {showRegisterButton && (
        <button
          onClick={registerUser}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registrar Cliente
        </button>
      )}

      {alertMessage && <p className="mt-4 text-red-500 text-center">{alertMessage}</p>}

      {loading && <p className="mt-4 text-gray-600 text-center">Buscando...</p>}
    </div>
  );
};

export default ClientSearchForm;
