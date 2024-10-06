import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [authMethod, setAuthMethod] = useState('');
  const [passkey, setPasskey] = useState('');
  const [ledgerKey, setLedgerKey] = useState('');
  const [authCode, setAuthCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMethod === 'passkey' && passkey === '1234') {
      navigate('/form');
    } else if (authMethod === 'ledger' && ledgerKey === 'ledger1234') {
      navigate('/form');
    } else if (authMethod === 'authenticator' && authCode === 'auth1234') {
      navigate('/form');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="AuthPage">
      <h2>Choose Authentication Method</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <button onClick={() => setAuthMethod('passkey')}>Passkey</button>
        </li>
        <li>
          <button onClick={() => setAuthMethod('ledger')}>Ledger Key</button>
        </li>
        <li>
          <button onClick={() => setAuthMethod('authenticator')}>Authenticator App</button>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        {authMethod === 'passkey' && (
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Enter passkey"
          />
        )}
        {authMethod === 'ledger' && (
          <input
            type="text"
            value={ledgerKey}
            onChange={(e) => setLedgerKey(e.target.value)}
            placeholder="Enter ledger key"
          />
        )}
        {authMethod === 'authenticator' && (
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="Enter authenticator code"
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthPage;