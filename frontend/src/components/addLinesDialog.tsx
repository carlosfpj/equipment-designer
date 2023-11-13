import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
interface AddLineDialogProps {
  onDismiss: () => void,
}

const AddLineDialog = ({onDismiss}: AddLineDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add line
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addLineForm">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
            />
            <Form.Control
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="text"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addLineForm"
        >Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddLineDialog;