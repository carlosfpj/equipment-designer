import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Line } from "../models/line";
import { useForm } from "react-hook-form";
import { LineInput } from "../network/line_api";
import * as LineApi from "../network/line_api";
interface AddLineDialogProps {
  onDismiss: () => void,
  onLineSaved: (line: Line) => void,
}

const AddLineDialog = ({ onDismiss, onLineSaved }: AddLineDialogProps) => {

  const { register,
          handleSubmit,
          formState: { errors,
                       isSubmitting}
         } = useForm<LineInput>();

  async function onSubmit(input: LineInput) {
    try {
      const lineResponse = await LineApi.createLine(input);
      onLineSaved(lineResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add line
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addLineForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required"})}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="number"
              as="textarea"
              rows={5}
              placeholder="flow"
              {...register("flow")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addLineForm"
          disabled={isSubmitting}
        >Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddLineDialog;