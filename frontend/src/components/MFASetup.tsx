// src/components/MFASetup.tsx
import React, { useState } from 'react';
import { setupMFA, verifyMFASetup } from '../api/authApi';

const MFASetup: React.FC = () => {
  const [qrData, setQrData] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'INIT' | 'VERIFY' | 'DONE'>('INIT');
  const [error, setError] = useState('');

  const handleSetupMFA = async () => {
    setError('');
    try {
      const data = await setupMFA();
      // data.qr_code => "data:image/png;base64,...."
      setQrData(data.qr_code);
      setStep('VERIFY');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error generando QR');
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    try {
      const data = await verifyMFASetup(otpCode);
      if (data.message === 'MFA habilitada correctamente') {
        setStep('DONE');
      } else {
        setError(data.error || 'Error al verificar código');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error de conexión');
    }
  };

  if (step === 'DONE') {
    return <p>¡MFA habilitada con éxito!</p>;
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {step === 'INIT' && (
        <button onClick={handleSetupMFA}>Generar Clave Secreta y QR</button>
      )}

      {step === 'VERIFY' && (
        <div className='main-form'>
          <p>Escanea este QR con tu app TOTP (Google Authenticator, etc.):</p>
          {qrData && <img src={qrData} alt="QR code MFA" />}
          <p>Luego ingresa el código generado:</p>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verificar MFA</button>
        </div>
      )}
    </div>
  );
};

export default MFASetup;