import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AuthPage.css';
import logo from '../media/canonical-passkey-icon.png'; // Add your logo image here

function AuthPage() {
  const [authMethod, setAuthMethod] = useState('');
  const [passkey, setPasskey] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [submitLedgerKey, setSubmitLedgerKey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (submitLedgerKey && authMethod === 'ledger key') {
      handleSubmit({ preventDefault: () => {} });
      setSubmitLedgerKey(false);
    }
  }, [authMethod, submitLedgerKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Auth Method:', authMethod);
    if (authMethod === 'ledger key') {
      console.log('Ledger Key selected');
      setShowVerificationMessage(true);
      setTimeout(() => {
        setShowVerificationMessage(false);
        navigate('/form');
      }, 2000);
    } else if (authMethod === 'authenticator' && authCode === '1234') {
      navigate('/form');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLedgerKeyClick = () => {
    setAuthMethod('ledger key');
    console.log('Ledger Key button clicked');
    setSubmitLedgerKey(true);
  };

  return (
    <div className="AuthPage">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Choose Authentication Method<br/></h2>
      <ul>
        <li>
          <button className="auth-button" onClick={handleLedgerKeyClick}>Ledger Key</button>
        </li>
        <li>
          <button className="auth-button" onClick={() => { setAuthMethod('authenticator'); console.log('Authenticator button clicked'); }}>Authenticator</button>
        </li>
      </ul>
      {authMethod === 'authenticator' && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Auth Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <button type="submit" className="submit-button">Submit</button>
          <br />
          <br />
        </form>
      )}
      {showVerificationMessage && authMethod === 'ledger key' && (
        <p>Verification of the key...</p>
      )}
    </div>
  );
}

export default AuthPage;