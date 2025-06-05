import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useGeolocationPrompt from '../../../components/Geolocation/GeoLocationPromt';

function GeoModal() {
  const {
    showPrompt,
    loading,
    requestGeolocation,
    hidePrompt,
  } = useGeolocationPrompt();

  return (
    <Modal show={showPrompt} onHide={hidePrompt} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Геолокація</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ми хочемо визначити ваше місцезнаходження для покращення досвіду. Надати дозвіл?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hidePrompt}>
          Ні, дякую
        </Button>
        <Button variant="primary" onClick={requestGeolocation} disabled={loading}>
          {loading ? '⏳ Визначаємо...' : '✅ Так, визначити'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GeoModal;
